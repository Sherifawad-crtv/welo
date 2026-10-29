import React from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource-variable/bricolage-grotesque';
import './styles.css';
import App from './App.jsx';

// Installed PWAs stay alive in the background, so the browser rarely re-checks the service worker.
// Ask for an update on launch, whenever the app comes back to the foreground, and hourly.
// autoUpdate reloads the page once the new version takes over.
registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (!registration) return;
    const check = () => registration.update().catch(() => {});
    document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check());
    setInterval(check, 60 * 60 * 1000);
  },
});

createRoot(document.getElementById('root')).render(<App />);
