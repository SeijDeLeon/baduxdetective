import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Trash2, Undo2 } from 'lucide-react';

import PlotlyHeatmap from '@/components/PlotlyHeatmap';
import { heatmapSlices } from './patternHeatmapData';

function Form({
    title,
    children,
    onSubmit,
}: {
    title: string;
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <form className="bad-form" onSubmit={onSubmit}>
            <h2>{title}</h2>
            {children}
        </form>
    );
}

export function ExplicitConfirmation() {
    const [message, setMessage] = useState('');
    const [alternativeMessage, setAlternativeMessage] = useState('');
    const [tooltip, setTooltip] = useState<string | null>(null);
    const tooltipId = useId();
    const alternatives = [
        { label: 'Keep Item', icon: Undo2, result: 'Removal cancelled' },
        { label: 'Remove Item', icon: Trash2, result: 'Item removed' },
    ];
    return (
        <div className="bad-dialog">
            <h2>Remove item from Queue?</h2>
            <h3>Option 1: Text labels</h3>
            <div className="solution-actions">
                <button onClick={() => setMessage('Removal cancelled')}>Keep Item</button>
                <button className="solution-danger" onClick={() => setMessage('Item removed')}>
                    Remove Item
                </button>
            </div>
            <p role="status">{message}</p>
            <div className="solution-confirmation">
                <h3>Option 2: Icons with tooltips</h3>
                <div className="solution-actions">
                    {alternatives.map(({ label, icon: Icon, result }, index) => (
                        <span
                            className="solution-tooltip-action"
                            key={label}
                            onMouseEnter={() => setTooltip(label)}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <button
                                type="button"
                                className={index === 1 ? 'solution-danger' : undefined}
                                aria-label={label}
                                aria-describedby={
                                    tooltip === label ? `${tooltipId}-${index}` : undefined
                                }
                                onFocus={() => setTooltip(label)}
                                onBlur={() => setTooltip(null)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') setTooltip(null);
                                }}
                                onClick={() => setAlternativeMessage(result)}
                            >
                                <Icon size={24} aria-hidden="true" />
                            </button>
                            {tooltip === label && (
                                <span
                                    className="solution-tooltip"
                                    id={`${tooltipId}-${index}`}
                                    role="tooltip"
                                >
                                    {label}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
                <p role="status">{alternativeMessage}</p>
            </div>
        </div>
    );
}

export function DestructiveHierarchy() {
    const [message, setMessage] = useState('Configuration has unsaved changes.');
    const [confirming, setConfirming] = useState(false);
    return (
        <div className="bad-panel">
            <h2>Detector Configuration</h2>
            <label>
                Readout mode
                <select>
                    <option>Fast</option>
                    <option>Low noise</option>
                </select>
            </label>
            <div className="solution-actions">
                <button className="solution-primary" onClick={() => setMessage('Saved')}>
                    Save
                </button>
                <button className="solution-danger" onClick={() => setConfirming(true)}>
                    Delete Configuration
                </button>
            </div>
            {confirming && (
                <div className="solution-confirmation">
                    <p>Delete this configuration? This cannot be undone.</p>
                    <div className="solution-actions">
                        <button onClick={() => setConfirming(false)}>Cancel</button>
                        <button
                            className="solution-danger"
                            onClick={() => {
                                setMessage('Deleted');
                                setConfirming(false);
                            }}
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            )}
            <p role="status">{message}</p>
        </div>
    );
}

export function ConsistentControls() {
    const [message, setMessage] = useState('');
    const controls = [
        { label: 'Position X', value: '2.5', unit: 'mm', action: 'Move X' },
        { label: 'Position Y', value: '1.2', unit: 'mm', action: 'Move Y' },
        { label: 'Position Z', value: '8.0', unit: 'mm', action: 'Move Z' },
        { label: 'Velocity', value: '0.5', unit: 'mm/s', action: 'Set Velocity' },
    ];
    return (
        <div className="bad-form motor-controller-form">
            <h2>Motor Controller</h2>
            {controls.map(({ label, value, unit, action }) => (
                <form
                    className="motor-control-row"
                    key={label}
                    onSubmit={(event) => {
                        event.preventDefault();
                        setMessage(`${label} updated.`);
                    }}
                >
                    <label>
                        {label}
                        <span className="input-with-unit">
                            <input type="number" step="any" required defaultValue={value} />
                            <span>{unit}</span>
                        </span>
                    </label>
                    <button className="solution-primary">{action}</button>
                </form>
            ))}
            <p role="status">{message}</p>
        </div>
    );
}

export function ReadableToolbar() {
    const [message, setMessage] = useState('Select a toolbar action.');
    const [alternativeMessage, setAlternativeMessage] = useState('Select a toolbar action.');
    const [tooltip, setTooltip] = useState<string | null>(null);
    const tooltipId = useId();
    const actions = [
        { icon: '⚙︎', label: 'Settings', message: 'Settings opened' },
        { icon: '↻', label: 'Refresh', message: 'Refreshed' },
        { icon: '⤓', label: 'Download', message: 'Downloaded' },
        { icon: '⋮', label: 'More', message: 'More opened' },
    ];
    return (
        <>
            <h2>Run Controls</h2>
            <h3 className="solution-option-title">Option 1: Icons with text labels</h3>
            <div className="solution-actions">
                {actions.map((action) => (
                    <button key={action.label} onClick={() => setMessage(action.message)}>
                        <span className="solution-toolbar-icon" aria-hidden="true">
                            {action.icon}
                        </span>{' '}
                        {action.label}
                    </button>
                ))}
            </div>
            <p role="status">{message}</p>
            <div className="solution-confirmation">
                <h3>Option 2: Icons with tooltips</h3>
                <div className="solution-actions">
                    {actions.map((action, index) => (
                        <span
                            className="solution-tooltip-action"
                            key={action.label}
                            onMouseEnter={() => setTooltip(action.label)}
                            onMouseLeave={() => setTooltip(null)}
                        >
                            <button
                                type="button"
                                aria-label={action.label}
                                aria-describedby={
                                    tooltip === action.label ? `${tooltipId}-${index}` : undefined
                                }
                                onFocus={() => setTooltip(action.label)}
                                onBlur={() => setTooltip(null)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Escape') setTooltip(null);
                                }}
                                onClick={() => setAlternativeMessage(action.message)}
                            >
                                <span className="solution-toolbar-icon" aria-hidden="true">
                                    {action.icon}
                                </span>
                            </button>
                            {tooltip === action.label && (
                                <span
                                    className="solution-tooltip"
                                    id={`${tooltipId}-${index}`}
                                    role="tooltip"
                                >
                                    {action.label}
                                </span>
                            )}
                        </span>
                    ))}
                </div>
                <p role="status">{alternativeMessage}</p>
            </div>
        </>
    );
}

export function VisibleDetectorActions() {
    const [detector, setDetector] = useState<string | null>(null);
    return (
        <>
            <h2>Connected Detectors</h2>
            <div className="solution-actions">
                {['Pilatus 2M', 'Eiger X 4M'].map((name) => (
                    <button
                        key={name}
                        onClick={() => setDetector(name)}
                        aria-expanded={detector === name}
                    >
                        {name} Settings
                    </button>
                ))}
            </div>
            {detector && (
                <div className="bad-panel">
                    <h3>{detector} Settings</h3>
                    {detector === 'Pilatus 2M' ? (
                        <label>
                            Threshold
                            <input defaultValue="4.5 keV" />
                        </label>
                    ) : (
                        <label>
                            Frame time
                            <input defaultValue="0.1 s" />
                        </label>
                    )}
                    <button onClick={() => setDetector(null)}>Close</button>
                </div>
            )}
        </>
    );
}

export function SaveFeedback() {
    const [value, setValue] = useState('0.25');
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    useEffect(() => {
        if (status !== 'saving') return;
        const timeout = window.setTimeout(() => setStatus('saved'), 1000);
        return () => window.clearTimeout(timeout);
    }, [status]);
    return (
        <Form
            title="Scan Settings"
            onSubmit={(event) => {
                event.preventDefault();
                setStatus('saving');
            }}
        >
            <label>
                Exposure time (s)
                <input
                    type="number"
                    min="0.01"
                    step="any"
                    required
                    value={value}
                    disabled={status === 'saving'}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setStatus('idle');
                    }}
                />
            </label>
            <button className="solution-primary" disabled={status === 'saving'}>
                {status === 'saving' ? 'Saving…' : 'Save Settings'}
            </button>
            <p className="solution-status" role="status">
                {status === 'saved'
                    ? 'Settings saved.'
                    : status === 'saving'
                      ? 'Saving settings…'
                      : ''}
            </p>
        </Form>
    );
}

export function StableHeatmap() {
    const [selected, setSelected] = useState(0);
    const [displayed, setDisplayed] = useState(0);
    const id = useId();
    const loading = selected !== displayed;
    useEffect(() => {
        const timeout = window.setTimeout(() => setDisplayed(selected), 1000);
        return () => window.clearTimeout(timeout);
    }, [selected]);
    return (
        <div className="heatmap-pattern">
            <h2>Tomography Preview</h2>
            <div className="training-heatmap-frame solution-heatmap-frame" aria-busy={loading}>
                <PlotlyHeatmap
                    array={heatmapSlices[displayed]}
                    colorScale="Viridis"
                    showScale
                    showTicks
                    tickStep={5}
                    xAxisTitle="Detector X"
                    yAxisTitle="Detector Y"
                    lockPlotHeightToParent
                    className="training-heatmap"
                />
                {loading && (
                    <div className="solution-loading-overlay">Loading slice {selected + 1}…</div>
                )}
            </div>
            <label className="slice-control" htmlFor={id}>
                <span>Slice {selected + 1}</span>
                <input
                    id={id}
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={selected}
                    onChange={(event) => setSelected(Number(event.target.value))}
                />
                <span className="slice-ticks" aria-hidden="true">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </span>
            </label>
            <p className="solution-status" role="status">
                {loading ? `Loading slice ${selected + 1}…` : `Showing slice ${displayed + 1}`}
            </p>
        </div>
    );
}

function ScanFields({ requiredName = false }: { requiredName?: boolean }) {
    return (
        <>
            <label>
                Scan name{requiredName ? ' (required)' : ''}
                <input required={requiredName} defaultValue={requiredName ? '' : 'Ni K-edge'} />
            </label>
            <label>
                Detector
                <select defaultValue="Pilatus 2M">
                    <option>Pilatus 2M</option>
                    <option>Eiger X 4M</option>
                </select>
            </label>
            <label>
                Start energy (keV)
                <input type="number" step="any" defaultValue="8.1" />
            </label>
            <label>
                Stop energy (keV)
                <input type="number" step="any" defaultValue="8.6" />
            </label>
            <label>
                Exposure time (s)
                <input type="number" step="any" defaultValue="1.0" />
            </label>
        </>
    );
}

export function DisabledScan() {
    return (
        <div className="bad-form scan-engine-form">
            <h2>New Scan</h2>
            <ScanFields />
            <p id="solution-engine-status" role="status">
                Scan Engine Busy. Wait for the current scan to finish.
            </p>
            <button className="solution-primary" disabled aria-describedby="solution-engine-status">
                Start Scan
            </button>
        </div>
    );
}

export function RequiredScan() {
    const [submitted, setSubmitted] = useState(false);
    return (
        <Form
            title="New Scan"
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
            }}
        >
            <ScanFields requiredName />
            <button className="solution-primary">Start Scan</button>
            {submitted && <p role="status">Scan submitted</p>}
        </Form>
    );
}

export function RecoverableDelete() {
    const [rows, setRows] = useState(['Sample alignment', 'XANES scan', 'Dark frame']);
    const [removed, setRemoved] = useState<{ name: string; index: number } | null>(null);
    return (
        <>
            <h2>Queue</h2>
            <ul className="solution-queue">
                {rows.map((row, index) => (
                    <li key={row}>
                        <span>{row}</span>
                        <button
                            aria-label={`Delete ${row}`}
                            className="solution-danger"
                            onClick={() => {
                                setRemoved({ name: row, index });
                                setRows((items) => items.filter((item) => item !== row));
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {removed && (
                <div className="solution-actions">
                    <p role="status">{removed.name} removed.</p>
                    <button
                        onClick={() => {
                            setRows((items) => {
                                const next = [...items];
                                next.splice(removed.index, 0, removed.name);
                                return next;
                            });
                            setRemoved(null);
                        }}
                    >
                        Undo
                    </button>
                </div>
            )}
        </>
    );
}

export function LabeledMotor() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    return (
        <Form
            title="Add Motor"
            onSubmit={(event) => {
                event.preventDefault();
                setMessage(`${name.trim()} added.`);
            }}
        >
            <label>
                Motor name
                <input
                    required
                    value={name}
                    placeholder="e.g. Sample stage X"
                    onChange={(event) => {
                        setName(event.target.value);
                        setMessage('');
                    }}
                />
            </label>
            <button className="solution-primary">Add</button>
            <p role="status">{message}</p>
        </Form>
    );
}

export function ActionableError() {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    const id = useId();
    return (
        <Form
            title="Detector Exposure"
            onSubmit={(event) => {
                event.preventDefault();
                const valid =
                    value.trim() !== '' && Number.isFinite(Number(value)) && Number(value) > 0;
                setError(!valid);
                setSaved(valid);
                if (!valid) input.current?.focus();
            }}
        >
            <label>
                Exposure time (seconds)
                <input
                    ref={input}
                    value={value}
                    inputMode="decimal"
                    aria-invalid={error}
                    aria-describedby={error ? id : undefined}
                    onChange={(event) => {
                        setValue(event.target.value);
                        setError(false);
                        setSaved(false);
                    }}
                />
                {error && (
                    <span id={id} className="field-error" role="alert">
                        Enter an exposure time greater than 0 seconds, for example 0.5.
                    </span>
                )}
            </label>
            <button className="solution-primary">Apply</button>
            {saved && <p role="status">Exposure time applied.</p>}
        </Form>
    );
}

export function InlineError() {
    const [energy, setEnergy] = useState('invalid');
    const [error, setError] = useState(false);
    const [saved, setSaved] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    const id = useId();
    return (
        <Form
            title="Experiment Details"
            onSubmit={(event) => {
                event.preventDefault();
                const valid =
                    energy.trim() !== '' && Number.isFinite(Number(energy)) && Number(energy) > 0;
                setError(!valid);
                setSaved(valid);
                if (!valid) input.current?.focus();
            }}
        >
            <label>
                Proposal ID
                <input defaultValue="307421" />
            </label>
            <label>
                Sample name
                <input defaultValue="Ni foil" />
            </label>
            <label>
                Detector
                <input defaultValue="Pilatus" />
            </label>
            <label>
                Energy (keV)
                <input
                    ref={input}
                    value={energy}
                    inputMode="decimal"
                    aria-invalid={error}
                    aria-describedby={error ? id : undefined}
                    onChange={(event) => {
                        setEnergy(event.target.value);
                        setError(false);
                        setSaved(false);
                    }}
                />
                {error && (
                    <span id={id} className="field-error" role="alert">
                        Enter an energy greater than 0 keV, for example 8.33.
                    </span>
                )}
            </label>
            <label>
                Notes
                <input defaultValue="Room temperature" />
            </label>
            <button className="solution-primary">Save Experiment</button>
            {saved && <p role="status">Experiment saved.</p>}
        </Form>
    );
}

export function PreservedInput() {
    const [values, setValues] = useState([
        'Ni foil',
        '8.33',
        '12.5',
        '0.5',
        'Pilatus',
        'Standard run',
    ]);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const [retry, setRetry] = useState(false);
    const labels = ['Sample', 'Start energy', 'Stop energy', 'Step', 'Detector', 'Notes'];
    return (
        <Form
            title="Scan Setup"
            onSubmit={(event) => {
                event.preventDefault();
                const numericValues = values.slice(1, 4);
                if (
                    !values[0].trim() ||
                    !values[4].trim() ||
                    numericValues.some(
                        (value) =>
                            !value.trim() || !Number.isFinite(Number(value)) || Number(value) <= 0,
                    ) ||
                    Number(values[2]) <= Number(values[1])
                ) {
                    setError(
                        'Enter a sample and detector, positive energies and step, and a stop energy greater than the start. Your entries have been kept.',
                    );
                    setSaved(false);
                    return;
                }
                // Simulate one failed request so learners can see that their entries survive a retry.
                if (!retry) {
                    setError(
                        'Could not save: the scan service is temporarily unavailable. Your entries have been kept. Please retry.',
                    );
                    setRetry(true);
                    return;
                }
                setError('');
                setSaved(true);
            }}
        >
            {labels.map((label, index) => (
                <label key={label}>
                    {label}
                    <input
                        value={values[index]}
                        onChange={(event) => {
                            setValues((current) =>
                                current.map((value, i) =>
                                    i === index ? event.target.value : value,
                                ),
                            );
                            setSaved(false);
                        }}
                    />
                </label>
            ))}
            {error && (
                <p className="field-error" role="alert">
                    {error}
                </p>
            )}
            <button className="solution-primary">{error ? 'Retry Save' : 'Save'}</button>
            {saved && <p role="status">Scan saved.</p>}
        </Form>
    );
}

export function SizeSelect() {
    const [size, setSize] = useState('medium');
    const [submitted, setSubmitted] = useState(false);
    return (
        <Form
            title="Line Scan"
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
            }}
        >
            <label>
                Step size
                <select
                    value={size}
                    onChange={(event) => {
                        setSize(event.target.value);
                        setSubmitted(false);
                    }}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            </label>
            <button className="solution-primary">Start Scan</button>
            {submitted && <p role="status">Scan started.</p>}
        </Form>
    );
}

export function TextStatus() {
    const devices = [
        { name: 'Monochromator', color: 'green', status: 'Ready', icon: '✓' },
        { name: 'Sample stage', color: 'red', status: 'Error', icon: '×' },
        { name: 'Detector', color: 'yellow', status: 'Busy', icon: '◷' },
        { name: 'Shutter', color: 'green', status: 'Ready', icon: '✓' },
    ];
    return (
        <>
            <h2>Device Status</h2>
            <ul className="status-only-list">
                {devices.map((device) => (
                    <li key={device.name}>
                        <span className={`solution-status-icon ${device.color}`} aria-hidden="true">
                            {device.icon}
                        </span>
                        <span>
                            {device.name}:{' '}
                            <span className="solution-device-status">{device.status}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export function ComfortableTargets() {
    const [message, setMessage] = useState('');
    return (
        <>
            <h2>Scan Queue</h2>
            <div className="solution-queue-item">
                <span>Ni K-edge scan</span>
                <div className="solution-actions">
                    {['Edit', 'Move', 'Delete'].map((action) => (
                        <button
                            key={action}
                            onClick={() => setMessage(`${action} selected for Ni K-edge scan.`)}
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>
            <p role="status">{message}</p>
        </>
    );
}

export function KeyboardReordering() {
    const [items, setItems] = useState(['Dark frame', 'Sample alignment', 'XANES scan']);
    const [message, setMessage] = useState('');
    function move(index: number, direction: -1 | 1) {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        setItems(next);
        setMessage(`${items[index]} moved to position ${target + 1} of ${items.length}.`);
    }
    return (
        <>
            <h2>Reorder Queue</h2>
            <p>Use the buttons to change the run order.</p>
            <ol className="solution-queue">
                {items.map((item, index) => (
                    <li key={item}>
                        <span>
                            {index + 1}. {item}
                        </span>
                        <div className="solution-actions">
                            <button
                                aria-label={`Move ${item} up`}
                                disabled={index === 0}
                                onClick={() => move(index, -1)}
                            >
                                ↑ Up
                            </button>
                            <button
                                aria-label={`Move ${item} down`}
                                disabled={index === items.length - 1}
                                onClick={() => move(index, 1)}
                            >
                                ↓ Down
                            </button>
                        </div>
                    </li>
                ))}
            </ol>
            <p role="status">{message}</p>
        </>
    );
}
