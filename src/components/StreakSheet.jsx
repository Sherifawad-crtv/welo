import { useState } from 'react';
import Sheet from './Sheet.jsx';
import { Flame, SaverShield } from './Flame.jsx';
import { Sol } from './Icons.jsx';
import { streak } from '../data.js';

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const key = (y, m) => `${y}-${String(m + 1).padStart(2, '0')}`;

export default function StreakSheet({ onClose }) {
  const today = new Date();
  const [cursor, setCursor] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const isCurrent = cursor.y === today.getFullYear() && cursor.m === today.getMonth();

  const first = new Date(cursor.y, cursor.m, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const count = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  const logged = streak.logged[key(cursor.y, cursor.m)] || [];
  const current = streak.current[key(cursor.y, cursor.m)] || [];
  const title = first.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const move = (d) => setCursor(({ y, m }) => { const n = new Date(y, m + d, 1); return { y: n.getFullYear(), m: n.getMonth() }; });

  return (
    <Sheet label="Streak" onClose={onClose} fit>
      <div className="st-body">
        <div className="st-hero">
          <Flame />
          <div className="st-num">{streak.days}</div>
          <div className="st-label">day streak!</div>
        </div>

        <div className="st-cal">
          <div className="st-head">
            <h2>{title}</h2>
            <div>
              <button onClick={() => move(-1)} aria-label="Previous month"><Sol name="alt-arrow-left-linear" size={18} /></button>
              <button onClick={() => move(1)} disabled={isCurrent} aria-label="Next month"><Sol name="alt-arrow-right-linear" size={18} /></button>
            </div>
          </div>
          <div className="st-grid st-dow">{DAYS.map((d, i) => <span key={i}>{d}</span>)}</div>
          <div className="st-grid">
            {cells.map((d, i) => {
              if (!d) return <span key={i} />;
              const cls = current.includes(d) ? 'streak' : logged.includes(d) ? 'logged' : isCurrent && d === today.getDate() ? 'now' : '';
              return <span key={i} className={`st-day ${cls}`}>{d}</span>;
            })}
          </div>
        </div>

        <div className="st-saver" aria-label={`${streak.savers} streak savers`}>
          {Array.from({ length: streak.savers }, (_, i) => <SaverShield key={i} />)}
        </div>
      </div>
    </Sheet>
  );
}
