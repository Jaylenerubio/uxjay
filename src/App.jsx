import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityPage from './components/ActivityPage';
import ClientsPage from './components/ClientsPage';
import DocumentsPage from './components/DocumentsPage';
import ClientDetail from './components/ClientDetail';

const PAGE_TITLES = {
  dashboard: 'Overview',
  activity: 'Activity',
  clients: 'Clients',
  documents: 'All Documents',
  clientDetail: 'Client Detail',
};

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
      case 'dashboard':   return <Dashboard />;
      case 'activity':    return <ActivityPage />;
      case 'clients':     return <ClientsPage onClientSelect={handleClientSelect} />;
      case 'documents':   return <DocumentsPage />;
      case 'clientDetail': return <ClientDetail clientId={selectedClientId} onBack={handleBack} />;
      default:            return <Dashboard />;
    }
  }

  const title = page === 'clientDetail' ? 'Client Detail' : PAGE_TITLES[page] || page;

  return (
    <div className="layout">
      <Sidebar active={page === 'clientDetail' ? 'clients' : page} onNav={handleNav} />
      <div className="main-content">
        <div style={{
          height: 52,
          background: '#fff',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 16,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{title}</h2>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>May 14, 2026</span>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}
