import { useState } from 'react';

type QueueRow = {
    id: string;
    position: string;
    exposure: string;
    osc: string;
    energy: string;
    frames: string;
    directory: string;
};

const initialRows: QueueRow[] = [
    {
        id: 'LYS-001',
        position: 'A1',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys001',
    },
    {
        id: 'LYS-002',
        position: 'A2',
        exposure: '0.20s',
        osc: '0.1',
        energy: '12700 eV',
        frames: '1800',
        directory: '/data/px24819/lys002',
    },
    {
        id: 'LYS_003',
        position: 'A3',
        exposure: '200',
        osc: '.1',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/LYS-003',
    },
    {
        id: '',
        position: 'A4',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys001',
    },
    {
        id: 'LYS-005',
        position: 'A4',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys005',
    },
    {
        id: 'LYS-006',
        position: 'B1',
        exposure: '-0.2',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys006',
    },
    {
        id: 'LYS-007',
        position: 'B2',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys007',
    },
    {
        id: 'LYS-008',
        position: 'B3',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys008',
    },
    {
        id: 'LYS-009',
        position: 'B4',
        exposure: '0.20',
        osc: '0.1°',
        energy: '12.7',
        frames: '1800',
        directory: '/data/px24819/lys009',
    },
];

export default function Page2() {
    const [rows, setRows] = useState(initialRows);
    const [selected, setSelected] = useState([1, 2, 3]);
    const [bulkOpen, setBulkOpen] = useState(true);
    const [bulkValue, setBulkValue] = useState('');
    const [toast, setToast] = useState('Import completed with 3 warnings');

    function updateRow(index: number, field: keyof QueueRow, value: string) {
        setRows((current) =>
            current.map((row, rowIndex) => (rowIndex === index ? { ...row, [field]: value } : row)),
        );
    }

    function applyBulk() {
        setRows((current) =>
            current.map((row, index) =>
                selected.includes(index) ? { ...row, exposure: bulkValue } : row,
            ),
        );
        setBulkOpen(false);
    }

    return (
        <main className="workshop-page queue-page">
            <header className="queue-header">
                <div>
                    <h1>Experiment PX-24819 / Queue Setup</h1>
                    <p>
                        <a>Home</a> / <a>Experiments</a> / <a>PX-24819</a> / <a>Setup</a> / Queue
                    </p>
                </div>
                <span>18 samples　|　Est. runtime: 06:40　|　Storage: 81%　|　13:06</span>
            </header>
            <section className="queue-toolbar">
                <button
                    onClick={() =>
                        setRows([
                            ...rows,
                            {
                                id: '',
                                position: '',
                                exposure: '',
                                osc: '',
                                energy: '',
                                frames: '',
                                directory: '',
                            },
                        ])
                    }
                >
                    Add
                </button>
                <button
                    onClick={() => selected.length && setRows([...rows, { ...rows[selected[0]] }])}
                >
                    Duplicate
                </button>
                <button
                    onClick={() => setRows(rows.filter((_, index) => !selected.includes(index)))}
                >
                    Delete
                </button>
                <div className="bulk-wrap">
                    <button onClick={() => setBulkOpen(!bulkOpen)}>Apply to selected　⌄</button>
                    {bulkOpen && (
                        <div className="bulk-popover">
                            <select>
                                <option>Exposure</option>
                                <option>Energy</option>
                            </select>
                            <input
                                autoFocus
                                value={bulkValue}
                                onChange={(event) => setBulkValue(event.target.value)}
                            />
                            <button onClick={applyBulk}>Apply</button>
                        </div>
                    )}
                </div>
                <button onClick={() => setToast('Import completed with 3 warnings')}>
                    Import CSV
                </button>
                <button className="primary" onClick={() => setToast('Queue submitted')}>
                    Run Queue
                </button>
            </section>
            <div className="queue-table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>#</th>
                            <th>Sample ID</th>
                            <th>Position</th>
                            <th>Exposure</th>
                            <th>Osc.</th>
                            <th>Energy</th>
                            <th>Frames</th>
                            <th>Directory</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr className={index === 3 ? 'row-error' : ''} key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(index)}
                                        onChange={() =>
                                            setSelected((items) =>
                                                items.includes(index)
                                                    ? items.filter((item) => item !== index)
                                                    : [...items, index],
                                            )
                                        }
                                    />
                                </td>
                                <td>{index + 1}</td>
                                {(Object.keys(row) as (keyof QueueRow)[]).map((field) => (
                                    <td key={field}>
                                        <input
                                            className={
                                                index === 5 && field === 'exposure'
                                                    ? 'cell-warning'
                                                    : ''
                                            }
                                            value={row[field]}
                                            onChange={(event) =>
                                                updateRow(index, field, event.target.value)
                                            }
                                        />
                                    </td>
                                ))}
                                <td>
                                    <button
                                        className="remove-row"
                                        onClick={() =>
                                            setRows(
                                                rows.filter((_, rowIndex) => rowIndex !== index),
                                            )
                                        }
                                    >
                                        ×
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer className="queue-footer">Autosaved 12:41</footer>
            {toast && (
                <div className="bad-toast">
                    {toast}
                    <button onClick={() => setToast('')}>Dismiss</button>
                </div>
            )}
        </main>
    );
}
