import { useState } from 'react';
import { Chevron, FakeStatusBar, Sol } from '../components/Icons.jsx';
import { Flame } from '../components/Flame.jsx';
import { weekDays, dayRows, weighGrid, weighAxis, weekByWeek, streak } from '../data.js';

function Segmented({ value, onChange }) {
  return (
    <div className="seg">
      {['week', 'weight'].map((k) => (
        <button key={k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{k === 'week' ? 'Week' : 'Weight'}</button>
      ))}
    </div>
  );
}

function WeekHero() {
  return (
    <>
      <div className="p-row"><button className="circle" aria-label="Previous"><Chevron dir="left" /></button><div className="today wide">Last 7 days</div><button className="circle faint" disabled aria-label="Next"><Chevron dir="right" dim /></button></div>
      <div className="p-label" style={{ top: 'calc(var(--lead) + 120px)' }}>Surplus this week</div>
      <div className="p-number" style={{ top: 'calc(var(--lead) + 142px)' }}>+192</div>
      <div className="p-sub" style={{ top: 'calc(var(--lead) + 198px)' }}>kcal across 1 day</div>
    </>
  );
}

function WeightHero() {
  return (
    <>
      <div className="p-label" style={{ top: 'calc(var(--lead) + 67px)' }}>Right now</div>
      <div className="p-number" style={{ top: 'calc(var(--lead) + 91px)', fontSize: 54 }}>96 kg</div>
      <div className="p-sub" style={{ top: 'calc(var(--lead) + 151px)', fontSize: 16 }}>Log a few more weigh-ins to see your trend</div>
    </>
  );
}

function StreakCard({ onOpen }) {
  return (
    <button className="card streak-card" onClick={onOpen} aria-haspopup="dialog" aria-label={`${streak.days} day streak, open calendar`}>
      <div className="sk-top">
        <Flame size={44} />
        <div className="sk-text"><b>{streak.days}</b><span>day streak</span></div>
        <Sol name="alt-arrow-right-linear" size={18} />
      </div>
      <div className="sk-days">
        {weekDays.map((d, i) => <span key={i} className={`sk-dot ${d.s || ''}`}>{d.l}</span>)}
      </div>
    </button>
  );
}

function WeekBody({ onStreak }) {
  return (
    <>
      <StreakCard onOpen={onStreak} />
      <div className="card chart-card">
        <div className="card-title">Balance each day</div>
        <div className="baseline" />
        {weekDays.map((d, i) => (
          <div className="col" key={i} style={{ left: 14.5 + i * 51 }}>
            {d.v ? <div className="bar" /> : <div className="ghost" />}
            <div className={`dl${d.today ? ' now' : ''}`}>{d.l}</div>
          </div>
        ))}
      </div>
      <div className="two">
        <div className="card stat-card"><div className="sc-label">Average a day</div><div className="sc-value">+192</div></div>
        <div className="card stat-card"><div className="sc-label">Your goal</div><div className="sc-value">−500 a day</div></div>
      </div>
      <h2 className="h2">Days</h2>
      {dayRows.map((r) => (
        <div className="entry" key={r.d}>
          <div className="date-chip" style={{ background: r.tint }}><b>{r.d}</b><span>{r.m.toUpperCase()}</span></div>
          <div className="entry-main"><div className={`entry-title${r.muted ? ' muted' : ''}`}>{r.name}</div><div className="entry-sub">{r.sub}</div></div>
          <div className="entry-end">
            {r.value ? <div className={`entry-value${r.muted ? ' muted' : ''}`}>{r.value}</div> : <div className="entry-value faintv">{r.note}</div>}
            {r.value && r.note && <div className="entry-sub">{r.note}</div>}
          </div>
        </div>
      ))}
    </>
  );
}

function WeightBody() {
  const [range, setRange] = useState('4 weeks');
  return (
    <>
      <div className="chips">
        {['4 weeks', '12 weeks', 'All'].map((c) => <button key={c} className={range === c ? 'on' : ''} onClick={() => setRange(c)}>{c}</button>)}
      </div>
      <div className="wchart">
        {weighGrid.map((g, i) => (
          <div key={g}><span className="gl" style={{ top: 8 + i * 40 - 9 }}>{g}</span><i className="gline" style={{ top: 8 + i * 40 }} /></div>
        ))}
        {weighAxis.map((a) => <span className="ax" key={a.l} style={{ left: a.x - 20 }}>{a.l}</span>)}
        <span className="ax end">Today</span>
        <i className="wdot" style={{ top: 8 + 80 - 5 }} />
      </div>
      <div className="legend">
        <span><i className="d" />Each weigh-in</span><span><i className="t" />Trend</span>
        <span className="full"><i className="g" />Target 87 kg (off the chart)</span>
      </div>
      <button className="primary">Log weight</button>
      <h2 className="h2">Week by week</h2>
      {weekByWeek.map((w) => (
        <div className="wrow" key={w.title}>
          <div><div className="wt">{w.title}</div><div className="entry-sub">{w.range}</div></div>
          <div className={w.none ? 'wnone' : 'wval'}>{w.none ? 'No weigh-ins' : w.value}</div>
        </div>
      ))}
    </>
  );
}

export default function Progress({ onStreak }) {
  const [view, setView] = useState('week');
  const week = view === 'week';
  return (
    <>
      <header className="hero" style={{ '--hero-h': week ? '278px' : '242px' }}>
        <div className="hero-in">
          <FakeStatusBar />
          <Segmented value={view} onChange={setView} />
          {week ? <WeekHero /> : <WeightHero />}
        </div>
      </header>
      <div className="sheet">{week ? <WeekBody onStreak={onStreak} /> : <WeightBody />}</div>
    </>
  );
}
