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

const fmtSigned = (n) => `${n > 0 ? '+' : '−'}${Math.abs(n).toLocaleString('en-US')}`;
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
const PLOT_TOP = 62;
const PLOT_H = 100;

function AvgChart() {
  const vals = counted.map((d) => d.v);
  const devs = vals.map((v) => v - weekAvg);
  const up = Math.max(0, ...devs);
  const down = Math.max(0, ...devs.map((d) => -d));
  const k = PLOT_H / Math.max(1, up + down); // px per kcal
  const lineY = PLOT_TOP + up * k;
  const sd = Math.round(Math.sqrt(devs.reduce((t, d) => t + d * d, 0) / Math.max(1, devs.length)));
  const yOf = (v) => lineY - (v - weekAvg) * k;
  const tone = (v) => (v > 0 ? '#a3213f' : v <= GOAL ? '#1f724b' : '#c49a2c');
  return (
    <div className="card avg-card" role="img" aria-label={`Average ${fmtSigned(weekAvg)} kcal a day, typical swing plus or minus ${sd}`}>
      <div className="avg-title">Average each day</div>
      <div className="avg-val">{fmtSigned(weekAvg)}<small> kcal</small></div>
      <div className="avg-sub">Typical swing ±{sd} kcal</div>
      <div className="avg-band" style={{ top: lineY - sd * k, height: 2 * sd * k }} />
      <div className="avg-line" style={{ top: lineY - 1 }} />
      <div className="avg-goal" style={{ top: yOf(GOAL) }}><span>Goal {fmtSigned(GOAL)}</span></div>
      {weekDays.map((d, i) => (
        <div className="col" key={i} style={{ left: 14.5 + i * COL }}>
          {d.v === null ? <i className="avg-ghost" style={{ top: lineY - 6 }} /> : (
            <>
              <i className="avg-stem" style={{ top: Math.min(lineY, yOf(d.v)), height: Math.abs(yOf(d.v) - lineY), background: tone(d.v) }} />
              <i className="avg-dot" style={{ top: yOf(d.v) - 7, background: tone(d.v) }} />
            </>
          )}
          <div className={`dl${d.today ? ' now' : ''}`} style={{ top: 178 }}>{d.l}</div>
        </div>
      ))}
    </div>
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
            {d.v === null ? <div className="ghost" /> : <div className={`bar ${d.v > 0 ? 'up' : 'down'}`} style={{ height: Math.min(44, Math.max(8, Math.abs(d.v) * 0.07)) }} />}
            <div className={`dl${d.today ? ' now' : ''}`}>{d.l}</div>
          </div>
        ))}
      </div>
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
