import { useState } from 'react';
import { activityItems } from '../data/mockData';
import { Icon } from './Icons';

const TABS = ['All', 'Families', 'Workers'];

function actionLabel(action) {
  const map = {
    resubmitted: 'resubmitted',
    submitted: 'submitted',
    uploaded: 'uploaded',
    approved: 'approved',
  };
  return map[action] || action;
}

function ActivityRow({ item, selected, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 18px',
        borderBottom: '1px solid var(--card-border)',
        background: selected ? 'var(--blue-light)' : '',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'var(--gray-50)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = ''; }}
    >
      <div className="avatar" style={{ background: item.color, marginTop: 2 }}>
        {item.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, marginBottom: 4 }}>
          <span style={{ fontWeight: 600 }}>{item.clientName}</span>
          {' '}
          <span style={{ color: 'var(--gray-600)' }}>{actionLabel(item.action)}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {item.docTypes.map(dt => (
            <span key={dt} className="chip">{dt}</span>
          ))}
        </div>
      </div>
      <span style={{ fontSize: 11, color: 'var(--gray-400)', whiteSpace: 'nowrap', paddingTop: 2 }}>
        {item.timeAgo}
      </span>
    </div>
  );
}

function SplitPanel({ item, onClose }) {
  if (!item) {
    return (
      <div className="activity-panel">
        <div className="activity-panel-placeholder">
          Select an activity to view details
        </div>
      </div>
    );
  }

  const docName = item.docTypes[0] || 'Document';

  return (
    <div className="activity-panel">
      {/* Panel header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{docName}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{item.clientName}</div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--gray-400)',
            fontSize: 18,
            lineHeight: 1,
            padding: '2px 4px',
          }}
        >
          ×
        </button>
      </div>

      {/* Panel body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
        {/* Labels row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{
            flex: 1,
            background: 'var(--gray-50)',
            border: '1px solid var(--card-border)',
            borderRadius: 7,
            padding: '8px 12px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Document name</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--gray-800)' }}>{docName}</div>
          </div>
          <div style={{
            flex: 1,
            background: 'var(--gray-50)',
            border: '1px solid var(--card-border)',
            borderRadius: 7,
            padding: '8px 12px',
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 3 }}>Activity</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--gray-800)' }}>{actionLabel(item.action)}</div>
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

        {/* Document preview */}
        <div className="doc-preview-box">
          Document preview
        </div>

        {/* Date added */}
        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 16 }}>
          <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>Date added: </span>
          05/13/26
        </div>

        {/* Copy to accepted list */}
        <button className="btn btn-green" style={{ width: '100%', justifyContent: 'center' }}>
          <Icon name="copy" size={14} />
          Copy to accepted list
        </button>
      </div>
    </div>
  );
}

// Group activity items by worker
function groupByWorker(items) {
  const map = {};
  items.forEach(item => {
    if (!map[item.worker]) map[item.worker] = [];
    map[item.worker].push(item);
  });
  return map;
}

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered = activityItems.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Families') return item.type === 'families';
    if (activeTab === 'Workers') return item.type === 'workers';
    return true;
  });

  const workerGroups = groupByWorker(filtered);

  function handleRowClick(item) {
    setSelectedItem(prev => prev?.id === item.id ? null : item);
  }

  return (
    <div className="page">
      <div className="activity-layout">
        {/* Main feed */}
        <div className="activity-main">
          <div className="card">
            <div className="card-header">
              <h3>Activity</h3>
              <span className="date-range">05/01/26 – 05/14/26</span>
            </div>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {TABS.map(tab => (
                <button
                  key={tab}
                  className={`filter-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Activity rows */}
            <div>
              {filtered.map(item => (
                <ActivityRow
                  key={item.id}
                  item={item}
                  selected={selectedItem?.id === item.id}
                  onClick={handleRowClick}
                />
              ))}
              {filtered.length === 0 && (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
                  No activity for this filter.
                </div>
              )}
            </div>

            {/* By Workers section */}
            {Object.keys(workerGroups).length > 0 && (
              <div style={{ borderTop: '2px solid var(--card-border)', padding: '0 18px 12px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gray-500)', padding: '14px 0 8px' }}>
                  By Workers
                </div>
                {Object.entries(workerGroups).map(([worker, items]) => (
                  <div key={worker} className="worker-group">
                    <div className="worker-group-header">
                      <div className="avatar avatar-sm" style={{ background: 'var(--gray-400)' }}>
                        {worker.split(' ').map(w => w[0]).join('').slice(0, 2)}
                      </div>
                      {worker}
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: 11,
                        background: 'var(--gray-100)',
                        color: 'var(--gray-600)',
                        borderRadius: 10,
                        padding: '1px 8px',
                        fontWeight: 600,
                      }}>
                        {items.length}
                      </span>
                    </div>
                    {items.map(item => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 0 8px 36px',
                          fontSize: 12,
                          color: 'var(--gray-600)',
                          borderBottom: '1px solid var(--card-border)',
                        }}
                      >
                        <span style={{ fontWeight: 500, color: 'var(--gray-700)' }}>{item.clientName}</span>
                        <span>{actionLabel(item.action)}</span>
                        {item.docTypes.map(dt => (
                          <span key={dt} className="chip">{dt}</span>
                        ))}
                        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--gray-400)' }}>{item.timeAgo}</span>
                      </div>
                    ))}
                  </div>
                ))}
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
