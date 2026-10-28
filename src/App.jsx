import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import Entries from './components/Entries.jsx';
import Macros from './components/Macros.jsx';
import NavBar from './components/NavBar.jsx';
import EntrySheet from './components/EntrySheet.jsx';
import Progress from './screens/Progress.jsx';
import Settings from './screens/Settings.jsx';
import { summary, entries, macros, entryDetails } from './data.js';

export default function App() {
  const [tab, setTab] = useState('home');
  const [settings, setSettings] = useState(false);
  const [entryId, setEntryId] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [tab, settings]);

  if (settings) return <div className="outer"><div className="frame"><div className="scroll plain"><Settings onBack={() => setSettings(false)} /></div></div></div>;

  return (
    <div className="outer">
      <div className="frame">
        <div className="scroll">
          {tab === 'home' ? (
            <>
              <Hero summary={summary} onProfile={() => setSettings(true)} />
              <div className="sheet">
                <Entries entries={entries} details={entryDetails} onOpen={setEntryId} />
                <Macros macros={macros} />
              </div>
            </>
          ) : <Progress />}
        </div>
        {entryId ? <EntrySheet detail={entryDetails[entryId]} onClose={() => setEntryId(null)} /> : <NavBar tab={tab} onTab={setTab} />}
      </div>
    </div>
  );
}
