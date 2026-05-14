export default function Sidebar({ active, onNav }) {
  const pendingDocs = 5;
  const pendingNotices = 2;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>CaseFlow</h1>
        <span>Document Management</span>
      </div>

      <div className="sidebar-section" style={{ marginTop: 8 }}>
        <div className="sidebar-section-label">Caseworker</div>
        <div className={`nav-item ${active === 'dashboard' ? 'active' : ''}`} onClick={() => onNav('dashboard')}>
          <span>⊞</span> Dashboard
        </div>
        <div className={`nav-item ${active === 'queue' ? 'active' : ''}`} onClick={() => onNav('queue')}>
          <span>📄</span> Document Queue
          {pendingDocs > 0 && <span className="nav-badge">{pendingDocs}</span>}
        </div>
        <div className={`nav-item ${active === 'notices' ? 'active' : ''}`} onClick={() => onNav('notices')}>
          <span>🔔</span> Notices
          {pendingNotices > 0 && <span className="nav-badge yellow">{pendingNotices}</span>}
        </div>
        <div className={`nav-item ${active === 'clients' ? 'active' : ''}`} onClick={() => onNav('clients')}>
          <span>👤</span> Clients
        </div>
      </div>

      <div className="sidebar-section" style={{ marginTop: 16 }}>
        <div className="sidebar-section-label">Agency</div>
        <div className={`nav-item ${active === 'agency' ? 'active' : ''}`} onClick={() => onNav('agency')}>
          <span>🏢</span> Agency Documents
        </div>
        <div className={`nav-item ${active === 'activity' ? 'active' : ''}`} onClick={() => onNav('activity')}>
          <span>⚡</span> Latest Activity
        </div>
      </div>

      <div className="sidebar-user">
        <strong>Jordan Reyes</strong>
        Caseworker · Region 4
      </div>
    </aside>
  );
}
