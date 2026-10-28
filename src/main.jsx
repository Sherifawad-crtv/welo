import React from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource-variable/bricolage-grotesque';
import './styles.css';
import App from './App.jsx';

registerSW({ immediate: true });

createRoot(document.getElementById('root')).render(<App />);
