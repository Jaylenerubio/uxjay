import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentQueue from './components/DocumentQueue';
import Notices from './components/Notices';
import Activity from './components/Activity';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  queue: 'Document Queue',
  notices: 'Notices',
  clients: 'Clients',
  agency: 'Agency Documents',
  activity: 'Latest Activity',
};

function Placeholder({ name }) {
  return (
    <div className="page">
      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚧</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{name}</div>
          <div style={{ fontSize: 13 }}>This section is not yet prototyped.</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('dashboard');

  function renderPage() {
    switch (page) {
      case 'dashboard': return <Dashboard onNav={setPage} />;
      case 'queue': return <DocumentQueue />;
      case 'notices': return <Notices />;
      case 'activity': return <Activity />;
      default: return <Placeholder name={PAGE_TITLES[page] || page} />;
    }
  }

  return (
    <div className="layout">
      <Sidebar active={page} onNav={setPage} />
      <div className="main-content">
        <div className="topbar">
          <h2>{PAGE_TITLES[page]}</h2>
          <span className="topbar-date">May 14, 2026</span>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}
