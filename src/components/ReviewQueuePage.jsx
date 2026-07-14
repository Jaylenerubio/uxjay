import { useState } from 'react';
import { Icon } from './Icons';

/* ── Mock data: ~80 documents across 17 clients ─────────────────────────── */
const INITIAL_QUEUE = [
  { id: 'C-5501', name: 'Jaylene Rubio',         initials: 'JR', caresId: 'CR-10482', date: '03/20/2026', docs: [
    { id:  1, name: 'Social security card',  pages: 1, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  2, name: 'Birth certificate',     pages: 2, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  3, name: 'Proof of income',       pages: 4, date: '03/20/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5502', name: 'Darko Simons',          initials: 'DS', caresId: 'CR-10391', date: '03/20/2026', docs: [
    { id:  4, name: 'State ID',              pages: 1, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  5, name: 'Lease agreement',       pages: 6, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  6, name: 'Medical records',       pages: 8, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  7, name: 'Utility bill',          pages: 2, date: '03/20/2026', status: 'new', resubmission: false },
    { id:  8, name: 'Bank statement',        pages: 3, date: '03/20/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5503', name: 'Marcus Lee',            initials: 'ML', caresId: 'CR-10274', date: '03/20/2026', docs: [
    { id:  9, name: 'Proof of income',       pages: 2, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 10, name: 'ID / Photo ID',         pages: 1, date: '03/20/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5504', name: 'Cleo Coleridge',        initials: 'CC', caresId: 'CR-10558', date: '03/20/2026', docs: [
    { id: 11, name: 'Social security card',  pages: 1, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 12, name: 'Birth certificate',     pages: 2, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 13, name: 'Lease agreement',       pages: 5, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 14, name: 'Proof of income',       pages: 3, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 15, name: 'Utility bill',          pages: 1, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 16, name: 'Medical records',       pages: 6, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 17, name: 'School enrollment',     pages: 2, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 18, name: 'Bank statement',        pages: 4, date: '03/20/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5505', name: 'Antonio Jacobson-Childs', initials: 'AJ', caresId: 'CR-10613', date: '03/20/2026', docs: [
    { id: 19, name: 'State ID',              pages: 1, date: '03/20/2026', status: 'new', resubmission: true },
    { id: 20, name: 'Utility bill',          pages: 2, date: '03/20/2026', status: 'new', resubmission: true },
  ]},
  { id: 'C-5506', name: 'Gabriela Buonasera',    initials: 'GB', caresId: 'CR-10447', date: '03/20/2026', docs: [
    { id: 21, name: 'Proof of income',       pages: 3, date: '03/20/2026', status: 'new', resubmission: false },
    { id: 22, name: 'Lease agreement',       pages: 4, date: '03/20/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5507', name: 'Xavier Icarus',         initials: 'XI', caresId: 'CR-10729', date: '03/21/2026', docs: [
    { id: 23, name: 'Birth certificate',     pages: 1, date: '03/21/2026', status: 'new', resubmission: false },
    { id: 24, name: 'Social security card',  pages: 1, date: '03/21/2026', status: 'new', resubmission: false },
    { id: 25, name: 'Medical records',       pages: 9, date: '03/21/2026', status: 'new', resubmission: false },
    { id: 26, name: 'Proof of income',       pages: 2, date: '03/21/2026', status: 'new', resubmission: false },
    { id: 27, name: 'Utility bill',          pages: 1, date: '03/21/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5508', name: 'Andrew Camacho',        initials: 'AC', caresId: 'CR-10312', date: '03/21/2026', docs: [
    { id: 28, name: 'ID / Photo ID',         pages: 1, date: '03/21/2026', status: 'new', resubmission: false },
    { id: 29, name: 'Bank statement',        pages: 3, date: '03/21/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5509', name: 'Annette Ibrahim',       initials: 'AI', caresId: 'CR-10584', date: '03/21/2026', docs: [
    { id: 30, name: 'Social security card',  pages: 1, date: '03/21/2026', status: 'new', resubmission: true },
    { id: 31, name: 'Birth certificate',     pages: 2, date: '03/21/2026', status: 'new', resubmission: true },
    { id: 32, name: 'Proof of income',       pages: 4, date: '03/21/2026', status: 'new', resubmission: true },
    { id: 33, name: 'Lease agreement',       pages: 6, date: '03/21/2026', status: 'new', resubmission: true },
    { id: 34, name: 'Utility bill',          pages: 2, date: '03/21/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5510', name: 'Lloyd Westwood',        initials: 'LW', caresId: 'CR-10661', date: '03/22/2026', docs: [
    { id: 35, name: 'State ID',              pages: 1, date: '03/22/2026', status: 'new', resubmission: true },
    { id: 36, name: 'Social security card',  pages: 1, date: '03/22/2026', status: 'new', resubmission: true },
    { id: 37, name: 'Birth certificate',     pages: 2, date: '03/22/2026', status: 'new', resubmission: true },
    { id: 38, name: 'Proof of income',       pages: 3, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 39, name: 'Lease agreement',       pages: 5, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 40, name: 'Medical records',       pages: 7, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 41, name: 'Utility bill',          pages: 2, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 42, name: 'Bank statement',        pages: 3, date: '03/22/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5511', name: 'Mary Thompson',         initials: 'MT', caresId: 'CR-10490', date: '03/22/2026', docs: [
    { id: 43, name: 'Birth certificate',     pages: 2, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 44, name: 'Proof of income',       pages: 3, date: '03/22/2026', status: 'new', resubmission: false },
    { id: 45, name: 'Lease agreement',       pages: 4, date: '03/22/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5512', name: 'Burton McKinnon',       initials: 'BM', caresId: 'CR-10375', date: '03/23/2026', docs: [
    { id: 46, name: 'State ID',              pages: 1, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 47, name: 'Social security card',  pages: 1, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 48, name: 'Medical records',       pages: 8, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 49, name: 'School enrollment',     pages: 3, date: '03/23/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5515', name: 'Rashida Porter',        initials: 'RP', caresId: 'CR-10802', date: '03/23/2026', docs: [
    { id: 61, name: 'ID / Photo ID',         pages: 1, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 62, name: 'Proof of income',       pages: 3, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 63, name: 'Lease agreement',       pages: 5, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 64, name: 'Birth certificate',     pages: 2, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 65, name: 'Utility bill',          pages: 1, date: '03/23/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5516', name: 'Tommy Nguyen',          initials: 'TN', caresId: 'CR-10917', date: '03/23/2026', docs: [
    { id: 66, name: 'Social security card',  pages: 1, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 67, name: 'Medical records',       pages: 6, date: '03/23/2026', status: 'new', resubmission: false },
    { id: 68, name: 'Bank statement',        pages: 4, date: '03/23/2026', status: 'new', resubmission: false },
  ]},
  { id: 'C-5517', name: 'Sofia Delgado',         initials: 'SD', caresId: 'CR-10835', date: '03/24/2026', docs: [
    { id: 69, name: 'Birth certificate',     pages: 2, date: '03/24/2026', status: 'new', resubmission: true },
    { id: 70, name: 'State ID',              pages: 1, date: '03/24/2026', status: 'new', resubmission: true },
    { id: 71, name: 'Proof of income',       pages: 3, date: '03/24/2026', status: 'new', resubmission: false },
    { id: 72, name: 'Lease agreement',       pages: 5, date: '03/24/2026', status: 'new', resubmission: false },
  ]},
  /* ── Already reviewed ─────────────────────────────────────────────────── */
  { id: 'C-5513', name: 'Dianne Vaughn',         initials: 'DV', caresId: 'CR-10104', date: '03/16/2026', docs: [
    { id: 50, name: 'Proof of income',       pages: 2, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 51, name: 'State ID',              pages: 1, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 52, name: 'Birth certificate',     pages: 2, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 53, name: 'Lease agreement',       pages: 4, date: '03/16/2026', status: 'resubmit',  resubmission: false },
    { id: 54, name: 'Utility bill',          pages: 1, date: '03/16/2026', status: 'approved', resubmission: false },
  ]},
  { id: 'C-5514', name: 'Helen Troy',            initials: 'HT', caresId: 'CR-10229', date: '03/16/2026', docs: [
    { id: 55, name: 'Social security card',  pages: 1, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 56, name: 'Medical records',       pages: 6, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 57, name: 'Proof of income',       pages: 3, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 58, name: 'Birth certificate',     pages: 2, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 59, name: 'ID / Photo ID',         pages: 1, date: '03/16/2026', status: 'approved', resubmission: false },
    { id: 60, name: 'Bank statement',        pages: 4, date: '03/16/2026', status: 'resubmit',  resubmission: false },
  ]},
];

/* ── Helpers ────────────────────────────────────────────────────────────── */
function isReviewed(client) {
  return client.docs.every(d => d.status !== 'new');
}

function hasResubmission(client) {
  return client.docs.some(d => d.resubmission);
}

function totalDocs(queue) {
  return queue.reduce((n, c) => n + c.docs.length, 0);
}

function totalReviewed(queue) {
  return queue.reduce((n, c) => n + c.docs.filter(d => d.status !== 'new').length, 0);
}

/* ── Document preview placeholder ──────────────────────────────────────── */
function DocPreview() {
  return (
    <div style={{ background: '#f0f0f0', borderRadius: 6, flex: 1, margin: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, position: 'relative' }}>
      <div style={{ width: '70%', maxWidth: 420 }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 90, height: 110, background: '#d8d8d8', borderRadius: 4, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
            <div style={{ height: 14, background: '#c4c4c4', borderRadius: 3, width: '85%' }} />
            <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3, width: '60%' }} />
            <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3, width: '70%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3 }} />
          <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3, width: '90%' }} />
          <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3, width: '95%' }} />
          <div style={{ height: 10, background: '#d0d0d0', borderRadius: 3, width: '80%' }} />
        </div>
      </div>
      <button style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: '1px solid #ccc', borderRadius: 6, padding: '5px 10px', fontSize: 12, fontFamily: 'Public Sans, sans-serif', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, color: '#374151' }}>
        Expand
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function ReviewQueuePage() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [activeTab, setActiveTab] = useState('All documents');
  const [selectedClientId, setSelectedClientId] = useState('C-5501');
  const [selectedDocIdx, setSelectedDocIdx] = useState(0);

  const selectedClient = queue.find(c => c.id === selectedClientId);
  const selectedDoc = selectedClient?.docs[selectedDocIdx] ?? null;

  /* ── Tab filter ── */
  const filteredQueue = queue.filter(client => {
    if (activeTab === 'Needs review') return !isReviewed(client);
    if (activeTab === 'Resubmission') return hasResubmission(client);
    return true;
  });

  const newUploads   = filteredQueue.filter(c => !isReviewed(c));
  const alreadyDone  = filteredQueue.filter(c =>  isReviewed(c));

  /* ── Select client from list ── */
  function selectClient(client) {
    setSelectedClientId(client.id);
    const firstNew = client.docs.findIndex(d => d.status === 'new');
    setSelectedDocIdx(firstNew >= 0 ? firstNew : 0);
  }

  /* ── Update doc status and auto-advance ── */
  function updateDocStatus(newStatus) {
    const updatedQueue = queue.map(client => {
      if (client.id !== selectedClientId) return client;
      return {
        ...client,
        docs: client.docs.map((d, i) => i === selectedDocIdx ? { ...d, status: newStatus } : d),
      };
    });
    setQueue(updatedQueue);

    const client = updatedQueue.find(c => c.id === selectedClientId);
    const nextDocIdx = client.docs.findIndex((d, i) => i > selectedDocIdx && d.status === 'new');

    if (nextDocIdx >= 0) {
      setSelectedDocIdx(nextDocIdx);
    } else {
      const allClientsNew = updatedQueue.filter(c => !isReviewed(c));
      const currentIndex = allClientsNew.findIndex(c => c.id !== selectedClientId
        ? false
        : !isReviewed(c));
      const nextClient = allClientsNew.find(c => c.id !== selectedClientId);
      if (nextClient) {
        selectClient(nextClient);
      }
    }
  }

  /* ── Back / Next navigation (no status change) ── */
  function navigateDoc(dir) {
    const newIdx = selectedDocIdx + dir;
    if (!selectedClient) return;
    if (newIdx >= 0 && newIdx < selectedClient.docs.length) {
      setSelectedDocIdx(newIdx);
    }
  }

  const reviewedCount  = totalReviewed(queue);
  const totalCount     = totalDocs(queue);
  const clientDocCount = selectedClient ? selectedClient.docs.length : 0;
  const clientReviewed = selectedClient ? selectedClient.docs.filter(d => d.status !== 'new').length : 0;

  return (
    <div className="rq-page">
      {/* ── Page header ── */}
      <div className="rq-header">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h1 className="page-heading" style={{ marginBottom: 0 }}>Review queue</h1>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'Public Sans, sans-serif' }}>
            {reviewedCount} of {totalCount} reviewed
          </span>
        </div>
      </div>

      {/* ── Two-panel body ── */}
      <div className="rq-body">

        {/* ── Left: client list ── */}
        <div className="rq-list">
          {/* Tabs */}
          <div className="filter-tabs" style={{ padding: '12px 16px' }}>
            {['All documents', 'Needs review', 'Resubmission'].map(tab => (
              <button
                key={tab}
                className={`filter-tab ${activeTab === tab ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab(tab)}
                style={{ fontSize: 13, padding: '4px 12px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* New uploads group */}
          {newUploads.length > 0 && (
            <>
              <div className="rq-group-label">New Uploads</div>
              {newUploads.map(client => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isSelected={client.id === selectedClientId}
                  onClick={() => selectClient(client)}
                />
              ))}
            </>
          )}

          {/* Already reviewed group */}
          {alreadyDone.length > 0 && (
            <>
              <div className="rq-group-label">Already reviewed</div>
              {alreadyDone.map(client => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isSelected={client.id === selectedClientId}
                  onClick={() => selectClient(client)}
                  dimmed
                />
              ))}
            </>
          )}
        </div>

        {/* ── Right: document preview ── */}
        <div className="rq-preview">
          {selectedClient && selectedDoc ? (
            <>
              {/* Preview header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--card-border)', flexShrink: 0 }}>
                <div className="avatar avatar-sm" style={{ background: 'var(--avatar-bg)', color: 'var(--avatar-text)', fontSize: 10 }}>
                  {selectedClient.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
                    {selectedClient.name}
                    <span style={{ fontWeight: 400, color: 'var(--gray-500)', marginLeft: 8 }}>— {selectedDoc.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginTop: 2 }}>
                    {selectedClient.caresId} · {selectedDoc.pages} {selectedDoc.pages === 1 ? 'page' : 'pages'} · Submitted {selectedDoc.date}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginRight: 4 }}>
                    {selectedDocIdx + 1} / {clientDocCount}
                  </span>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigateDoc(-1)}
                    disabled={selectedDocIdx === 0}
                    style={{ padding: '4px 10px', opacity: selectedDocIdx === 0 ? 0.35 : 1 }}
                  >
                    <Icon name="arrow-up" size={14} /> Back
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => navigateDoc(1)}
                    disabled={selectedDocIdx === clientDocCount - 1}
                    style={{ padding: '4px 10px', opacity: selectedDocIdx === clientDocCount - 1 ? 0.35 : 1 }}
                  >
                    Next <Icon name="arrow-down" size={14} />
                  </button>
                </div>
              </div>

              {/* Doc status strip (per-doc list for this client) */}
              <div style={{ display: 'flex', gap: 6, padding: '10px 20px', borderBottom: '1px solid var(--card-border)', flexShrink: 0, flexWrap: 'wrap' }}>
                {selectedClient.docs.map((doc, i) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocIdx(i)}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 20,
                      border: `1.5px solid ${i === selectedDocIdx ? 'var(--blue)' : 'var(--gray-200)'}`,
                      background: i === selectedDocIdx ? 'var(--blue-light)' : doc.status === 'approved' ? 'var(--green-light)' : doc.status === 'resubmit' ? 'var(--red-light)' : 'transparent',
                      color: i === selectedDocIdx ? 'var(--blue)' : doc.status === 'approved' ? 'var(--green)' : doc.status === 'resubmit' ? 'var(--red)' : 'var(--gray-600)',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: 'Public Sans, sans-serif',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {doc.name}
                    {doc.status === 'approved' && ' ✓'}
                    {doc.status === 'resubmit' && ' ↩'}
                  </button>
                ))}
              </div>

              {/* Document preview */}
              <DocPreview />

              {/* Action footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--card-border)', flexShrink: 0 }}>
                {selectedDoc.status === 'new' ? (
                  <>
                    <button
                      className="btn"
                      onClick={() => updateDocStatus('approved')}
                      style={{ border: '1.5px solid var(--green)', color: 'var(--green)', background: 'transparent', fontWeight: 700 }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn"
                      onClick={() => updateDocStatus('resubmit')}
                      style={{ border: '1.5px solid var(--red)', color: 'var(--red)', background: 'transparent', fontWeight: 700 }}
                    >
                      Request resubmission
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Public Sans, sans-serif', color: selectedDoc.status === 'approved' ? 'var(--green)' : 'var(--red)' }}>
                    {selectedDoc.status === 'approved' ? '✓ Approved' : '↩ Resubmission requested'}
                  </span>
                )}
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Icon name="download" size={14} /> Download
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', fontSize: 14, fontFamily: 'Public Sans, sans-serif' }}>
              Select a client to review their documents
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Client row in left panel ───────────────────────────────────────────── */
function ClientRow({ client, isSelected, onClick, dimmed }) {
  const newCount = client.docs.filter(d => d.status === 'new').length;
  const isResub  = hasResubmission(client);

  return (
    <div
      className={`rq-client-row${isSelected ? ' selected' : ''}`}
      onClick={onClick}
      style={{ opacity: dimmed ? 0.6 : 1 }}
    >
      <div className="avatar avatar-sm" style={{ background: 'var(--avatar-bg)', color: 'var(--avatar-text)', fontSize: 10, flexShrink: 0 }}>
        {client.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {newCount > 0 && (
            <span className="new-chip" style={{ fontSize: 11 }}>
              <span className="new-chip-dot" />
              New
            </span>
          )}
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
            {client.name}
          </span>
          {isResub && (
            <span style={{ fontSize: 11, fontWeight: 600, background: 'var(--indigo-light)', color: 'var(--indigo)', padding: '1px 7px', borderRadius: 10, fontFamily: 'Public Sans, sans-serif' }}>
              resubmission
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', marginTop: 2 }}>
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            {client.docs.length} {client.docs.length === 1 ? 'document' : 'documents'}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--gray-400)', fontFamily: 'Public Sans, sans-serif', flexShrink: 0, alignSelf: 'flex-start', marginTop: 3 }}>
        {client.date}
      </div>
    </div>
  );
}
