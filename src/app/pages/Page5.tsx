import { useState } from 'react';

const alarms = [
    ['14:31:45.221', 'M', 'UNACK', 'RF-02', 'LLRF_02_PWR', 'RF power low', '18'],
    ['14:31:50.311', 'C', 'UNACK', 'VAC-04', 'PIRG_04_02', 'Vacuum high', '3.1E-5'],
    ['14:32:00.108', 'm', 'ACK', 'MAG-03', 'PS_03_06', 'Power supply temp high', '72'],
    ['14:32:02.677', 'M', 'RTN', 'BPM-05', 'BPM_05_11', 'BPM signal lost', 'BAD'],
    ['14:32:04.992', 'C', 'UNACK', 'COOL-01', 'CW_FLOW_01', 'Cooling water flow low', '12'],
    ['14:32:06.318', 'm', 'RTN/UNACK', 'INTLK-01', 'DOOR_01_07', 'Access door open', 'OPEN'],
    ['14:32:07.482', 'm', 'UNACK', 'FE-07', 'VGC_07_14', 'Gauge comm loss', 'BAD'],
    ['14:32:08.305', 'M', 'UNACK', 'CRYO-02', 'LT_02_03', 'Helium level low', '18'],
    ['14:32:09.017', 'M', 'UNACK', 'FE-07', 'VV_07_03', 'Valve not open', '0'],
    ['14:32:09.553', 'm', 'ACK', 'PS-01', 'PS_01_04', 'Output current high', '124'],
    ['14:32:10.201', 'C', 'UNACK', 'FE-07', 'PSH_07_01', 'Pressure high', '2.4E-5'],
    ['14:32:10.998', 'M', 'RTN', 'RF-01', 'KLY_01_ILK', 'Klystron interlock', 'TRIP'],
    ['14:32:11.890', 'C', 'UNACK', 'FE-07', 'BL07_PERMIT', 'Beam permit lost', 'FALSE'],
    ['14:32:12.667', 'm', 'UNACK', 'DIAG-06', 'BCM_06_01', 'Beam current low', '0'],
    ['14:32:13.441', 'M', 'ACK', 'VAC-03', 'PIP_03_05', 'Pump fault', 'FAULT'],
    ['14:32:14.113', 'M', 'UNACK', 'FE-07', 'SHUTTER_07', 'Shutter closed', 'CLS'],
    ['14:32:14.889', 'C', 'RTN/UNACK', 'POWER-01', 'UPS_01_STATUS', 'UPS on battery', 'ON'],
];

export default function Page5() {
    const [tab, setTab] = useState('ALL (127)');
    const [checked, setChecked] = useState<number[]>([]);
    const [notice, setNotice] = useState('');
    return (
        <main className="workshop-page alarm-page">
            <header className="alarm-header">
                <h1>Accelerator Alarm Summary</h1>
                <div>
                    <b>14:32:43</b>
                    <span>LIVE</span>
                    <small>Last update 14:32:15</small>
                </div>
            </header>
            <nav className="alarm-tabs">
                {['ALL (127)', 'UNACK (31)', 'ACTIVE (19)', 'SHELVED (8)'].map((item) => (
                    <button
                        className={tab === item ? 'active' : ''}
                        onClick={() => setTab(item)}
                        key={item}
                    >
                        {item}
                    </button>
                ))}
            </nav>
            <div className="alarm-layout">
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Pri</th>
                                <th>State</th>
                                <th>Area</th>
                                <th>Tag</th>
                                <th>Description</th>
                                <th>Value</th>
                                <th>Ack</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alarms.map((alarm, index) => (
                                <tr key={alarm[0]}>
                                    {alarm.map((value, cell) => (
                                        <td key={cell}>
                                            {cell === 1 ? (
                                                <b className="priority">{value}</b>
                                            ) : (
                                                value
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checked.includes(index)}
                                            onChange={() =>
                                                setChecked((items) =>
                                                    items.includes(index)
                                                        ? items.filter((item) => item !== index)
                                                        : [...items, index],
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="alarm-actions">
                        {['ACK SELECTED', 'ACK PAGE', 'ACK ALL', 'SHELVE', 'RESET'].map(
                            (action) => (
                                <button
                                    onClick={() => {
                                        setNotice(`${action} complete`);
                                        if (action.startsWith('ACK')) setChecked([]);
                                    }}
                                    key={action}
                                >
                                    {action}
                                </button>
                            ),
                        )}
                    </div>
                </section>
                <aside>
                    <section className="topology">
                        <h2>Sector Topology</h2>
                        {['06', '07', '08'].map((sector) => (
                            <button
                                className={`sector sector-${sector}`}
                                onClick={() => setNotice(`Sector ${sector}`)}
                                key={sector}
                            >
                                {sector}
                            </button>
                        ))}
                    </section>
                    <section className="recommended">
                        <h2>Recommended action</h2>
                        <p>See SOP VAC-12</p>
                        <span>▤</span>
                    </section>
                </aside>
            </div>
            <footer>Audio muted by operator m.chen at 12:05</footer>
            {notice && (
                <div className="alarm-notice" onClick={() => setNotice('')}>
                    {notice}
                </div>
            )}
        </main>
    );
}
