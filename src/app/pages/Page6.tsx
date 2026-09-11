import { useState } from 'react';

const files = [
    'detector_0001.tif',
    'detector_0002.tif',
    'detector_0003.tif',
    'detector_0004.tif',
    'spectrum_0001.dat',
    'metadata.json',
    'calibration_20250512.json',
    'process.log',
    'preview_0001.jpg',
];

export default function Page6() {
    const [format, setFormat] = useState('CSV');
    const [metadata, setMetadata] = useState(false);
    const [range, setRange] = useState('Current view');
    const [destination, setDestination] = useState('/shared/outgoing/final');
    const [overwrite, setOverwrite] = useState(true);
    const [notice, setNotice] = useState('');
    return (
        <main className="workshop-page export-page">
            <div className="archive-banner">▰　Raw archive: read/write</div>
            <aside className="file-nav">
                <h2>▱　Data Explorer　☰</h2>
                {[
                    '⌂ Dashboard',
                    '⌕ Search',
                    '♙ Experiments',
                    '♧ Samples',
                    '▱ Datasets',
                    '▰ Files',
                    '☁ Transfers',
                    '☷ Jobs',
                    '☷ Logs',
                    '▣ Storage',
                    '⚙ Settings',
                ].map((item) => (
                    <button className={item.includes('Files') ? 'active' : ''} key={item}>
                        {item}
                    </button>
                ))}
            </aside>
            <section className="file-browser">
                <div className="file-tools">
                    ⌂ / raw / 2025 / 05 / 12 / experiment_0427 <span>☷　▦　 Filters</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>☑　Name ↑</th>
                            <th>Size</th>
                            <th>Type</th>
                            <th>Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={file}>
                                <td>☑　{file}</td>
                                <td>{index < 4 ? '2.3 GB' : '1.2 GB'}</td>
                                <td>{file.split('.').pop()?.toUpperCase()} file</td>
                                <td>2025-05-12 08:{15 + index}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <div className="export-scrim" />
            <section className="export-modal">
                <button className="modal-close" onClick={() => setNotice('Export closed')}>
                    ×
                </button>
                <h1>Export</h1>
                <small>42 files selected (1.8 TB)</small>
                <label>
                    Format
                    <select value={format} onChange={(event) => setFormat(event.target.value)}>
                        <option>CSV</option>
                        <option>HDF5</option>
                        <option>ZIP</option>
                    </select>
                    <em>Recommended</em>
                </label>
                <fieldset>
                    <legend>Data</legend>
                    {['Raw data', 'Processed data', 'Preview images', 'Logs'].map((item) => (
                        <label key={item}>
                            <input type="checkbox" defaultChecked />
                            {item}
                        </label>
                    ))}
                </fieldset>
                <fieldset className="metadata">
                    <legend>Metadata</legend>
                    <label>
                        <input
                            type="checkbox"
                            checked={metadata}
                            onChange={() => setMetadata(!metadata)}
                        />
                        Include metadata
                    </label>
                    <div>
                        {[
                            'Instrument',
                            'Calibration',
                            'Sample',
                            'Processing history',
                            'User notes',
                        ].map((item) => (
                            <label key={item}>
                                <input type="checkbox" defaultChecked disabled />
                                {item}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Range</legend>
                    {['All', 'Current view', 'Selected region'].map((item) => (
                        <label key={item}>
                            <input
                                type="radio"
                                name="range"
                                checked={range === item}
                                onChange={() => setRange(item)}
                            />
                            {item}
                        </label>
                    ))}
                </fieldset>
                <label>
                    Destination
                    <div className="input-row">
                        <input
                            value={destination}
                            onChange={(event) => setDestination(event.target.value)}
                        />
                        <button>▱</button>
                    </div>
                </label>
                <label className="inline-check">
                    <input
                        type="checkbox"
                        checked={overwrite}
                        onChange={() => setOverwrite(!overwrite)}
                    />
                    Replace files with same name
                </label>
                <button className="clean-link" onClick={() => setNotice('Destination cleaned')}>
                    Clean destination first
                </button>
                <label>
                    File naming
                    <input defaultValue="{sample}_{scan}.csv" />
                    <small>Preview: sample_001.csv, sample_001.csv, sample_001.csv...</small>
                </label>
                <label>
                    Compression
                    <select defaultValue="Maximum">
                        <option>Maximum</option>
                        <option>Fast</option>
                    </select>
                </label>
                <p>
                    Estimated size:　Calculating…　<span className="spinner">◌</span>
                </p>
                <em>Export may take several hours. Keep this window open.</em>
                <footer>
                    <button onClick={() => setNotice('Cancelled')}>Cancel</button>
                    <button onClick={() => setNotice('Preset saved')}>Save preset</button>
                    <button className="primary" onClick={() => setNotice('Export started')}>
                        Export
                    </button>
                </footer>
            </section>
            {notice && (
                <div className="bad-toast">
                    {notice}
                    <button onClick={() => setNotice('')}>Dismiss</button>
                </div>
            )}
        </main>
    );
}
