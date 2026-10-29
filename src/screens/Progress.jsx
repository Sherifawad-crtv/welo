import { useState } from 'react';
import { Chevron, FakeStatusBar, Sol } from '../components/Icons.jsx';
import { Flame } from '../components/Flame.jsx';
import Mascot from '../components/Mascot.jsx';
import BalanceChart from '../components/BalanceChart.jsx';
import { fmtSigned } from '../utils.js';
import { weekDays, dayRows, weighGrid, weighAxis, weekByWeek, streak } from '../data.js';

function Segmented({ value, onChange }) {
  return (
    <div className="seg" role="tablist" aria-label="Progress view">
      {['week', 'weight'].map((k) => (
        <button key={k} role="tab" aria-selected={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{k === 'week' ? 'Week' : 'Weight'}</button>
      ))}
    </div>
  );
}

const counted = weekDays.filter((d) => d.v !== null);
const weekTotal = counted.reduce((t, d) => t + d.v, 0);
const weekAvg = counted.length ? Math.round(weekTotal / counted.length) : 0;

function WeekHero() {
  return (
    <>
      <div className="p-row"><button className="circle" aria-label="Previous"><Chevron dir="left" /></button><div className="today wide">Last 7 days</div><button className="circle faint" disabled aria-label="Next"><Chevron dir="right" dim /></button></div>
      <div className="p-label" style={{ top: 'calc(var(--lead) + 120px)' }}>{weekTotal > 0 ? 'Surplus' : 'Deficit'} this week</div>
      <div className="p-number" style={{ top: 'calc(var(--lead) + 142px)' }}>{fmtSigned(weekTotal)}</div>
      <div className="p-sub" style={{ top: 'calc(var(--lead) + 198px)' }}>kcal across {counted.length} {counted.length === 1 ? 'day' : 'days'}</div>
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
    <button className="card streak-card" onClick={onOpen} aria-haspopup="dialog" aria-label={`This week, ${streak.days} day streak. Open calendar`}>
      <div className="sk-title"><span>This week</span><em>{streak.days} day streak<Sol name="alt-arrow-right-linear" size={16} /></em></div>
      <div className="sk-week">
        {weekDays.map((d, i) => (
          <div key={i} className={`sk-col${d.today ? ' now' : ''}`}>
            <span>{d.n}</span>
            {d.s === 'streak' ? <Flame size={40} /> : d.s === 'logged' ? <Flame size={40} style={{ opacity: 0.45 }} /> : <i className="sk-empty" />}
          </div>
        ))}
      </div>
    </button>
  );
}

const GOAL = -500;
const COL = 51;
const PLOT_TOP = 104;
const PLOT_H = 156;
const DOT = 42;

const toneOf = (v) => (v > 0 ? 'warn' : v <= GOAL ? 'good' : 'ok');
const TONE = { good: '#1f724b', ok: '#c49a2c', warn: '#a3213f' };
const MOOD = { good: 'happy', ok: 'ok', warn: 'sad' };

function AvgChart() {
  const vals = counted.map((d) => d.v);
  const hi = Math.max(...vals);
  const lo = Math.min(...vals);
  const yOf = (v) => PLOT_TOP + DOT / 2 + ((hi - v) / Math.max(1, hi - lo)) * (PLOT_H - DOT);
  const avgY = yOf(weekAvg);
  const sd = Math.round(Math.sqrt(vals.reduce((t, v) => t + (v - weekAvg) ** 2, 0) / Math.max(1, vals.length)));
  const lastIdx = weekDays.reduce((m, d, i) => (d.v !== null ? i : m), 0);
  const lastX = 14.5 + lastIdx * COL + COL / 2;
  const headline = weekAvg <= GOAL ? 'Crushing your goal' : weekAvg < 0 ? 'On the right track' : 'A little over this week';
  return (
    <div className="card avg-card" role="img" aria-label={`Average ${fmtSigned(weekAvg)} kcal a day. ${headline}`}>
      <div className="avg-title">Average of the last {counted.length} days</div>
      <div className="avg-head">{headline}</div>
      <div className="avg-num">{fmtSigned(weekAvg)}<small> kcal a day</small></div>
      {[0, 1, 2, 3, 4].map((g) => <i className="avg-grid" key={g} style={{ top: PLOT_TOP + (g * PLOT_H) / 4 }} />)}
      <i className="avg-solid" style={{ top: avgY - 1, left: 14, width: lastX - 14 }} />
      <i className="avg-dash" style={{ top: avgY - 1, left: lastX, right: 62 }} />
      <span className="avg-tag" style={{ top: avgY - 10 }}>Avg.</span>
      {weekDays.map((d, i) => (
        <div className="col" key={i} style={{ left: 14.5 + i * COL }}>
          {d.v !== null && (
            <>
              <i className="avg-pill" style={{ top: yOf(d.v) - DOT / 2 - 3, height: PLOT_TOP + PLOT_H - yOf(d.v) + DOT / 2 + 3 - DOT / 2 + 6, background: TONE[toneOf(d.v)] }} />
              <span className="avg-face" style={{ top: yOf(d.v) - DOT / 2 }}><Mascot mood={MOOD[toneOf(d.v)]} size={DOT} /></span>
            </>
          )}
          <div className={`dl${d.today ? ' now' : ''}`} style={{ top: PLOT_TOP + PLOT_H + 14 }}>{d.l}</div>
        </div>
      ))}
      <div className="avg-foot">Smiles mean you hit your goal · swing ±{sd} kcal</div>
    </div>
  );
}

function WeekBody({ onStreak }) {
  return (
    <>
      <StreakCard onOpen={onStreak} />
      <BalanceChart days={weekDays} />
      <AvgChart />
      <div className="card stat-card goal-card"><div className="sc-label">Your goal</div><div className="sc-value">−500 a day</div></div>
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
        {['4 weeks', '12 weeks', 'All'].map((c) => <button key={c} aria-pressed={range === c} className={range === c ? 'on' : ''} onClick={() => setRange(c)}>{c}</button>)}
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
