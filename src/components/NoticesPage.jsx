import { useState, useRef } from 'react';
import { clients } from '../data/mockData';
import { Icon } from './Icons';

/* ── Static data ────────────────────────────────────────────────────────── */

const NOTICE_TYPES = [
  'Appointment letter',
  'Shopping voucher',
  'Fair-hearing slip',
  'Eligibility decision',
  'Next steps letter',
  'Housing voucher',
];

const INITIAL_NOTICES = [
  /* ── Awaiting acknowledgement (30) ── */
  { id:  1, type: 'Eligibility decision',  clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Everything looks good. Move forward.',                           sentDate: '05/14/26', status: 'awaiting',     sender: 'Jordan Reyes'   },
  { id:  2, type: 'Shopping voucher',      clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Voucher enclosed. Valid through 06/30/26.',                       sentDate: '05/14/26', status: 'awaiting',     sender: 'Jordan Reyes'   },
  { id:  3, type: 'Appointment letter',    clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'Your intake appointment is confirmed for 05/20/26 at 10 AM.',     sentDate: '05/14/26', status: 'awaiting',     sender: 'Angela Torres'  },
  { id:  4, type: 'Next steps letter',     clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Please review the enclosed next steps and contact us with questions.', sentDate: '05/13/26', status: 'awaiting',  sender: 'Brian Okafor'   },
  { id:  5, type: 'Housing voucher',       clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Congratulations — your housing voucher has been issued.',          sentDate: '05/13/26', status: 'awaiting',     sender: 'Clara Mendez'   },
  { id:  6, type: 'Fair-hearing slip',     clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Your fair hearing is scheduled for 05/22/26 at 2 PM.',            sentDate: '05/13/26', status: 'awaiting',     sender: 'Elena Vasquez'  },
  { id:  7, type: 'Eligibility decision',  clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Your eligibility has been confirmed. See enclosed details.',        sentDate: '05/12/26', status: 'awaiting',     sender: 'Jordan Reyes'   },
  { id:  8, type: 'Shopping voucher',      clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Voucher for household essentials — valid at participating stores.', sentDate: '05/12/26', status: 'awaiting',     sender: 'Angela Torres'  },
  { id:  9, type: 'Appointment letter',    clientName: 'James Fitch',       clientId: 'C-0934',  message: 'Please attend your case review on 05/18/26 at 11 AM.',             sentDate: '05/12/26', status: 'awaiting',     sender: 'David Chung'    },
  { id: 10, type: 'Next steps letter',     clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Your application is advancing. Review enclosed action items.',      sentDate: '05/11/26', status: 'awaiting',     sender: 'Clara Mendez'   },
  { id: 11, type: 'Housing voucher',       clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Your voucher is ready. Please contact your assigned unit.',         sentDate: '05/11/26', status: 'awaiting',     sender: 'Brian Okafor'   },
  { id: 12, type: 'Eligibility decision',  clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'Decision letter enclosed. Program placement confirmed.',            sentDate: '05/11/26', status: 'awaiting',     sender: 'Elena Vasquez'  },
  { id: 13, type: 'Fair-hearing slip',     clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Notice of your right to a fair hearing — please review.',           sentDate: '05/10/26', status: 'awaiting',     sender: 'Jordan Reyes'   },
  { id: 14, type: 'Shopping voucher',      clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'Grocery voucher enclosed. See approved vendor list inside.',        sentDate: '05/10/26', status: 'awaiting',     sender: 'Angela Torres'  },
  { id: 15, type: 'Appointment letter',    clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Document review appointment scheduled for 05/17/26.',               sentDate: '05/10/26', status: 'awaiting',     sender: 'David Chung'    },
  { id: 16, type: 'Next steps letter',     clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Lease signing steps enclosed. Contact us if you have questions.',   sentDate: '05/09/26', status: 'awaiting',     sender: 'Clara Mendez'   },
  { id: 17, type: 'Eligibility decision',  clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Refugee resettlement eligibility confirmed. Welcome letter enclosed.', sentDate: '05/09/26', status: 'awaiting',  sender: 'Brian Okafor'   },
  { id: 18, type: 'Housing voucher',       clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Stage 2 housing voucher issued — valid 90 days from date sent.',    sentDate: '05/09/26', status: 'awaiting',     sender: 'Elena Vasquez'  },
  { id: 19, type: 'Appointment letter',    clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Financial intake meeting on 05/16/26 at 9 AM. Bring all documents.', sentDate: '05/08/26', status: 'awaiting',    sender: 'Jordan Reyes'   },
  { id: 20, type: 'Fair-hearing slip',     clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'You have requested a fair hearing. See schedule enclosed.',          sentDate: '05/08/26', status: 'awaiting',     sender: 'Angela Torres'  },
  { id: 21, type: 'Shopping voucher',      clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Clothing voucher approved for family members.',                      sentDate: '05/08/26', status: 'awaiting',     sender: 'David Chung'    },
  { id: 22, type: 'Eligibility decision',  clientName: 'James Fitch',       clientId: 'C-0934',  message: 'HFA San Isidro eligibility confirmed. Program begins 06/01/26.',    sentDate: '05/07/26', status: 'awaiting',     sender: 'Clara Mendez'   },
  { id: 23, type: 'Next steps letter',     clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Lease agreement ready for signature. See instructions enclosed.',    sentDate: '05/07/26', status: 'awaiting',     sender: 'Brian Okafor'   },
  { id: 24, type: 'Housing voucher',       clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Emergency housing voucher issued — valid 30 days.',                  sentDate: '05/07/26', status: 'awaiting',     sender: 'Elena Vasquez'  },
  { id: 25, type: 'Appointment letter',    clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Lease review appointment on 05/15/26. Please confirm attendance.',   sentDate: '05/06/26', status: 'awaiting',     sender: 'Jordan Reyes'   },
  { id: 26, type: 'Eligibility decision',  clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Stage 2 program eligibility confirmed. Letter enclosed.',            sentDate: '05/06/26', status: 'awaiting',     sender: 'Angela Torres'  },
  { id: 27, type: 'Fair-hearing slip',     clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Fair hearing date confirmed for 05/21/26 at 1 PM.',                  sentDate: '05/05/26', status: 'awaiting',     sender: 'David Chung'    },
  { id: 28, type: 'Shopping voucher',      clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Essential items voucher — see enclosed approved store list.',         sentDate: '05/05/26', status: 'awaiting',     sender: 'Clara Mendez'   },
  { id: 29, type: 'Next steps letter',     clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Background check cleared. Final onboarding steps enclosed.',         sentDate: '05/04/26', status: 'awaiting',     sender: 'Brian Okafor'   },
  { id: 30, type: 'Appointment letter',    clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'Follow-up meeting on 05/19/26 to review submitted documents.',       sentDate: '05/04/26', status: 'awaiting',     sender: 'Elena Vasquez'  },

  /* ── Seen — not yet acknowledged (20) ── */
  { id: 31, type: 'Eligibility decision',  clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Benefits approved — pending client review.',                         sentDate: '05/12/26', status: 'seen',         sender: 'Angela Torres'  },
  { id: 32, type: 'Fair-hearing slip',     clientName: 'James Fitch',       clientId: 'C-0934',  message: 'Your fair hearing is scheduled for next week.',                      sentDate: '05/08/26', status: 'seen',         sender: 'David Chung'    },
  { id: 33, type: 'Housing voucher',       clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'Voucher issued — waiting on client signature.',                       sentDate: '05/11/26', status: 'seen',         sender: 'Jordan Reyes'   },
  { id: 34, type: 'Shopping voucher',      clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Voucher opened by client on 05/13. Awaiting formal acknowledgement.', sentDate: '05/10/26', status: 'seen',         sender: 'Clara Mendez'   },
  { id: 35, type: 'Next steps letter',     clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Letter opened. Client has not yet confirmed receipt.',                sentDate: '05/09/26', status: 'seen',         sender: 'Brian Okafor'   },
  { id: 36, type: 'Appointment letter',    clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'Appointment viewed. Confirmation still pending.',                     sentDate: '05/08/26', status: 'seen',         sender: 'Elena Vasquez'  },
  { id: 37, type: 'Eligibility decision',  clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Decision letter read on 05/10. Awaiting client response.',            sentDate: '05/07/26', status: 'seen',         sender: 'Jordan Reyes'   },
  { id: 38, type: 'Fair-hearing slip',     clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Hearing notice opened but not yet confirmed.',                        sentDate: '05/06/26', status: 'seen',         sender: 'Angela Torres'  },
  { id: 39, type: 'Housing voucher',       clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Voucher viewed. Client has not responded to follow-up.',              sentDate: '05/05/26', status: 'seen',         sender: 'David Chung'    },
  { id: 40, type: 'Shopping voucher',      clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Opened on 05/08. Awaiting acknowledgement from client.',              sentDate: '05/04/26', status: 'seen',         sender: 'Clara Mendez'   },
  { id: 41, type: 'Next steps letter',     clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Read on 05/09. Client indicated they will respond shortly.',          sentDate: '05/06/26', status: 'seen',         sender: 'Brian Okafor'   },
  { id: 42, type: 'Appointment letter',    clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Appointment notice opened 05/07. No confirmation received.',          sentDate: '05/05/26', status: 'seen',         sender: 'Elena Vasquez'  },
  { id: 43, type: 'Eligibility decision',  clientName: 'James Fitch',       clientId: 'C-0934',  message: 'Letter opened but client has questions. Follow-up call scheduled.',   sentDate: '05/04/26', status: 'seen',         sender: 'Jordan Reyes'   },
  { id: 44, type: 'Fair-hearing slip',     clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Hearing slip viewed on 05/06. Response outstanding.',                 sentDate: '05/03/26', status: 'seen',         sender: 'Angela Torres'  },
  { id: 45, type: 'Housing voucher',       clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Voucher read on 05/05. Waiting for client to confirm intent.',         sentDate: '05/02/26', status: 'seen',         sender: 'David Chung'    },
  { id: 46, type: 'Shopping voucher',      clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Opened 05/04. Client in contact — acknowledgement pending.',           sentDate: '05/01/26', status: 'seen',         sender: 'Clara Mendez'   },
  { id: 47, type: 'Next steps letter',     clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Read on 04/30. Client reviewing options with family.',                 sentDate: '04/29/26', status: 'seen',         sender: 'Brian Okafor'   },
  { id: 48, type: 'Appointment letter',    clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Opened 04/28. Reminder sent — awaiting formal acknowledgement.',       sentDate: '04/27/26', status: 'seen',         sender: 'Elena Vasquez'  },
  { id: 49, type: 'Eligibility decision',  clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Read 04/26. Translator contacted to assist with acknowledgement.',     sentDate: '04/25/26', status: 'seen',         sender: 'Jordan Reyes'   },
  { id: 50, type: 'Fair-hearing slip',     clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'Viewed 04/24. Client asked for extension — pending decision.',         sentDate: '04/23/26', status: 'seen',         sender: 'Angela Torres'  },

  /* ── Acknowledged (30) ── */
  { id: 51, type: 'Eligibility decision',  clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'Everything looks good. Move forward.',                               sentDate: '05/12/26', status: 'acknowledged', sender: 'Angela Torres'  },
  { id: 52, type: 'Housing voucher',       clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Your housing voucher has been approved.',                             sentDate: '05/09/26', status: 'acknowledged', sender: 'Clara Mendez'   },
  { id: 53, type: 'Shopping voucher',      clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Voucher approved — visit any participating store.',                   sentDate: '05/06/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
  { id: 54, type: 'Appointment letter',    clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Appointment confirmed. Client will attend 05/14 at 10 AM.',           sentDate: '05/05/26', status: 'acknowledged', sender: 'Brian Okafor'   },
  { id: 55, type: 'Next steps letter',     clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Client confirmed receipt and is proceeding with next steps.',          sentDate: '05/04/26', status: 'acknowledged', sender: 'Elena Vasquez'  },
  { id: 56, type: 'Fair-hearing slip',     clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'Client acknowledged hearing date and confirmed attendance.',           sentDate: '05/03/26', status: 'acknowledged', sender: 'David Chung'    },
  { id: 57, type: 'Eligibility decision',  clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Stage 2 eligibility confirmed and acknowledged by client.',            sentDate: '05/02/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
  { id: 58, type: 'Housing voucher',       clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Emergency voucher acknowledged. Client placed in temporary housing.',  sentDate: '05/01/26', status: 'acknowledged', sender: 'Angela Torres'  },
  { id: 59, type: 'Shopping voucher',      clientName: 'James Fitch',       clientId: 'C-0934',  message: 'Client confirmed voucher receipt and used at approved vendor.',        sentDate: '04/30/26', status: 'acknowledged', sender: 'Clara Mendez'   },
  { id: 60, type: 'Appointment letter',    clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Lease signing appointment completed and acknowledged.',                sentDate: '04/29/26', status: 'acknowledged', sender: 'Brian Okafor'   },
  { id: 61, type: 'Next steps letter',     clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Client completed all next steps and moved to stable housing.',         sentDate: '04/28/26', status: 'acknowledged', sender: 'Elena Vasquez'  },
  { id: 62, type: 'Fair-hearing slip',     clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Fair hearing attended. Outcome favorable — client notified.',          sentDate: '04/27/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
  { id: 63, type: 'Eligibility decision',  clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'FSI eligibility confirmed. Client enrolled and acknowledged.',          sentDate: '04/26/26', status: 'acknowledged', sender: 'David Chung'    },
  { id: 64, type: 'Housing voucher',       clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'Voucher used. Client signed lease on 05/01/26.',                      sentDate: '04/25/26', status: 'acknowledged', sender: 'Angela Torres'  },
  { id: 65, type: 'Shopping voucher',      clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'Voucher redeemed. Client confirmed in writing.',                       sentDate: '04/24/26', status: 'acknowledged', sender: 'Clara Mendez'   },
  { id: 66, type: 'Appointment letter',    clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Housing assessment completed. Client acknowledged outcome.',            sentDate: '04/23/26', status: 'acknowledged', sender: 'Brian Okafor'   },
  { id: 67, type: 'Next steps letter',     clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Next steps acknowledged. Client is progressing on schedule.',          sentDate: '04/22/26', status: 'acknowledged', sender: 'Elena Vasquez'  },
  { id: 68, type: 'Eligibility decision',  clientName: 'James Fitch',       clientId: 'C-0934',  message: 'HFA eligibility decision acknowledged. Case proceeding.',              sentDate: '04/21/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
  { id: 69, type: 'Fair-hearing slip',     clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Hearing result acknowledged. Benefit reinstated.',                     sentDate: '04/20/26', status: 'acknowledged', sender: 'David Chung'    },
  { id: 70, type: 'Housing voucher',       clientName: 'Aisha Coleman',     clientId: 'C-1220',  message: 'FSI voucher used. Client moved into unit on 04/28/26.',                sentDate: '04/19/26', status: 'acknowledged', sender: 'Angela Torres'  },
  { id: 71, type: 'Shopping voucher',      clientName: 'Maria Santos',      clientId: 'C-1042',  message: 'School supply voucher acknowledged and redeemed.',                     sentDate: '04/18/26', status: 'acknowledged', sender: 'Clara Mendez'   },
  { id: 72, type: 'Appointment letter',    clientName: 'Devon Williams',    clientId: 'C-0887',  message: 'Final case review appointment completed successfully.',                 sentDate: '04/17/26', status: 'acknowledged', sender: 'Brian Okafor'   },
  { id: 73, type: 'Next steps letter',     clientName: 'Luz Ortega',        clientId: 'C-1105',  message: 'All next steps completed. Client is now stably housed.',               sentDate: '04/16/26', status: 'acknowledged', sender: 'Elena Vasquez'  },
  { id: 74, type: 'Fair-hearing slip',     clientName: 'Priya Nair',        clientId: 'C-1301',  message: 'Hearing held on 04/20. Client acknowledged written decision.',         sentDate: '04/15/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
  { id: 75, type: 'Eligibility decision',  clientName: 'Robert Tran',       clientId: 'C-0761',  message: 'HFA decision acknowledged. Unit assignment confirmed.',                 sentDate: '04/14/26', status: 'acknowledged', sender: 'David Chung'    },
  { id: 76, type: 'Housing voucher',       clientName: 'Carmen Rivera',     clientId: 'C-1188',  message: 'Voucher used at approved property. Lease executed.',                   sentDate: '04/13/26', status: 'acknowledged', sender: 'Angela Torres'  },
  { id: 77, type: 'Shopping voucher',      clientName: 'Marcus Bell',       clientId: 'C-0590',  message: 'Voucher redeemed and acknowledged within deadline.',                   sentDate: '04/12/26', status: 'acknowledged', sender: 'Clara Mendez'   },
  { id: 78, type: 'Appointment letter',    clientName: 'Fatima Al-Hassan',  clientId: 'C-1455',  message: 'Resettlement appointment attended. Client acknowledged outcome.',       sentDate: '04/11/26', status: 'acknowledged', sender: 'Brian Okafor'   },
  { id: 79, type: 'Next steps letter',     clientName: 'James Fitch',       clientId: 'C-0934',  message: 'Final steps acknowledged. Case closed successfully.',                  sentDate: '04/10/26', status: 'acknowledged', sender: 'Elena Vasquez'  },
  { id: 80, type: 'Eligibility decision',  clientName: 'Aisha Cole',        clientId: 'C-11205', message: 'Initial eligibility acknowledged. Client enrolled in program.',        sentDate: '04/09/26', status: 'acknowledged', sender: 'Jordan Reyes'   },
];

const COLS = [
  { key: 'awaiting',     label: 'Sent — Awaiting acknowledgement', borderColor: '#3b82f6', dotColor: '#3b82f6' },
  { key: 'seen',         label: 'Seen — Not yet acknowledged',     borderColor: '#93c5fd', dotColor: '#60a5fa' },
  { key: 'acknowledged', label: 'Acknowledged',                    borderColor: '#16a34a', dotColor: '#16a34a' },
];

/* ── Notice card ────────────────────────────────────────────────────────── */

function NoticeCard({ notice, col, onRemind }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#fafafa' : '#fff',
        border: '1px solid #e5e7eb',
        borderLeft: `3px solid ${col.borderColor}`,
        borderRadius: 6,
        padding: '12px 14px',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a', marginBottom: 3, textTransform: 'capitalize' }}>
        {notice.type}
      </div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6 }}>
        {notice.clientName} · {notice.clientId}
      </div>
      <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginBottom: 10,
        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {notice.message}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>Sent: {notice.sentDate}</span>
        {notice.status !== 'acknowledged' && (
          <button
            onClick={e => { e.stopPropagation(); onRemind(notice.id); }}
            style={{
              fontSize: 12, fontWeight: 600, color: '#004cbe',
              background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
              textDecoration: 'underline', fontFamily: 'inherit',
            }}
          >
            Remind
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Send notice side sheet ─────────────────────────────────────────────── */

function SendSheet({ onClose, onSend }) {
  const [noticeType, setNoticeType] = useState('');
  const [clientId, setClientId] = useState('');
  const [clientSearch, setClientSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [dragFileIdx, setDragFileIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const fileRef = useRef();

  const selectedClient = clients.find(c => c.id === clientId);
  const filteredClients = clients.filter(c => {
    const q = clientSearch.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  });

  function handleFiles(incoming) {
    const arr = Array.from(incoming).map(f => ({ name: f.name, size: f.size, file: f }));
    setFiles(prev => [...prev, ...arr]);
  }

  function removeFile(i) {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  }

  /* simple drag-to-reorder */
  function onDragStart(i) { setDragFileIdx(i); }
  function onDragEnterRow(i) { setDragOverIdx(i); }
  function onDragEndRow() {
    if (dragFileIdx !== null && dragOverIdx !== null && dragFileIdx !== dragOverIdx) {
      setFiles(prev => {
        const arr = [...prev];
        const [moved] = arr.splice(dragFileIdx, 1);
        arr.splice(dragOverIdx, 0, moved);
        return arr;
      });
    }
    setDragFileIdx(null);
    setDragOverIdx(null);
  }

  const canSend = noticeType && clientId && files.length > 0;

  function handleSend() {
    if (!canSend) return;
    onSend({ noticeType, clientId, comments, fileNames: files.map(f => f.name) });
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 300 }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 460,
        background: '#fff', zIndex: 301,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        animation: 'sheetIn 0.2s ease',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px', borderBottom: '1px solid #e5e7eb',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: "'Public Sans', sans-serif" }}>
            Send a notice
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#9ca3af', padding: 6, borderRadius: 6, display: 'flex',
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Type of notice */}
            <div>
              <label style={labelStyle}>Type of notice</label>
              <select
                value={noticeType}
                onChange={e => setNoticeType(e.target.value)}
                style={selectStyle(!!noticeType)}
              >
                <option value="">Select</option>
                {NOTICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Recipient */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Recipient</label>
              {selectedClient ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', border: '1.5px solid #004cbe',
                  borderRadius: 6, background: '#f0f5ff',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: '#e4efff', color: '#1c4ed8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, flexShrink: 0,
                  }}>
                    {selectedClient.firstName[0]}{selectedClient.lastName[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{selectedClient.firstName} {selectedClient.lastName}</div>
                    <div style={{ fontSize: 11, color: '#9ca3af' }}>{selectedClient.id}</div>
                  </div>
                  <button onClick={() => { setClientId(''); setClientSearch(''); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4, display: 'flex' }}>
                    <Icon name="close" size={13} />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Select"
                    value={clientSearch}
                    onChange={e => { setClientSearch(e.target.value); setShowDropdown(true); }}
                    onFocus={() => setShowDropdown(true)}
                    style={selectStyle(false)}
                  />
                  {showDropdown && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                      background: '#fff', border: '1px solid #e5e7eb',
                      borderRadius: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                      maxHeight: 200, overflowY: 'auto', marginTop: 2,
                    }}>
                      {filteredClients.map(c => (
                        <div
                          key={c.id}
                          onClick={() => { setClientId(c.id); setShowDropdown(false); }}
                          style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}
                        >
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{c.firstName} {c.lastName}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af' }}>{c.id} · {c.program}</div>
                        </div>
                      ))}
                      {filteredClients.length === 0 && (
                        <div style={{ padding: '12px 14px', fontSize: 13, color: '#9ca3af' }}>No clients found</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Comments */}
            <div>
              <label style={labelStyle}>Comments <span style={{ fontWeight: 400, color: '#9ca3af' }}>(optional)</span></label>
              <input
                type="text"
                placeholder="Add additional instructions, if needed"
                value={comments}
                onChange={e => setComments(e.target.value)}
                style={{ ...selectStyle(false), fontFamily: 'inherit' }}
              />
            </div>

            {/* Upload zone */}
            <div>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileRef.current.click()}
                style={{
                  border: `2px dashed ${dragOver ? '#004cbe' : '#c0c0c0'}`,
                  borderRadius: 8, padding: '28px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  cursor: 'pointer', background: dragOver ? '#f0f5ff' : '#fafafa',
                  transition: 'all 0.15s',
                }}
              >
                <Icon name="upload" size={22} color={dragOver ? '#004cbe' : '#9ca3af'} />
                <div style={{ fontSize: 13, fontWeight: 700, color: dragOver ? '#004cbe' : '#374151' }}>
                  Upload notice
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>
                  Accepted file types are JPG, PNG, or PDF.
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                style={{ display: 'none' }}
                onChange={e => handleFiles(e.target.files)}
              />
            </div>

            {/* Uploaded files */}
            {files.length > 0 && (
              <div>
                <div style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>Uploaded notices</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>Drag to reorder</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {files.map((f, i) => (
                    <div
                      key={i}
                      draggable
                      onDragStart={() => onDragStart(i)}
                      onDragEnter={() => onDragEnterRow(i)}
                      onDragEnd={onDragEndRow}
                      onDragOver={e => e.preventDefault()}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 12px', background: dragOverIdx === i ? '#f0f5ff' : '#f9fafb',
                        border: `1px solid ${dragOverIdx === i ? '#93c5fd' : '#e5e7eb'}`,
                        borderRadius: 6, cursor: 'grab', transition: 'all 0.1s',
                        opacity: dragFileIdx === i ? 0.4 : 1,
                      }}
                    >
                      <span style={{ color: '#d1d5db', fontSize: 12, cursor: 'grab', userSelect: 'none' }}>⠿</span>
                      <Icon name="file" size={14} color="#9ca3af" />
                      <span style={{
                        flex: 1, fontSize: 12, color: '#374151', fontWeight: 500,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {f.name}
                      </span>
                      <button
                        onClick={() => removeFile(i)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 2, display: 'flex' }}
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handleSend}
            disabled={!canSend}
            style={{
              width: '100%', padding: '13px 0',
              background: canSend ? '#031553' : '#d1d5db',
              color: canSend ? '#fff' : '#9ca3af',
              border: 'none', borderRadius: 6,
              fontSize: 14, fontWeight: 700, cursor: canSend ? 'pointer' : 'not-allowed',
              fontFamily: "'Public Sans', sans-serif",
              transition: 'background 0.15s',
            }}
          >
            Send notice
          </button>
        </div>
      </div>

      <style>{`@keyframes sheetIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </>
  );
}

/* ── Shared styles ───────────────────────────────────────────────────────── */

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: '#374151', marginBottom: 6,
};

function selectStyle(filled) {
  return {
    width: '100%', padding: '10px 12px',
    border: `1.5px solid ${filled ? '#004cbe' : '#d1d5db'}`,
    borderRadius: 6, fontSize: 13, outline: 'none',
    background: '#fff', color: filled ? '#1a1a1a' : '#6b7280',
    fontFamily: "'Public Sans', sans-serif",
    appearance: 'none',
  };
}

/* ── Status config ───────────────────────────────────────────────────────── */

const STATUS_CONFIG = {
  awaiting:     { dot: '#3b82f6', label: 'Awaiting acknowledgement', bg: '#eff6ff', text: '#1d4ed8' },
  seen:         { dot: '#f59e0b', label: 'Seen — not yet acknowledged', bg: '#fffbeb', text: '#b45309' },
  acknowledged: { dot: '#16a34a', label: 'Acknowledged', bg: '#f0fdf4', text: '#15803d' },
};

function StatusPill({ status }) {
  const c = STATUS_CONFIG[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, color: c.text,
      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }} />
      {c.label}
    </span>
  );
}

const TYPE_ICON = {
  'Appointment letter': '📅',
  'Shopping voucher':   '🛒',
  'Fair-hearing slip':  '⚖️',
  'Eligibility decision': '📋',
  'Next steps letter':  '➡️',
  'Housing voucher':    '🏠',
};

/* ── Notice row ─────────────────────────────────────────────────────────── */

function NoticeRow({ notice, onRemind }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        borderBottom: '1px solid #f3f4f6',
        transition: 'background 0.1s',
      }}
    >
      {/* Main row */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          display: 'grid',
          gridTemplateColumns: '28px 1fr 160px 140px 90px 80px',
          alignItems: 'center',
          gap: 12, padding: '12px 18px',
          cursor: 'pointer',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
        onMouseLeave={e => e.currentTarget.style.background = ''}
      >
        {/* Type icon */}
        <span style={{ fontSize: 16, lineHeight: 1 }}>{TYPE_ICON[notice.type] || '📄'}</span>

        {/* Client + type */}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {notice.clientName}
            <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 6, fontSize: 12 }}>{notice.clientId}</span>
          </div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 1, textTransform: 'capitalize' }}>{notice.type}</div>
        </div>

        {/* Status */}
        <div><StatusPill status={notice.status} /></div>

        {/* Sender */}
        <div style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {notice.sender}
        </div>

        {/* Date */}
        <div style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap' }}>{notice.sentDate}</div>

        {/* Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {notice.status !== 'acknowledged' ? (
            <button
              onClick={e => { e.stopPropagation(); onRemind(notice.id); }}
              style={{
                fontSize: 11, fontWeight: 600, color: '#004cbe',
                background: '#eff6ff', border: 'none', borderRadius: 6,
                padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Remind
            </button>
          ) : (
            <span style={{ fontSize: 11, color: '#9ca3af' }}>✓ Done</span>
          )}
        </div>
      </div>

      {/* Expanded message */}
      {expanded && (
        <div style={{
          padding: '0 18px 14px',
          paddingLeft: 58,
          fontSize: 13, color: '#6b7280', lineHeight: 1.6,
          background: '#fafafa',
          borderTop: '1px solid #f3f4f6',
        }}>
          {notice.message}
        </div>
      )}
    </div>
  );
}

/* ── Group rows by date label ────────────────────────────────────────────── */

function groupByDate(notices) {
  const today = ['05/14/26', '05/13/26'];
  const thisWeek = ['05/12/26', '05/11/26', '05/10/26', '05/09/26', '05/08/26'];
  const groups = [];
  const buckets = { 'Today': [], 'This week': [], 'Earlier': [] };
  notices.forEach(n => {
    if (today.includes(n.sentDate)) buckets['Today'].push(n);
    else if (thisWeek.includes(n.sentDate)) buckets['This week'].push(n);
    else buckets['Earlier'].push(n);
  });
  ['Today', 'This week', 'Earlier'].forEach(label => {
    if (buckets[label].length > 0) groups.push({ label, items: buckets[label] });
  });
  return groups;
}

/* ── Main page ───────────────────────────────────────────────────────────── */

export default function NoticesPage() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [search, setSearch] = useState('');
  const [showSheet, setShowSheet] = useState(false);
  const [toast, setToast] = useState(null);

  const filtered = notices.filter(n => {
    const matchStatus = statusFilter === 'all' || n.status === statusFilter;
    const matchType = typeFilter === 'All types' || n.type === typeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || n.clientName.toLowerCase().includes(q) || n.type.toLowerCase().includes(q) || n.clientId.toLowerCase().includes(q);
    return matchStatus && matchType && matchSearch;
  });

  const total = notices.length;
  const counts = {
    awaiting: notices.filter(n => n.status === 'awaiting').length,
    seen: notices.filter(n => n.status === 'seen').length,
    acknowledged: notices.filter(n => n.status === 'acknowledged').length,
  };

  function handleRemind(id) {
    const n = notices.find(x => x.id === id);
    showToast(`Reminder sent to ${n.clientName}.`);
  }

  function handleSend({ noticeType, clientId, comments }) {
    const client = clients.find(c => c.id === clientId);
    setNotices(prev => [{
      id: Date.now(),
      type: noticeType,
      clientName: `${client.firstName} ${client.lastName}`,
      clientId: client.id,
      message: comments || 'Notice sent.',
      sentDate: '05/14/26',
      status: 'awaiting',
      sender: 'Jordan Reyes',
    }, ...prev]);
    setShowSheet(false);
    showToast(`Notice sent to ${client.firstName} ${client.lastName}.`);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const groups = groupByDate(filtered);

  const STATUS_TABS = [
    { key: 'all',         label: 'All notices',   count: total },
    { key: 'awaiting',    label: 'Awaiting',       count: counts.awaiting },
    { key: 'seen',        label: 'Seen',           count: counts.seen },
    { key: 'acknowledged',label: 'Acknowledged',   count: counts.acknowledged },
  ];

  return (
    <div className="page" style={{ paddingBottom: 40 }}>
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1f2937', color: '#fff', padding: '10px 20px',
          borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 400,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
        }}>{toast}</div>
      )}

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.15, marginBottom: 4 }}>
            Notices
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280' }}>
            {total} total · {counts.awaiting} awaiting · {counts.seen} seen · {counts.acknowledged} acknowledged
          </p>
        </div>
        <button
          onClick={() => setShowSheet(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', background: '#031553', color: '#fff',
            border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Public Sans', sans-serif", flexShrink: 0,
          }}
        >
          <Icon name="send" size={14} color="#fff" /> Send notice
        </button>
      </div>

      {/* Progress bar — at a glance how many acknowledged */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 8, background: '#f3f4f6', gap: 2 }}>
          <div style={{ width: `${(counts.acknowledged / total) * 100}%`, background: '#16a34a', borderRadius: '8px 0 0 8px', transition: 'width 0.4s' }} />
          <div style={{ width: `${(counts.seen / total) * 100}%`, background: '#f59e0b', transition: 'width 0.4s' }} />
          <div style={{ width: `${(counts.awaiting / total) * 100}%`, background: '#3b82f6', borderRadius: '0 8px 8px 0', transition: 'width 0.4s' }} />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
          {[
            { color: '#16a34a', label: `${counts.acknowledged} acknowledged` },
            { color: '#f59e0b', label: `${counts.seen} seen` },
            { color: '#3b82f6', label: `${counts.awaiting} awaiting` },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#6b7280' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{
        background: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px 10px 0 0',
        borderBottom: 'none', padding: '12px 18px',
        display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
      }}>
        {/* Status tabs */}
        <div style={{ display: 'flex', gap: 2, background: '#f3f4f6', borderRadius: 8, padding: 3 }}>
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              style={{
                padding: '5px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', border: 'none',
                background: statusFilter === tab.key ? '#fff' : 'transparent',
                color: statusFilter === tab.key ? '#1a1a1a' : '#6b7280',
                boxShadow: statusFilter === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.1s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label} <span style={{ color: statusFilter === tab.key ? '#004cbe' : '#9ca3af', marginLeft: 2 }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Type filter */}
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          style={{
            fontSize: 12, padding: '6px 10px', border: '1px solid #e5e7eb',
            borderRadius: 6, outline: 'none', background: '#fff', color: '#374151',
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          {['All types', ...NOTICE_TYPES].map(t => <option key={t}>{t}</option>)}
        </select>

        {/* Search */}
        <div style={{ marginLeft: 'auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: 9, color: '#9ca3af', pointerEvents: 'none', display: 'flex' }}>
            <Icon name="search" size={13} />
          </span>
          <input
            type="text"
            placeholder="Search client or notice type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '6px 10px 6px 28px', fontSize: 12, fontFamily: 'inherit',
              border: '1px solid #e5e7eb', borderRadius: 6, outline: 'none', width: 220,
            }}
          />
        </div>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{filtered.length} notices</span>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '28px 1fr 160px 140px 90px 80px',
        gap: 12, padding: '8px 18px',
        background: '#f9fafb', border: '1px solid #e5e7eb', borderBottom: 'none',
      }}>
        {['', 'Client / Type', 'Status', 'Sent by', 'Date', ''].map((h, i) => (
          <div key={i} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#9ca3af' }}>{h}</div>
        ))}
      </div>

      {/* Grouped rows */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
            No notices match your filters.
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label}>
              <div style={{
                padding: '7px 18px', background: '#f9fafb',
                borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6',
                fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px',
              }}>
                {group.label} · {group.items.length}
              </div>
              {group.items.map(n => (
                <NoticeRow key={n.id} notice={n} onRemind={handleRemind} />
              ))}
            </div>
          ))
        )}
      </div>

      {/* Side sheet */}
      {showSheet && (
        <SendSheet onClose={() => setShowSheet(false)} onSend={handleSend} />
      )}
    </div>
  );
}

