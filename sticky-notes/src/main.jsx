import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StickyNotesPage from './StickyNotesPage';
createRoot(document.getElementById('root')).render(
  <StrictMode><StickyNotesPage /></StrictMode>
);
