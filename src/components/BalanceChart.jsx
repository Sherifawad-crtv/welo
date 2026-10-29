import { useRef, useState } from 'react';
import { fmtSigned } from '../utils.js';

const STEP = 400;
const PLOT_H = 132;
const TOP = 84; // plot top inside the card

export default function BalanceChart({ days }) {
  const vals = days.filter((d) => d.v !== null).map((d) => d.v);
  const top = Math.max(STEP, Math.ceil(Math.max(0, ...vals) / STEP) * STEP);
  const bottom = Math.min(-STEP, Math.floor(Math.min(0, ...vals) / STEP) * STEP);
  const span = top - bottom;
  const k = PLOT_H / span; // px per kcal
  const zeroY = top * k;
  const ticks = [];
  for (let t = top; t >= bottom; t -= STEP) ticks.push(t);

  const total = vals.reduce((t, v) => t + v, 0);
  const [sel, setSel] = useState(null);
  const plot = useRef(null);
  const scrub = useRef(false);

  const idxAt = (x) => {
    const r = plot.current.getBoundingClientRect();
    return Math.max(0, Math.min(days.length - 1, Math.floor(((x - r.left) / r.width) * days.length)));
  };
  const down = (e) => {
    scrub.current = true;
    plot.current.setPointerCapture(e.pointerId);
    const i = idxAt(e.clientX);
    setSel((cur) => (cur === i && e.pointerType !== 'mouse' ? null : i));
  };
  const move = (e) => { if (scrub.current) setSel(idxAt(e.clientX)); };
  const up = () => { scrub.current = false; };

  const d = sel === null ? null : days[sel];
  const kind = (v) => (v > 0 ? 'Surplus' : 'Deficit');
  const head = d
    ? { sub: `${d.full.slice(0, 3)}, ${d.date}${d.v === null ? '' : ` · ${kind(d.v)}`}`, big: d.v === null ? (d.today ? 'In progress' : 'No data') : fmtSigned(d.v), unit: d.v === null ? '' : ' kcal' }
    : { sub: `Total · ${vals.length} days`, big: fmtSigned(total), unit: ' kcal' };

  const summary = `Balance each day. Total ${fmtSigned(total)} kilocalories over ${vals.length} logged days.`;

  return (
    <div className="card bal" role="group" aria-label={summary}>
      <div className="bal-title">Balance each day</div>
      <div className="bal-head" aria-live="polite">
        <b>{head.big}<small>{head.unit}</small></b>
        <span>{head.sub}</span>
      </div>

      <div className="bal-plot" ref={plot} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        {ticks.map((t) => (
          <div className={`bal-grid${t === 0 ? ' zero' : ''}`} key={t} style={{ top: (top - t) * k }}>
            <span>{t > 0 ? `+${t}` : t < 0 ? `−${Math.abs(t)}` : '0'}</span>
          </div>
        ))}
        <div className="bal-cols">
          {days.map((x, i) => {
            const h = x.v === null ? 0 : Math.max(6, Math.abs(x.v) * k);
            const state = sel === null ? '' : sel === i ? ' on' : ' dim';
            const label = x.v === null ? `${x.full} ${x.date}, ${x.today ? 'in progress' : 'no data'}` : `${x.full} ${x.date}, ${kind(x.v).toLowerCase()} of ${Math.abs(x.v)} kilocalories`;
            return (
              <button key={i} className={`bal-col${state}`} aria-label={label} aria-pressed={sel === i}
                onClick={(e) => { if (e.detail === 0) setSel((c) => (c === i ? null : i)); }}>
                {sel === i && <i className="bal-rule" />}
                {x.v === null
                  ? <i className="bal-ghost" style={{ top: zeroY - 8 }} />
                  : <i className={`bal-bar ${x.v > 0 ? 'up' : 'down'}`} style={x.v > 0 ? { bottom: PLOT_H - zeroY, height: h } : { top: zeroY, height: h }} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bal-days">
        {days.map((x, i) => <span key={i} className={`${x.today ? 'now' : ''}${sel === i ? ' sel' : ''}`}>{x.l}</span>)}
      </div>
    </div>
  );
}
