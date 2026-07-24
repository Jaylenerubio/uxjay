import { useState } from 'react';
import { Icon } from './Icons';

/* ── Mock data ───────────────────────────────────────────────────────────── */
const INITIAL_QUEUE = [
  { id: 'C-5501', name: 'Jaylene Rubio',         initials: 'JR', caresId: 'CR-10482', date: '03/20/2026', docs: [
    { id:  1, name: 'Social security card',  pages: 1, date: '03/20/2026', status: 'new', description: 'This is my new social security card. I just received it in the mail last week.' },
    { id:  2, name: 'Birth certificate',     pages: 2, date: '03/20/2026', status: 'new', description: '' },
    { id:  3, name: 'Proof of income',       pages: 4, date: '03/20/2026', status: 'new', description: 'Includes my two most recent pay stubs from my part-time job.' },
  ]},
  { id: 'C-5502', name: 'Darko Simons',          initials: 'DS', caresId: 'CR-10391', date: '03/20/2026', docs: [
    { id:  4, name: 'State ID',              pages: 1, date: '03/20/2026', status: 'new', description: 'This is my new ID that I just got.' },
    { id:  5, name: 'Lease agreement',       pages: 6, date: '03/20/2026', status: 'new', description: '' },
    { id:  6, name: 'Medical records',       pages: 8, date: '03/20/2026', status: 'new', description: 'Records from my last three visits to the clinic.' },
    { id:  7, name: 'Utility bill',          pages: 2, date: '03/20/2026', status: 'new', description: '' },
    { id:  8, name: 'Bank statement',        pages: 3, date: '03/20/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5503', name: 'Marcus Lee',            initials: 'ML', caresId: 'CR-10274', date: '03/20/2026', docs: [
    { id:  9, name: 'Proof of income',       pages: 2, date: '03/20/2026', status: 'new', description: '' },
    { id: 10, name: 'ID / Photo ID',         pages: 1, date: '03/20/2026', status: 'new', description: 'Passport photo page. My state ID expired so I am using this instead.' },
  ]},
  { id: 'C-5504', name: 'Cleo Coleridge',        initials: 'CC', caresId: 'CR-10558', date: '03/20/2026', docs: [
    { id: 11, name: 'Social security card',  pages: 1, date: '03/20/2026', status: 'new', description: '' },
    { id: 12, name: 'Birth certificate',     pages: 2, date: '03/20/2026', status: 'new', description: '' },
    { id: 13, name: 'Lease agreement',       pages: 5, date: '03/20/2026', status: 'new', description: 'Signed by landlord on 03/18.' },
    { id: 14, name: 'Proof of income',       pages: 3, date: '03/20/2026', status: 'new', description: '' },
    { id: 15, name: 'Utility bill',          pages: 1, date: '03/20/2026', status: 'new', description: '' },
    { id: 16, name: 'Medical records',       pages: 6, date: '03/20/2026', status: 'new', description: '' },
    { id: 17, name: 'School enrollment',     pages: 2, date: '03/20/2026', status: 'new', description: 'For my daughter Elena, grade 3.' },
    { id: 18, name: 'Bank statement',        pages: 4, date: '03/20/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5505', name: 'Antonio Jacobson-Childs', initials: 'AJ', caresId: 'CR-10613', date: '03/20/2026', docs: [
    { id: 19, name: 'State ID',              pages: 1, date: '03/20/2026', status: 'new', description: 'Updated version — the previous one had a typo in my address.' },
    { id: 20, name: 'Utility bill',          pages: 2, date: '03/20/2026', status: 'new', description: 'March bill. Includes both gas and electric.' },
  ]},
  { id: 'C-5506', name: 'Gabriela Buonasera',    initials: 'GB', caresId: 'CR-10447', date: '03/20/2026', docs: [
    { id: 21, name: 'Proof of income',       pages: 3, date: '03/20/2026', status: 'new', description: '' },
    { id: 22, name: 'Lease agreement',       pages: 4, date: '03/20/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5507', name: 'Xavier Icarus',         initials: 'XI', caresId: 'CR-10729', date: '03/21/2026', docs: [
    { id: 23, name: 'Birth certificate',     pages: 1, date: '03/21/2026', status: 'new', description: '' },
    { id: 24, name: 'Social security card',  pages: 1, date: '03/21/2026', status: 'new', description: '' },
    { id: 25, name: 'Medical records',       pages: 9, date: '03/21/2026', status: 'new', description: 'From NYP hospital. Includes discharge summary.' },
    { id: 26, name: 'Proof of income',       pages: 2, date: '03/21/2026', status: 'new', description: '' },
    { id: 27, name: 'Utility bill',          pages: 1, date: '03/21/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5508', name: 'Andrew Camacho',        initials: 'AC', caresId: 'CR-10312', date: '03/21/2026', docs: [
    { id: 28, name: 'ID / Photo ID',         pages: 1, date: '03/21/2026', status: 'new', description: '' },
    { id: 29, name: 'Bank statement',        pages: 3, date: '03/21/2026', status: 'new', description: 'Three months of statements as requested.' },
  ]},
  { id: 'C-5509', name: 'Annette Ibrahim',       initials: 'AI', caresId: 'CR-10584', date: '03/21/2026', docs: [
    { id: 30, name: 'Social security card',  pages: 1, date: '03/21/2026', status: 'new', description: '' },
    { id: 31, name: 'Birth certificate',     pages: 2, date: '03/21/2026', status: 'new', description: '' },
    { id: 32, name: 'Proof of income',       pages: 4, date: '03/21/2026', status: 'new', description: 'I work two jobs so I included stubs from both employers.' },
    { id: 33, name: 'Lease agreement',       pages: 6, date: '03/21/2026', status: 'new', description: '' },
    { id: 34, name: 'Utility bill',          pages: 2, date: '03/21/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5510', name: 'Lloyd Westwood',        initials: 'LW', caresId: 'CR-10661', date: '03/22/2026', docs: [
    { id: 35, name: 'State ID',              pages: 1, date: '03/22/2026', status: 'new', description: '' },
    { id: 36, name: 'Social security card',  pages: 1, date: '03/22/2026', status: 'new', description: '' },
    { id: 37, name: 'Birth certificate',     pages: 2, date: '03/22/2026', status: 'new', description: '' },
    { id: 38, name: 'Proof of income',       pages: 3, date: '03/22/2026', status: 'new', description: '' },
    { id: 39, name: 'Lease agreement',       pages: 5, date: '03/22/2026', status: 'new', description: 'Landlord signed on page 4.' },
    { id: 40, name: 'Medical records',       pages: 7, date: '03/22/2026', status: 'new', description: '' },
    { id: 41, name: 'Utility bill',          pages: 2, date: '03/22/2026', status: 'new', description: '' },
    { id: 42, name: 'Bank statement',        pages: 3, date: '03/22/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5511', name: 'Mary Thompson',         initials: 'MT', caresId: 'CR-10490', date: '03/22/2026', docs: [
    { id: 43, name: 'Birth certificate',     pages: 2, date: '03/22/2026', status: 'new', description: '' },
    { id: 44, name: 'Proof of income',       pages: 3, date: '03/22/2026', status: 'new', description: '' },
    { id: 45, name: 'Lease agreement',       pages: 4, date: '03/22/2026', status: 'new', description: '' },
    { id: 46, name: 'Utility bill',          pages: 2, date: '03/22/2026', status: 'new', description: '' },
    { id: 47, name: 'Medical records',       pages: 5, date: '03/22/2026', status: 'new', description: 'Recent checkup. Nothing urgent noted.' },
    { id: 48, name: 'School enrollment',     pages: 1, date: '03/22/2026', status: 'new', description: '' },
    { id: 49, name: 'State ID',              pages: 1, date: '03/22/2026', status: 'new', description: '' },
    { id: 50, name: 'Bank statement',        pages: 3, date: '03/22/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5512', name: 'Burton McKinnon',       initials: 'BM', caresId: 'CR-10375', date: '03/23/2026', docs: [
    { id: 51, name: 'State ID',              pages: 1, date: '03/23/2026', status: 'new', description: '' },
    { id: 52, name: 'Social security card',  pages: 1, date: '03/23/2026', status: 'new', description: '' },
    { id: 53, name: 'Medical records',       pages: 8, date: '03/23/2026', status: 'new', description: '' },
    { id: 54, name: 'School enrollment',     pages: 3, date: '03/23/2026', status: 'new', description: 'Two kids — records for both included.' },
  ]},
  { id: 'C-5515', name: 'Rashida Porter',        initials: 'RP', caresId: 'CR-10802', date: '03/23/2026', docs: [
    { id: 55, name: 'ID / Photo ID',         pages: 1, date: '03/23/2026', status: 'new', description: '' },
    { id: 56, name: 'Proof of income',       pages: 3, date: '03/23/2026', status: 'new', description: '' },
    { id: 57, name: 'Lease agreement',       pages: 5, date: '03/23/2026', status: 'new', description: '' },
    { id: 58, name: 'Birth certificate',     pages: 2, date: '03/23/2026', status: 'new', description: '' },
    { id: 59, name: 'Utility bill',          pages: 1, date: '03/23/2026', status: 'new', description: 'ConEd bill for March.' },
  ]},
  { id: 'C-5516', name: 'Tommy Nguyen',          initials: 'TN', caresId: 'CR-10917', date: '03/23/2026', docs: [
    { id: 60, name: 'Social security card',  pages: 1, date: '03/23/2026', status: 'new', description: '' },
    { id: 61, name: 'Medical records',       pages: 6, date: '03/23/2026', status: 'new', description: '' },
    { id: 62, name: 'Bank statement',        pages: 4, date: '03/23/2026', status: 'new', description: '' },
  ]},
  { id: 'C-5517', name: 'Sofia Delgado',         initials: 'SD', caresId: 'CR-10835', date: '03/24/2026', docs: [
    { id: 63, name: 'Birth certificate',     pages: 2, date: '03/24/2026', status: 'new', description: '' },
    { id: 64, name: 'State ID',              pages: 1, date: '03/24/2026', status: 'new', description: 'Note: my name changed — this reflects my current legal name.' },
    { id: 65, name: 'Proof of income',       pages: 3, date: '03/24/2026', status: 'new', description: '' },
    { id: 66, name: 'Lease agreement',       pages: 5, date: '03/24/2026', status: 'new', description: '' },
    { id: 67, name: 'Utility bill',          pages: 1, date: '03/24/2026', status: 'new', description: '' },
  ]},
  /* ── Already viewed ── */
  { id: 'C-5513', name: 'Dianne Vaughn',         initials: 'DV', caresId: 'CR-10104', date: '03/16/2026', docs: [
    { id: 68, name: 'Proof of income',       pages: 2, date: '03/16/2026', status: 'approved', description: '' },
    { id: 69, name: 'State ID',              pages: 1, date: '03/16/2026', status: 'approved', description: '' },
    { id: 70, name: 'Birth certificate',     pages: 2, date: '03/16/2026', status: 'approved', description: '' },
    { id: 71, name: 'Lease agreement',       pages: 4, date: '03/16/2026', status: 'resubmit',  description: '' },
    { id: 72, name: 'Utility bill',          pages: 1, date: '03/16/2026', status: 'approved', description: '' },
  ]},
  { id: 'C-5514', name: 'Helen Troy',            initials: 'HT', caresId: 'CR-10229', date: '03/16/2026', docs: [
    { id: 73, name: 'Social security card',  pages: 1, date: '03/16/2026', status: 'approved', description: '' },
    { id: 74, name: 'Medical records',       pages: 6, date: '03/16/2026', status: 'approved', description: '' },
    { id: 75, name: 'Proof of income',       pages: 3, date: '03/16/2026', status: 'approved', description: '' },
    { id: 76, name: 'Birth certificate',     pages: 2, date: '03/16/2026', status: 'approved', description: '' },
    { id: 77, name: 'ID / Photo ID',         pages: 1, date: '03/16/2026', status: 'approved', description: '' },
    { id: 78, name: 'Bank statement',        pages: 4, date: '03/16/2026', status: 'resubmit',  description: '' },
  ]},
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function isFullyReviewed(client) {
  return client.docs.every(d => d.status !== 'new');
}

/* ── Document preview (native PDF embed) ────────────────────────────────── */
function DocPreview() {
  return (
    <div style={{ padding: '16px 24px' }}>
      <iframe
        src="/placeholder-document.pdf#view=FitH"
        title="Document preview"
        style={{
          height: 880,
          width: '100%',
          border: 'none',
          display: 'block',
          borderRadius: 4,
        }}
      />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ReviewQueuePage() {
  const [queue, setQueue] = useState(INITIAL_QUEUE);
  const [activeTab, setActiveTab] = useState('All documents');
  const [selectedClientId, setSelectedClientId] = useState('C-5501');
  const [selectedDocIdx, setSelectedDocIdx] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(true);

  const selectedClient = queue.find(c => c.id === selectedClientId);
  const selectedDoc    = selectedClient?.docs[selectedDocIdx] ?? null;

  /* ── Counts for tabs ── */
  const needsReviewCount  = queue.filter(c => !isFullyReviewed(c)).length;
  const alreadyViewedCount = queue.filter(c => isFullyReviewed(c)).length;

  const TABS = [
    { label: 'All documents',  count: null },
    { label: 'Needs review',   count: needsReviewCount },
    { label: 'Already viewed', count: alreadyViewedCount },
  ];

  /* ── Tab filter ── */
  const filteredQueue = queue.filter(client => {
    if (activeTab === 'Needs review')   return !isFullyReviewed(client);
    if (activeTab === 'Already viewed') return  isFullyReviewed(client);
    return true;
  });

  const newUploads  = filteredQueue.filter(c => !isFullyReviewed(c));
  const alreadyDone = filteredQueue.filter(c =>  isFullyReviewed(c));

  /* ── Select client ── */
  function selectClient(client) {
    setSelectedClientId(client.id);
    const firstNew = client.docs.findIndex(d => d.status === 'new');
    setSelectedDocIdx(firstNew >= 0 ? firstNew : 0);
    setPreviewOpen(true);
  }

  /* ── Approve / Resubmit ── */
  function updateDocStatus(newStatus) {
    const updatedQueue = queue.map(client => {
      if (client.id !== selectedClientId) return client;
      return { ...client, docs: client.docs.map((d, i) => i === selectedDocIdx ? { ...d, status: newStatus } : d) };
    });
    setQueue(updatedQueue);

    const updatedClient = updatedQueue.find(c => c.id === selectedClientId);
    const nextIdx = updatedClient.docs.findIndex((d, i) => i > selectedDocIdx && d.status === 'new');

    if (nextIdx >= 0) {
      setSelectedDocIdx(nextIdx);
    } else {
      const nextClient = updatedQueue.filter(c => !isFullyReviewed(c)).find(c => c.id !== selectedClientId);
      if (nextClient) selectClient(nextClient);
    }
  }

  /* ── Back / Next (no status change) ── */
  function navigateDoc(dir) {
    if (!selectedClient) return;
    const newIdx = selectedDocIdx + dir;
    if (newIdx >= 0 && newIdx < selectedClient.docs.length) setSelectedDocIdx(newIdx);
  }

  const clientDocCount = selectedClient?.docs.length ?? 0;
  const clientReviewed = selectedClient?.docs.filter(d => d.status !== 'new').length ?? 0;

  return (
    <div className="rq-page">
      {/* ── Page header ── */}
      <div className="rq-header">
        <h1 className="page-heading" style={{ marginBottom: 16 }}>Document queue</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 0 }}>
          {TABS.map(({ label, count }) => (
            <button
              key={label}
              className={`filter-tab ${activeTab === label ? 'active' : 'inactive'}`}
              onClick={() => setActiveTab(label)}
            >
              {label}{count !== null ? ` (${count})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* ── Two-panel body ── */}
      <div className="rq-body">

        {/* ── Left: client list ── */}
        <div className="rq-list" style={{ width: previewOpen ? 360 : '100%' }}>
          {newUploads.length > 0 && (
            <>
              <div className="rq-group-label">New Uploads</div>
              {newUploads.map(client => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isSelected={previewOpen && client.id === selectedClientId}
                  onClick={() => selectClient(client)}
                />
              ))}
            </>
          )}

          {alreadyDone.length > 0 && (
            <>
              <div className="rq-group-label">Already viewed</div>
              {alreadyDone.map(client => (
                <ClientRow
                  key={client.id}
                  client={client}
                  isSelected={previewOpen && client.id === selectedClientId}
                  onClick={() => selectClient(client)}
                  dimmed
                />
              ))}
            </>
          )}
        </div>

        {/* ── Right: document preview ── */}
        {previewOpen && selectedClient && selectedDoc && (
          <div className="rq-preview">

            {/* ── Row 1: client identity + close ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px 0', flexShrink: 0 }}>
              <div className="avatar avatar-sm" style={{ background: 'var(--avatar-bg)', color: 'var(--avatar-text)', fontSize: 10, flexShrink: 0 }}>
                {selectedClient.initials}
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
                {selectedClient.name}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 600,
                background: clientReviewed === clientDocCount ? 'var(--green-light)' : 'var(--gray-100)',
                color: clientReviewed === clientDocCount ? 'var(--green)' : 'var(--gray-600)',
                padding: '2px 9px', borderRadius: 20,
                fontFamily: 'Public Sans, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {clientReviewed} of {clientDocCount} reviewed
              </span>
              <button
                onClick={() => setPreviewOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--gray-500)', fontFamily: 'Public Sans, sans-serif', fontWeight: 500, marginLeft: 'auto', padding: 0 }}
              >
                <Icon name="x" size={14} /> Close
              </button>
            </div>

            {/* ── Row 2: doc nav + meta + actions ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px 14px', borderBottom: '1px solid var(--card-border)', flexShrink: 0, flexWrap: 'wrap' }}>
              {/* Back/Next + doc name */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigateDoc(-1)}
                disabled={selectedDocIdx === 0}
                style={{ padding: '3px 8px', opacity: selectedDocIdx === 0 ? 0.3 : 1, display: 'flex', alignItems: 'center' }}
              >
                <Icon name="arrow-up" size={13} />
              </button>
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
                {selectedDoc.name}
              </span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigateDoc(1)}
                disabled={selectedDocIdx === clientDocCount - 1}
                style={{ padding: '3px 8px', opacity: selectedDocIdx === clientDocCount - 1 ? 0.3 : 1, display: 'flex', alignItems: 'center' }}
              >
                <Icon name="arrow-down" size={13} />
              </button>
              <span style={{ fontSize: 12, color: 'var(--gray-400)', fontFamily: 'Public Sans, sans-serif' }}>
                {selectedClient.caresId} · {selectedDoc.pages} {selectedDoc.pages === 1 ? 'page' : 'pages'} · {selectedDoc.date}
              </span>

              {/* Actions */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                {selectedDoc.status === 'new' ? (
                  <>
                    <button
                      className="btn btn-sm"
                      onClick={() => updateDocStatus('approved')}
                      style={{ border: '1.5px solid var(--green)', color: 'var(--green)', background: 'transparent', fontWeight: 700 }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => updateDocStatus('resubmit')}
                      style={{ border: '1.5px solid var(--red)', color: 'var(--red)', background: 'transparent', fontWeight: 700 }}
                    >
                      Resubmit
                    </button>
                  </>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Public Sans, sans-serif', color: selectedDoc.status === 'approved' ? 'var(--green)' : 'var(--red)' }}>
                    {selectedDoc.status === 'approved' ? '✓ Approved' : '↩ Resubmission requested'}
                  </span>
                )}
              </div>
            </div>

            {/* ── PDF ── */}
            <DocPreview />

            {/* ── Client description ── */}
            {selectedDoc.description && (
              <div style={{ padding: '12px 24px', borderTop: '1px solid var(--card-border)' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
                  Client's description{' '}
                </span>
                <span style={{ fontSize: 14, color: 'var(--gray-600)', fontFamily: 'Public Sans, sans-serif' }}>
                  {selectedDoc.description}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Client row ──────────────────────────────────────────────────────────── */
function ClientRow({ client, isSelected, onClick, dimmed }) {
  const newCount = client.docs.filter(d => d.status === 'new').length;

  return (
    <div
      className={`rq-client-row${isSelected ? ' selected' : ''}`}
      onClick={onClick}
      style={{ opacity: dimmed ? 0.55 : 1 }}
    >
      <div className="avatar avatar-sm" style={{ background: 'var(--avatar-bg)', color: 'var(--avatar-text)', fontSize: 10, flexShrink: 0 }}>
        {client.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          {newCount > 0 && (
            <span className="new-chip" style={{ fontSize: 11 }}>
              <span className="new-chip-dot" />New
            </span>
          )}
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--body-text)', fontFamily: 'Public Sans, sans-serif' }}>
            {client.name}
          </span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--gray-400)', fontFamily: 'Public Sans, sans-serif', marginTop: 1 }}>
          <span style={{ color: 'var(--blue)', textDecoration: 'underline', cursor: 'pointer' }}>
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
