import { useState } from 'react';
import { documents as initialDocs, docTypes, statusOptions } from '../data/mockData';

const STATUS_LABELS = {
  pending: 'Pending',
  needs_review: 'Needs Review',
  approved: 'Approved',
  rejected: 'Rejected',
};

function DetailPanel({ doc, onClose, onSave }) {
  const [status, setStatus] = useState(doc.status);
  const [note, setNote] = useState('');

  function handleSave() {
    onSave(doc.id, status, note);
    onClose();
  }

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="detail-panel">
        <div className="panel-header">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>← Back</button>
          <h3>{doc.docType}</h3>
          <span className={`badge ${doc.status}`}>{STATUS_LABELS[doc.status]}</span>
        </div>

        <div className="panel-body">
          {doc.isResubmission && (
            <div className="note-box purple" style={{ marginBottom: 16 }}>
              ↩ <strong>Resubmission</strong> — Client re-sent this after your request on {doc.requestedDate}. Compare carefully against original.
            </div>
          )}

          <div className="doc-preview">
            <div className="doc-icon">📄</div>
            <div className="doc-filename">{doc.fileLabel}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 6 }}>Preview not available in prototype</div>
          </div>

          <div className="section-label">Document Details</div>
          <div className="meta-list">
            <div className="meta-row">
              <span className="meta-label">Client</span>
              <span className="meta-value">{doc.clientName}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Client ID</span>
              <span className="meta-value">{doc.clientId}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Case ID</span>
              <span className="meta-value">{doc.caseId}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Document Type</span>
              <span className="meta-value">{doc.docType}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Received</span>
              <span className="meta-value">{doc.receivedDate}</span>
            </div>
            {doc.isResubmission && (
              <div className="meta-row">
                <span className="meta-label">Originally Requested</span>
                <span className="meta-value" style={{ color: '#7c3aed' }}>{doc.requestedDate}</span>
              </div>
            )}
          </div>

          <div className="divider" />

          <div className="section-label">Update Status</div>
          <div className="status-select-group">
            <label>New status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%' }}>
              <option value="pending">Pending</option>
              <option value="needs_review">Needs Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="status-select-group">
            <label>Caseworker note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add an internal note about this document..."
              style={{
                width: '100%', border: '1px solid var(--gray-300)', borderRadius: 6,
                padding: '8px 10px', fontSize: 13, resize: 'vertical', minHeight: 80,
                fontFamily: 'inherit', outline: 'none'
              }}
            />
          </div>

          {status === 'rejected' && (
            <div className="note-box yellow">
              ⚠ Marking as <strong>Rejected</strong> will prompt you to create a Missing Document notice for this client.
            </div>
          )}
        </div>

        <div className="panel-footer">
          <button className="btn btn-primary" onClick={handleSave}>Save &amp; Close</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          {status === 'rejected' && (
            <button className="btn btn-warn" style={{ marginLeft: 'auto' }}>+ Create Notice</button>
          )}
        </div>
      </div>
    </>
  );
}

export default function DocumentQueue() {
  const [docs, setDocs] = useState(initialDocs);
  const [mode, setMode] = useState('individual');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [filterResubmit, setFilterResubmit] = useState(false);
  const [openDoc, setOpenDoc] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [toast, setToast] = useState(null);

  const filtered = docs.filter(d => {
    const matchSearch = search === '' ||
      d.clientName.toLowerCase().includes(search.toLowerCase()) ||
      d.clientId.toLowerCase().includes(search.toLowerCase()) ||
      d.caseId.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All Types' || d.docType === filterType;
    const matchStatus = filterStatus === 'All Statuses' || d.status === filterStatus;
    const matchResubmit = !filterResubmit || d.isResubmission;
    return matchSearch && matchType && matchStatus && matchResubmit;
  });

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(d => d.id)));
  }

  function applyBulk(newStatus) {
    setDocs(prev => prev.map(d => selected.has(d.id) ? { ...d, status: newStatus } : d));
    showToast(`${selected.size} document(s) marked as "${newStatus.replace('_', ' ')}"`);
    setSelected(new Set());
  }

  function saveDoc(id, status, note) {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    showToast(`Document status updated to "${status.replace('_', ' ')}"`);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const previewDoc = selected.size > 0 ? docs.find(d => d.id === [...selected][0]) : null;

  return (
    <div className="page" style={{ paddingBottom: 40 }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1f2937', color: '#fff', padding: '10px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 200,
          boxShadow: '0 4px 16px #0003'
        }}>{toast}</div>
      )}

      <div className="card" style={{ marginBottom: 0 }}>
        <div className="toolbar">
          <div className="toolbar-left">
            <input
              type="text"
              placeholder="Search by client, ID, or case..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              {docTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              {statusOptions.map(s => <option key={s}>{s}</option>)}
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--gray-600)' }}>
              <input type="checkbox" checked={filterResubmit} onChange={e => setFilterResubmit(e.target.checked)} />
              Resubmissions only
            </label>
          </div>
          <div className="toolbar-right">
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{filtered.length} docs</span>
            <div className="mode-toggle">
              <button className={`mode-btn ${mode === 'individual' ? 'active' : ''}`} onClick={() => { setMode('individual'); setSelected(new Set()); }}>
                Individual
              </button>
              <button className={`mode-btn ${mode === 'bulk' ? 'active' : ''}`} onClick={() => setMode('bulk')}>
                Bulk
              </button>
            </div>
          </div>
        </div>

        {mode === 'bulk' && selected.size > 0 && (
          <div className="bulk-bar">
            <span><strong>{selected.size}</strong> selected</span>
            <div className="bulk-bar-actions">
              <button className="btn btn-seen" onClick={() => applyBulk('approved')}>✓ Mark Approved</button>
              <button className="btn btn-review" onClick={() => applyBulk('needs_review')}>⚑ Needs Review</button>
              <button className="btn btn-review" onClick={() => applyBulk('pending')}>↺ Reset to Pending</button>
              <button className="btn-close" onClick={() => setSelected(new Set())}>×</button>
            </div>
          </div>
        )}

        {mode === 'bulk' && selected.size > 0 && previewDoc && (
          <div style={{ padding: '12px 18px', background: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)', display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600 }}>Verification preview (first selected):</div>
            <span style={{ fontSize: 13 }}>{previewDoc.clientName} — {previewDoc.docType}</span>
            <span className={`badge ${previewDoc.status}`}>{STATUS_LABELS[previewDoc.status]}</span>
            <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{previewDoc.fileLabel}</span>
            {previewDoc.isResubmission && <span className="resubmit-tag">RESUBMISSION</span>}
          </div>
        )}

        <table>
          <thead>
            <tr>
              {mode === 'bulk' && (
                <th style={{ width: 40 }}>
                  <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} />
                </th>
              )}
              <th>Client</th>
              <th>Document Type</th>
              <th>Received</th>
              <th>Resubmission</th>
              <th>Status</th>
              {mode === 'individual' && <th></th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={mode === 'bulk' ? 6 : 6} style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-400)' }}>
                  No documents match your filters.
                </td>
              </tr>
            )}
            {filtered.map(doc => (
              <tr
                key={doc.id}
                className={`${selected.has(doc.id) ? 'selected' : ''} ${openDoc?.id === doc.id ? 'row-open' : ''}`}
                onClick={() => {
                  if (mode === 'bulk') toggleSelect(doc.id);
                  else setOpenDoc(doc);
                }}
              >
                {mode === 'bulk' && (
                  <td onClick={e => { e.stopPropagation(); toggleSelect(doc.id); }}>
                    <input type="checkbox" checked={selected.has(doc.id)} onChange={() => toggleSelect(doc.id)} />
                  </td>
                )}
                <td>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{doc.clientName}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{doc.clientId} · {doc.caseId}</div>
                </td>
                <td style={{ fontSize: 13 }}>{doc.docType}</td>
                <td style={{ fontSize: 12, color: 'var(--gray-500)' }}>{doc.receivedDate}</td>
                <td>
                  {doc.isResubmission
                    ? <span className="badge resubmission">↩ Yes — req. {doc.requestedDate}</span>
                    : <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>—</span>
                  }
                </td>
                <td><span className={`badge ${doc.status}`}>{STATUS_LABELS[doc.status]}</span></td>
                {mode === 'individual' && (
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); setOpenDoc(doc); }}>Review →</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openDoc && mode === 'individual' && (
        <DetailPanel
          doc={openDoc}
          onClose={() => setOpenDoc(null)}
          onSave={saveDoc}
        />
      )}
    </div>
  );
}
