import { Link } from 'react-router';

export default function HomePage() {
    return (
        <main className="home-page">
            <h1>UX Detective</h1>
            <nav className="home-page__choices" aria-label="Choose an investigation">
                <Link className="home-page__choice" to="/pattern-training">
                    <span>Pattern Training</span>
                    <span aria-hidden="true">↗</span>
                </Link>
                <Link className="home-page__choice home-page__choice--case" to="/page-1">
                    <span>Case 1</span>
                    <span aria-hidden="true">↗</span>
                </Link>
            </nav>
        </main>
    );
}
