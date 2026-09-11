import { useState } from 'react';

const abstractText =
    'The performance and lifespan of next-generation batteries are strongly influenced by structural changes that occur in electrode materials during charge–discharge cycles. However, many of these changes involve transient or disordered states that are not well understood at the atomic scale.\n\nIn this proposal, we will use advanced synchrotron techniques to investigate the atomic and electronic structure of candidate electrode materials under operando conditions. By combining high-energy X-ray diffraction and X-ray absorption spectroscopy, we aim to correlate structural evolution with electrochemical performance.\n\nThe results will provide insight into degradation mechanisms and inform the design of more stable and efficient battery materials.';

export default function Page4() {
    const [abstract, setAbstract] = useState(abstractText);
    const [samples, setSamples] = useState([0]);
    const [saved, setSaved] = useState('');
    const [submitted, setSubmitted] = useState(false);

    return (
        <main className="workshop-page proposal-page">
            <header className="proposal-header">
                <strong>✣ NEXUS LIGHT SOURCE</strong>
                <nav>
                    Home　 <b>Proposals</b>　 Experiments　 Data　 User Office　 Help⌄
                </nav>
                <span>JS　 Jane Smith　⌄</span>
            </header>
            <div className="proposal-title">
                <h1>New General User Proposal</h1>
                <span>Deadline today, 17:00</span>
            </div>
            <div className="proposal-steps">
                {['Basics', 'Science', 'Samples', 'Team', 'Review'].map((step, index) => (
                    <span className={index === 1 ? 'current' : ''} key={step}>
                        <i>{index + 1}</i>
                        {step}
                    </span>
                ))}
            </div>
            <div className="proposal-layout">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setSubmitted(true);
                    }}
                >
                    <h2>Scientific case</h2>
                    <label className="wide-label">
                        Title*
                        <input defaultValue="Atomic-scale structure and dynamics of battery electrode materials under operando conditions" />
                    </label>
                    <label className="wide-label">
                        Technique*
                        <select defaultValue="Select">
                            <option>Select</option>
                            <option>X-ray diffraction</option>
                        </select>
                    </label>
                    <label className="wide-label">
                        Abstract*
                        <textarea
                            value={abstract}
                            onChange={(event) => setAbstract(event.target.value)}
                        />
                        <small>{abstract.length + 1516} / 2,000</small>
                    </label>
                    <label className="wide-label">
                        Why is synchrotron radiation required?*
                        <textarea />
                    </label>
                    <h2>Samples</h2>
                    {samples.map((sample) => (
                        <div className="sample-fields" key={sample}>
                            <label>
                                Material name
                                <input />
                            </label>
                            <label>
                                Composition ⓘ<input />
                            </label>
                            <label>
                                Amount
                                <input defaultValue="5" />
                            </label>
                            <label>
                                State
                                <select>
                                    <option>Select</option>
                                    <option>Solid</option>
                                </select>
                            </label>
                            <label>
                                Hazards
                                <select>
                                    <option>None declared</option>
                                    <option>Flammable</option>
                                </select>
                            </label>
                            <label>
                                Disposal
                                <select>
                                    <option>Select</option>
                                    <option>Return</option>
                                </select>
                            </label>
                        </div>
                    ))}
                    <div className="sample-actions">
                        <button type="button" onClick={() => setSamples([...samples, Date.now()])}>
                            ＋ Add another sample
                        </button>
                        <button type="button" onClick={() => setSamples(samples.slice(0, -1))}>
                            Remove sample
                        </button>
                    </div>
                    <h2>Collaborators</h2>
                    <div className="collaborators">
                        <label>
                            Collaborator email 1*
                            <input defaultValue="matthew.chen@university.edu" />
                        </label>
                        <label>
                            Collaborator email 2*
                            <input className="invalid" defaultValue="ana@university" />
                        </label>
                        <label>
                            Collaborator email 3*
                            <input />
                        </label>
                    </div>
                    <button
                        type="button"
                        className="invite"
                        onClick={() => setSaved('Invitations sent')}
                    >
                        Invite all now
                    </button>
                </form>
                <aside className="proposal-status">
                    <h2>Proposal status</h2>
                    <strong>Incomplete</strong>
                    <span>7 errors</span>
                    <a onClick={() => setSaved('Errors will be shown after submission')}>View</a>
                </aside>
            </div>
            <div className="session-banner">Session expires in 04:12</div>
            <footer className="proposal-footer">
                <button>Cancel</button>
                <button onClick={() => setSaved('Draft saved')}>Save draft</button>
                <button className="primary" onClick={() => setSubmitted(true)}>
                    Submit proposal
                </button>
            </footer>
            {(saved || submitted) && (
                <div className="bad-toast">
                    {submitted ? 'Submission failed: 7 errors' : saved}
                    <button
                        onClick={() => {
                            setSaved('');
                            setSubmitted(false);
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </main>
    );
}
