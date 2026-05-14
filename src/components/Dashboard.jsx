import { documents, notices, activity } from '../data/mockData';

export default function Dashboard({ onNav }) {
  const pendingDocs = documents.filter(d => d.status === 'pending' || d.status === 'needs_review').length;
  const resubmissions = documents.filter(d => d.isResubmission).length;
  const draftNotices = notices.filter(n => n.status === 'draft').length;
  const unacknowledged = notices.filter(n => n.status === 'sent' && !n.acknowledged).length;

  return (
    <div className="page">
      <div className="stats-row">
        <div className="stat-card yellow">
          <div className="stat-label">Docs Awaiting Review</div>
          <div className="stat-value">{pendingDocs}</div>
          <div className="stat-sub">Pending + Needs Review</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Resubmissions</div>
          <div className="stat-value">{resubmissions}</div>
          <div className="stat-sub">Clients re-sent requested docs</div>
        </div>
        <div className="stat-card red">
          <div className="stat-label">Draft Notices</div>
          <div className="stat-value">{draftNotices}</div>
          <div className="stat-sub">Not yet sent to client</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-label">Awaiting Acknowledgment</div>
          <div className="stat-value">{unacknowledged}</div>
          <div className="stat-sub">Sent notices, no response yet</div>
        </div>
      </div>

      <div className="two-col" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-header">
            <h3>🔴 Needs Your Attention</h3>
          </div>
          <div style={{ padding: '0' }}>
            {documents.filter(d => d.status === 'needs_review').map(doc => (
              <div key={doc.id} style={{ padding: '12px 18px', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{doc.clientName}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{doc.docType} · {doc.receivedDate}</div>
                  {doc.isResubmission && <span className="resubmit-tag">RESUBMISSION</span>}
                </div>
                <span className="badge needs_review">Needs Review</span>
              </div>
            ))}
            {notices.filter(n => n.status === 'draft').map(notice => (
              <div key={notice.id} style={{ padding: '12px 18px', borderBottom: '1px solid var(--gray-100)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{notice.clientName}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{notice.noticeType} · Due {notice.dueDate}</div>
                </div>
                <span className="badge draft">Draft Notice</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>⚡ Latest Activity</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('activity')}>View all</button>
          </div>
          <div className="activity-feed">
            {activity.map(item => (
              <div key={item.id} className="activity-item">
                <div className={`activity-dot ${item.tag}`} />
                <span>{item.event}</span>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <h3>📥 Recent Documents</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('queue')}>Open queue</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Document</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.slice(0, 5).map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{doc.clientName}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{doc.clientId}</div>
                  </td>
                  <td>
                    {doc.docType}
                    {doc.isResubmission && <span className="resubmit-tag">↩ RE</span>}
                  </td>
                  <td style={{ color: 'var(--gray-500)', fontSize: 12 }}>{doc.receivedDate}</td>
                  <td><span className={`badge ${doc.status}`}>{doc.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>🔔 Notice Tracker</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav('notices')}>All notices</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Notice</th>
                <th>Due</th>
                <th>Ack.</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(n => (
                <tr key={n.id}>
                  <td style={{ fontWeight: 500, fontSize: 13 }}>{n.clientName}</td>
                  <td style={{ fontSize: 12 }}>{n.noticeType}</td>
                  <td style={{ fontSize: 11, color: 'var(--gray-500)' }}>{n.dueDate}</td>
                  <td>
                    {n.status === 'draft' && <span className="badge draft">Draft</span>}
                    {n.status === 'sent' && n.acknowledged && <span className="badge acknowledged">✓ Ack'd</span>}
                    {n.status === 'sent' && !n.acknowledged && <span className="badge pending">Waiting</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
