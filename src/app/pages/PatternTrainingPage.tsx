import { useEffect, useState, type ComponentType, type DragEvent, type FormEvent } from 'react';

import PlotlyHeatmap from '@/components/PlotlyHeatmap';
import * as Solutions from './PatternSolutions';
import * as ScientificPatterns from './ScientificDashboardPatterns';
import { heatmapSlices } from './patternHeatmapData';
import { GroupedAnalysisSidebar, UngroupedAnalysisSidebar } from './SidebarGroupingPattern';

import './PatternTrainingPage.css';

type Pattern = {
    title: string;
    component: ComponentType;
    solution: ComponentType;
    improvement: string;
    pureBlackBackground?: boolean;
};

function DemoFrame({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="pattern-demo" aria-label={title}>
            {children}
        </section>
    );
}

function WeakInteractionAffordance() {
    const [started, setStarted] = useState(false);
    return (
        <DemoFrame title="Weak Interaction Affordance">
            <h2>Beamline Scan</h2>
            <p>Energy range: 8.0–12.0 keV</p>
            <button className="bad-text-button" onClick={() => setStarted(true)}>
                Start Scan
            </button>
            {started && <p>Scan started.</p>}
        </DemoFrame>
    );
}

function AmbiguousConfirmationActions() {
    const [result, setResult] = useState('');
    return (
        <DemoFrame title="Ambiguous Confirmation Actions">
            <div className="bad-dialog">
                <h2>Remove item from Queue?</h2>
                <div className="bad-row">
                    <button onClick={() => setResult('Item removed')}>Yes</button>
                    <button onClick={() => setResult('Removal cancelled')}>No</button>
                </div>
                <p>{result}</p>
            </div>
        </DemoFrame>
    );
}

function EqualDestructiveEmphasis() {
    const [result, setResult] = useState('Configuration has unsaved changes.');
    return (
        <DemoFrame title="Destructive Action Has Equal Emphasis">
            <div className="bad-panel">
                <h2>Detector Configuration</h2>
                <label>
                    Readout mode
                    <select>
                        <option>Fast</option>
                        <option>Low noise</option>
                    </select>
                </label>
                <div className="bad-row equal-actions">
                    <button onClick={() => setResult('Saved')}>Save</button>
                    <button onClick={() => setResult('Deleted')}>Delete Configuration</button>
                </div>
                <p>{result}</p>
            </div>
        </DemoFrame>
    );
}

function InconsistentButtonLabels() {
    const [values, setValues] = useState({ x: '2.5', y: '1.2', z: '8.0', velocity: '0.5' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState('');

    const controls = [
        { id: 'x', label: 'Position X', unit: 'mm', action: 'Move X' },
        { id: 'y', label: 'Position Y', unit: 'mm', action: 'Move Y' },
        { id: 'z', label: 'Position Z', unit: 'mm', action: 'Set Z' },
        { id: 'velocity', label: 'Velocity', unit: 'mm/s', action: 'Set Velocity' },
    ] as const;

    function submitControl(event: FormEvent, control: (typeof controls)[number]) {
        event.preventDefault();
        if (!values[control.id].trim()) {
            setErrors((current) => ({ ...current, [control.id]: `${control.label} is required.` }));
            setMessage('');
            return;
        }
        setErrors((current) => ({ ...current, [control.id]: '' }));
        setMessage(`${control.label} updated.`);
    }

    return (
        <DemoFrame title="Inconsistent Button Labels">
            <div className="bad-form motor-controller-form">
                <h2>Motor Controller</h2>
                {controls.map((control) => (
                    <form
                        className="motor-control-row"
                        onSubmit={(event) => submitControl(event, control)}
                        key={control.id}
                    >
                        <label>
                            {control.label}
                            <span className="input-with-unit">
                                <input
                                    type="number"
                                    value={values[control.id]}
                                    aria-invalid={Boolean(errors[control.id])}
                                    onChange={(event) => {
                                        setValues((current) => ({
                                            ...current,
                                            [control.id]: event.target.value,
                                        }));
                                        setErrors((current) => ({
                                            ...current,
                                            [control.id]: '',
                                        }));
                                    }}
                                />
                                <span>{control.unit}</span>
                            </span>
                            {errors[control.id] && (
                                <span className="field-error">{errors[control.id]}</span>
                            )}
                        </label>
                        <button className="generic-submit-button">{control.action}</button>
                    </form>
                ))}
                {message && <p className="motor-controller-message">{message}</p>}
            </div>
        </DemoFrame>
    );
}

function BadHoverInteractions() {
    const [action, setAction] = useState('Select a toolbar action.');
    const [selected, setSelected] = useState('');
    const actions = [
        { icon: '⚙︎', message: 'Settings opened' },
        { icon: '↻', message: 'Refreshed' },
        { icon: '⤓', message: 'Downloaded' },
        { icon: '⋮', message: 'More opened' },
    ];

    return (
        <DemoFrame title="Bad Hover Interactions">
            <h2>Run Controls</h2>
            <div className="mystery-toolbar">
                {actions.map((item) => (
                    <button
                        className={selected === item.message ? 'selected' : ''}
                        onClick={() => {
                            setSelected(item.message);
                            setAction(item.message);
                        }}
                        aria-pressed={selected === item.message}
                        key={item.message}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
            <p>{action}</p>
        </DemoFrame>
    );
}

function HiddenClickableThing() {
    const [selectedDetector, setSelectedDetector] = useState<'Pilatus 2M' | 'Eiger X 4M' | null>(
        null,
    );
    return (
        <DemoFrame title="Clickable Thing Doesn't Look Clickable">
            <h2>Connected Detectors</h2>
            <p
                className={`plain-clickable ${selectedDetector === 'Pilatus 2M' ? 'open' : ''}`}
                onClick={() => setSelectedDetector('Pilatus 2M')}
            >
                Pilatus 2M
            </p>
            <p
                className={`plain-clickable ${selectedDetector === 'Eiger X 4M' ? 'open' : ''}`}
                onClick={() => setSelectedDetector('Eiger X 4M')}
            >
                Eiger X 4M
            </p>
            {selectedDetector && (
                <div className="bad-panel">
                    <h3>{selectedDetector} Settings</h3>
                    {selectedDetector === 'Pilatus 2M' ? (
                        <label>
                            Threshold <input defaultValue="4.5 keV" />
                        </label>
                    ) : (
                        <label>
                            Frame time <input defaultValue="0.1 s" />
                        </label>
                    )}
                    <button onClick={() => setSelectedDetector(null)}>Close</button>
                </div>
            )}
        </DemoFrame>
    );
}

function NoActionFeedback() {
    const [value, setValue] = useState('0.25');
    return (
        <DemoFrame title="No Feedback After an Action">
            <div className="bad-form">
                <h2>Scan Settings</h2>
                <label>
                    Exposure time (s)
                    <input value={value} onChange={(event) => setValue(event.target.value)} />
                </label>
                <button
                    className="generic-submit-button"
                    onClick={() => window.setTimeout(() => undefined, 3000)}
                >
                    Save Settings
                </button>
            </div>
        </DemoFrame>
    );
}

function DelayedHeatmapFeedback() {
    const [selectedSlice, setSelectedSlice] = useState(0);
    const [displayedSlice, setDisplayedSlice] = useState(0);

    useEffect(() => {
        const timeout = window.setTimeout(() => setDisplayedSlice(selectedSlice), 1000);
        return () => window.clearTimeout(timeout);
    }, [selectedSlice]);

    return (
        <DemoFrame title="No Feedback During Loading">
            <div className="heatmap-pattern">
                <h2>Tomography Preview</h2>
                <div className="training-heatmap-frame">
                    <PlotlyHeatmap
                        array={heatmapSlices[displayedSlice]}
                        colorScale="Viridis"
                        showScale
                        showTicks
                        tickStep={5}
                        xAxisTitle="Detector X"
                        yAxisTitle="Detector Y"
                        lockPlotHeightToParent
                        className="training-heatmap"
                    />
                </div>
                <label className="slice-control" htmlFor="heatmap-slice">
                    <span>Slice {selectedSlice + 1}</span>
                    <input
                        id="heatmap-slice"
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={selectedSlice}
                        onChange={(event) => setSelectedSlice(Number(event.target.value))}
                    />
                    <span className="slice-ticks" aria-hidden="true">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </span>
                </label>
            </div>
        </DemoFrame>
    );
}

function BadHeatmapLayoutShift() {
    const [selectedSlice, setSelectedSlice] = useState(0);
    const [displayedSlice, setDisplayedSlice] = useState(0);
    const [heatmapVisible, setHeatmapVisible] = useState(true);

    useEffect(() => {
        if (selectedSlice === displayedSlice) return;

        setHeatmapVisible(false);
        const timeout = window.setTimeout(() => {
            setDisplayedSlice(selectedSlice);
            setHeatmapVisible(true);
        }, 1000);
        return () => window.clearTimeout(timeout);
    }, [displayedSlice, selectedSlice]);

    return (
        <DemoFrame title="Bad Layout Shifts">
            <div className="heatmap-pattern">
                <h2>Tomography Preview</h2>
                {heatmapVisible && (
                    <div className="training-heatmap-frame">
                        <PlotlyHeatmap
                            array={heatmapSlices[displayedSlice]}
                            colorScale="Viridis"
                            showScale
                            showTicks
                            tickStep={5}
                            xAxisTitle="Detector X"
                            yAxisTitle="Detector Y"
                            lockPlotHeightToParent
                            className="training-heatmap"
                        />
                    </div>
                )}
                <label className="slice-control" htmlFor="layout-shift-heatmap-slice">
                    <span>Slice {selectedSlice + 1}</span>
                    <input
                        id="layout-shift-heatmap-slice"
                        type="range"
                        min="0"
                        max="2"
                        step="1"
                        value={selectedSlice}
                        onChange={(event) => setSelectedSlice(Number(event.target.value))}
                    />
                    <span className="slice-ticks" aria-hidden="true">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                    </span>
                </label>
            </div>
        </DemoFrame>
    );
}

function MissingDisabledState() {
    const [engineMessage, setEngineMessage] = useState('');
    return (
        <DemoFrame title="Missing Disabled State">
            <div className="bad-form scan-engine-form">
                <h2>New Scan</h2>
                <label>
                    Scan name <input defaultValue="Ni K-edge" />
                </label>
                <label>
                    Detector
                    <select defaultValue="Pilatus 2M">
                        <option>Pilatus 2M</option>
                        <option>Eiger X 4M</option>
                    </select>
                </label>
                <label>
                    Start energy (keV) <input type="number" defaultValue="8.1" />
                </label>
                <label>
                    Stop energy (keV) <input type="number" defaultValue="8.6" />
                </label>
                <label>
                    Exposure time (s) <input type="number" defaultValue="1.0" />
                </label>
                <button
                    className="generic-submit-button"
                    type="button"
                    onClick={() => setEngineMessage('Scan Engine Busy')}
                >
                    Start Scan
                </button>
                {engineMessage && <p className="scan-engine-message">{engineMessage}</p>}
            </div>
        </DemoFrame>
    );
}

function HiddenRequiredField() {
    const [scanName, setScanName] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    function submitScan(event: FormEvent) {
        event.preventDefault();
        if (!scanName.trim()) {
            setError('Scan name is required.');
            setSubmitted(false);
            return;
        }
        setError('');
        setSubmitted(true);
    }

    return (
        <DemoFrame title="Required Field Revealed After Submit">
            <form className="bad-form scan-engine-form" onSubmit={submitScan}>
                <h2>New Scan</h2>
                <label>
                    Scan name
                    <input
                        value={scanName}
                        aria-invalid={Boolean(error)}
                        onChange={(event) => {
                            setScanName(event.target.value);
                            setError('');
                            setSubmitted(false);
                        }}
                    />
                    {error && <span className="field-error">{error}</span>}
                </label>
                <label>
                    Detector
                    <select defaultValue="Pilatus 2M">
                        <option>Pilatus 2M</option>
                        <option>Eiger X 4M</option>
                    </select>
                </label>
                <label>
                    Start energy (keV) <input type="number" defaultValue="8.1" />
                </label>
                <label>
                    Stop energy (keV) <input type="number" defaultValue="8.6" />
                </label>
                <label>
                    Exposure time (s) <input type="number" defaultValue="1.0" />
                </label>
                <button className="generic-submit-button">Start Scan</button>
                {submitted && <p className="scan-submission-message">Scan submitted</p>}
            </form>
        </DemoFrame>
    );
}

function DangerousActionNoRecovery() {
    const [rows, setRows] = useState(['Sample alignment', 'XANES scan', 'Dark frame']);
    return (
        <DemoFrame title="Unexpected Delete">
            <h2>Queue</h2>
            <ul className="delete-list">
                {rows.map((row) => (
                    <li
                        onClick={() => setRows((items) => items.filter((item) => item !== row))}
                        key={row}
                    >
                        <span>{row}</span>
                        <button type="button" aria-label={`Delete ${row}`}>
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
        </DemoFrame>
    );
}

function HardToReadTypeface() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <DemoFrame title="Hard-to-Read Typeface">
            <form
                className="bad-form illegible-typeface-demo"
                onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                }}
            >
                <h2>Scan Configuration</h2>
                <p>
                    Review the sample name and exposure time before adding this scan to the queue.
                </p>
                <label>
                    Sample name
                    <input defaultValue="Nickel reference foil" />
                </label>
                <label>
                    Exposure time (seconds)
                    <input type="number" min="0.1" step="0.1" defaultValue="1.5" />
                </label>
                <button className="generic-submit-button">Add to Queue</button>
                {submitted && <p role="status">Scan added to the queue.</p>}
            </form>
        </DemoFrame>
    );
}

function ExcessiveContrast() {
    const [reviewed, setReviewed] = useState(false);

    return (
        <DemoFrame title="Excessive Contrast">
            <div className="bad-form excessive-contrast-demo">
                <h2>Scan Summary</h2>
                <p>
                    The nickel reference scan is complete. Review the acquisition details before
                    continuing to the next sample.
                </p>
                <p>
                    The detector collected 240 frames with an exposure time of 1.5 seconds per
                    frame. The energy range was 8.0 to 12.0 keV, and the sample position remained
                    fixed throughout the scan.
                </p>
                <p>
                    Check the reference signal and confirm that the sample name matches your
                    experiment notes. Once reviewed, the results are ready for analysis.
                </p>
                <button type="button" onClick={() => setReviewed(true)}>
                    Mark as Reviewed
                </button>
                {reviewed && <p role="status">Scan marked as reviewed.</p>}
            </div>
        </DemoFrame>
    );
}

function PlaceholderAsLabel() {
    const [name, setName] = useState('');
    return (
        <DemoFrame title="Placeholder Used as the Label">
            <h2>Add Motor</h2>
            <input
                placeholder="Motor name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <button>Add</button>
        </DemoFrame>
    );
}

function VagueErrorMessage() {
    const [exposure, setExposure] = useState('');
    const [error, setError] = useState(false);
    return (
        <DemoFrame title="Vague Error Message">
            <form
                className="bad-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setError(true);
                }}
            >
                <h2>Detector Exposure</h2>
                <label>
                    Exposure time{' '}
                    <input
                        className={error ? 'bad-invalid' : ''}
                        value={exposure}
                        onChange={(event) => {
                            setExposure(event.target.value);
                            setError(false);
                        }}
                    />
                </label>
                {error && <p className="bad-error">Error 422</p>}
                <button>Apply</button>
            </form>
        </DemoFrame>
    );
}

function ErrorFarFromProblem() {
    const [error, setError] = useState(false);
    return (
        <DemoFrame title="Error Is Far From the Problem">
            <form
                className="bad-form long-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setError(true);
                }}
            >
                {error && <div className="bad-banner">There are errors in the form.</div>}
                <h2>Experiment Details</h2>
                <label>
                    Proposal ID <input defaultValue="307421" />
                </label>
                <label>
                    Sample name <input defaultValue="Ni foil" />
                </label>
                <label>
                    Detector <input defaultValue="Pilatus" />
                </label>
                <label>
                    Energy <input defaultValue="invalid" />
                </label>
                <label>
                    Notes <input defaultValue="Room temperature" />
                </label>
                <button>Save Experiment</button>
            </form>
        </DemoFrame>
    );
}

function InputDisappearsAfterError() {
    const empty = ['', '', '', '', '', ''];
    const [values, setValues] = useState([
        'Ni foil',
        '8.33',
        '12.5',
        '0.5',
        'Pilatus',
        'Standard run',
    ]);
    const [error, setError] = useState(false);
    const labels = ['Sample', 'Start energy', 'Stop energy', 'Step', 'Detector', 'Notes'];
    function submit(event: FormEvent) {
        event.preventDefault();
        setValues(empty);
        setError(true);
    }
    return (
        <DemoFrame title="User Input Disappears After an Error">
            <form className="bad-form compact-form" onSubmit={submit}>
                <h2>Scan Setup</h2>
                {labels.map((label, index) => (
                    <label key={label}>
                        {label}
                        <input
                            value={values[index]}
                            onChange={(event) =>
                                setValues((current) =>
                                    current.map((item, itemIndex) =>
                                        itemIndex === index ? event.target.value : item,
                                    ),
                                )
                            }
                        />
                    </label>
                ))}
                <button>Save</button>
                {error && <p className="bad-error">One value was invalid. Please try again.</p>}
            </form>
        </DemoFrame>
    );
}

function ImproperInputType() {
    const [size, setSize] = useState('');
    const [error, setError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    return (
        <DemoFrame title="Improper Input Type">
            <form
                className="bad-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    const valid = ['small', 'medium', 'large'].includes(size.trim().toLowerCase());
                    setError(!valid);
                    setSubmitted(valid);
                }}
            >
                <h2>Line Scan</h2>
                <label>
                    Step size
                    <input
                        type="text"
                        value={size}
                        aria-invalid={error}
                        aria-describedby={error ? 'step-size-error' : undefined}
                        onChange={(event) => {
                            setSize(event.target.value);
                            setError(false);
                            setSubmitted(false);
                        }}
                    />
                </label>
                <button>Start Scan</button>
                {error && (
                    <p className="bad-error" id="step-size-error" role="alert">
                        You must enter 'small', 'medium' or 'large'.
                    </p>
                )}
                {submitted && <p role="status">Scan started.</p>}
            </form>
        </DemoFrame>
    );
}

function ColorOnlyStatus() {
    return (
        <DemoFrame title="Color Is the Only Status Indicator">
            <h2>Device Status</h2>
            <ul className="status-only-list">
                <li>
                    <span className="status-only green" /> Monochromator
                </li>
                <li>
                    <span className="status-only red" /> Sample stage
                </li>
                <li>
                    <span className="status-only yellow" /> Detector
                </li>
                <li>
                    <span className="status-only green" /> Shutter
                </li>
            </ul>
        </DemoFrame>
    );
}

function LowContrastInformation() {
    const [mode, setMode] = useState('Continuous');
    return (
        <DemoFrame title="Low-Contrast Secondary Information">
            <div className="bad-form low-contrast-demo">
                <h2>Acquisition</h2>
                <label>
                    Count time <input defaultValue="500" /> <span>milliseconds</span>
                </label>
                <p>Values over 1000 may increase detector dead time.</p>
                <button onClick={() => setMode(mode === 'Continuous' ? 'Step' : 'Continuous')}>
                    Mode: {mode}
                </button>
                <small>Last changed yesterday at 16:42</small>
            </div>
        </DemoFrame>
    );
}

function InvisibleKeyboardFocus() {
    const [state, setState] = useState('Ready');
    return (
        <DemoFrame title="Invisible Keyboard Focus">
            <h2>Sequence Controls</h2>
            <div className="bad-row invisible-focus">
                {['Start', 'Pause', 'Stop', 'Reset'].map((action) => (
                    <button key={action} onClick={() => setState(action)}>
                        {action}
                    </button>
                ))}
            </div>
            <p>State: {state}</p>
        </DemoFrame>
    );
}

function TinyCrowdedTargets() {
    const [message, setMessage] = useState('');
    return (
        <DemoFrame title="Tiny / Crowded Click Targets">
            <h2>Scan Queue</h2>
            <div className="tiny-queue-row">
                <span>Ni K-edge scan</span>
                <div>
                    <button onClick={() => setMessage('Edit')}>✎</button>
                    <button onClick={() => setMessage('Move')}>↕</button>
                    <button onClick={() => setMessage('Delete')}>×</button>
                </div>
            </div>
            <p>{message}</p>
        </DemoFrame>
    );
}

function DragOnlyAction() {
    const [items, setItems] = useState(['Dark frame', 'Sample alignment', 'XANES scan']);
    const [dragged, setDragged] = useState<number | null>(null);
    function drop(event: DragEvent<HTMLLIElement>, target: number) {
        event.preventDefault();
        if (dragged === null || dragged === target) return;
        setItems((current) => {
            const next = [...current];
            const [item] = next.splice(dragged, 1);
            next.splice(target, 0, item);
            return next;
        });
        setDragged(null);
    }
    return (
        <DemoFrame title="Drag Is the Only Way to Perform an Action">
            <h2>Reorder Queue</h2>
            <p>Drag entries into the desired run order.</p>
            <ol className="drag-only-list">
                {items.map((item, index) => (
                    <li
                        key={item}
                        draggable
                        onDragStart={() => setDragged(index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => drop(event, index)}
                    >
                        <span>⠿</span>
                        {item}
                    </li>
                ))}
            </ol>
        </DemoFrame>
    );
}

const patterns: Pattern[] = [
    {
        title: 'Weak Interaction Affordance',
        component: WeakInteractionAffordance,
        solution: WeakInteractionAffordance,
        improvement:
            'A clear button shape, pointer cursor, and visible hover and focus states signal that this action is interactive.',
    },
    {
        title: 'Ambiguous Confirmation Actions',
        component: AmbiguousConfirmationActions,
        solution: Solutions.ExplicitConfirmation,
        improvement: 'Name the actions so users can predict exactly what each button will do.',
    },
    {
        title: 'Destructive Action Has Equal Emphasis',
        component: EqualDestructiveEmphasis,
        solution: Solutions.DestructiveHierarchy,
        improvement:
            'Make Save the primary action. Give deletion a separate, less prominent treatment and confirm it before proceeding.',
    },
    {
        title: 'Inconsistent Button Labels',
        component: InconsistentButtonLabels,
        solution: Solutions.ConsistentControls,
        improvement:
            'Use Move consistently for all three axes. Set Velocity describes the different action of changing a speed setting.',
    },
    {
        title: 'Bad Hover Interactions',
        component: BadHoverInteractions,
        solution: Solutions.ReadableToolbar,
        improvement: 'Keep controls readable on hover and give every icon a visible text label.',
    },
    {
        title: "Clickable Thing Doesn't Look Clickable",
        component: HiddenClickableThing,
        solution: Solutions.VisibleDetectorActions,
        improvement: 'Use recognizable, keyboard-accessible buttons for opening detector settings.',
    },
    {
        title: 'No Feedback After an Action',
        component: NoActionFeedback,
        solution: Solutions.SaveFeedback,
        improvement:
            'Show progress immediately, prevent duplicate submissions, and confirm when settings have been saved.',
    },
    {
        title: 'No Feedback During Loading',
        component: DelayedHeatmapFeedback,
        solution: Solutions.StableHeatmap,
        improvement:
            'Show a loading indicator as soon as the selected slice changes, then announce which slice is displayed.',
    },
    {
        title: 'Bad Layout Shifts',
        component: BadHeatmapLayoutShift,
        solution: Solutions.StableHeatmap,
        improvement:
            'Reserve the preview space during loading so the slider and surrounding controls stay in place.',
    },
    {
        title: 'Missing Disabled State',
        component: MissingDisabledState,
        solution: Solutions.DisabledScan,
        improvement:
            'Disable unavailable actions and explain why they are unavailable before users try them.',
    },
    {
        title: 'Required Field Revealed After Submit',
        component: HiddenRequiredField,
        solution: Solutions.RequiredScan,
        improvement:
            'Identify required fields before submission and use built-in validation to guide users to them.',
    },
    {
        title: 'Unexpected Delete',
        component: DangerousActionNoRecovery,
        solution: Solutions.RecoverableDelete,
        improvement:
            'Only the explicit Delete button removes an item. Undo lets users recover from an accidental deletion.',
    },
    {
        title: 'Hard-to-Read Typeface',
        component: HardToReadTypeface,
        solution: HardToReadTypeface,
        improvement: 'Use a familiar, readable typeface for body text, labels, and controls.',
    },
    {
        title: 'Excessive Contrast',
        component: ExcessiveContrast,
        solution: ExcessiveContrast,
        improvement:
            'Use a charcoal surface and off-white text to soften the dark theme while keeping text clearly readable.',
        pureBlackBackground: true,
    },
    {
        title: 'Placeholder Used as the Label',
        component: PlaceholderAsLabel,
        solution: Solutions.LabeledMotor,
        improvement:
            'Keep a visible label above the field so its meaning remains clear after typing.',
    },
    {
        title: 'Vague Error Message',
        component: VagueErrorMessage,
        solution: Solutions.ActionableError,
        improvement:
            'Explain what is wrong and how to fix it, including the units and an example of a valid value.',
    },
    {
        title: 'Error Is Far From the Problem',
        component: ErrorFarFromProblem,
        solution: Solutions.InlineError,
        improvement:
            'Place the error beside its field, associate it with the input, and focus the field that needs attention.',
    },
    {
        title: 'User Input Disappears After an Error',
        component: InputDisappearsAfterError,
        solution: Solutions.PreservedInput,
        improvement:
            'Keep all entries when saving fails and let the user retry without re-entering their work.',
    },
    {
        title: 'Improper Input Type',
        component: ImproperInputType,
        solution: Solutions.SizeSelect,
        improvement:
            'Use a dropdown for a fixed set of choices so users can see and select a valid value.',
    },
    {
        title: 'Color Is the Only Status Indicator',
        component: ColorOnlyStatus,
        solution: Solutions.TextStatus,
        improvement:
            'Pair color with a text status and an icon so the meaning does not depend on color perception.',
    },
    {
        title: 'Low-Contrast Secondary Information',
        component: LowContrastInformation,
        solution: LowContrastInformation,
        improvement: 'Give supporting text and controls sufficient contrast to remain readable.',
    },
    {
        title: 'Invisible Keyboard Focus',
        component: InvisibleKeyboardFocus,
        solution: InvisibleKeyboardFocus,
        improvement:
            'Show a clear focus outline so keyboard users can see which control will respond. Try the Tab key.',
    },
    {
        title: 'Tiny / Crowded Click Targets',
        component: TinyCrowdedTargets,
        solution: Solutions.ComfortableTargets,
        improvement:
            'Use comfortably sized, spaced buttons with meaningful labels to reduce accidental clicks.',
    },
    {
        title: 'Drag Is the Only Way to Perform an Action',
        component: DragOnlyAction,
        solution: Solutions.KeyboardReordering,
        improvement:
            'Provide Up and Down buttons that work with a keyboard, mouse, or touch, and announce the new order.',
    },
    {
        title: 'Ungrouped Sidebar Controls',
        component: UngroupedAnalysisSidebar,
        solution: GroupedAnalysisSidebar,
        improvement:
            'Group related settings and actions under simple headings. Add a relevant icon to each section and leave space between groups so users can quickly find what they need.',
    },
    {
        title: 'Unclear Sample Identity',
        component: ScientificPatterns.UnclearSampleIdentity,
        solution: ScientificPatterns.ClearSampleIdentity,
        improvement:
            'Keep sample name, run ID, acquisition time, and experiment context visible so users can confidently identify the selected result.',
    },
    {
        title: 'Analysis Context Resets Between Views',
        component: ScientificPatterns.LostAnalysisContext,
        solution: ScientificPatterns.PreservedAnalysisContext,
        improvement:
            'Preserve zoom and the selected channel when switching between chart and table. Reset the view only when the user requests it.',
    },
    {
        title: 'Hidden Acquisition Cost',
        component: ScientificPatterns.HiddenAcquisitionCost,
        solution: ScientificPatterns.VisibleAcquisitionCost,
        improvement:
            'Preview the estimated runtime, data volume, and number of measurements before starting. Update estimates as settings change and show the assumptions.',
    },
    {
        title: 'Stale Data Looks Live',
        component: ScientificPatterns.StaleDataLooksLive,
        solution: ScientificPatterns.ClearlyStaleData,
        improvement:
            'Mark disconnected readings as stale, show their age, and distinguish the last known value from a live measurement.',
    },
    {
        title: 'False Precision',
        component: ScientificPatterns.FalsePrecision,
        solution: ScientificPatterns.MeaningfulPrecision,
        improvement:
            'Show meaningful decimal places and measurement uncertainty instead of implying accuracy with excessive digits.',
    },
];

export default function PatternTrainingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [patternInstance, setPatternInstance] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const pattern = patterns[currentIndex];
    const CurrentPattern = pattern.component;
    const CurrentSolution = pattern.solution;

    function move(direction: -1 | 1) {
        setShowSolution(false);
        setCurrentIndex((index) => Math.min(patterns.length - 1, Math.max(0, index + direction)));
    }

    return (
        <main
            className={`pattern-training-page${patterns[currentIndex].pureBlackBackground ? ' pure-black-pattern' : ''}`}
        >
            <header className="pattern-training-header">
                <h1>Pattern Training</h1>
            </header>
            <div className={`pattern-training-body${showSolution ? ' showing-solution' : ''}`}>
                <div className="pattern-original-pane">
                    <div className="pattern-example-content">
                        {showSolution && <p className="comparison-label">Original</p>}
                        <CurrentPattern key={`${currentIndex}-${patternInstance}`} />
                    </div>
                </div>
                {showSolution && (
                    <section
                        id="pattern-solution"
                        className={`pattern-solution${pattern.pureBlackBackground ? ' softened-dark-solution' : ''}`}
                        aria-label={`Solution: ${pattern.title}`}
                    >
                        <div className="pattern-example-content">
                            <p className="comparison-label">Solution</p>
                            <p className="solution-explanation">{pattern.improvement}</p>
                            <div className="pattern-demo">
                                <CurrentSolution key={`${currentIndex}-${patternInstance}`} />
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <footer className="pattern-training-footer">
                <div>
                    <strong>
                        Pattern {currentIndex + 1} of {patterns.length}
                    </strong>
                    <button
                        className="solution-toggle"
                        type="button"
                        aria-expanded={showSolution}
                        aria-controls="pattern-solution"
                        onClick={() => setShowSolution((visible) => !visible)}
                    >
                        {showSolution ? 'Hide solution' : 'Show solution'}
                    </button>
                </div>
                <button
                    className="refresh-pattern-button"
                    type="button"
                    onClick={() => setPatternInstance((instance) => instance + 1)}
                >
                    Refresh Pattern
                </button>
                <nav aria-label="Pattern navigation">
                    <button
                        type="button"
                        onClick={() => move(-1)}
                        disabled={currentIndex === 0}
                        aria-label="Previous pattern"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={() => move(1)}
                        disabled={currentIndex === patterns.length - 1}
                        aria-label="Next pattern"
                    >
                        →
                    </button>
                </nav>
            </footer>
        </main>
    );
}
