import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityPage from './components/ActivityPage';
import ClientsPage from './components/ClientsPage';
import ReviewQueuePage from './components/ReviewQueuePage';
import ClientDetail from './components/ClientDetail';
import NoticesPage from './components/NoticesPage';
import ZodiacFortunePage from './components/ZodiacFortunePage';
import { Icon } from './components/Icons';

if (window.location.pathname === '/zodiac') {
  document.title = 'Zodiac Fortune Cookie';
}

function TopNav() {
  return (
    <header className="topnav">
      <div className="topnav-brand">
        <div className="topnav-brand-icon">MF</div>
        <span className="topnav-brand-text">MyFile NYC</span>
      </div>
      <div className="topnav-user">
        <Icon name="user" size={16} color="rgba(255,255,255,0.85)" />
        <span>Jordan Reyes</span>
        <Icon name="chevron-down" size={14} color="rgba(255,255,255,0.7)" />
      </div>
    </header>
  );
}

export default function App() {
  if (window.location.pathname === '/zodiac') return <ZodiacFortunePage />;
  const [page, setPage] = useState('dashboard');
  const [selectedClientId, setSelectedClientId] = useState(null);

  function handleNav(key) {
    setPage(key);
    if (key !== 'clientDetail') setSelectedClientId(null);
  }

  function handleClientSelect(clientId) {
    setSelectedClientId(clientId);
    setPage('clientDetail');
  }

  function handleBack() {
    setPage('clients');
    setSelectedClientId(null);
  }

  function renderPage() {
    switch (page) {
      case 'dashboard':    return <Dashboard />;
      case 'activity':     return <ActivityPage />;
      case 'clients':      return <ClientsPage onClientSelect={handleClientSelect} />;
      case 'documents':    return <ReviewQueuePage />;
      case 'notices':      return <NoticesPage />;
      case 'clientDetail': return <ClientDetail clientId={selectedClientId} onBack={handleBack} />;
      default:             return <Dashboard />;
    }
  }

  return (
    <div className="layout">
      <TopNav />
      <div className="app-body">
        <Sidebar active={page} onNav={handleNav} />
        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
