import { Link } from 'react-router';

const pages = [
    ['Beamline Control Console', 'Confirm readiness, set photon energy, and begin acquisition.'],
    ['Sample Queue Builder', 'Correct imported samples and submit the overnight queue.'],
    ['Scan Results Explorer', 'Compare samples, select an energy region, and export data.'],
    ['Experiment Proposal Form', 'Complete and submit a scientific proposal.'],
    ['Vacuum Interlock Alarm Panel', 'Identify an initiating condition and respond to alarms.'],
    ['Data Export Dialog', 'Create a reproducible export without altering raw data.'],
    ['Lab Access Training Portal', 'Find the access blocker and verify eligibility.'],
    ['Beamtime Schedule', 'Update a delayed schedule and hand it over.'],
];

export default function HomePage() {
    return (
        <main className="home-page">
            <p className="home-page__eyebrow">Bad UX Detective</p>
            <h1>Workshop exercise directory</h1>
            <p className="home-page__intro">
                Choose an intentionally flawed interface to investigate.
            </p>
            <nav aria-label="Exercise page directory">
                <ul className="page-directory">
                    {pages.map(([title, task], index) => (
                        <li key={title}>
                            <Link to={`/page-${index + 1}`}>
                                <span>Case {index + 1}</span>
                                <strong>{title}</strong>
                                <small>{task}</small>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link to="/pattern-training">
                            <span>Training</span>
                            <strong>Pattern Training</strong>
                            <small>Practice recognizing 20 common bad interaction patterns.</small>
                        </Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
}
