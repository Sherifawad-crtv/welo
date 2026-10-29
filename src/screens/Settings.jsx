import { BackArrow, ChevronRight, PencilIcon, Sol } from '../components/Icons.jsx';
import { profile, settingsGroups } from '../data.js';

export default function Settings({ onBack }) {
  return (
    <div className="settings">
      <header className="s-top">
        <button className="s-back" onClick={onBack} aria-label="Back"><BackArrow /></button>
        <h1>Settings</h1>
      </header>
      <div className="s-body">
        <div className="s-profile">
          <div className="avatar">S</div>
          <div className="s-pmain"><div className="s-name">{profile.name}</div><div className="s-email">{profile.email}</div></div>
          <PencilIcon size={22} />
        </div>
        {settingsGroups.map((g) => (
          <section key={g.title}>
            <h2 className="s-h">{g.title}</h2>
            <div className="s-group">
              {g.rows.map((r) => (
                <button className="s-row" key={r.label}>
                  <span className="s-icon"><Sol name={r.icon} size={28} /></span>
                  <span className="s-label">{r.label}</span>
                  {r.value && <span className="s-value">{r.value}</span>}
                  <ChevronRight />
                </button>
              ))}
            </div>
            {g.hint && <p className="s-hint">{g.hint}</p>}
          </section>
        ))}
        <button className="logout">LOG OUT</button>
      </div>
    </div>
  );
}
