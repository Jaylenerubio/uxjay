import { useState, useRef } from 'react';
import { notices as initialNotices, clients } from '../data/mockData';
import { Icon } from './Icons';

const NOTICE_TYPES = ['Voucher', 'Appointment Slip', 'Eligibility Letter'];

const TYPE_META = {
  'Voucher': {
    icon: '🏠',
    desc: 'Housing voucher authorizing client for rental assistance or shelter placement.',
  },
  'Appointment Slip': {
    icon: '📅',
    desc: 'Scheduled meeting or assessment appointment details for the client.',
  },
  'Eligibility Letter': {
    icon: '📋',
    desc: 'Formal determination of program eligibility, next steps, or benefit status.',
  },
};

const TYPE_COLORS = {
  'Voucher':            { bg: '#e4efff', text: '#1c4ed8' },
  'Appointment Slip':   { bg: '#fef3c7', text: '#92400e' },
  'Eligibility Letter': { bg: '#e6f4ec', text: '#02522b' },
};

const STATUS_LABELS = {
  draft: 'Draft',
  sent: 'Sent',
  acknowledged: 'Acknowledged',
};

const STATUS_COLORS = {
  draft:        { bg: '#f3f4f6', text: '#374151' },
  sent:         { bg: '#e4efff', text: '#1c4ed8' },
  acknowledged: { bg: '#e6f4ec', text: '#02522b' },
};

const FILTER_TABS = ['All', ...NOTICE_TYPES];

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text,
      fontSize: 12, fontWeight: 600,
      padding: '2px 10px', borderRadius: 20,
    }}>
      {TYPE_META[type]?.icon} {type}
    </span>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: '#f3f4f6', text: '#374151' };
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: 12, fontWeight: 600,
      padding: '2px 10px', borderRadius: 20,
    }}>
      {STATUS_LABELS[status]}
    </span>
  );
}

/* ── Compose / Detail side sheet ─────────────────────────────────────────── */
function NoticeSheet({ notice, onClose, onSend, onSave }) {
  const isNew = !notice;

  // Compose state
  const [type, setType] = useState('');
  const [clientId, setClientId] = useState('');
  const [file, setFile] = useState(null);
  const [note, setNote] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showClientList, setShowClientList] = useState(false);
  const fileRef = useRef();

  // Detail state
  const [detailNote, setDetailNote] = useState(notice?.note || '');

  const selectedClient = clients.find(c => c.id === clientId);
  const filteredClients = clients.filter(c => {
    const q = clientSearch.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });

  function handleFileChange(e) {
    setFile(e.target.files[0] || null);
  }

  function handleDrop(e) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }

  function canSend() {
    return type && clientId && file;
  }

  function handleSend() {
    if (!canSend()) return;
    onSend({ type, clientId, fileName: file.name, note });
  }

  function handleResend() {
    onSave(notice.id, 'sent');
    onClose();
  }

  function handleAcknowledge() {
    onSave(notice.id, 'acknowledged');
    onClose();
  }

  return (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300,
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 480, background: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        zIndex: 301,
        display: 'flex', flexDirection: 'column',
        animation: 'slideInRight 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-400)', marginBottom: 2 }}>
              {isNew ? 'Create notice' : 'Notice detail'}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--body-text)', lineHeight: 1.2 }}>
              {isNew ? 'New Notice' : notice.type}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, borderRadius: 6, color: 'var(--gray-500)',
              display: 'flex', alignItems: 'center',
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {isNew ? (
            <ComposeBody
              type={type} setType={setType}
              clientId={clientId} setClientId={setClientId}
              clientSearch={clientSearch} setClientSearch={setClientSearch}
              showClientList={showClientList} setShowClientList={setShowClientList}
              filteredClients={filteredClients}
              selectedClient={selectedClient}
              file={file} fileRef={fileRef}
              handleFileChange={handleFileChange}
              handleDrop={handleDrop}
              note={note} setNote={setNote}
            />
          ) : (
            <DetailBody notice={notice} detailNote={detailNote} setDetailNote={setDetailNote} />
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--card-border)',
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          {isNew ? (
            <>
              <button
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', opacity: canSend() ? 1 : 0.45, cursor: canSend() ? 'pointer' : 'not-allowed' }}
                onClick={handleSend}
                disabled={!canSend()}
              >
                <Icon name="send" size={14} /> Send Notice
              </button>
              <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            </>
          ) : (
            <>
              {notice.status === 'draft' && (
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleResend}>
                  <Icon name="send" size={14} /> Send Now
                </button>
              )}
              {notice.status === 'sent' && (
                <>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handleAcknowledge}>
                    ✓ Mark Acknowledged
                  </button>
                  <button className="btn btn-ghost" onClick={handleResend}>Resend</button>
                </>
              )}
              {notice.status === 'acknowledged' && (
                <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                  ✓ Client acknowledged on {notice.acknowledgedDate}
                </div>
              )}
              <button className="btn btn-ghost" onClick={onClose} style={{ marginLeft: 'auto' }}>Close</button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(40px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

function ComposeBody({ type, setType, clientId, setClientId, clientSearch, setClientSearch, showClientList, setShowClientList, filteredClients, selectedClient, file, fileRef, handleFileChange, handleDrop, note, setNote }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Step 1 — Notice type */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 12 }}>
          1 · Notice type
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {NOTICE_TYPES.map(t => {
            const meta = TYPE_META[t];
            const c = TYPE_COLORS[t];
            const selected = type === t;
            return (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 10,
                  border: selected ? `2px solid #004cbe` : '1.5px solid var(--card-border)',
                  background: selected ? '#f0f5ff' : '#fff',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'border-color 0.1s, background 0.1s',
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: c.bg, color: c.text,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>
                  {meta.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--body-text)', marginBottom: 2 }}>{t}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.4 }}>{meta.desc}</div>
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  border: selected ? '5px solid #004cbe' : '2px solid var(--gray-300)',
                  background: '#fff',
                  transition: 'border 0.1s',
                }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — Recipient */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 12 }}>
          2 · Recipient
        </div>
        <div style={{ position: 'relative' }}>
          {selectedClient ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 14px', borderRadius: 8,
              border: '1.5px solid #004cbe', background: '#f0f5ff',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--avatar-bg)', color: 'var(--avatar-text)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
              }}>
                {selectedClient.firstName[0]}{selectedClient.lastName[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{selectedClient.firstName} {selectedClient.lastName}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{selectedClient.id} · {selectedClient.program}</div>
              </div>
              <button
                onClick={() => { setClientId(''); setClientSearch(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 4 }}
              >
                <Icon name="close" size={14} />
              </button>
            </div>
          ) : (
            <>
              <div style={{ position: 'relative' }}>
                <Icon name="search" size={16} color="var(--gray-400)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search by name or client ID..."
                  value={clientSearch}
                  onChange={e => { setClientSearch(e.target.value); setShowClientList(true); }}
                  onFocus={() => setShowClientList(true)}
                  style={{
                    width: '100%', padding: '10px 12px 10px 38px',
                    border: '1.5px solid var(--card-border)', borderRadius: 8,
                    fontSize: 13, outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              {showClientList && filteredClients.length > 0 && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                  background: '#fff', border: '1px solid var(--card-border)',
                  borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  maxHeight: 220, overflowY: 'auto', marginTop: 4,
                }}>
                  {filteredClients.map(c => (
                    <div
                      key={c.id}
                      onClick={() => { setClientId(c.id); setClientSearch(''); setShowClientList(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', cursor: 'pointer',
                        borderBottom: '1px solid var(--gray-200)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'var(--avatar-bg)', color: 'var(--avatar-text)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, flexShrink: 0,
                      }}>
                        {c.firstName[0]}{c.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{c.firstName} {c.lastName}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{c.id} · {c.program}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Step 3 — Attach file */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 12 }}>
          3 · Attach document
        </div>
        {file ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px', borderRadius: 8,
            border: '1.5px solid #004cbe', background: '#f0f5ff',
          }}>
            <Icon name="file" size={18} color="#004cbe" />
            <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--body-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {file.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', flexShrink: 0 }}>
              {(file.size / 1024).toFixed(0)} KB
            </div>
            <button
              onClick={() => { fileRef.current.value = ''; }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', padding: 4 }}
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ) : (
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { setDragOver(false); const f = e.dataTransfer.files[0]; if (f) { /* simulate file ref */ } }}
            onClick={() => fileRef.current.click()}
            style={{
              border: `2px dashed ${dragOver ? '#004cbe' : 'var(--gray-300)'}`,
              borderRadius: 10, padding: '28px 20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              cursor: 'pointer', transition: 'border-color 0.15s',
              background: dragOver ? '#f0f5ff' : '#fafafa',
            }}
          >
            <Icon name="upload" size={24} color={dragOver ? '#004cbe' : 'var(--gray-400)'} />
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)' }}>
              Drop file here or <span style={{ color: '#004cbe', textDecoration: 'underline' }}>browse</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>PDF, DOC, DOCX — max 20 MB</div>
          </div>
        )}
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      {/* Note */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 12 }}>
          Note <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add an internal note about this notice..."
          style={{
            width: '100%', minHeight: 80, padding: '10px 12px',
            border: '1.5px solid var(--card-border)', borderRadius: 8,
            fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none',
            lineHeight: 1.5,
          }}
        />
      </div>
    </div>
  );
}

function DetailBody({ notice, detailNote, setDetailNote }) {
  const c = TYPE_COLORS[notice.type] || { bg: '#f3f4f6', text: '#374151' };
  const meta = TYPE_META[notice.type];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Type + status row */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <TypeBadge type={notice.type} />
        <StatusBadge status={notice.status} />
      </div>

      {/* Meta */}
      <div style={{ background: 'var(--gray-50)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--card-border)' }}>
        {[
          ['Client', `${notice.clientName}`],
          ['Client ID', notice.clientId],
          ['Program', notice.program],
          ['Created', notice.createdDate],
          ...(notice.sentDate ? [['Sent', notice.sentDate]] : []),
          ...(notice.acknowledgedDate ? [['Acknowledged', notice.acknowledgedDate]] : []),
        ].map(([label, val]) => (
          <div key={label} style={{
            display: 'flex', padding: '11px 16px',
            borderBottom: '1px solid var(--card-border)',
          }}>
            <span style={{ fontSize: 12, color: 'var(--gray-500)', width: 130, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--body-text)' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Attached file */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 10 }}>
          Attached document
        </div>
        {notice.fileName ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderRadius: 10,
            border: '1px solid var(--card-border)', background: '#fafafa',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8,
              background: c.bg, color: c.text,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              📄
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {notice.fileName}
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>Preview not available in prototype</div>
            </div>
            <button className="btn btn-ghost btn-sm">
              <Icon name="download" size={14} /> Download
            </button>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: 'var(--gray-400)', fontStyle: 'italic' }}>No document attached — this notice is still a draft.</div>
        )}
      </div>

      {/* Note */}
      {notice.note && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-500)', marginBottom: 8 }}>Note</div>
          <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, padding: '12px 16px', background: 'var(--gray-50)', borderRadius: 8, border: '1px solid var(--card-border)' }}>
            {notice.note}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */
export default function NoticesPage() {
  const [notices, setNotices] = useState(initialNotices);
  const [filterTab, setFilterTab] = useState('All');
  const [search, setSearch] = useState('');
  const [sheet, setSheet] = useState(null); // null | 'new' | { notice }
  const [toast, setToast] = useState(null);

  const filtered = notices.filter(n => {
    const matchTab = filterTab === 'All' || n.type === filterTab;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      n.clientName.toLowerCase().includes(q) ||
      n.clientId.toLowerCase().includes(q) ||
      n.type.toLowerCase().includes(q) ||
      n.program.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const counts = {
    draft:        notices.filter(n => n.status === 'draft').length,
    sent:         notices.filter(n => n.status === 'sent').length,
    acknowledged: notices.filter(n => n.status === 'acknowledged').length,
  };

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleSend({ type, clientId, fileName, note }) {
    const client = clients.find(c => c.id === clientId);
    const newNotice = {
      id: Date.now(),
      type, clientId,
      clientName: `${client.firstName} ${client.lastName}`,
      program: client.program,
      createdDate: '05/14/26',
      sentDate: '05/14/26',
      status: 'sent',
      fileName,
      acknowledgedDate: null,
      note,
    };
    setNotices(prev => [newNotice, ...prev]);
    setSheet(null);
    showToast(`Notice sent to ${client.firstName} ${client.lastName}.`);
  }

  function handleSave(id, status) {
    setNotices(prev => prev.map(n => {
      if (n.id !== id) return n;
      return {
        ...n,
        status,
        sentDate: status === 'sent' ? '05/14/26' : n.sentDate,
        acknowledgedDate: status === 'acknowledged' ? '05/14/26' : n.acknowledgedDate,
      };
    }));
    showToast(`Notice updated to "${STATUS_LABELS[status]}".`);
  }

  return (
    <div className="page" style={{ paddingBottom: 40 }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1f2937', color: '#fff', padding: '10px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 400,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}>{toast}</div>
      )}

      {/* Page heading */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 700, color: 'var(--body-text)', lineHeight: 1.15, marginBottom: 4 }}>
            Notices
          </h1>
          <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.5 }}>
            Vouchers, appointment slips, and eligibility letters sent to clients.
          </p>
        </div>
        <button
          className="btn btn-primary"
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={() => setSheet('new')}
        >
          <Icon name="plus" size={15} /> New Notice
        </button>
      </div>

      {/* Stat row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Draft', count: counts.draft, color: '#374151', bg: '#f3f4f6' },
          { label: 'Sent — awaiting ack.', count: counts.sent, color: '#1c4ed8', bg: '#e4efff' },
          { label: 'Acknowledged', count: counts.acknowledged, color: '#02522b', bg: '#e6f4ec' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: '#fff', border: '1px solid var(--card-border)',
            borderRadius: 10, padding: '14px 18px',
            boxShadow: '0px 1px 1.5px rgba(0,0,0,0.06)',
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--body-text)', lineHeight: 1 }}>{s.count}</div>
            <div style={{ marginTop: 4 }}>
              <span style={{
                display: 'inline-block',
                background: s.bg, color: s.color,
                fontSize: 11, fontWeight: 600, borderRadius: 20, padding: '2px 8px',
              }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex', gap: 10, marginBottom: 0,
        background: '#fff', border: '1px solid var(--card-border)',
        borderRadius: '10px 10px 0 0', padding: '12px 16px',
        alignItems: 'center', flexWrap: 'wrap',
      }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                border: filterTab === tab ? 'none' : '1.5px solid var(--gray-300)',
                background: filterTab === tab ? '#004cbe' : 'transparent',
                color: filterTab === tab ? '#fff' : 'var(--gray-600)',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Search */}
        <div style={{ marginLeft: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: 10, pointerEvents: 'none', color: 'var(--gray-400)', display: 'flex' }}>
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '7px 12px 7px 30px', fontSize: 13,
              border: '1.5px solid var(--card-border)', borderRadius: 8, outline: 'none',
              fontFamily: 'inherit', width: 220,
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{filtered.length} notice{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--card-border)', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', borderBottom: '1px solid var(--card-border)' }}>
              {['Notice type', 'Client', 'Program', 'Created', 'Sent', 'Status', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.5px', color: 'var(--gray-500)',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
                  No notices match your filters.
                </td>
              </tr>
            )}
            {filtered.map(n => (
              <tr
                key={n.id}
                onClick={() => setSheet({ notice: n })}
                style={{
                  borderBottom: '1px solid var(--card-border)',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                onMouseLeave={e => e.currentTarget.style.background = ''}
              >
                <td style={{ padding: '13px 16px' }}>
                  <TypeBadge type={n.type} />
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{n.clientName}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{n.clientId}</div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-500)', maxWidth: 200 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.program}</div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{n.createdDate}</td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>
                  {n.sentDate || <span style={{ color: 'var(--gray-300)' }}>—</span>}
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <StatusBadge status={n.status} />
                </td>
                <td style={{ padding: '13px 16px', textAlign: 'right' }}>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={e => { e.stopPropagation(); setSheet({ notice: n }); }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    {n.status === 'draft' ? 'Send →' : 'View →'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Side sheet */}
      {sheet === 'new' && (
        <NoticeSheet
          notice={null}
          onClose={() => setSheet(null)}
          onSend={handleSend}
          onSave={handleSave}
        />
      )}
      {sheet && sheet.notice && (
        <NoticeSheet
          notice={sheet.notice}
          onClose={() => setSheet(null)}
          onSend={handleSend}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
