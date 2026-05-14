import { useState } from 'react';
import { activityItems } from '../data/mockData';
import { Icon } from './Icons';

const FILTER_CHIPS = ['All activity', 'Uploads', 'Notices', 'Custom'];

function ActivityRow({ item, selected, onClick }) {
  return (
    <div
      className={`activity-row${selected ? ' selected' : ''}`}
      onClick={() => onClick(item)}
    >
      {/* Avatar */}
      <div className="avatar">{item.initials}</div>

      {/* New chip */}
      {item.isNew && (
        <span className="new-chip">
          <span className="new-chip-dot" />
          New
        </span>
      )}

      {/* Client name */}
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--body-text)', whiteSpace: 'nowrap', fontFamily: 'Public Sans, sans-serif' }}>
        {item.clientName}
      </span>

      {/* Action chip */}
      <span className="action-chip">{item.action}</span>

      {/* Doc links */}
      {item.docTypes.map(dt => (
        <span key={dt} className="doc-link">{dt}</span>
      ))}

      {/* Time */}
      <span className="activity-row-time">{item.timeAgo}</span>
    </div>
  );
}

function SplitPanel({ item, onClose }) {
  if (!item) {
    return (
      <div className="activity-panel">
        <div className="activity-panel-placeholder">
          Select an activity row to view document details
        </div>
      </div>
    );
  }

  const docName = item.docTypes[0] || 'Document';

  return (
    <div className="activity-panel">
      {/* Panel header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2, color: 'var(--body-text)' }}>{docName}</div>
          <div style={{ fontSize: 14, color: 'var(--gray-500)' }}>{item.clientName}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--gray-400)',
            fontSize: 20,
            lineHeight: 1,
            padding: '2px 6px',
          }}
        >
          ×
        </button>
      </div>

      {/* Panel body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px' }}>
        {/* Info row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{
            flex: 1,
            background: 'var(--gray-50)',
            border: '1px solid var(--card-border)',
            borderRadius: 6,
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Document</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-text)' }}>{docName}</div>
          </div>
          <div style={{
            flex: 1,
            background: 'var(--gray-50)',
            border: '1px solid var(--card-border)',
            borderRadius: 6,
            padding: '10px 14px',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>Activity</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-text)' }}>{item.action}</div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="download" size={14} />
            Download
          </button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            <Icon name="paperclip" size={14} />
            Attach
          </button>
        </div>

        {/* Document preview placeholder */}
        <div className="doc-preview-box">
          Document preview
        </div>

        {/* Date added */}
        <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 18 }}>
          <span style={{ fontWeight: 700, color: 'var(--body-text)' }}>Date added: </span>
          05/13/26
        </div>

        {/* CTA */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <Icon name="copy" size={14} />
          Copy to accepted list
        </button>
      </div>
    </div>
  );
}

export default function ActivityPage() {
  const [activeFilter, setActiveFilter] = useState('All activity');
  const [selectedItem, setSelectedItem] = useState(null);

  const todayItems = activityItems.filter(item => item.isNew);
  const viewedItems = activityItems.filter(item => !item.isNew);

  const filterFn = (item) => {
    if (activeFilter === 'All activity') return true;
    if (activeFilter === 'Uploads') return item.action === 'uploaded' || item.action === 're-uploaded';
    if (activeFilter === 'Notices') return item.action === 'acknowledged';
    return true;
  };

  const filteredToday = todayItems.filter(filterFn);
  const filteredViewed = viewedItems.filter(filterFn);

  function handleRowClick(item) {
    setSelectedItem(prev => prev?.id === item.id ? null : item);
  }

  return (
    <div className="page">
      {/* Page heading */}
      <h1 className="page-heading">Activity</h1>

      {/* Filter chips */}
      <div className="filter-chips">
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip}
            className={`filter-chip ${activeFilter === chip ? 'active' : 'inactive'}`}
            onClick={() => setActiveFilter(chip)}
          >
            {chip}{chip === 'Custom' ? ' ▾' : ''}
          </button>
        ))}
      </div>

      <div className="activity-layout">
        {/* Feed */}
        <div className="activity-main">
          <div className="card">
            {/* Today section */}
            {filteredToday.length > 0 && (
              <>
                <div className="section-label" style={{ padding: '10px 20px 4px' }}>Today</div>
                {filteredToday.map(item => (
                  <ActivityRow
                    key={item.id}
                    item={item}
                    selected={selectedItem?.id === item.id}
                    onClick={handleRowClick}
                  />
                ))}
              </>
            )}

            {/* Viewed activity section */}
            {filteredViewed.length > 0 && (
              <>
                <div className="section-label" style={{ padding: '14px 20px 4px', borderTop: filteredToday.length > 0 ? '1px solid var(--card-border)' : 'none' }}>
                  Viewed activity
                </div>
                {filteredViewed.map(item => (
                  <ActivityRow
                    key={item.id}
                    item={item}
                    selected={selectedItem?.id === item.id}
                    onClick={handleRowClick}
                  />
                ))}
              </>
            )}

            {filteredToday.length === 0 && filteredViewed.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>
                No activity for this filter.
              </div>
            )}
          </div>
        </div>

        {/* Split panel */}
        <SplitPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
