import { useEffect, useState } from 'react';
import { HomeIcon, PlusIcon, ProgressIcon, Sol } from './Icons.jsx';

// Offsets from the + button's centre. The arc is slightly flattened, like the original.
const dial = [
  { id: 'water', label: 'Water', icon: 'waterdrop-linear', x: -132, y: -104, delay: 0 },
  { id: 'voice', label: 'Voice', icon: 'microphone-linear', x: -45, y: -134, delay: 30 },
  { id: 'photo', label: 'Photo', icon: 'camera-linear', x: 45, y: -134, delay: 60 },
  { id: 'text', label: 'Text', icon: 'notes-linear', x: 131, y: -104, delay: 90 },
];

export default function NavBar({ tab, onTab }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (t) => { setOpen(false); onTab(t); };

  return (
    <>
      <div className={`scrim${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <nav className={`nav${open ? ' open' : ''}`}>
        <button className={`nav-item${tab === 'home' ? ' active' : ''}`} onClick={() => go('home')} aria-label="Home" aria-current={tab === 'home' ? 'page' : undefined}>
          <HomeIcon />
        </button>
        <button className="nav-item add" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close add menu' : 'Add entry'} aria-expanded={open}>
          <span className="plus"><PlusIcon /></span>
        </button>
        <button className={`nav-item${tab === 'progress' ? ' active' : ''}`} onClick={() => go('progress')} aria-label="Progress" aria-current={tab === 'progress' ? 'page' : undefined}>
          <ProgressIcon />
        </button>
        {dial.map((d) => (
          <div className="dial" key={d.id} style={{ '--x': `${d.x}px`, '--y': `${d.y}px`, transitionDelay: open ? `${d.delay}ms` : '0ms' }}>
            <button className="dial-btn" tabIndex={open ? 0 : -1} aria-label={d.label} onClick={() => setOpen(false)}><Sol name={d.icon} size={24} /></button>
            <span>{d.label}</span>
          </div>
        ))}
      </nav>
    </>
  );
}
