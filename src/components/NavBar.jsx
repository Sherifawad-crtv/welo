import { HomeIcon, PlusIcon, ProgressIcon } from './Icons.jsx';

export default function NavBar({ tab, onTab }) {
  return (
    <nav className="nav">
      <button className={`nav-item${tab === 'home' ? ' active' : ''}`} onClick={() => onTab('home')} aria-label="Home" aria-current={tab === 'home' ? 'page' : undefined}>
        <HomeIcon />
      </button>
      <button className="nav-item add" aria-label="Add entry"><PlusIcon /></button>
      <button className={`nav-item${tab === 'progress' ? ' active' : ''}`} onClick={() => onTab('progress')} aria-label="Progress" aria-current={tab === 'progress' ? 'page' : undefined}>
        <ProgressIcon />
      </button>
    </nav>
  );
}
