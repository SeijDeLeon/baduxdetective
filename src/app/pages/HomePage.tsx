import { Link } from 'react-router';

import labCrimeScene from '../assets/images/lab-crime-scene.png';

export default function HomePage() {
    return (
        <main className="home-page">
            <section className="home-page__hero" aria-labelledby="home-page-title">
                <img
                    className="home-page__image"
                    src={labCrimeScene}
                    alt="An illustrated laboratory crime scene with a bull detective"
                />
                <h1 id="home-page-title">Bad UX Detective</h1>
            </section>
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
