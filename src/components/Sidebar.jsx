import { Icon } from './Icons';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard',      icon: 'home'      },
  { key: 'documents', label: 'Document queue', icon: 'documents' },
  { key: 'notices',   label: 'Notices',        icon: 'bell'      },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside className="sidebar">
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
        <div className="nav-item" style={{ cursor: 'default' }}>
          <span className="nav-icon"><Icon name="file" size={18} /></span>
          <span className="nav-label">Terms of Use</span>
        </div>
        <div className="nav-item" style={{ cursor: 'default' }}>
          <span className="nav-icon"><Icon name="help-circle" size={18} /></span>
          <span className="nav-label">Support</span>
        </div>
      </div>
    </aside>
  );
}
