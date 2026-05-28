import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityPage from './components/ActivityPage';
import ClientsPage from './components/ClientsPage';
import DocumentsPage from './components/DocumentsPage';
import ClientDetail from './components/ClientDetail';
import NoticesPage from './components/NoticesPage';
import StickyNotesPage from './components/StickyNotesPage';

export default function App() {
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
      case 'documents':    return <DocumentsPage />;
      case 'notices':       return <NoticesPage />;
      case 'sticky-notes':  return <StickyNotesPage />;
      case 'clientDetail':  return <ClientDetail clientId={selectedClientId} onBack={handleBack} />;
      default:              return <Dashboard />;
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
