import { useState, useRef } from 'react';
import { clients } from '../data/mockData';
import { Icon } from './Icons';

/* ── Static data ────────────────────────────────────────────────────────── */

const NOTICE_TYPES = [
  'Appointment letter',
  'Shopping voucher',
  'Fair-hearing slip',
  'Eligibility decision',
  'Next steps letter',
  'Housing voucher',
];

const INITIAL_NOTICES = [
  { id: 1, type: 'Eligibility decision',  clientName: 'Aisha Cole',      clientId: 'C-11205', message: 'Everything looks good. Move forward.',          sentDate: '05/12/26', status: 'awaiting',     sender: 'Jordan Reyes' },
  { id: 2, type: 'Shopping voucher',       clientName: 'Aisha Cole',      clientId: 'C-11205', message: 'Everything looks good. Move forward.',          sentDate: '05/12/26', status: 'awaiting',     sender: 'Jordan Reyes' },
  { id: 3, type: 'Eligibility decision',  clientName: 'Luz Ortega',      clientId: 'C-1105',  message: 'Benefits approved — pending client review.',    sentDate: '05/12/26', status: 'seen',         sender: 'Angela Torres' },
  { id: 4, type: 'Eligibility decision',  clientName: 'Aisha Coleman',   clientId: 'C-1220',  message: 'Everything looks good. Move forward.',          sentDate: '05/12/26', status: 'acknowledged', sender: 'Angela Torres' },
  { id: 5, type: 'Appointment letter',    clientName: 'Maria Santos',    clientId: 'C-1042',  message: 'Your appointment is confirmed for 05/20/26.',   sentDate: '05/10/26', status: 'awaiting',     sender: 'Jordan Reyes' },
  { id: 6, type: 'Housing voucher',       clientName: 'Devon Williams',  clientId: 'C-0887',  message: 'Your housing voucher has been approved.',       sentDate: '05/09/26', status: 'acknowledged', sender: 'Clara Mendez' },
  { id: 7, type: 'Fair-hearing slip',     clientName: 'James Fitch',     clientId: 'C-0934',  message: 'Your fair hearing is scheduled for next week.', sentDate: '05/08/26', status: 'seen',         sender: 'David Chung' },
  { id: 8, type: 'Next steps letter',     clientName: 'Fatima Al-Hassan',clientId: 'C-1455',  message: 'Please review next steps for your case.',       sentDate: '05/07/26', status: 'awaiting',     sender: 'Brian Okafor' },
  { id: 9, type: 'Shopping voucher',       clientName: 'Priya Nair',      clientId: 'C-1301',  message: 'Voucher approved — visit any participating store.', sentDate: '05/06/26', status: 'acknowledged', sender: 'Jordan Reyes' },
];

const COLS = [
  { key: 'awaiting',     label: 'Sent — Awaiting acknowledgement', borderColor: '#3b82f6', dotColor: '#3b82f6' },
  { key: 'seen',         label: 'Seen — Not yet acknowledged',     borderColor: '#93c5fd', dotColor: '#60a5fa' },
  { key: 'acknowledged', label: 'Acknowledged',                    borderColor: '#16a34a', dotColor: '#16a34a' },
];

/* ── Notice card ────────────────────────────────────────────────────────── */

function NoticeCard({ notice, col, onRemind }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fafafa' : '#fff',
        border: '1px solid #e5e7eb',
        borderLeft: `3px solid ${col.borderColor}`,
        borderRadius: 6,
        padding: '12px 14px',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a', marginBottom: 3, textTransform: 'capitalize' }}>
        {notice.type}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>
        {notice.clientName} · {notice.clientId}
      </div>
      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 10,
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {notice.message}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Sent: {notice.sentDate}</span>
        {notice.status !== 'acknowledged' && (
          <button
            onClick={e => { e.stopPropagation(); onRemind(notice.id); }}
            style={{
              fontSize: 12, fontWeight: 600, color: '#004cbe',
              background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
              textDecoration: 'underline', fontFamily: 'inherit',
            }}
          >
            Remind
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Send notice side sheet ─────────────────────────────────────────────── */

function SendSheet({ onClose, onSend }) {
  const [noticeType, setNoticeType] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [dragFileIdx, setDragFileIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const fileRef = useRef();

  const selectedClient = clients.find(c => c.id === clientId);
  const filteredClients = clients.filter(c => {
    const q = clientSearch.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });

  function handleFiles(incoming) {
    const arr = Array.from(incoming).map(f => ({ name: f.name, size: f.size, file: f }));
    setFiles(prev => [...prev, ...arr]);
  }

  function removeFile(i) {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  }

  /* simple drag-to-reorder */
  function onDragStart(i) { setDragFileIdx(i); }
  function onDragEnterRow(i) { setDragOverIdx(i); }
  function onDragEndRow() {
    if (dragFileIdx !== null && dragOverIdx !== null && dragFileIdx !== dragOverIdx) {
      setFiles(prev => {
        const arr = [...prev];
        const [moved] = arr.splice(dragFileIdx, 1);
        arr.splice(dragOverIdx, 0, moved);
        return arr;
      });
    }
    setDragFileIdx(null);
    setDragOverIdx(null);
  }

  const canSend = noticeType && clientId && files.length > 0;

  function handleSend() {
    if (!canSend) return;
    onSend({ noticeType, clientId, comments, fileNames: files.map(f => f.name) });
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 300 }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 460,
        background: '#fff', zIndex: 301,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        animation: 'sheetIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px', borderBottom: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: "'Public Sans', sans-serif" }}>
            Send a notice
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', padding: 6, borderRadius: 6, display: 'flex',
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Type of notice */}
            <div>
              <label style={labelStyle}>Type of notice</label>
              <select
                value={noticeType}
                onChange={e => setNoticeType(e.target.value)}
                style={selectStyle(!!noticeType)}
              >
                <option value="">Select</option>
                {NOTICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Recipient */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Recipient</label>
              {selectedClient ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', border: '1.5px solid #004cbe',
                  borderRadius: 6, background: '#f0f5ff',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#e4efff', color: '#1c4ed8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {selectedClient.firstName[0]}{selectedClient.lastName[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedClient.firstName} {selectedClient.lastName}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{selectedClient.id}</div>
                  </div>
                  <button onClick={() => { setClientId(''); setClientSearch(''); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, display: 'flex' }}>
                    <Icon name="close" size={13} />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Select"
                    value={clientSearch}
                    onChange={e => { setClientSearch(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    style={selectStyle(false)}
                  />
                  {showDropdown && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                      background: '#fff', border: '1px solid #e5e7eb',
                      borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                      maxHeight: 200, overflowY: 'auto', marginTop: 2,
                    }}>
                      {filteredClients.map(c => (
                        <div
                          key={c.id}
                          onClick={() => { setClientId(c.id); setShowDropdown(false); }}
                          style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}
                        >
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{c.firstName} {c.lastName}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af' }}>{c.id} · {c.program}</div>
                        </div>
                      ))}
                      {filteredClients.length === 0 && (
                        <div style={{ padding: '12px 14px', fontSize: 13, color: '#9ca3af' }}>No clients found</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Comments */}
            <div>
              <label style={labelStyle}>Comments <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
              <input
                type="text"
                placeholder="Add additional instructions, if needed"
                value={comments}
                onChange={e => setComments(e.target.value)}
                style={{ ...selectStyle(false), fontFamily: 'inherit' }}
              />
            </div>

            {/* Upload zone */}
            <div>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#004cbe' : '#c0c0c0'}`,
                  borderRadius: 8, padding: '28px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  cursor: 'pointer', background: dragOver ? '#f0f5ff' : '#fafafa',
                  transition: 'all 0.15s',
                }}
              >
                <Icon name="upload" size={22} color={dragOver ? '#004cbe' : '#9ca3af'} />
                <div style={{ fontSize: 13, fontWeight: 700, color: dragOver ? '#004cbe' : '#374151' }}>
                  Upload notice
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  Accepted file types are JPG, PNG, or PDF.
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: 'none' }}
                onChange={e => handleFiles(e.target.files)}
              />
            </div>

            {/* Uploaded files */}
            {files.length > 0 && (
              <div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Uploaded notices</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Drag to reorder</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {files.map((f, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => onDragStart(i)}
                      onDragEnter={() => onDragEnterRow(i)}
                      onDragEnd={onDragEndRow}
                      onDragOver={e => e.preventDefault()}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', background: dragOverIdx === i ? '#f0f5ff' : '#f9fafb',
                        border: `1px solid ${dragOverIdx === i ? '#93c5fd' : '#e5e7eb'}`,
                        borderRadius: 6, cursor: 'grab', transition: 'all 0.1s',
                        opacity: dragFileIdx === i ? 0.4 : 1,
                      }}
                    >
                      <span style={{ color: '#d1d5db', fontSize: 12, cursor: 'grab', userSelect: 'none' }}>⠿</span>
                      <Icon name="file" size={14} color="#9ca3af" />
                      <span style={{
                        flex: 1, fontSize: 12, color: '#374151', fontWeight: 500,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {f.name}
                      </span>
                      <button
                        onClick={() => removeFile(i)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 2, display: 'flex' }}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handleSend}
            disabled={!canSend}
            style={{
              width: '100%', padding: '13px 0',
              background: canSend ? '#031553' : '#d1d5db',
              color: canSend ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: 6,
              fontSize: 14, fontWeight: 700, cursor: canSend ? 'pointer' : 'not-allowed',
              fontFamily: "'Public Sans', sans-serif",
              transition: 'background 0.15s',
            }}
          >
            Send notice
          </button>
        </div>
      </div>

      <style>{`@keyframes sheetIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </>
  );
}

/* ── Shared styles ───────────────────────────────────────────────────────── */

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: '#374151', marginBottom: 6,
};

function selectStyle(filled) {
  return {
    width: '100%', padding: '10px 12px',
    border: `1.5px solid ${filled ? '#004cbe' : '#d1d5db'}`,
    borderRadius: 6, fontSize: 13, outline: 'none',
    background: '#fff', color: filled ? '#1a1a1a' : '#6b7280',
    fontFamily: "'Public Sans', sans-serif",
    appearance: 'none',
  };
}

/* ── Main page ───────────────────────────────────────────────────────────── */

export default function NoticesPage() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [typeFilter, setTypeFilter] = useState('All types');
  const [showSheet, setShowSheet] = useState(false);
  const [toast, setToast] = useState(null);

  const TYPE_FILTER_OPTS = ['All types', ...NOTICE_TYPES];

  const filtered = notices.filter(n =>
    typeFilter === 'All types' || n.type === typeFilter
  );

  function handleRemind(id) {
    const n = notices.find(x => x.id === id);
    showToast(`Reminder sent to ${n.clientName}.`);
  }

  function handleSend({ noticeType, clientId, comments, fileNames }) {
    const client = clients.find(c => c.id === clientId);
    setNotices(prev => [{
      id: Date.now(),
      type: noticeType,
      clientName: `${client.firstName} ${client.lastName}`,
      clientId: client.id,
      message: comments || 'Notice sent.',
      sentDate: '05/14/26',
      status: 'awaiting',
      sender: 'Jordan Reyes',
    }, ...prev]);
    setShowSheet(false);
    showToast(`Notice sent to ${client.firstName} ${client.lastName}.`);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const counts = {
    awaiting: filtered.filter(n => n.status === 'awaiting').length,
    seen: filtered.filter(n => n.status === 'seen').length,
    acknowledged: filtered.filter(n => n.status === 'acknowledged').length,
  };

  return (
    <div className="page" style={{ paddingBottom: 40 }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1f2937', color: '#fff', padding: '10px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 400,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
        }}>{toast}</div>
      )}

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <h1 style={{
            fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 700,
            color: '#1a1a1a', lineHeight: 1.15, marginBottom: 6,
          }}>
            Notices
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5, maxWidth: 440 }}>
            Send vouchers, appointment letters, fair-hearing slips, and eligibility decisions to clients in their housing journey.
          </p>
        </div>
        <button
          onClick={() => setShowSheet(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', background: '#031553', color: '#fff',
            border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Public Sans', sans-serif",
            flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          <Icon name="send" size={14} color="#fff" /> Send notice
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {TYPE_FILTER_OPTS.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            style={{
              padding: '5px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: "'Public Sans', sans-serif",
              background: typeFilter === t ? '#004cbe' : 'transparent',
              color: typeFilter === t ? '#fff' : '#374151',
              border: typeFilter === t ? 'none' : '1.5px solid #d1d5db',
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Kanban columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'start' }}>
        {COLS.map(col => {
          const colNotices = filtered.filter(n => n.status === col.key);
          return (
            <div key={col.key}>
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: col.dotColor, flexShrink: 0,
                }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#374151', flex: 1 }}>
                  {col.label}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: col.dotColor,
                  background: col.dotColor + '18',
                  padding: '1px 8px', borderRadius: 20,
                }}>
                  {counts[col.key]}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colNotices.length === 0 ? (
                  <div style={{
                    padding: '24px 16px', textAlign: 'center',
                    border: '1.5px dashed #e5e7eb', borderRadius: 8,
                    fontSize: 12, color: '#9ca3af',
                  }}>
                    No notices
                  </div>
                ) : (
                  colNotices.map(n => (
                    <NoticeCard key={n.id} notice={n} col={col} onRemind={handleRemind} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Side sheet */}
      {showSheet && (
        <SendSheet onClose={() => setShowSheet(false)} onSend={handleSend} />
      )}
    </div>
  );
}
