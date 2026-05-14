import { useState } from 'react';
import { tasks, teamMembers } from '../data/mockData';

const TABS = ['All', 'Overdue', 'Waiting'];

function statusLabel(status) {
  const map = { pending: 'Pending', overdue: 'Overdue', waiting: 'Waiting' };
  return map[status] || status;
}

function TaskRow({ task }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 18px',
        borderBottom: '1px solid var(--card-border)',
        background: hovered ? 'var(--gray-50)' : '',
        transition: 'background 0.1s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="avatar" style={{ background: task.color }}>
        {task.initials}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{task.clientName}</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {task.docTypes.map(dt => (
            <span key={dt} className="chip">{dt}</span>
          ))}
        </div>
      </div>

      <span className={`badge ${task.status}`}>{statusLabel(task.status)}</span>

      <span style={{ fontSize: 11, color: 'var(--gray-400)', whiteSpace: 'nowrap', minWidth: 52, textAlign: 'right' }}>
        {task.timeAgo}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = tasks.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Overdue') return t.status === 'overdue';
    if (activeTab === 'Waiting') return t.status === 'waiting';
    return true;
  });

  return (
    <div className="page">
      {/* Stat cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">This week</div>
          <div className="stat-value">30</div>
          <div className="stat-sub">Active tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Next week</div>
          <div className="stat-value">30</div>
          <div className="stat-sub">Scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Assignments</div>
          <div className="stat-value">47</div>
          <div className="stat-sub">Total active</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Delivery ratio</div>
          <div className="stat-value" style={{ fontSize: 28 }}>20%</div>
          <div className="stat-sub">Documents on time</div>
        </div>
      </div>

      {/* Two column */}
      <div className="two-col">
        {/* Task list */}
        <div className="card">
          <div className="card-header">
            <h3>Tasks</h3>
          </div>
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
          <div>
            {filtered.length === 0 ? (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--gray-400)', fontSize: 13 }}>
                No tasks match this filter.
              </div>
            ) : (
              filtered.map(task => <TaskRow key={task.id} task={task} />)
            )}
          </div>
        </div>

        {/* Team Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Team Activity</h3>
          </div>
          <div style={{ padding: '8px 0' }}>
            {teamMembers.map(member => (
              <div
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 18px',
                  borderBottom: '1px solid var(--card-border)',
                }}
              >
                <div className="avatar" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{member.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{member.assignments} assignments</div>
                </div>
                <span style={{
                  background: 'var(--blue-light)',
                  color: 'var(--blue)',
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 20,
                  padding: '2px 10px',
                }}>
                  {member.assignments}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
