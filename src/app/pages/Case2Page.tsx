import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Home } from 'lucide-react';

import PlotlyHeatmap from '@/components/PlotlyHeatmap';
import PlotlyScatter from '@/components/PlotlyScatter';
import {
    DETECTOR_CHOICES,
    MOTOR_CHOICES,
    PRESET_HISTORY,
    bestPoint,
    buildAcquisitionSurface,
    buildDetectorFrame,
    buildRunId,
    buildScanPoints,
    type RunRecord,
    type ScanPoint,
    type ScanSettings,
} from './case2ScanSim';

import './Case2Page.css';

type LeftTab = 'run' | 'history';

/** Which run the right-hand views are showing. */
type Selection = { kind: 'live' } | { kind: 'history'; runId: string };

/**
 * The form holds raw strings so a field can be genuinely empty. Several start
 * blank, which is what makes the vague "fill in all required inputs" message
 * reachable.
 */
type FormValues = {
    motorX: string;
    motorY: string;
    detector: string;
    xStart: string;
    xStop: string;
    yStart: string;
    yStop: string;
    points: string;
    exposureSeconds: string;
};

const EMPTY_FORM: FormValues = {
    motorX: '',
    motorY: 'sample_y',
    detector: '',
    xStart: '-2',
    xStop: '2',
    yStart: '-2',
    yStop: '2',
    points: '24',
    exposureSeconds: '',
};

const STREAM_INTERVAL_MS = 220;

/**
 * Fresh object per render on purpose: react-plotly.js mutates the layout it is
 * given, so a shared constant would keep Plotly's own computed width/height and
 * override the measured container size on every later render.
 */
function plotLayout(darkBackground: boolean) {
    return {
        showlegend: true,
        legend: { orientation: 'h' as const, x: 0, y: 1.14 },
        margin: { l: 55, r: 20, t: 28, b: 46 },
        ...(darkBackground ? { plot_bgcolor: '#000000', paper_bgcolor: '#000000' } : {}),
    };
}

function formatNumber(value: number, digits = 2) {
    return value.toFixed(digits);
}

function stampNow() {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, '0');
    return (
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    );
}

/** Every field must be filled in and every number must parse. */
function toSettings(values: FormValues): ScanSettings | null {
    const numbers = {
        xStart: Number(values.xStart),
        xStop: Number(values.xStop),
        yStart: Number(values.yStart),
        yStop: Number(values.yStop),
        points: Number(values.points),
        exposureSeconds: Number(values.exposureSeconds),
    };
    const blank = Object.values(values).some((value) => value.trim() === '');
    const unparsed = Object.values(numbers).some((value) => !Number.isFinite(value));
    if (blank || unparsed) return null;
    if (numbers.points < 2 || numbers.exposureSeconds <= 0) return null;
    return {
        motorX: values.motorX,
        motorY: values.motorY,
        detector: values.detector,
        ...numbers,
    };
}

export default function Case2Page() {
    const [tab, setTab] = useState<LeftTab>('run');
    const [values, setValues] = useState<FormValues>(EMPTY_FORM);
    const [formMessage, setFormMessage] = useState('');
    const [history, setHistory] = useState<RunRecord[]>(PRESET_HISTORY);
    const [liveRun, setLiveRun] = useState<RunRecord | null>(null);
    const [acquiredCount, setAcquiredCount] = useState(0);
    const [running, setRunning] = useState(false);
    const [selection, setSelection] = useState<Selection>({ kind: 'live' });
    const nextSeed = useRef(Math.floor(Math.random() * 100000) + 1);

    // Advances the live run one acquisition at a time at the requested exposure.
    useEffect(() => {
        if (!running || liveRun === null) return;
        const total = liveRun.points.length;
        if (acquiredCount >= total) {
            setRunning(false);
            const finished: RunRecord = { ...liveRun, status: 'complete' };
            setLiveRun(finished);
            setHistory((current) => [finished, ...current]);
            return;
        }
        const perPoint = Math.min(1200, Math.max(160, liveRun.settings.exposureSeconds * 520));
        const timer = setTimeout(() => setAcquiredCount((count) => count + 1), perPoint);
        return () => clearTimeout(timer);
    }, [acquiredCount, liveRun, running]);

    const shownRun = useMemo(() => {
        if (selection.kind === 'history') {
            return history.find((run) => run.id === selection.runId) ?? null;
        }
        return liveRun;
    }, [history, liveRun, selection]);

    const isLiveView = selection.kind === 'live';
    const shownPoints = useMemo(() => {
        if (shownRun === null) return [];
        return isLiveView ? shownRun.points.slice(0, acquiredCount) : shownRun.points;
    }, [acquiredCount, isLiveView, shownRun]);

    const latestPoint = shownPoints.length > 0 ? shownPoints[shownPoints.length - 1] : null;
    const shownSettings = shownRun?.settings ?? null;

    const surface = useMemo(
        () => (shownSettings ? buildAcquisitionSurface(shownSettings, shownPoints) : null),
        [shownPoints, shownSettings],
    );

    const best = bestPoint(shownPoints);

    const motorTraces = useMemo(
        () => [
            {
                x: shownPoints.map((point) => point.index + 1),
                y: shownPoints.map((point) => point.x),
                type: 'scatter' as const,
                mode: 'lines+markers' as const,
                name: shownSettings?.motorX ?? 'motor 1',
                line: { color: '#1f6feb' },
                marker: { color: '#1f6feb', size: 6 },
            },
            {
                x: shownPoints.map((point) => point.index + 1),
                y: shownPoints.map((point) => point.y),
                type: 'scatter' as const,
                mode: 'lines+markers' as const,
                name: shownSettings?.motorY ?? 'motor 2',
                line: { color: '#d9822b' },
                marker: { color: '#d9822b', size: 6 },
            },
        ],
        [shownPoints, shownSettings],
    );

    const suggestionTraces = useMemo(
        () =>
            surface === null
                ? []
                : [
                      {
                          x: surface.x,
                          y: surface.y,
                          z: surface.z,
                          type: 'contour' as const,
                          colorscale: 'Viridis' as const,
                          contours: { coloring: 'heatmap' as const },
                          showscale: false,
                          hoverinfo: 'skip' as const,
                          name: 'Expected value',
                      },
                      {
                          x: shownPoints.map((point) => point.x),
                          y: shownPoints.map((point) => point.y),
                          type: 'scatter' as const,
                          mode: 'markers' as const,
                          name: 'Measured',
                          marker: {
                              color: 'rgba(255,255,255,0.85)',
                              size: 6,
                              line: { color: '#1b2430', width: 1 },
                          },
                      },
                      {
                          x: [surface.suggestion.x],
                          y: [surface.suggestion.y],
                          type: 'scatter' as const,
                          mode: 'markers' as const,
                          name: 'Suggested next',
                          marker: {
                              color: '#ff4d6d',
                              size: 15,
                              symbol: 'x' as const,
                              line: { color: '#ffffff', width: 1.5 },
                          },
                      },
                  ],
        [shownPoints, surface],
    );

    function startRun(event: FormEvent) {
        event.preventDefault();
        const settings = toSettings(values);
        if (settings === null) {
            setFormMessage('please fill in all required inputs before running');
            return;
        }
        setFormMessage('');
        const seed = nextSeed.current++;
        setLiveRun({
            id: buildRunId(seed),
            startedAt: stampNow(),
            status: 'running',
            settings,
            points: buildScanPoints(settings, seed),
            seed,
        });
        setAcquiredCount(0);
        setRunning(true);
        setSelection({ kind: 'live' });
    }

    function abortRun() {
        if (liveRun === null) return;
        setRunning(false);
        const stopped: RunRecord = {
            ...liveRun,
            status: 'aborted',
            points: liveRun.points.slice(0, acquiredCount),
        };
        setLiveRun(stopped);
        setHistory((current) => [stopped, ...current]);
    }

    // The detector panel takes up no space at all until there is a frame to
    // draw, so the whole right-hand column jumps the moment a run starts or a
    // history entry is picked.
    const hasStream = latestPoint !== null && shownSettings !== null;

    return (
        <main className="case-two-page">
            <header className="case-two-header">
                <div className="case-two-header-title">
                    <a className="case-two-home-link" href="/" title="Back to home">
                        <span>Bad UX Detective</span>
                        <Home size={15} strokeWidth={2.5} aria-hidden="true" />
                    </a>
                    <h1>Case 2 — Adaptive Scan Console</h1>
                </div>
                <RunStatusBanner
                    run={shownRun}
                    isLiveView={isLiveView}
                    running={running}
                    acquired={shownPoints.length}
                />
            </header>

            <div className="case-two-body">
                <section className="case-two-left" aria-label="Scan controls">
                    <div className="case-two-tabs" role="tablist" aria-label="Scan panel">
                        {(['run', 'history'] as const).map((value) => (
                            <button
                                key={value}
                                type="button"
                                role="tab"
                                id={`case-two-tab-${value}`}
                                aria-selected={tab === value}
                                aria-controls={`case-two-panel-${value}`}
                                className={tab === value ? 'is-active' : ''}
                                onClick={() => setTab(value)}
                            >
                                {value === 'run' ? 'Run' : 'History'}
                            </button>
                        ))}
                    </div>

                    {tab === 'run' ? (
                        <RunPanel
                            values={values}
                            onChange={setValues}
                            onSubmit={startRun}
                            onAbort={abortRun}
                            running={running}
                            message={formMessage}
                        />
                    ) : (
                        <HistoryPanel
                            history={history}
                            selectedId={selection.kind === 'history' ? selection.runId : null}
                            onSelect={(runId) => setSelection({ kind: 'history', runId })}
                        />
                    )}
                </section>

                <section className="case-two-right" aria-label="Scan views">
                    {hasStream && (
                        <article className="case-two-view case-two-view--stream">
                            <header>
                                <h2>Detector stream</h2>
                                <span className="case-two-view-meta">
                                    {shownSettings.detector}
                                    {isLiveView && running ? ' · streaming' : ' · idle'}
                                </span>
                            </header>
                            <div className="case-two-plot">
                                <div className="case-two-plot-inner">
                                    <DetectorStream
                                        settings={shownSettings}
                                        point={latestPoint}
                                        streaming={isLiveView && running}
                                    />
                                </div>
                            </div>
                        </article>
                    )}

                    <article className="case-two-view case-two-view--suggestion">
                        <header>
                            <h2>Next best position</h2>
                            <span className="case-two-view-meta">
                                {surface === null || shownSettings === null
                                    ? 'awaiting first acquisition'
                                    : `${shownSettings.motorX} ${formatNumber(surface.suggestion.x)}, ` +
                                      `${shownSettings.motorY} ${formatNumber(surface.suggestion.y)}`}
                            </span>
                        </header>
                        <div className="case-two-plot">
                            <div className="case-two-plot-inner">
                                {surface === null || shownSettings === null ? (
                                    <p className="case-two-empty">
                                        The suggestion surface appears once the scan has measured
                                        its first point.
                                    </p>
                                ) : (
                                    <PlotlyScatter
                                        className="case-two-contour"
                                        xAxisTitle={shownSettings.motorX}
                                        yAxisTitle={shownSettings.motorY}
                                        data={suggestionTraces}
                                        layout={plotLayout(false)}
                                    />
                                )}
                            </div>
                        </div>
                    </article>

                    <article className="case-two-view case-two-view--motors">
                        <header>
                            <h2>Motor positions</h2>
                            <span className="case-two-view-meta">
                                {shownPoints.length} point{shownPoints.length === 1 ? '' : 's'}
                            </span>
                        </header>
                        <div className="case-two-plot">
                            <div className="case-two-plot-inner">
                                <PlotlyScatter
                                    className="case-two-scatter"
                                    xAxisTitle="Acquisition"
                                    yAxisTitle="Position"
                                    data={motorTraces}
                                    layout={plotLayout(true)}
                                />
                            </div>
                        </div>
                    </article>
                </section>
            </div>

            <footer className="case-two-footer">
                <span>
                    Best so far:{' '}
                    {best === null || shownSettings === null
                        ? '—'
                        : `${formatNumber(best.intensity, 3)} at ${shownSettings.motorX} ` +
                          `${formatNumber(best.x)}, ${shownSettings.motorY} ${formatNumber(best.y)}`}
                </span>
                <span>Simulated data — no beamline is connected.</span>
            </footer>
        </main>
    );
}

/**
 * Owns the stream tick itself, so a 220ms refresh does not re-render the page.
 */
function DetectorStream({
    settings,
    point,
    streaming,
}: {
    settings: ScanSettings;
    point: ScanPoint | null;
    streaming: boolean;
}) {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (!streaming) return;
        const timer = setInterval(() => setTick((current) => current + 1), STREAM_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [streaming]);

    const frame = useMemo(
        () => buildDetectorFrame(settings, point, streaming ? tick : 0),
        [point, settings, streaming, tick],
    );

    return (
        <PlotlyHeatmap
            array={frame}
            colorScale="Viridis"
            showScale
            lockPlotHeightToParent
            className="case-two-heatmap"
        />
    );
}

function RunStatusBanner({
    run,
    isLiveView,
    running,
    acquired,
}: {
    run: RunRecord | null;
    isLiveView: boolean;
    running: boolean;
    acquired: number;
}) {
    if (run === null) {
        return (
            <p className="case-two-status" role="status">
                No run loaded. Set up a scan and press Run.
            </p>
        );
    }
    const label = isLiveView ? (running ? 'Running' : run.status) : `Replaying ${run.status}`;
    return (
        <p className="case-two-status" role="status">
            <span
                className={`case-two-status-dot case-two-status-dot--${running ? 'running' : run.status}`}
            />
            <strong>{label}</strong>
            <code>{run.id}</code>
            <span>
                {acquired} / {run.points.length} points
            </span>
        </p>
    );
}

/**
 * One ungrouped vertical stack of fields. The Run button sits at the end of
 * that stack instead of a pinned footer, so it scrolls out of sight.
 */
function RunPanel({
    values,
    onChange,
    onSubmit,
    onAbort,
    running,
    message,
}: {
    values: FormValues;
    onChange: (values: FormValues) => void;
    onSubmit: (event: FormEvent) => void;
    onAbort: () => void;
    running: boolean;
    message: string;
}) {
    function update<Key extends keyof FormValues>(key: Key, value: string) {
        onChange({ ...values, [key]: value });
    }

    return (
        <form
            className="case-two-form"
            id="case-two-panel-run"
            role="tabpanel"
            aria-labelledby="case-two-tab-run"
            onSubmit={onSubmit}
        >
            <fieldset className="case-two-radio-group">
                <legend>Motor 1</legend>
                {MOTOR_CHOICES.map((motor) => (
                    <label key={motor}>
                        <input
                            type="radio"
                            name="motorX"
                            value={motor}
                            checked={values.motorX === motor}
                            onChange={(event) => update('motorX', event.target.value)}
                        />
                        {motor}
                    </label>
                ))}
            </fieldset>

            <label>
                Start
                <input
                    type="number"
                    step="0.1"
                    value={values.xStart}
                    onChange={(event) => update('xStart', event.target.value)}
                />
            </label>
            <label>
                Stop
                <input
                    type="number"
                    step="0.1"
                    value={values.xStop}
                    onChange={(event) => update('xStop', event.target.value)}
                />
            </label>

            <label>
                Motor 2
                <select
                    value={values.motorY}
                    onChange={(event) => update('motorY', event.target.value)}
                >
                    <option value="">—</option>
                    {MOTOR_CHOICES.map((motor) => (
                        <option key={motor} value={motor}>
                            {motor}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Start
                <input
                    type="number"
                    step="0.1"
                    value={values.yStart}
                    onChange={(event) => update('yStart', event.target.value)}
                />
            </label>
            <label>
                Stop
                <input
                    type="number"
                    step="0.1"
                    value={values.yStop}
                    onChange={(event) => update('yStop', event.target.value)}
                />
            </label>

            <label>
                Detector
                <select
                    value={values.detector}
                    onChange={(event) => update('detector', event.target.value)}
                >
                    <option value="">—</option>
                    {DETECTOR_CHOICES.map((detector) => (
                        <option key={detector} value={detector}>
                            {detector}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Number of points
                <input
                    type="number"
                    step="1"
                    value={values.points}
                    onChange={(event) => update('points', event.target.value)}
                />
            </label>
            <label>
                Exposure time (s)
                <input
                    type="number"
                    step="0.05"
                    value={values.exposureSeconds}
                    onChange={(event) => update('exposureSeconds', event.target.value)}
                />
            </label>

            {running && (
                <button type="button" className="case-two-abort" onClick={onAbort}>
                    Abort
                </button>
            )}
            <button type="submit" className="case-two-run" disabled={running}>
                {running ? 'Running…' : 'Run'}
            </button>
            {message !== '' && (
                <p className="case-two-form-message" role="status">
                    {message}
                </p>
            )}
        </form>
    );
}

/** Run ids and nothing else: no dates, no devices, no point counts, no hint. */
function HistoryPanel({
    history,
    selectedId,
    onSelect,
}: {
    history: RunRecord[];
    selectedId: string | null;
    onSelect: (runId: string) => void;
}) {
    return (
        <div
            className="case-two-history"
            id="case-two-panel-history"
            role="tabpanel"
            aria-labelledby="case-two-tab-history"
        >
            <ul className="case-two-history-list">
                {history.map((run) => (
                    <li key={run.id}>
                        <button
                            type="button"
                            className={selectedId === run.id ? 'is-selected' : ''}
                            aria-pressed={selectedId === run.id}
                            onClick={() => onSelect(run.id)}
                        >
                            <code>{run.id}</code>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
