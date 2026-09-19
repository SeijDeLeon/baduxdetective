import { useEffect, useRef, useState } from 'react';
import { Home } from 'lucide-react';

import { OphydTransportProvider } from '@/api/ophyd/OphydTransportProvider';
import useOphydPVSocket from '@/api/ophyd/useOphydPVSocket';
import SignalMonitorPlotPV from '@/components/SignalMonitorPlotPV';
import {
    OphydSimProvider,
    SHUTTER_CLOSED_VALUE,
    SHUTTER_OPEN_VALUE,
    createOphydSim,
    createOphydSimTransport,
    motor,
    randomNoise,
    shutter,
    signal,
} from '@/lib/ophyd-sim';

const PV = {
    ringCurrent: 'BL7A:RING_CURRENT',
    beamEnergy: 'BL7A:BEAM_ENERGY',
    monoAngle: 'BL7A:MONO_ANGLE',
    monoAngleReadback: 'BL7A:MONO_ANGLE.RBV',
    monoAngleMoving: 'BL7A:MONO_ANGLE.MOVN',
    shutter: 'BL7A:SHUTTER',
    i0: 'BL7A:I0',
} as const;

const HOME_MONO_ANGLE = -8.9674;
const MONO_ANGLE_MIN = -10;
const MONO_ANGLE_MAX = 10;

function beamEnergyFromMonoAngle(angleDegrees: number) {
    const planck = 6.6261e-34;
    const speedOfLight = 299792458;
    const joulesToElectronVolts = 6.2415e18;
    const silicon111Spacing = 5.43e-10 / Math.sqrt(3);
    const monoOffset = -18.14349;
    const theta = ((angleDegrees - monoOffset) * Math.PI) / 180;
    return (
        (planck * speedOfLight * joulesToElectronVolts) /
        (2 * silicon111Spacing * Math.sin(theta) * 1000)
    );
}

const pageOneSim = createOphydSim({
    tickMs: 100,
    devices: [
        signal({
            name: PV.ringCurrent,
            units: 'mA',
            periodMs: 400,
            precision: 1,
            value: ({ random }) => 298.4 + randomNoise({ random, sigma: 0.18 }),
        }),
        motor({
            name: PV.monoAngle,
            initialPosition: HOME_MONO_ANGLE,
            velocity: 0.18,
            limits: [MONO_ANGLE_MIN, MONO_ANGLE_MAX],
            units: 'deg',
            epsilon: 0.001,
        }),
        shutter({ name: PV.shutter, initial: 'closed' }),
        signal({
            name: PV.beamEnergy,
            units: 'keV',
            periodMs: 200,
            precision: 3,
            dependsOn: [PV.monoAngleReadback],
            value: ({ get, random }) => {
                const angle = get.number(PV.monoAngleReadback);
                return beamEnergyFromMonoAngle(angle) + randomNoise({ random, sigma: 0.002 });
            },
        }),
        signal({
            name: PV.i0,
            units: 'arb.',
            periodMs: 200,
            dependsOn: [PV.beamEnergy, PV.shutter],
            value: ({ get }) => {
                if (get.number(PV.shutter) === SHUTTER_CLOSED_VALUE) return 0;
                return Math.max(0, get.number(PV.beamEnergy) / 15);
            },
        }),
    ],
});

const pageOneTransport = createOphydSimTransport(pageOneSim);

type ConsoleMessage = {
    id: number;
    time: string;
    title: string;
    tone: '' | 'danger' | 'warning';
    source: string;
    detail: string;
    value: string;
};

const startingMessages: ConsoleMessage[] = [
    {
        id: 1,
        time: '02:11',
        title: 'PV_27B LIMIT',
        tone: 'danger',
        source: 'BL7A:MONO:PV_27B',
        detail: 'Upper control limit was exceeded while the monochromator was settling.',
        value: '12.704',
    },
    {
        id: 2,
        time: '02:10',
        title: 'Mono settling',
        tone: 'warning',
        source: PV.monoAngleMoving,
        detail: 'The monochromator angle readback has not yet reached its requested position.',
        value: '1',
    },
    {
        id: 3,
        time: '02:08',
        title: 'User note saved',
        tone: '',
        source: 'BL7A:LOGBOOK',
        detail: 'Operator note was stored in the current experiment logbook.',
        value: 'OK',
    },
    {
        id: 4,
        time: '01:54',
        title: 'Vacuum interlock',
        tone: 'danger',
        source: 'BL7A:VAC:INTERLOCK',
        detail: 'A vacuum interlock was reported upstream of the experimental chamber.',
        value: 'TRIP',
    },
];

function numericValue(value: unknown, fallback = 0) {
    return typeof value === 'number' ? value : fallback;
}

function shortTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Page1() {
    return (
        <OphydSimProvider sim={pageOneSim}>
            <OphydTransportProvider transport={pageOneTransport}>
                <BeamlineConsole />
            </OphydTransportProvider>
        </OphydSimProvider>
    );
}

function BeamlineConsole() {
    const { devices, handleSetValueRequest } = useOphydPVSocket(Object.values(PV));
    const ringCurrent = numericValue(devices[PV.ringCurrent]?.value, 298.4);
    const beamEnergy = numericValue(devices[PV.beamEnergy]?.value, 12.4);
    const monoAngle = numericValue(devices[PV.monoAngleReadback]?.value, HOME_MONO_ANGLE);
    const monoAngleSetpoint = numericValue(devices[PV.monoAngle]?.value, HOME_MONO_ANGLE);
    const moving = Boolean(numericValue(devices[PV.monoAngleMoving]?.value));
    const shutterClosed =
        numericValue(devices[PV.shutter]?.value, SHUTTER_OPEN_VALUE) === SHUTTER_CLOSED_VALUE;
    const i0 = numericValue(devices[PV.i0]?.value, 0.95);

    const [requestedAngle, setRequestedAngle] = useState(HOME_MONO_ANGLE.toFixed(3));
    const [messageList, setMessageList] = useState(startingMessages);
    const [selectedMessage, setSelectedMessage] = useState<ConsoleMessage | null>(null);
    const [showLimitWarning, setShowLimitWarning] = useState(false);
    const [runState, setRunState] = useState('START');
    const lastMessageAt = useRef(0);

    useEffect(() => {
        if (runState === 'PAUSE') return;

        const now = Date.now();
        if (now - lastMessageAt.current < 3000) return;
        lastMessageAt.current = now;

        let next: Omit<ConsoleMessage, 'id' | 'time'>;
        if (shutterClosed) {
            next = {
                title: 'Shutter closed',
                tone: 'danger',
                source: PV.shutter,
                detail: 'The beam shutter is closed and the I0 signal is blocked.',
                value: `${SHUTTER_CLOSED_VALUE} V`,
            };
        } else if (moving) {
            next = {
                title: 'Mono settling',
                tone: 'warning',
                source: PV.monoAngleReadback,
                detail: 'Angle readback is changing toward the requested monochromator angle.',
                value: `${monoAngle.toFixed(3)}°`,
            };
        } else if (i0 < 0.45) {
            next = {
                title: 'I0 signal low',
                tone: 'danger',
                source: PV.i0,
                detail: 'Incident intensity has fallen below the configured operating threshold.',
                value: i0.toFixed(3),
            };
        } else if (beamEnergy > 13.2) {
            next = {
                title: 'Beam energy high',
                tone: 'warning',
                source: PV.beamEnergy,
                detail: 'Calculated beam energy is above the nominal value for this setup.',
                value: `${beamEnergy.toFixed(3)} keV`,
            };
        } else {
            next = {
                title: 'Beamline ready',
                tone: '',
                source: PV.ringCurrent,
                detail: 'Periodic readiness check completed using the current simulated beam values.',
                value: ringCurrent.toFixed(1),
            };
        }

        setMessageList((current) => [
            { ...next, id: now, time: shortTime() },
            ...current.slice(0, 19),
        ]);
    }, [beamEnergy, i0, monoAngle, moving, ringCurrent, runState, shutterClosed]);

    const moveDistance = Math.abs(monoAngleSetpoint - monoAngle);
    const totalDistance = Math.max(Math.abs(monoAngleSetpoint - HOME_MONO_ANGLE), 0.001);
    const progress = moving
        ? Math.max(1, Math.round((1 - moveDistance / totalDistance) * 100))
        : 100;

    function runCommand(command: string) {
        setRunState(command);
    }

    function runMonoAction(action: string) {
        if (action === 'MOVE') {
            const target = Number(requestedAngle);
            if (!Number.isFinite(target) || target < MONO_ANGLE_MIN || target > MONO_ANGLE_MAX) {
                setShowLimitWarning(true);
                return;
            }
            handleSetValueRequest(PV.monoAngle, target);
        }
        if (action === 'STOP') handleSetValueRequest(PV.monoAngle, monoAngle);
        if (action === 'HOME') {
            setRequestedAngle(HOME_MONO_ANGLE.toFixed(3));
            handleSetValueRequest(PV.monoAngle, HOME_MONO_ANGLE);
        }
    }

    function toggleShutter() {
        handleSetValueRequest(
            PV.shutter,
            shutterClosed ? SHUTTER_OPEN_VALUE : SHUTTER_CLOSED_VALUE,
        );
    }

    return (
        <main className="workshop-page console-page">
            <header className="console-header">
                <div className="console-header-left">
                    <a className="console-home-link" href="/" title="Back to home">
                        <span>Bad UX Detective</span>
                        <Home size={13} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                    <span className="console-online">
                        <i className="status-dot green" /> ONLINE
                    </span>
                </div>
                <h1>AURORA CONTROL / BL-7A</h1>
                <div>
                    operator: m.chen{' '}
                    <button
                        className="bell"
                        type="button"
                        aria-label={`Open newest notification. ${messageList.length} notifications.`}
                        onClick={() => messageList[0] && setSelectedMessage(messageList[0])}
                    >
                        ♧<b>{messageList.length}</b>
                    </button>{' '}
                    {shortTime()}:08
                </div>
            </header>
            <div className="console-layout">
                <section className="console-main">
                    <div className="metric-grid">
                        <article>
                            <label>Ring Current</label>
                            <strong className="good">{ringCurrent.toFixed(1)}</strong>
                            <MiniSpark value={ringCurrent} tone="green" />
                        </article>
                        <article>
                            <label>Beam Energy</label>
                            <strong className="beam-energy-readout">
                                {beamEnergy.toFixed(3)} <small>keV</small>
                            </strong>
                            <i className="status-dot green" />
                        </article>
                    </div>
                    <section className="beam-path">
                        {['Front End', 'Mono', 'Shutter', 'Sample', 'Detector'].map(
                            (part, index) =>
                                part === 'Shutter' ? (
                                    <button
                                        className="beam-node shutter-toggle"
                                        type="button"
                                        onClick={toggleShutter}
                                        aria-pressed={shutterClosed}
                                        key={part}
                                    >
                                        <span>{part}</span>
                                        <i
                                            className={`beam-light ${shutterClosed ? 'shutter-closed' : 'shutter-open'}`}
                                        />
                                    </button>
                                ) : (
                                    <div className="beam-node" key={part}>
                                        <span>{part}</span>
                                        <i className={`beam-light light-${index}`} />
                                    </div>
                                ),
                        )}
                    </section>
                    <section className="mono-panel">
                        <h2>Monochromator</h2>
                        <div className="mono-fields">
                            <label>
                                Angle
                                <input
                                    type="number"
                                    min={MONO_ANGLE_MIN}
                                    max={MONO_ANGLE_MAX}
                                    step="0.001"
                                    value={requestedAngle}
                                    onChange={(event) => setRequestedAngle(event.target.value)}
                                />
                                <span>deg</span>
                            </label>
                        </div>
                        <div className="console-actions">
                            {['MOVE', 'STOP', 'HOME'].map((action) => (
                                <button onClick={() => runMonoAction(action)} key={action}>
                                    {action}
                                </button>
                            ))}
                        </div>
                        <div className="command-progress">
                            <span>{moving ? 'Executing...' : 'Complete'}</span>
                            <progress value={progress} max="100" />
                            <span>{progress}%</span>
                        </div>
                    </section>
                    <section className="console-plot">
                        <div className="plot-title">
                            <h2>I0</h2>
                            <span>LIVE</span>
                        </div>
                        <SignalMonitorPlotPV
                            pv={PV.i0}
                            className="console-i0-plot"
                            numVisiblePoints={120}
                            pollingIntervalMilliseconds={200}
                            tickTextIntervalSeconds={10}
                            color="#45d6ed"
                            yAxisTitle="Value"
                            yAxisRange={[0, 1.2]}
                        />
                    </section>
                </section>
                <aside className="message-sidebar">
                    <h2>Messages</h2>
                    <div className="message-list">
                        {messageList.map((message) => (
                            <button
                                className={message.tone}
                                onClick={() => setSelectedMessage(message)}
                                key={message.id}
                            >
                                <span>{message.time}</span>
                                {message.title}
                            </button>
                        ))}
                    </div>
                    <button className="ack-all" onClick={() => setMessageList([])}>
                        ACK ALL
                    </button>
                    <div className="run-actions">
                        {['START', 'PAUSE'].map((action) => (
                            <button
                                className={runState === action ? 'active' : ''}
                                onClick={() => runCommand(action)}
                                key={action}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </aside>
            </div>
            {selectedMessage && (
                <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
            )}
            {showLimitWarning && <LimitWarningModal onClose={() => setShowLimitWarning(false)} />}
        </main>
    );
}

function MiniSpark({ value, tone }: { value: number; tone: 'green' | 'yellow' }) {
    const [values, setValues] = useState<number[]>([]);
    useEffect(() => setValues((current) => [...current.slice(-18), value]), [value]);
    const min = Math.min(...values, value);
    const max = Math.max(...values, value);
    return (
        <div className={`live-spark ${tone}`}>
            {values.map((item, index) => (
                <i
                    key={index}
                    style={{ height: `${6 + ((item - min) / Math.max(max - min, 0.001)) * 20}px` }}
                />
            ))}
        </div>
    );
}

function MessageModal({ message, onClose }: { message: ConsoleMessage; onClose: () => void }) {
    return (
        <div className="message-modal-backdrop" role="presentation">
            <section
                className="message-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="message-title"
            >
                <button
                    className="message-modal-close"
                    onClick={onClose}
                    aria-label="Close message"
                >
                    ×
                </button>
                <header>
                    <span className={message.tone}>{message.time} EVENT</span>
                    <h2 id="message-title">{message.title}</h2>
                </header>
                <div className="message-detail-grid">
                    <label>
                        Source PV<strong>{message.source}</strong>
                    </label>
                    <label>
                        Current value<strong>{message.value}</strong>
                    </label>
                    <label>
                        State
                        <strong>
                            {message.tone === 'danger'
                                ? 'UNACKNOWLEDGED'
                                : message.tone === 'warning'
                                  ? 'ACTIVE'
                                  : 'INFORMATION'}
                        </strong>
                    </label>
                    <label>
                        Operator<strong>m.chen</strong>
                    </label>
                </div>
                <article>
                    <h3>Event detail</h3>
                    <p>{message.detail}</p>
                    <p>
                        The event was produced by the live simulated BL-7A beamline and reflects the
                        values shown on the console at the time it was generated.
                    </p>
                </article>
                <footer>
                    <button onClick={onClose}>ACKNOWLEDGE</button>
                    <button onClick={onClose}>CLOSE</button>
                </footer>
            </section>
        </div>
    );
}

function LimitWarningModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="limit-warning-backdrop" role="presentation">
            <section
                className="limit-warning-modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="limit-warning-title"
            >
                <button
                    className="limit-warning-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Close warning"
                >
                    ×
                </button>
                <div className="limit-warning-icon" aria-hidden="true">
                    ⚠
                </div>
                <h2 id="limit-warning-title">
                    Warning: cannot move mono to specific position. Position is outside of allowed
                    limits
                </h2>
                <p>
                    Allowed position: {MONO_ANGLE_MIN}° to {MONO_ANGLE_MAX}°
                </p>
                <button className="limit-warning-action" type="button" onClick={onClose}>
                    ACKNOWLEDGE
                </button>
            </section>
        </div>
    );
}
