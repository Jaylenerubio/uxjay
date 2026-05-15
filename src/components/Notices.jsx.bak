import { useState } from 'react';
import { notices as initialNotices } from '../data/mockData';

const NOTICE_TYPES = ['All Types', 'Missing Document', 'Eligibility Decision', 'Request for Information'];
const NOTICE_STATUSES = ['All', 'Draft', 'Sent', 'Acknowledged'];

function noticeClass(n) {
  if (n.status === 'draft') return 'urgent';
  if (n.status === 'sent' && n.acknowledged) return 'done';
  return 'sent-ack';
}

export default function Notices() {
  const [notices, setNotices] = useState(initialNotices);
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All');
  const [toast, setToast] = useState(null);

  const filtered = notices.filter(n => {
    const matchType = filterType === 'All Types' || n.noticeType === filterType;
    const matchStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Draft' && n.status === 'draft') ||
      (filterStatus === 'Sent' && n.status === 'sent' && !n.acknowledged) ||
      (filterStatus === 'Acknowledged' && n.acknowledged);
    return matchType && matchStatus;
  });

  function sendNotice(id) {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, status: 'sent', sentDate: '2026-05-14' } : n));
    showToast('Notice sent to client.');
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const drafts = filtered.filter(n => n.status === 'draft');
  const sent = filtered.filter(n => n.status === 'sent' && !n.acknowledged);
  const acknowledged = filtered.filter(n => n.acknowledged);

  return (
    <div className="page">
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1f2937', color: '#fff', padding: '10px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 200,
          boxShadow: '0 4px 16px #0003'
        }}>{toast}</div>
      )}

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          {NOTICE_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          {NOTICE_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>+ New Notice</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* Draft notices */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div className="section-label" style={{ margin: 0 }}>Draft — Not Sent</div>
            <span className="badge needs_review">{drafts.length}</span>
          </div>
          {drafts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">✉️</div>
              <p>No draft notices</p>
            </div>
          )}
          <div className="notice-list">
            {drafts.map(n => (
              <div key={n.id} className={`notice-card ${noticeClass(n)}`}>
                <div className="notice-top">
                  <div style={{ flex: 1 }}>
                    <div className="notice-title">{n.noticeType}</div>
                    <div className="notice-client">{n.clientName} · {n.clientId}</div>
                  </div>
                  <span className="badge draft">Draft</span>
                </div>
                <div className="notice-detail">{n.detail}</div>
                <div className="notice-footer">
                  <span>Due: <strong>{n.dueDate}</strong></span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-primary btn-sm" onClick={() => sendNotice(n.id)}>Send →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sent, awaiting acknowledgment */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div className="section-label" style={{ margin: 0 }}>Sent — Awaiting Ack.</div>
            <span className="badge pending">{sent.length}</span>
          </div>
          {sent.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📬</div>
              <p>No notices awaiting acknowledgment</p>
            </div>
          )}
          <div className="notice-list">
            {sent.map(n => (
              <div key={n.id} className={`notice-card ${noticeClass(n)}`}>
                <div className="notice-top">
                  <div style={{ flex: 1 }}>
                    <div className="notice-title">{n.noticeType}</div>
                    <div className="notice-client">{n.clientName} · {n.clientId}</div>
                  </div>
                  <span className="badge sent">Sent</span>
                </div>
                <div className="notice-detail">{n.detail}</div>
                <div className="notice-footer">
                  <span>Sent: {n.sentDate}</span>
                  <span className="unacked-note">⏳ No response yet</span>
                  <div style={{ marginLeft: 'auto' }}>
                    <button className="btn btn-ghost btn-sm">Resend</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acknowledged */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div className="section-label" style={{ margin: 0 }}>Acknowledged</div>
            <span className="badge approved">{acknowledged.length}</span>
          </div>
          {acknowledged.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <p>No acknowledged notices</p>
            </div>
          )}
          <div className="notice-list">
            {acknowledged.map(n => (
              <div key={n.id} className={`notice-card ${noticeClass(n)}`}>
                <div className="notice-top">
                  <div style={{ flex: 1 }}>
                    <div className="notice-title">{n.noticeType}</div>
                    <div className="notice-client">{n.clientName} · {n.clientId}</div>
                  </div>
                  <span className="badge acknowledged">✓ Ack'd</span>
                </div>
                <div className="notice-detail">{n.detail}</div>
                <div className="notice-footer">
                  <span>Sent: {n.sentDate}</span>
                  <span className="ack-note">✓ Client acknowledged {n.acknowledged}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
