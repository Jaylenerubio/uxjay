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
  const [notes, setNotes] = useState(null);

  // Try to find detailed record, fall back to clients list
  const detail = clientDetails[clientId];
  const basicClient = clients.find(c => c.id === clientId);
  const client = detail || (basicClient ? {
    id: basicClient.id,
    firstName: basicClient.firstName,
    lastName: basicClient.lastName,
    program: basicClient.program,
    caseWorker: 'CW Close',
    familyMembers: [
      { name: `${basicClient.firstName} ${basicClient.lastName}`, initials: `${basicClient.firstName[0]}${basicClient.lastName[0]}`, color: '#7c5cbf' },
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

  const displayNotes = notes || (client ? client.notes : []);

  if (!client) {
    return (
      <div className="page">
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray-400)' }}>
          Client not found.
        </div>
      </div>
    );
  }

  function addNote() {
    if (!newNote.trim()) return;
    const now = new Date();
    const timestamp = `${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}/${String(now.getFullYear()).slice(2)} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    setNotes([...(displayNotes), {
      id: Date.now(),
      text: newNote.trim(),
      timestamp,
      author: 'Jordan Reyes',
    }]);
    setNewNote('');
  }

  const fullName = `${client.firstName} ${client.lastName}`;

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
          background: 'var(--gray-100)',
          border: '1px solid var(--card-border)',
          borderRadius: 20,
          padding: '3px 12px',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--gray-600)',
        }}>
          {client.caseWorker}
        </span>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-ghost btn-sm">
            Edit client
          </button>
        </div>
      </div>

      {/* Family members */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 8 }}>Family members:</div>
        <div className="family-chips">
          {client.familyMembers.map(member => (
            <div key={member.name} className="family-chip">
              <div className="avatar avatar-sm" style={{ background: member.color, width: 24, height: 24, fontSize: 10 }}>
                {member.initials}
              </div>
              {member.name}
            </div>
          ))}
        </div>
      </div>

      {/* Two-column main layout */}
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
          <div className="card" style={{ marginBottom: 16 }}>
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
                    <td style={{ fontWeight: 500 }}>{row.familyMember}</td>
                    <td><StatusBadge status={row.status} /></td>
                    <td style={{ color: 'var(--gray-600)' }}>{row.count}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm">{row.action}</button>
                    </td>
                    <td>
                      {row.reupload ? (
                        <button className="btn btn-sm" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>
                          <Icon name="upload" size={12} />
                          Reupload
                        </button>
                      ) : (
                        <span style={{ color: 'var(--gray-400)', fontSize: 12 }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Eligibility Checklist */}
          <div className="card">
            <div className="card-header">
              <h3>Eligibility Appointment Checklist</h3>
            </div>
            <div style={{ padding: '0 18px' }}>
              {client.eligibilityDocs.map((doc, i) => (
                <div key={i} className="elig-item">
                  <span style={{
                    width: 16,
                    height: 16,
                    borderRadius: 3,
                    background: doc.uploaded >= doc.required ? 'var(--green)' : 'var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {doc.uploaded >= doc.required && (
                      <Icon name="check" size={10} color="#fff" strokeWidth={3} />
                    )}
                  </span>
                  <span style={{ flex: 1 }}>{doc.label}</span>
                  <span className="elig-count">{doc.uploaded}/{doc.required}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel: Notice to Client */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3>Notice to Client</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const note = prompt('Add note:');
                  if (note && note.trim()) {
                    const now = new Date();
                    const timestamp = `${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getDate().toString().padStart(2,'0')}/${String(now.getFullYear()).slice(2)} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
                    setNotes([...(displayNotes), { id: Date.now(), text: note.trim(), timestamp, author: 'Jordan Reyes' }]);
                  }
                }}
              >
                <Icon name="plus" size={13} />
                Add note
              </button>
            </div>
            <div style={{ padding: '14px 18px' }}>
              {displayNotes.length === 0 && (
                <div style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center', padding: '20px 0' }}>
                  No notes yet.
                </div>
              )}
              {displayNotes.map(note => (
                <div key={note.id} className="note-item">
                  <div className="note-text">{note.text}</div>
                  <div className="note-meta">{note.timestamp} · {note.author}</div>
                </div>
              ))}

              {/* Inline add note */}
              <div style={{ marginTop: 12 }}>
                <textarea
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Type a note…"
                  style={{
                    width: '100%',
                    border: '1px solid var(--card-border)',
                    borderRadius: 7,
                    padding: '8px 10px',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: 72,
                    outline: 'none',
                    color: 'var(--gray-800)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
                />
                <button
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: 8 }}
                  onClick={addNote}
                  disabled={!newNote.trim()}
                >
                  Save note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
