import { Icon } from './Icons';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home' },
  { key: 'activity',  label: 'Activity',  icon: 'bell' },
  { key: 'clients',   label: 'Clients',   icon: 'group' },
  { key: 'documents', label: 'Documents', icon: 'documents' },
  { key: 'notices',   label: 'Notices',   icon: 'mail' },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
      {/* Logo / Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">MF</div>
        <span className="sidebar-brand-text">MyFile NYG</span>
      </div>

      {/* Main navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <div
            key={item.key}
            className={`nav-item${active === item.key ? ' active' : ''}`}
            onClick={() => onNav(item.key)}
            title={item.label}
          >
            <span className="nav-icon">
              <Icon name={item.icon} size={20} />
            </span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Bottom: help + user */}
      <div className="sidebar-bottom">
        <div className="nav-item" title="Help">
          <span className="nav-icon">
            <Icon name="help-circle" size={20} />
          </span>
          <span className="nav-label">Help</span>
        </div>
        <div className="nav-item" style={{ cursor: 'default' }} title="Jordan Reyes">
          <span className="nav-icon">
            <div className="sidebar-avatar">JR</div>
          </span>
          <span className="nav-label" style={{ fontSize: 13 }}>Jordan Reyes</span>
        </div>
      </div>
    </aside>
  );
}
