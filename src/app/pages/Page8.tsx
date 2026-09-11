import { DragEvent, useState } from 'react';

const initialCards = ['Detector calibration (2h)', 'User setup (1h)', 'Vacuum check (?)'];

export default function Page8() {
    const [cards, setCards] = useState(initialCards);
    const [added, setAdded] = useState<string[]>([]);
    const [changes, setChanges] = useState(3);
    const [toast, setToast] = useState('Schedule updated');

    function dropCard(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const card = event.dataTransfer.getData('text/plain');
        if (!card) return;
        setCards((items) => items.filter((item) => item !== card));
        setAdded((items) => [...items, card]);
        setChanges((value) => value + 1);
        setToast('Schedule updated');
    }

    return (
        <main className="workshop-page schedule-page">
            <header className="schedule-header">
                <h1>BL-4 Weekly Schedule</h1>
                <div>
                    <button>‹</button>
                    <b>Aug 31 – Sep 6</b>
                    <button>›</button>
                    <button>Today</button>
                </div>
                <select>
                    <option>Facility time</option>
                </select>
            </header>
            <div className="schedule-layout">
                <section>
                    <div className="calendar-days">
                        {[
                            'Mon 8/31',
                            'Tue 9/1',
                            'Wed 9/2',
                            'Thu 9/3',
                            'Fri 9/4',
                            'Sat 9/5',
                            'Sun 9/6',
                        ].map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>
                    <div
                        className="calendar"
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={dropCard}
                    >
                        <div className="time-labels">
                            <span>00:00</span>
                            <span>06:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>24:00</span>
                        </div>
                        <div className="now-line" />
                        <button className="event event-blue">
                            PRO-1842 /<br />
                            Li battery operando
                        </button>
                        <button className="event event-purple">
                            Maintenance:
                            <br />
                            mono cooling
                        </button>
                        <button className="event event-green">
                            PRO-1911 /<br />
                            Catalysis
                        </button>
                        <button className="event event-orange">Machine studies</button>
                        <button className="event event-gray">Reserved</button>
                        {added.map((card, index) => (
                            <button className={`event event-added event-added-${index}`} key={card}>
                                {card}
                            </button>
                        ))}
                    </div>
                    <section className="handover">
                        <h2>Handover notes</h2>
                        <p>09:58 — +2h due to cryostream instability — MK</p>
                        <p>09:41 — sample env ready — AR</p>
                        <p>Yesterday — detector rebooted — system</p>
                    </section>
                </section>
                <aside className="unscheduled">
                    <h2>Unscheduled</h2>
                    {cards.map((card) => (
                        <button
                            draggable
                            onDragStart={(event) => event.dataTransfer.setData('text/plain', card)}
                            key={card}
                        >
                            ⠿　{card}
                        </button>
                    ))}
                </aside>
            </div>
            <footer className="schedule-footer">
                <span>{changes} unpublished changes</span>
                <button
                    onClick={() => {
                        setChanges(0);
                        setToast('Schedule updated');
                    }}
                >
                    Publish changes
                </button>
            </footer>
            {toast && (
                <div className="schedule-toast">
                    ✓　{toast}
                    <button onClick={() => setToast('')}>×</button>
                </div>
            )}
        </main>
    );
}
