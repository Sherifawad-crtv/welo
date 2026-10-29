import Mascot from './Mascot.jsx';
import { Chevron, InfoIcon, ProfileIcon, FakeStatusBar, Sol } from './Icons.jsx';

export default function Hero({ summary, onProfile, onDate }) {
  return (
    <header className="hero">
      <div className="hero-in">
        <FakeStatusBar />
        <button className="circle tb2 left" aria-label="Profile" onClick={onProfile}><ProfileIcon /></button>
        <button className="circle tb2 right" aria-label="About"><InfoIcon /></button>

        <div className="date-row tb1">
          <button className="circle" aria-label="Previous day"><Chevron dir="left" /></button>
          <button className="today" onClick={onDate} aria-haspopup="dialog">Today<Sol name="alt-arrow-down-linear" size={16} /></button>
          <button className="circle faint" aria-label="Next day" disabled><Chevron dir="right" dim /></button>
        </div>

        <div className="hero-label">Deficit today</div>
        <div className="hero-number">{summary.deficit}</div>
        <div className="hero-sub">
          <span className="dim">kcal</span>
          <span className="slash" aria-hidden="true">/</span>
          <span className="resting">{summary.resting}</span>
          <span className="dim"> resting</span>
        </div>

        <div className="stat" style={{ left: 16, color: '#dfebe2' }}>
          <div className="stat-label">Eaten</div>
          <div className="stat-value">{summary.eaten}</div>
        </div>
        <div className="stat" style={{ right: 16, color: '#fbe3e8' }}>
          <div className="stat-label">Active</div>
          <div className="stat-value">{summary.active}</div>
        </div>
        <div className="divider" style={{ left: 112 }} />
        <div className="divider" style={{ right: 111 }} />

        <div className="track" />
        <div className="goal-tick" />
        <Mascot className="hero-mascot" mood="happy" size={34} />
        <div className="goal-text">Goal: land near a 500 deficit</div>
      </div>
    </header>
  );
}
