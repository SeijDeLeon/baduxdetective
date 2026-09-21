import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router';

import PlotlyHeatmap from '@/components/PlotlyHeatmap';
import PlotlyScatter from '@/components/PlotlyScatter';
import {
    DEFAULT_SETTINGS,
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

import './Case2SolutionPage.css';

type LeftTab = 'run' | 'history';

/** Which run the right-hand views are showing. */
type Selection = { kind: 'live' } | { kind: 'history'; runId: string };

const STREAM_INTERVAL_MS = 220;

/**
 * Fresh object per render on purpose: react-plotly.js mutates the layout it is
 * given, so a shared constant would keep Plotly's own computed width/height and
 * override the measured container size on every later render.
 */
function plotLayout() {
    return {
        showlegend: true,
        legend: { orientation: 'h' as const, x: 0, y: 1.14 },
        margin: { l: 55, r: 20, t: 28, b: 46 },
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

export default function Case2SolutionPage() {
    const [tab, setTab] = useState<LeftTab>('run');
    const [settings, setSettings] = useState<ScanSettings>(DEFAULT_SETTINGS);
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
    const shownSettings = shownRun?.settings ?? settings;

    const surface = useMemo(
        () => buildAcquisitionSurface(shownSettings, shownPoints),
        [shownPoints, shownSettings],
    );

    const best = bestPoint(shownPoints);

    // Memoised so the plots keep their identity between renders: PlotlyScatter is
    // memoised, and rebuilding these arrays every render would defeat that.
    const motorTraces = useMemo(
        () => [
            {
                x: shownPoints.map((point) => point.index + 1),
                y: shownPoints.map((point) => point.x),
                type: 'scatter' as const,
                mode: 'lines+markers' as const,
                name: shownSettings.motorX,
                line: { color: '#1f6feb' },
                marker: { color: '#1f6feb', size: 6 },
            },
            {
                x: shownPoints.map((point) => point.index + 1),
                y: shownPoints.map((point) => point.y),
                type: 'scatter' as const,
                mode: 'lines+markers' as const,
                name: shownSettings.motorY,
                line: { color: '#d9822b' },
                marker: { color: '#d9822b', size: 6 },
            },
        ],
        [shownPoints, shownSettings.motorX, shownSettings.motorY],
    );

    const suggestionTraces = useMemo(
        () => [
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
        const seed = nextSeed.current++;
        const run: RunRecord = {
            id: buildRunId(seed),
            startedAt: stampNow(),
            status: 'running',
            settings,
            points: buildScanPoints(settings, seed),
            seed,
        };
        setLiveRun(run);
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

    function openHistoryRun(runId: string) {
        setSelection({ kind: 'history', runId });
    }

    return (
        <main className="case-two-solution-page">
            <header className="case-two-solution-header">
                <div className="case-two-solution-header-title">
                    <Link className="case-two-solution-home-link" to="/" title="Back to home">
                        <span>Bad UX Detective</span>
                        <Home size={15} strokeWidth={2.5} aria-hidden="true" />
                    </Link>
                    <h1>Case 2 — Adaptive Scan Console (solution)</h1>
                </div>
                <RunStatusBanner
                    run={shownRun}
                    isLiveView={isLiveView}
                    running={running}
                    acquired={shownPoints.length}
                />
            </header>

            <div className="case-two-solution-body">
                <section className="case-two-solution-left" aria-label="Scan controls">
                    <div className="case-two-solution-tabs" role="tablist" aria-label="Scan panel">
                        {(['run', 'history'] as const).map((value) => (
                            <button
                                key={value}
                                type="button"
                                role="tab"
                                id={`case-two-solution-tab-${value}`}
                                aria-selected={tab === value}
                                aria-controls={`case-two-solution-panel-${value}`}
                                className={tab === value ? 'is-active' : ''}
                                onClick={() => setTab(value)}
                            >
                                {value === 'run' ? 'Run' : 'History'}
                            </button>
                        ))}
                    </div>

                    {tab === 'run' ? (
                        <RunPanel
                            settings={settings}
                            onChange={setSettings}
                            onSubmit={startRun}
                            onAbort={abortRun}
                            running={running}
                        />
                    ) : (
                        <HistoryPanel
                            history={history}
                            selectedId={selection.kind === 'history' ? selection.runId : null}
                            onSelect={openHistoryRun}
                            onReturnToLive={() => setSelection({ kind: 'live' })}
                            hasLiveRun={liveRun !== null}
                        />
                    )}
                </section>

                <section className="case-two-solution-right" aria-label="Scan views">
                    <article className="case-two-solution-view case-two-solution-view--stream">
                        <header>
                            <h2>Detector stream</h2>
                            <span className="case-two-solution-view-meta">
                                {shownSettings.detector}
                                {isLiveView && running ? ' · streaming' : ' · idle'}
                            </span>
                        </header>
                        <div className="case-two-solution-plot">
                            <div className="case-two-solution-plot-inner">
                                <DetectorStream
                                    settings={shownSettings}
                                    point={latestPoint}
                                    streaming={isLiveView && running}
                                />
                            </div>
                        </div>
                    </article>

                    <article className="case-two-solution-view case-two-solution-view--motors">
                        <header>
                            <h2>Motor positions</h2>
                            <span className="case-two-solution-view-meta">
                                {shownPoints.length} point{shownPoints.length === 1 ? '' : 's'}
                            </span>
                        </header>
                        <div className="case-two-solution-plot">
                            <div className="case-two-solution-plot-inner">
                                <PlotlyScatter
                                    className="case-two-solution-scatter"
                                    xAxisTitle="Acquisition"
                                    yAxisTitle="Position"
                                    data={motorTraces}
                                    layout={plotLayout()}
                                />
                            </div>
                        </div>
                    </article>

                    <article className="case-two-solution-view case-two-solution-view--suggestion">
                        <header>
                            <h2>Next best position</h2>
                            <span className="case-two-solution-view-meta">
                                {shownPoints.length === 0
                                    ? 'awaiting first acquisition'
                                    : `${shownSettings.motorX} ${formatNumber(surface.suggestion.x)}, ` +
                                      `${shownSettings.motorY} ${formatNumber(surface.suggestion.y)}`}
                            </span>
                        </header>
                        <div className="case-two-solution-plot">
                            <div className="case-two-solution-plot-inner">
                                {shownPoints.length === 0 ? (
                                    <p className="case-two-solution-empty">
                                        The suggestion surface appears once the scan has measured
                                        its first point.
                                    </p>
                                ) : (
                                    <PlotlyScatter
                                        className="case-two-solution-contour"
                                        xAxisTitle={shownSettings.motorX}
                                        yAxisTitle={shownSettings.motorY}
                                        data={suggestionTraces}
                                        layout={plotLayout()}
                                    />
                                )}
                            </div>
                        </div>
                    </article>
                </section>
            </div>

            <footer className="case-two-solution-footer">
                <span>
                    Best so far:{' '}
                    {best === null
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
 * Owns the stream tick itself. Re-rendering the whole page five times a second
 * starved the acquisition timer, so only this subtree repaints that often.
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
            className="case-two-solution-heatmap"
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
            <p className="case-two-solution-status" role="status">
                No run loaded. Set up a scan and press Run.
            </p>
        );
    }
    const label = isLiveView ? (running ? 'Running' : run.status) : `Replaying ${run.status}`;
    return (
        <p className="case-two-solution-status" role="status">
            <span
                className={`case-two-solution-status-dot case-two-solution-status-dot--${running ? 'running' : run.status}`}
            />
            <strong>{label}</strong>
            <code>{run.id}</code>
            <span>
                {acquired} / {run.points.length} points
            </span>
        </p>
    );
}

function RunPanel({
    settings,
    onChange,
    onSubmit,
    onAbort,
    running,
}: {
    settings: ScanSettings;
    onChange: (settings: ScanSettings) => void;
    onSubmit: (event: FormEvent) => void;
    onAbort: () => void;
    running: boolean;
}) {
    function update<Key extends keyof ScanSettings>(key: Key, value: ScanSettings[Key]) {
        onChange({ ...settings, [key]: value });
    }

    return (
        <form
            className="case-two-solution-form"
            id="case-two-solution-panel-run"
            role="tabpanel"
            aria-labelledby="case-two-solution-tab-run"
            onSubmit={onSubmit}
        >
            <div className="case-two-solution-form-fields">
                <fieldset>
                    <legend>Devices</legend>
                    <label>
                        Motor 1
                        <select
                            value={settings.motorX}
                            onChange={(event) => update('motorX', event.target.value)}
                        >
                            {MOTOR_CHOICES.map((motor) => (
                                <option key={motor} value={motor}>
                                    {motor}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="case-two-solution-field-pair">
                        <label>
                            Start
                            <input
                                type="number"
                                step="0.1"
                                value={settings.xStart}
                                onChange={(event) => update('xStart', Number(event.target.value))}
                            />
                        </label>
                        <label>
                            Stop
                            <input
                                type="number"
                                step="0.1"
                                value={settings.xStop}
                                onChange={(event) => update('xStop', Number(event.target.value))}
                            />
                        </label>
                    </div>
                    <label>
                        Motor 2
                        <select
                            value={settings.motorY}
                            onChange={(event) => update('motorY', event.target.value)}
                        >
                            {MOTOR_CHOICES.map((motor) => (
                                <option key={motor} value={motor}>
                                    {motor}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="case-two-solution-field-pair">
                        <label>
                            Start
                            <input
                                type="number"
                                step="0.1"
                                value={settings.yStart}
                                onChange={(event) => update('yStart', Number(event.target.value))}
                            />
                        </label>
                        <label>
                            Stop
                            <input
                                type="number"
                                step="0.1"
                                value={settings.yStop}
                                onChange={(event) => update('yStop', Number(event.target.value))}
                            />
                        </label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Acquisition</legend>
                    <label>
                        Detector
                        <select
                            value={settings.detector}
                            onChange={(event) => update('detector', event.target.value)}
                        >
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
                            min={2}
                            max={200}
                            step="1"
                            value={settings.points}
                            onChange={(event) => update('points', Number(event.target.value))}
                        />
                    </label>
                    <label>
                        Exposure time (s)
                        <input
                            type="number"
                            min={0.05}
                            max={10}
                            step="0.05"
                            value={settings.exposureSeconds}
                            onChange={(event) =>
                                update('exposureSeconds', Number(event.target.value))
                            }
                        />
                    </label>
                </fieldset>
            </div>

            <div className="case-two-solution-form-actions">
                {running && (
                    <button type="button" className="case-two-solution-abort" onClick={onAbort}>
                        Abort
                    </button>
                )}
                <button type="submit" className="case-two-solution-run" disabled={running}>
                    {running ? 'Running…' : 'Run'}
                </button>
            </div>
        </form>
    );
}

function HistoryPanel({
    history,
    selectedId,
    onSelect,
    onReturnToLive,
    hasLiveRun,
}: {
    history: RunRecord[];
    selectedId: string | null;
    onSelect: (runId: string) => void;
    onReturnToLive: () => void;
    hasLiveRun: boolean;
}) {
    return (
        <div
            className="case-two-solution-history"
            id="case-two-solution-panel-history"
            role="tabpanel"
            aria-labelledby="case-two-solution-tab-history"
        >
            <p className="case-two-solution-history-hint">
                Select a run id to load it into the views on the right.
            </p>
            <ul className="case-two-solution-history-list">
                {history.map((run) => (
                    <li key={run.id}>
                        <button
                            type="button"
                            className={selectedId === run.id ? 'is-selected' : ''}
                            aria-pressed={selectedId === run.id}
                            onClick={() => onSelect(run.id)}
                        >
                            <code>{run.id}</code>
                            <span className="case-two-solution-history-meta">
                                <span
                                    className={`case-two-solution-status-dot case-two-solution-status-dot--${run.status}`}
                                />
                                {run.startedAt} · {run.settings.motorX} × {run.settings.motorY} ·{' '}
                                {run.points.length} pts
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
            {hasLiveRun && selectedId !== null && (
                <button
                    type="button"
                    className="case-two-solution-return-live"
                    onClick={onReturnToLive}
                >
                    Back to current run
                </button>
            )}
        </div>
    );
}
