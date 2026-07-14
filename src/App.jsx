import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityPage from './components/ActivityPage';
import ClientsPage from './components/ClientsPage';
import DocumentsPage from './components/DocumentsPage';
import ReviewQueuePage from './components/ReviewQueuePage';
import ClientDetail from './components/ClientDetail';
import NoticesPage from './components/NoticesPage';
import ZodiacFortunePage from './components/ZodiacFortunePage';

if (window.location.pathname === '/zodiac') {
  document.title = 'Zodiac Fortune Cookie';
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
      <Sidebar active={page === 'clientDetail' ? 'clients' : page} onNav={handleNav} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}
