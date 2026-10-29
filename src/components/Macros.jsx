const SEGMENTS = 9;
const fmt = (n) => (Number.isInteger(n) ? n : n.toFixed(1));

export default function Macros({ macros }) {
  return (
    <section>
      <h2 className="h2 first">Macros</h2>
      <div className="macros">
        {macros.map((m) => {
          const filled = Math.min(SEGMENTS, Math.ceil((m.value / m.goal) * SEGMENTS));
          const left = Math.max(0, m.goal - m.value);
          return (
            <div className="macro" key={m.id}>
              <div className="macro-top">
                <span className="macro-label">{m.label}</span>
                <span className="macro-left">{fmt(left)}{m.unit.trim() === 'L' ? ' L' : 'g'} to go</span>
              </div>
              <div className="segs" role="img" aria-label={`${m.label} ${fmt(m.value)} of ${fmt(m.goal)}${m.unit}`}>
                {Array.from({ length: SEGMENTS }, (_, i) => <i key={i} style={i < filled ? { background: m.color } : undefined} />)}
              </div>
              <div className="macro-value">{fmt(m.value)} / {fmt(m.goal)}{m.unit}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
