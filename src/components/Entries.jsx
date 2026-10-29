import { CATEGORIES } from '../data.js';

export default function Entries({ entries, details, onOpen }) {
  return (
    <section>
      <h2 className="h2">Today's entries</h2>
      {entries.map((e) => {
        const cat = CATEGORIES[e.cat];
        return (
        <div className={`entry${details[e.id] ? ' tap' : ''}`} key={e.id} onClick={() => details[e.id] && onOpen(e.id)}>
          <div className="entry-icon" style={{ '--s': cat.scale || 1 }}><img src={cat.icon} alt="" /></div>
          <div className="entry-main">
            <div className={`entry-title${e.muted ? ' muted' : ''}${e.ellipsis ? ' ellipsis' : ''}`} dir={e.rtl ? 'rtl' : undefined} style={e.rtl ? { textAlign: 'left' } : undefined}>{e.title}</div>
            <div className="entry-sub">{e.sub || cat.label}</div>
          </div>
          <div className="entry-end">
            <div className={`entry-value ${e.tone || ''}${e.muted ? ' muted' : ''}`}>{e.value}</div>
            <div className="entry-sub">{e.time}</div>
          </div>
        </div>
        );
      })}
    </section>
  );
}
