import { useEffect, useState } from 'react';

const samples = [
    {
        file: 'scan_0042.csv',
        sample: 'Ni reference foil',
        run: 'RUN-0042',
        time: '17 Sep 2026, 09:42 UTC',
        experiment: 'Nickel calibration',
        signal: 'Fluorescence',
    },
    {
        file: 'scan_0043.csv',
        sample: 'Ni catalyst · after heating',
        run: 'RUN-0043',
        time: '17 Sep 2026, 10:08 UTC',
        experiment: 'Catalyst temperature series',
        signal: 'Transmission',
    },
];

function SampleIdentity({ improved }: { improved: boolean }) {
    const [selected, setSelected] = useState(0);
    const sample = samples[selected];
    return (
        <section className="pattern-demo science-demo" aria-label="Sample identity example">
            <h2>Scan Results</h2>
            <div className="science-actions">
                {samples.map((item, index) => (
                    <button
                        key={item.run}
                        aria-pressed={selected === index}
                        onClick={() => setSelected(index)}
                    >
                        {improved ? item.sample : item.file}
                    </button>
                ))}
            </div>
            <div className="science-card">
                <h3>{improved ? sample.sample : sample.file}</h3>
                {improved && (
                    <dl className="science-details">
                        <div>
                            <dt>Run ID</dt>
                            <dd>{sample.run}</dd>
                        </div>
                        <div>
                            <dt>Acquired</dt>
                            <dd>{sample.time}</dd>
                        </div>
                        <div>
                            <dt>Experiment</dt>
                            <dd>{sample.experiment}</dd>
                        </div>
                        <div>
                            <dt>Signal</dt>
                            <dd>{sample.signal}</dd>
                        </div>
                        <div>
                            <dt>Source file</dt>
                            <dd>{sample.file}</dd>
                        </div>
                    </dl>
                )}
                <p>240 measurements · Acquisition complete</p>
            </div>
        </section>
    );
}

export function UnclearSampleIdentity() {
    return <SampleIdentity improved={false} />;
}
export function ClearSampleIdentity() {
    return <SampleIdentity improved />;
}

function AnalysisContext({ improved }: { improved: boolean }) {
    const [view, setView] = useState('Chart');
    const [zoomed, setZoomed] = useState(false);
    const [channel, setChannel] = useState('Fluorescence');
    function switchView(next: string) {
        if (next === view) return;
        setView(next);
        if (!improved) {
            setZoomed(false);
            setChannel('Fluorescence');
        }
    }
    return (
        <section className="pattern-demo science-demo" aria-label="Analysis context example">
            <h2>Spectrum Explorer</h2>
            <p>Zoom into the peak, choose a channel, then switch to the table and back.</p>
            <div className="science-actions" aria-label="Analysis views">
                {['Chart', 'Table'].map((name) => (
                    <button
                        key={name}
                        aria-pressed={view === name}
                        onClick={() => switchView(name)}
                    >
                        {name}
                    </button>
                ))}
            </div>
            <label>
                Signal channel
                <select value={channel} onChange={(event) => setChannel(event.target.value)}>
                    <option>Fluorescence</option>
                    <option>Transmission</option>
                </select>
            </label>
            <div className="science-actions">
                <button onClick={() => setZoomed(true)} disabled={zoomed}>
                    Zoom to Peak
                </button>
                <button onClick={() => setZoomed(false)} disabled={!zoomed}>
                    Reset Zoom
                </button>
            </div>
            <p className="science-context" role="status">
                {channel} · Energy range: {zoomed ? '8.30–8.40' : '8.00–9.00'} keV
            </p>
            {view === 'Chart' ? (
                <svg
                    className="science-spectrum"
                    viewBox="0 0 360 190"
                    role="img"
                    aria-label={`${channel} spectrum, ${zoomed ? 'zoomed to the peak' : 'full energy range'}`}
                >
                    <path d="M35 15V150H345" fill="none" stroke="#8793a1" />
                    <path
                        d={
                            zoomed
                                ? 'M35 143L67 134L98 116L129 66L160 29L191 48L222 95L253 124L284 136L315 142L345 144'
                                : 'M35 142L85 140L135 143L172 134L184 107L195 30L206 102L218 135L265 143L305 140L345 143'
                        }
                        fill="none"
                        stroke={channel === 'Fluorescence' ? '#1764a1' : '#7846a3'}
                        strokeWidth="3"
                    />
                    <text x="35" y="171" fontSize="12">
                        {zoomed ? '8.30' : '8.00'}
                    </text>
                    <text x="316" y="171" fontSize="12">
                        {zoomed ? '8.40' : '9.00'}
                    </text>
                    <text x="190" y="187" textAnchor="middle" fontSize="12">
                        Energy (keV)
                    </text>
                </svg>
            ) : (
                <table className="science-table">
                    <caption>
                        {channel} measurements · {zoomed ? 'Peak region' : 'Full range'}
                    </caption>
                    <thead>
                        <tr>
                            <th>Energy (keV)</th>
                            <th>Signal (a.u.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(zoomed ? [8.3, 8.35, 8.4] : [8.0, 8.35, 9.0]).map((energy, index) => (
                            <tr key={energy}>
                                <td>{energy.toFixed(2)}</td>
                                <td>
                                    {(index === 1
                                        ? channel === 'Fluorescence'
                                            ? 1.0
                                            : 0.8
                                        : 0.12
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export function LostAnalysisContext() {
    return <AnalysisContext improved={false} />;
}
export function PreservedAnalysisContext() {
    return <AnalysisContext improved />;
}

function AcquisitionCost({ improved }: { improved: boolean }) {
    const [points, setPoints] = useState('100');
    const [exposure, setExposure] = useState('0.5');
    const [repeats, setRepeats] = useState('3');
    const [started, setStarted] = useState(false);
    const valid =
        Number.isInteger(Number(points)) &&
        Number(points) > 0 &&
        Number.isFinite(Number(exposure)) &&
        Number(exposure) > 0 &&
        Number.isInteger(Number(repeats)) &&
        Number(repeats) > 0;
    const frames = Number(points) * Number(repeats);
    const duration = frames * (Number(exposure) + 0.1);
    const estimates = (
        <div className="science-estimate" aria-live="polite">
            <h3>Estimated acquisition cost</h3>
            {valid ? (
                <>
                    <dl className="science-details">
                        <div>
                            <dt>Measurements</dt>
                            <dd>{frames.toLocaleString('en-US')}</dd>
                        </div>
                        <div>
                            <dt>Runtime</dt>
                            <dd>{(duration / 60).toFixed(1)} minutes</dd>
                        </div>
                        <div>
                            <dt>Data volume</dt>
                            <dd>{((frames * 4) / 1024).toFixed(2)} GiB</dd>
                        </div>
                    </dl>
                    <small>
                        Estimate assumes 0.1 s overhead and 4 MiB per measurement. Actual time and
                        size may vary.
                    </small>
                </>
            ) : (
                <p>
                    Enter positive values and whole numbers for points and repeats to calculate an
                    estimate.
                </p>
            )}
        </div>
    );
    return (
        <section className="pattern-demo science-demo" aria-label="Acquisition cost example">
            <form
                className="bad-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    if (valid) setStarted(true);
                }}
            >
                <h2>Plan an Energy Scan</h2>
                <label>
                    Scan points
                    <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={points}
                        disabled={started}
                        onChange={(event) => setPoints(event.target.value)}
                    />
                </label>
                <label>
                    Exposure per point (s)
                    <input
                        type="number"
                        min="0.01"
                        step="any"
                        required
                        value={exposure}
                        disabled={started}
                        onChange={(event) => setExposure(event.target.value)}
                    />
                </label>
                <label>
                    Repeats
                    <input
                        type="number"
                        min="1"
                        step="1"
                        required
                        value={repeats}
                        disabled={started}
                        onChange={(event) => setRepeats(event.target.value)}
                    />
                </label>
                {(improved || started) && estimates}
                <button disabled={started || (improved && !valid)}>Start Scan</button>
                {started && (
                    <>
                        <p role="status">Demo scan started: {frames} measurements scheduled.</p>
                        <button type="button" onClick={() => setStarted(false)}>
                            Cancel Demo Scan
                        </button>
                    </>
                )}
            </form>
        </section>
    );
}

export function HiddenAcquisitionCost() {
    return <AcquisitionCost improved={false} />;
}
export function VisibleAcquisitionCost() {
    return <AcquisitionCost improved />;
}

function LiveReading({ improved }: { improved: boolean }) {
    const [connected, setConnected] = useState(true);
    const [now, setNow] = useState(() => Date.now());
    const [reading, setReading] = useState(() => ({ value: 295.12, time: Date.now() }));
    useEffect(() => {
        const interval = window.setInterval(() => {
            const time = Date.now();
            setNow(time);
            if (connected) setReading({ value: 295.12 + Math.sin(time / 1000) * 0.02, time });
        }, 1000);
        return () => window.clearInterval(interval);
    }, [connected]);
    function toggleConnection() {
        if (!connected) {
            const time = Date.now();
            setReading({ value: 295.12, time });
            setNow(time);
        }
        setConnected((current) => !current);
    }
    return (
        <section className="pattern-demo science-demo" aria-label="Data freshness example">
            <h2>Sample Temperature</h2>
            <div className={`science-card${improved && !connected ? ' science-stale' : ''}`}>
                <p className="science-reading-state" role="status">
                    {improved && !connected ? 'Stale · Disconnected' : 'Live'}
                </p>
                <p className="science-reading">
                    {reading.value.toFixed(2)} <span>K</span>
                </p>
                {improved && (
                    <>
                        <p>{connected ? 'Current reading' : 'Last known temperature'}</p>
                        <p>
                            Last updated {Math.max(0, Math.floor((now - reading.time) / 1000))}{' '}
                            seconds ago
                        </p>
                        {!connected && <p>Connection lost. This value is no longer updating.</p>}
                    </>
                )}
            </div>
            <div className="science-simulation">
                <p>Demo control: interrupt the data connection to inspect the reading.</p>
                <button onClick={toggleConnection}>
                    {connected ? 'Simulate Connection Loss' : 'Reconnect'}
                </button>
            </div>
        </section>
    );
}

export function StaleDataLooksLive() {
    return <LiveReading improved={false} />;
}
export function ClearlyStaleData() {
    return <LiveReading improved />;
}

function MeasurementPrecision({ improved }: { improved: boolean }) {
    const [repeat, setRepeat] = useState(false);
    const measurements = [
        {
            name: 'Temperature',
            raw: repeat ? '295.124031829' : '295.123847291',
            rounded: '295.12',
            uncertainty: '0.02',
            unit: 'K',
        },
        {
            name: 'Peak energy',
            raw: repeat ? '8.333745102' : '8.333742891',
            rounded: '8.334',
            uncertainty: '0.005',
            unit: 'keV',
        },
        {
            name: 'Sample thickness',
            raw: repeat ? '0.127388920' : '0.127384612',
            rounded: '0.127',
            uncertainty: '0.003',
            unit: 'mm',
        },
    ];
    return (
        <section className="pattern-demo science-demo" aria-label="Measurement precision example">
            <h2>Measurement Summary</h2>
            <dl className="science-measurements">
                {measurements.map((measurement) => (
                    <div key={measurement.name}>
                        <dt>{measurement.name}</dt>
                        <dd>
                            {improved ? (
                                <>
                                    {measurement.rounded}{' '}
                                    <span className="science-uncertainty">
                                        ± {measurement.uncertainty}
                                    </span>
                                </>
                            ) : (
                                measurement.raw
                            )}{' '}
                            {measurement.unit}
                        </dd>
                    </div>
                ))}
            </dl>
            {improved && (
                <p>
                    Values are rounded to the decimal place of their uncertainty. ± indicates
                    standard uncertainty (1σ) for these illustrative measurements.
                </p>
            )}
            <button onClick={() => setRepeat((current) => !current)}>Repeat Measurement</button>
            <p role="status">
                {repeat ? 'Repeat measurement displayed.' : 'Initial measurement displayed.'}
            </p>
        </section>
    );
}

export function FalsePrecision() {
    return <MeasurementPrecision improved={false} />;
}
export function MeaningfulPrecision() {
    return <MeasurementPrecision improved />;
}
