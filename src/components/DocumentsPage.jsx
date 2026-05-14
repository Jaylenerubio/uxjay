import { useState } from 'react';
import { allDocuments } from '../data/mockData';
import { Icon } from './Icons';

const TABS = ['All documents', 'Resubmitted'];

function statusLabel(status) {
  const map = {
    pending: 'Pending',
    resubmitted: 'Resubmitted',
    in_review: 'In Review',
    approved: 'Approved',
    overdue: 'Overdue',
  };
  return map[status] || status;
}

function StatusBadge({ status }) {
  const cls = status === 'in_review' ? 'in_review' : status;
  return <span className={`badge ${cls}`}>{statusLabel(status)}</span>;
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('All documents');

  const newCount = allDocuments.filter(d => d.status === 'pending').length;
  const resubmittedCount = allDocuments.filter(d => d.status === 'resubmitted').length;
  const approvedCount = allDocuments.filter(d => d.status === 'approved').length;

  const filtered = allDocuments.filter(doc => {
    if (activeTab === 'Resubmitted') return doc.status === 'resubmitted';
    return true;
  });

  return (
    <div className="page">
      {/* Page heading */}
      <h1 className="page-heading">Documents</h1>

      {/* Stat cards (3 columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-label">New</div>
          <div className="stat-value" style={{ color: 'var(--blue)' }}>{newCount}</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginTop: 6 }}>
            05/01/26 – 05/14/26
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Resubmitted</div>
          <div className="stat-value" style={{ color: 'var(--indigo)' }}>{resubmittedCount}</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginTop: 6 }}>
            Awaiting review
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Approved</div>
          <div className="stat-value" style={{ color: 'var(--green-trend)' }}>{approvedCount}</div>
          <div style={{ fontSize: 13, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginTop: 6 }}>
            This period
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="card">
        {/* Filter tabs */}
        <div className="filter-tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <table>
          <thead>
            <tr>
              <th>Document name</th>
              <th>Object Name</th>
              <th>Family member</th>
              <th>Status</th>
              <th>Date</th>
              <th>Assigned to</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(doc => (
              <tr key={doc.id}>
                <td style={{ fontWeight: 700 }}>{doc.name}</td>
                <td style={{ color: 'var(--secondary-text)' }}>{doc.objectName}</td>
                <td style={{ color: 'var(--secondary-text)', fontSize: 13 }}>{doc.familyMember}</td>
                <td><StatusBadge status={doc.status} /></td>
                <td style={{ color: 'var(--gray-500)', fontSize: 13, whiteSpace: 'nowrap' }}>{doc.date}</td>
                <td style={{ fontSize: 13 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      className="avatar"
                      style={{
                        width: 24,
                        height: 24,
                        fontSize: 9,
                        background: 'var(--avatar-bg)',
                        color: 'var(--avatar-text)',
                      }}
                    >
                      {doc.assignedTo.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </div>
                    <span>{doc.assignedTo}</span>
                  </div>
                </td>
                <td>
                  <span style={{ color: 'var(--gray-400)' }}>
                    <Icon name="chevron" size={16} />
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 48, color: 'var(--gray-400)', fontSize: 14 }}>
                  No documents match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
