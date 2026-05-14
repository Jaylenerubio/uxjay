import { activity } from '../data/mockData';

const TAG_LABELS = {
  resubmission: 'Resubmission',
  acknowledged: 'Acknowledged',
  new_doc: 'New Document',
};

export default function Activity() {
  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h3>⚡ Latest Activity</h3>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Today · Jordan Reyes · Region 4</span>
        </div>
        <div className="activity-feed">
          {activity.map(item => (
            <div key={item.id} className="activity-item" style={{ gap: 14 }}>
              <div className={`activity-dot ${item.tag}`} style={{ marginTop: 5 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13 }}>{item.event}</div>
                <span className={`badge ${item.tag}`} style={{ marginTop: 4 }}>{TAG_LABELS[item.tag]}</span>
              </div>
              <span className="activity-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
