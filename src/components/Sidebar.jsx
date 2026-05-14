import { Icon } from './Icons';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'activity',  label: 'Activity',  icon: 'activity'  },
  { key: 'clients',   label: 'Clients',   icon: 'clients'   },
  { key: 'documents', label: 'Documents', icon: 'documents' },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">CF</div>
        <span className="sidebar-brand-text">CaseFlow</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <div
            key={item.key}
            className={`nav-item${active === item.key ? ' active' : ''}`}
            onClick={() => onNav(item.key)}
            title={item.label}
          >
            <span className="nav-icon">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="nav-item" title="Settings">
          <span className="nav-icon">
            <Icon name="settings" size={18} />
          </span>
          <span className="nav-label">Settings</span>
        </div>
        <div className="nav-item" style={{ cursor: 'default' }} title="Jordan Reyes">
          <span className="nav-icon">
            <div className="sidebar-avatar">JR</div>
          </span>
          <span className="nav-label" style={{ fontSize: 12 }}>Jordan Reyes</span>
        </div>
      </div>
    </aside>
  );
}
