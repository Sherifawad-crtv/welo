import { HomeIcon, PlusIcon, ProgressIcon } from './Icons.jsx';

export default function NavBar({ tab, onTab }) {
  return (
    <>
      <nav className="nav">
        <button className={`nav-item${tab === 'home' ? ' active' : ''}`} onClick={() => onTab('home')}>
          <HomeIcon />Home
        </button>
        <span />
        <button className={`nav-item${tab === 'progress' ? ' active' : ''}`} onClick={() => onTab('progress')}>
          <ProgressIcon />Progress
        </button>
      </nav>
      <button className="fab" aria-label="Add entry"><PlusIcon /></button>
    </>
  );
}
