import { useState } from 'react';

const courses = [
    ['General Safety Orientation', 'Complete', 'Aug 12', 'Aug 12', 'RETAKE', 'green'],
    ['Radiation Worker I', 'Expiring', 'Sep 3', 'Sep 2', 'Start', 'orange'],
    ['Beamline 7A Local Induction', 'Required', '—', '—', 'OPEN', 'red'],
    ['Cybersecurity Basics', 'Not needed?', '—', '—', 'N/A', 'gray'],
    ['Oxygen Deficiency Hazard', '', 'Jul 18', 'Aug 18', '↗', 'green'],
];

export default function Page7() {
    const [notice, setNotice] = useState('');
    return (
        <main className="workshop-page training-page">
            <aside className="training-rail">
                <b>◴</b>
                <span>▣</span>
                <span>▦</span>
                <span>♧</span>
                <span>▰</span>
                <i>⚙</i>
            </aside>
            <header className="training-header">
                <h1>Nexus User Access</h1>
                <nav>
                    <b>⌂　Dashboard</b>
                    <span>◇　Training</span>
                    <span>▱　Documents</span>
                    <span>♙　Visits</span>
                </nav>
                <div>♧　ⓘ　◎</div>
            </header>
            <div className="training-content">
                <section>
                    <div className="training-welcome">
                        <h2>Welcome, Dr. Rivera</h2>
                        <p>Your access status</p>
                    </div>
                    <div className="training-summary">
                        <div className="donut">
                            <strong>72%</strong>
                        </div>
                        <div className="badge-card">
                            <span>▣</span>
                            <div>
                                <b>
                                    Badge status: <em>Pending</em>
                                </b>
                                <p>Visit begins Sep 1</p>
                            </div>
                        </div>
                    </div>
                    <section className="training-table">
                        <h2>Required training</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Status</th>
                                    <th>Completed</th>
                                    <th>Expires</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course[0]}>
                                        <td>{course[0]}</td>
                                        <td>
                                            <i className={`course-dot ${course[5]}`} />
                                            {course[1]}
                                        </td>
                                        <td>{course[2]}</td>
                                        <td>{course[3]}</td>
                                        <td>
                                            <button
                                                className={`course-action action-${course[4].toLowerCase()}`}
                                                onClick={() =>
                                                    setNotice(`${course[4]}: ${course[0]}`)
                                                }
                                            >
                                                {course[4]}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </section>
                <aside className="training-aside">
                    <div className="outstanding">
                        ⚠{' '}
                        <p>
                            You have outstanding requirements.
                            <button onClick={() => setNotice('Opening help in a new window')}>
                                Learn more
                            </button>
                        </p>
                    </div>
                    <section>
                        <h2>Need help?</h2>
                        {['ⓘ　Access help　↗', '◇　Training support　↗', '▤　User office　↗'].map(
                            (item) => (
                                <button onClick={() => setNotice(item)} key={item}>
                                    {item}
                                </button>
                            ),
                        )}
                    </section>
                    <button
                        className="request-badge"
                        onClick={() => setNotice('Badge request submitted')}
                    >
                        ▣　 Request badge
                    </button>
                </aside>
            </div>
            {notice && (
                <div className="bad-toast">
                    {notice}
                    <button onClick={() => setNotice('')}>Dismiss</button>
                </div>
            )}
        </main>
    );
}
