import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import Entries from './components/Entries.jsx';
import Macros from './components/Macros.jsx';
import NavBar from './components/NavBar.jsx';
import EntrySheet from './components/EntrySheet.jsx';
import StreakSheet from './components/StreakSheet.jsx';
import Progress from './screens/Progress.jsx';
import Settings from './screens/Settings.jsx';
import { summary, entries, macros, entryDetails } from './data.js';

export default function App() {
  const [tab, setTab] = useState('home');
  const [settings, setSettings] = useState(false);
  const [entryId, setEntryId] = useState(null);
  const [deleted, setDeleted] = useState([]);
  const [streakOpen, setStreakOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [tab, settings]);

  if (settings) return <div className="outer"><div className="frame"><div className="scroll plain"><Settings onBack={() => setSettings(false)} /></div></div></div>;

  return (
    <div className="outer">
      <div className="frame">
        <div className="scroll">
          {tab === 'home' ? (
            <>
              <Hero summary={summary} onProfile={() => setSettings(true)} onDate={() => setStreakOpen(true)} />
              <div className="sheet">
                <Macros macros={macros} />
                <Entries entries={entries.filter((e) => !deleted.includes(e.id))} details={entryDetails} onOpen={setEntryId} />
              </div>
            </>
          ) : <Progress onStreak={() => setStreakOpen(true)} />}
        </div>
        {streakOpen && <StreakSheet onClose={() => setStreakOpen(false)} />}
        {entryId ? <EntrySheet key={entryId} detail={entryDetails[entryId]} onClose={() => setEntryId(null)} onDelete={() => { setDeleted((d) => [...d, entryId]); setEntryId(null); }} /> : !streakOpen && <NavBar tab={tab} onTab={setTab} />}
      </div>
    </div>
  );
}
