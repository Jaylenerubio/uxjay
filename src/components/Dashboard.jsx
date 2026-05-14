import { useState } from 'react';
import { activityItems, teamNotes } from '../data/mockData';
import { Icon } from './Icons';

const FILTER_CHIPS = ['All activity', 'Uploads', 'Notices', 'Custom'];

function ActivityRow({ item }) {
  return (
    <div className="activity-row">
      {/* Avatar */}
      <div className="avatar">
        {item.initials}
      </div>

      {/* New chip */}
      {item.isNew && (
        <span className="new-chip">
          <span className="new-chip-dot" />
          New
        </span>
      )}

      {/* Client name */}
      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif', whiteSpace: 'nowrap' }}>
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

function TeamNotes() {
  const [notes, setNotes] = useState(teamNotes);
  const [showInput, setShowInput] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  function addNote() {
    if (!newNoteText.trim()) return;
    setNotes(prev => [{
      id: Date.now(),
      author: 'Jordan Reyes',
      date: 'May 14, 2026',
      text: newNoteText.trim(),
    }, ...prev]);
    setNewNoteText('');
    setShowInput(false);
  }

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-header">
        <h3>Team notes</h3>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowInput(s => !s)}
        >
          <Icon name="plus" size={13} />
          + Add note
        </button>
      </div>

      <div style={{ padding: '0 20px' }}>
        {showInput && (
          <div style={{ padding: '14px 0', borderBottom: '1px solid var(--card-border)' }}>
            <textarea
              value={newNoteText}
              onChange={e => setNewNoteText(e.target.value)}
              placeholder="Type a note…"
              style={{
                width: '100%',
                border: '1px solid var(--card-border)',
                borderRadius: 6,
                padding: '8px 10px',
                fontSize: 14,
                fontFamily: 'Public Sans, sans-serif',
                resize: 'vertical',
                minHeight: 72,
                outline: 'none',
                color: 'var(--body-text)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--blue)'}
              onBlur={e => e.target.style.borderColor = 'var(--card-border)'}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={addNote} disabled={!newNoteText.trim()}>
                Save
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => { setShowInput(false); setNewNoteText(''); }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {notes.map((note, i) => (
          <div key={note.id} className="note-item">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span className="note-author">{note.author}</span>
              <span className="note-date">{note.date}</span>
            </div>
            <div className="note-text">{note.text}</div>
          </div>
        ))}
      </div>

      <a className="view-all-link">See all notes &rsaquo;</a>
    </div>
  );
}

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('All activity');

  const filtered = activityItems.filter(item => {
    if (activeFilter === 'All activity') return true;
    if (activeFilter === 'Uploads') return item.action === 'uploaded' || item.action === 're-uploaded';
    if (activeFilter === 'Notices') return item.action === 'acknowledged';
    return true;
  });

  return (
    <div className="page">
      {/* Page heading */}
      <h1 className="page-heading">Overview</h1>

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

      {/* Stat cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">New cases</div>
          <div className="stat-value">30</div>
          <div className="stat-trend up">
            <Icon name="arrow-up" size={13} color="var(--green-trend)" strokeWidth={2.5} />
            10% vs last week
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">New cases</div>
          <div className="stat-value">30</div>
          <div className="stat-trend up">
            <Icon name="arrow-up" size={13} color="var(--green-trend)" strokeWidth={2.5} />
            10% vs last week
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">In progress</div>
          <div className="stat-value">47</div>
          <div className="stat-trend up">
            <Icon name="arrow-up" size={13} color="var(--green-trend)" strokeWidth={2.5} />
            10% vs last week
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Notices sent</div>
          <div className="stat-value">20</div>
          <div className="stat-trend down">
            <Icon name="arrow-down" size={13} color="var(--red-trend)" strokeWidth={2.5} />
            10% vs last week
          </div>
        </div>
      </div>

      {/* Two-column main area */}
      <div className="two-col">
        {/* Latest activity */}
        <div className="two-col-main">
          <div className="card">
            <div className="card-header">
              <h3>Latest activity</h3>
            </div>

            <div>
              {filtered.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>
                  No activity for this filter.
                </div>
              ) : (
                filtered.map(item => <ActivityRow key={item.id} item={item} />)
              )}
            </div>

            <a className="view-all-link">View all activity &rsaquo;</a>
          </div>
        </div>

        {/* Team notes */}
        <div className="two-col-aside">
          <TeamNotes />
        </div>
      </div>
    </div>
  );
}
