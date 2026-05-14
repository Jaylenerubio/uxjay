import { useState } from 'react';
import { clientDetails, clients } from '../data/mockData';
import { Icon } from './Icons';

function statusLabel(status) {
  const map = {
    approved: 'Approved',
    in_review: 'In Review',
    pending: 'Pending',
    overdue: 'Overdue',
    resubmitted: 'Resubmitted',
  };
  return map[status] || status;
}

function StatusBadge({ status }) {
  const cls = status === 'in_review' ? 'in_review' : status;
  return <span className={`badge ${cls}`}>{statusLabel(status)}</span>;
}

export default function ClientDetail({ clientId, onBack }) {
  const [newNote, setNewNote] = useState('');
  const [extraNotes, setExtraNotes] = useState([]);

  const detail = clientDetails[clientId];
  const basicClient = clients.find(c => c.id === clientId);

  const client = detail || (basicClient ? {
    id: basicClient.id,
    firstName: basicClient.firstName,
    lastName: basicClient.lastName,
    program: basicClient.program,
    caseWorker: 'CW Close',
    familyMembers: [
      { name: `${basicClient.firstName} ${basicClient.lastName}`, initials: `${basicClient.firstName[0]}${basicClient.lastName[0]}` },
    ],
    programs: [
      { name: basicClient.program, docCount: 3, thumb: null },
    ],
    checklist: [
      { familyMember: `${basicClient.firstName} ${basicClient.lastName}`, status: 'pending', count: 2, action: 'Upload', reupload: false },
    ],
    notes: [],
    eligibilityDocs: [
      { label: 'Proof of Income', required: 2, uploaded: 0 },
      { label: 'ID / Photo ID', required: 1, uploaded: 0 },
      { label: 'Lease Agreement', required: 1, uploaded: 0 },
    ],
  } : null);

  if (!client) {
    return (
      <div className="page">
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)', fontSize: 16 }}>
          Client not found.
        </div>
      </div>
    );
  }

  const allNotes = [...(client.notes || []), ...extraNotes];
  const fullName = `${client.firstName} ${client.lastName}`;

  function addNote() {
    if (!newNote.trim()) return;
    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    setExtraNotes(prev => [...prev, {
      id: Date.now(),
      text: newNote.trim(),
      date: dateStr,
      author: 'Jordan Reyes',
    }]);
    setNewNote('');
  }

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-link" onClick={onBack}>Dashboard</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{fullName}</span>
      </div>

      {/* Header */}
      <div className="client-header">
        <h1>{fullName}</h1>
        <span style={{
          background: 'var(--blue-light)',
          border: '1px solid #c5d8f5',
          borderRadius: 20,
          padding: '4px 14px',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--secondary-text)',
          fontFamily: 'Public Sans, sans-serif',
        }}>
          {client.caseWorker}
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-outline btn-sm">
            Edit client
          </button>
        </div>
      </div>

      {/* Family members */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 8, fontFamily: 'Public Sans, sans-serif' }}>
          Family members:
        </div>
        <div className="family-chips">
          {client.familyMembers.map(member => (
            <div key={member.name} className="family-chip">
              <div className="avatar avatar-sm">
                {member.initials}
              </div>
              {member.name}
            </div>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="client-detail-layout">
        {/* Left column */}
        <div>
          {/* Program cards */}
          <div className="program-cards">
            {client.programs.map(prog => (
              <div key={prog.name} className="program-card">
                <div className="program-card-thumb">
                  Document preview
                </div>
                <div className="program-card-body">
                  <div className="program-card-title">{prog.name}</div>
                  <div className="program-card-sub">{prog.docCount} documents</div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Checklist */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <h3>My Document Checklist</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Family member</th>
                  <th>Status</th>
                  <th>#</th>
                  <th>Action</th>
                  <th>Reupload</th>
                </tr>
              </thead>
              <tbody>
                {client.checklist.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700 }}>{row.familyMember}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td style={{ color: 'var(--gray-500)' }}>{row.count}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm">{row.action}</button>
                    </td>
                    <td>
                      {row.reupload ? (
                        <button className="btn btn-sm" style={{ background: 'var(--amber-light)', color: 'var(--amber)', border: 'none' }}>
                          <Icon name="upload" size={12} />
                          Reupload
                        </button>
                      ) : (
                        <span style={{ color: 'var(--gray-400)', fontSize: 13 }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Eligibility Appointment Checklist */}
          <div className="card">
            <div className="card-header">
              <h3>Eligibility Appointment Checklist</h3>
            </div>
            <div style={{ padding: '0 20px' }}>
              {client.eligibilityDocs.map((doc, i) => (
                <div key={i} className="elig-item">
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: doc.uploaded >= doc.required ? 'var(--green-trend)' : 'var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {doc.uploaded >= doc.required && (
                      <Icon name="check" size={11} color="#fff" strokeWidth={3} />
                    )}
                  </span>
                  <span style={{ flex: 1, fontSize: 14, fontFamily: 'Public Sans, sans-serif' }}>{doc.label}</span>
                  <span className="elig-count">{doc.uploaded}/{doc.required}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Notice to Client */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3>Notice to Client</h3>
            </div>

            <div style={{ padding: '0 20px 20px' }}>
              {allNotes.length === 0 ? (
                <div style={{ fontSize: 14, color: 'var(--gray-400)', textAlign: 'center', padding: '24px 0' }}>
                  No notes yet.
                </div>
              ) : (
                allNotes.map(note => (
                  <div key={note.id} className="note-item">
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                      <span className="note-author">{note.author}</span>
                      <span className="note-date">{note.date}</span>
                    </div>
                    <div className="note-text">{note.text}</div>
                  </div>
                ))
              )}

              {/* Add note inline */}
              <div style={{ marginTop: 16 }}>
                <textarea
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Type a note…"
                  style={{
                    width: '100%',
                    border: '1px solid var(--card-border)',
                    borderRadius: 6,
                    padding: '10px 12px',
                    fontSize: 14,
                    fontFamily: 'Public Sans, sans-serif',
                    resize: 'vertical',
                    minHeight: 80,
                    outline: 'none',
                    color: 'var(--body-text)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={addNote}
                    disabled={!newNote.trim()}
                  >
                    <Icon name="plus" size={13} />
                    Add note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
