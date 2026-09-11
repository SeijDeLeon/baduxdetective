import { useState } from 'react';

const runNames = [
    'run_0842 / sample-A-long-name',
    'run_0843 / sample-B-long-name',
    'run_0844 / sample-C-long-name',
    'run_0839 / sample-A-old',
    'run_0836 / sample-B-old',
    'run_0831 / sample-C-old',
];

export default function Page3() {
    const [activeRuns, setActiveRuns] = useState([0, 1, 2]);
    const [normalize, setNormalize] = useState(true);
    const [baseline, setBaseline] = useState(true);
    const [smooth, setSmooth] = useState(true);
    const [smoothing, setSmoothing] = useState(7);
    const [warning, setWarning] = useState(true);
    const [exported, setExported] = useState(false);

    return (
        <main className="workshop-page scan-page">
            <header className="scan-title">
                ♻　ScanView — Fe K-edge comparison <span>—　□　×</span>
            </header>
            <nav className="scan-menu">File　 Edit　 View　 Process　 Tools　 Window　 Help</nav>
            <div className="scan-layout">
                <aside className="runs-panel">
                    <h2>
                        Runs <span>«</span>
                    </h2>
                    <input placeholder="⌕  Search runs..." />
                    <h3>⌄ Runs</h3>
                    {runNames.map((name, index) => (
                        <label key={name}>
                            <input
                                type="checkbox"
                                checked={activeRuns.includes(index)}
                                onChange={() =>
                                    setActiveRuns((runs) =>
                                        runs.includes(index)
                                            ? runs.filter((run) => run !== index)
                                            : [...runs, index],
                                    )
                                }
                            />
                            <i className={`run-color run-${index}`} />
                            <span>{name}</span>
                        </label>
                    ))}
                </aside>
                <section className="scan-center">
                    <div className="plot-tools">
                        {['☝', '⌕+', '⌾', '↻', '∿', '⌁'].map((tool, index) => (
                            <button
                                className={index === 4 && smooth ? 'selected' : ''}
                                onClick={() => index === 4 && setSmooth(!smooth)}
                                key={index}
                            >
                                {tool}
                            </button>
                        ))}
                    </div>
                    <div className="science-plot">
                        <h1>Normalized μ(E)</h1>
                        <div className="plot-area">
                            <span className="plot-y">Intensity</span>
                            <div className="roi">ROI 1</div>
                            {activeRuns.slice(0, 3).map((run) => (
                                <div className={`scan-trace scan-trace-${run}`} key={run} />
                            ))}
                            <div className="legend">
                                {activeRuns.slice(0, 3).map((run) => (
                                    <span key={run}>
                                        <i className={`run-color run-${run}`} /> 084{run + 2}
                                    </span>
                                ))}
                            </div>
                            <div className="ticks">
                                <span>6.9</span>
                                <span>7.0</span>
                                <span>7.1</span>
                                <span>7.2</span>
                                <span>7.3</span>
                            </div>
                            <b>Energy</b>
                        </div>
                    </div>
                    {warning && (
                        <div className="scan-warning">
                            ⚠　Run 0843 calibration differs by 0.8{' '}
                            <button onClick={() => setWarning(false)}>×</button>
                        </div>
                    )}
                </section>
                <aside className="processing-panel">
                    <h2>Processing　⌃</h2>
                    <label>
                        <input
                            type="checkbox"
                            checked={normalize}
                            onChange={() => setNormalize(!normalize)}
                        />{' '}
                        Normalize
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={baseline}
                            onChange={() => setBaseline(!baseline)}
                        />{' '}
                        Remove baseline
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={smooth}
                            onChange={() => setSmooth(!smooth)}
                        />{' '}
                        Smooth
                    </label>
                    <div className="smooth-control">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={smoothing}
                            onChange={(event) => setSmoothing(Number(event.target.value))}
                        />
                        <output>{smoothing}</output>
                    </div>
                    <div className="calibration">
                        <label>
                            Calibration:{' '}
                            <select>
                                <option>Auto</option>
                                <option>Manual</option>
                            </select>
                        </label>
                        <button>Apply to all</button>
                    </div>
                    <button className="history">›　History (4)</button>
                </aside>
            </div>
            <footer className="scan-footer">
                <span>Cursor: 7112.4 eV</span>
                <div>
                    <select>
                        <option>CSV • displayed data</option>
                    </select>
                    <button onClick={() => setExported(true)}>Export</button>
                </div>
            </footer>
            {exported && (
                <div className="bad-toast">
                    Export complete<button onClick={() => setExported(false)}>Dismiss</button>
                </div>
            )}
        </main>
    );
}
