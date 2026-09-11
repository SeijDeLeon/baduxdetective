import { useState, type ComponentType, type DragEvent, type FormEvent } from 'react';

import './PatternTrainingPage.css';

type Pattern = {
    title: string;
    component: ComponentType;
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
            <span className="bad-text-button" onClick={() => setStarted(true)}>
                Start Scan
            </span>
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

function GenericButtonLabels() {
    const [message, setMessage] = useState('');
    return (
        <DemoFrame title="Generic Button Labels">
            <form
                className="bad-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setMessage('Your changes were processed.');
                }}
            >
                <h2>Motor Options</h2>
                <label>
                    Velocity <input type="number" defaultValue="2.5" />
                </label>
                <button>Submit</button>
                {message && (
                    <div className="bad-dialog">
                        <p>{message}</p>
                        <button type="button" onClick={() => setMessage('')}>
                            OK
                        </button>
                    </div>
                )}
            </form>
        </DemoFrame>
    );
}

function MysteryIconButton() {
    const [action, setAction] = useState('Select a toolbar action.');
    return (
        <DemoFrame title="Mystery Icon Button">
            <h2>Run Controls</h2>
            <div className="mystery-toolbar">
                <button onClick={() => setAction('Settings opened')}>⚙</button>
                <button onClick={() => setAction('Refreshed')}>↻</button>
                <button onClick={() => setAction('Downloaded')}>⤓</button>
                <button onClick={() => setAction('More opened')}>⋮</button>
            </div>
            <p>{action}</p>
        </DemoFrame>
    );
}

function HiddenClickableThing() {
    const [open, setOpen] = useState(false);
    return (
        <DemoFrame title="Clickable Thing Doesn't Look Clickable">
            <h2>Connected Detectors</h2>
            <p className="plain-clickable" onClick={() => setOpen(true)}>
                Pilatus 2M
            </p>
            <p>Eiger X 4M</p>
            {open && (
                <div className="bad-panel">
                    <h3>Pilatus 2M Settings</h3>
                    <label>
                        Threshold <input defaultValue="4.5 keV" />
                    </label>
                    <button onClick={() => setOpen(false)}>Close</button>
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
                    Exposure time{' '}
                    <input value={value} onChange={(event) => setValue(event.target.value)} />
                </label>
                <button onClick={() => window.setTimeout(() => undefined, 3000)}>
                    Save Settings
                </button>
            </div>
        </DemoFrame>
    );
}

function DoubleSubmissionAllowed() {
    const [queue, setQueue] = useState<string[]>([]);
    function add() {
        window.setTimeout(() => setQueue((items) => [...items, 'Cu calibration scan']), 900);
    }
    return (
        <DemoFrame title="Double-Submission Allowed">
            <h2>Scan Queue</h2>
            <button onClick={add}>Add to Queue</button>
            <ol>
                {queue.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                ))}
            </ol>
        </DemoFrame>
    );
}

function DisabledWithoutExplanation() {
    return (
        <DemoFrame title="Disabled With No Explanation">
            <h2>New Scan</h2>
            <label>
                Exposure <input defaultValue="1.0" /> seconds
            </label>
            <div>
                <button disabled>Start Scan</button>
            </div>
        </DemoFrame>
    );
}

function DangerousActionNoRecovery() {
    const [rows, setRows] = useState(['Sample alignment', 'XANES scan', 'Dark frame']);
    return (
        <DemoFrame title="Dangerous Action With No Recovery">
            <h2>Queue</h2>
            <ul className="delete-list">
                {rows.map((row) => (
                    <li key={row}>
                        <span>{row}</span>
                        <button
                            onClick={() => setRows((items) => items.filter((item) => item !== row))}
                        >
                            🗑
                        </button>
                    </li>
                ))}
            </ul>
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

function RequirementsAfterFailure() {
    const [step, setStep] = useState('5');
    const [error, setError] = useState(false);
    return (
        <DemoFrame title="Requirements Revealed Only After Failure">
            <form
                className="bad-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setError(true);
                }}
            >
                <h2>Line Scan</h2>
                <label>
                    Step size{' '}
                    <input
                        value={step}
                        onChange={(event) => {
                            setStep(event.target.value);
                            setError(false);
                        }}
                    />
                </label>
                <button>Start Scan</button>
                {error && <p className="bad-error">Step must include units.</p>}
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
    { title: 'Weak Interaction Affordance', component: WeakInteractionAffordance },
    { title: 'Ambiguous Confirmation Actions', component: AmbiguousConfirmationActions },
    { title: 'Destructive Action Has Equal Emphasis', component: EqualDestructiveEmphasis },
    { title: 'Generic Button Labels', component: GenericButtonLabels },
    { title: 'Mystery Icon Button', component: MysteryIconButton },
    { title: "Clickable Thing Doesn't Look Clickable", component: HiddenClickableThing },
    { title: 'No Feedback After an Action', component: NoActionFeedback },
    { title: 'Double-Submission Allowed', component: DoubleSubmissionAllowed },
    { title: 'Disabled With No Explanation', component: DisabledWithoutExplanation },
    { title: 'Dangerous Action With No Recovery', component: DangerousActionNoRecovery },
    { title: 'Placeholder Used as the Label', component: PlaceholderAsLabel },
    { title: 'Vague Error Message', component: VagueErrorMessage },
    { title: 'Error Is Far From the Problem', component: ErrorFarFromProblem },
    { title: 'User Input Disappears After an Error', component: InputDisappearsAfterError },
    { title: 'Requirements Revealed Only After Failure', component: RequirementsAfterFailure },
    { title: 'Color Is the Only Status Indicator', component: ColorOnlyStatus },
    { title: 'Low-Contrast Secondary Information', component: LowContrastInformation },
    { title: 'Invisible Keyboard Focus', component: InvisibleKeyboardFocus },
    { title: 'Tiny / Crowded Click Targets', component: TinyCrowdedTargets },
    { title: 'Drag Is the Only Way to Perform an Action', component: DragOnlyAction },
];

export default function PatternTrainingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [patternInstance, setPatternInstance] = useState(0);
    const CurrentPattern = patterns[currentIndex].component;

    function move(direction: -1 | 1) {
        setCurrentIndex((index) => Math.min(patterns.length - 1, Math.max(0, index + direction)));
    }

    return (
        <main className="pattern-training-page">
            <header className="pattern-training-header">
                <h1>Pattern Training</h1>
            </header>
            <div className="pattern-training-body">
                <CurrentPattern key={`${currentIndex}-${patternInstance}`} />
            </div>
            <footer className="pattern-training-footer">
                <div>
                    <strong>
                        Pattern {currentIndex + 1} of {patterns.length}
                    </strong>
                    <span>{patterns[currentIndex].title}</span>
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
