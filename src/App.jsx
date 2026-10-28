import { useState } from 'react';
import Hero from './components/Hero.jsx';
import Entries from './components/Entries.jsx';
import Macros from './components/Macros.jsx';
import NavBar from './components/NavBar.jsx';
import { summary, entries, macros } from './data.js';

export default function App() {
  const [tab, setTab] = useState('home');
  return (
    <div className="outer">
      <div className="frame">
        <div className="scroll">
          <Hero summary={summary} />
          <div className="sheet">
            <Entries entries={entries} />
            <Macros macros={macros} />
          </div>
        </div>
        <NavBar tab={tab} onTab={setTab} />
      </div>
    </div>
  );
}
