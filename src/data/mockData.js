// ── Activity Feed ─────────────────────────────────────────────────────────────
export const activityItems = [
  { id: 1,  clientName: "Devon Williams",   initials: "DW", action: "uploaded",      docTypes: ["Birth Certificate"],                timeAgo: "2m ago",  isNew: true,  type: "families", worker: "Angela Torres"  },
  { id: 2,  clientName: "Maria Santos",     initials: "MS", action: "re-uploaded",   docTypes: ["Proof of Income"],                  timeAgo: "15m ago", isNew: true,  type: "families", worker: "Clara Mendez"   },
  { id: 3,  clientName: "Luz Ortega",       initials: "LO", action: "uploaded",      docTypes: ["Lease Agreement", "Utility Bill"],  timeAgo: "1h ago",  isNew: true,  type: "families", worker: "Brian Okafor"   },
  { id: 4,  clientName: "James Fitch",      initials: "JF", action: "acknowledged",  docTypes: ["ID / Photo ID"],                    timeAgo: "2h ago",  isNew: true,  type: "workers",  worker: "David Chung"    },
  { id: 5,  clientName: "Aisha Coleman",    initials: "AC", action: "uploaded",      docTypes: ["Medical Records"],                  timeAgo: "3h ago",  isNew: true,  type: "families", worker: "Elena Vasquez"  },
  { id: 6,  clientName: "Robert Tran",      initials: "RT", action: "viewed",        docTypes: ["Proof of Income"],                  timeAgo: "5h ago",  isNew: false, type: "workers",  worker: "Angela Torres"  },
  { id: 7,  clientName: "Carmen Rivera",    initials: "CR", action: "uploaded",      docTypes: ["Birth Certificate"],                timeAgo: "6h ago",  isNew: false, type: "families", worker: "Clara Mendez"   },
  { id: 8,  clientName: "Fatima Al-Hassan", initials: "FA", action: "re-uploaded",   docTypes: ["ID / Photo ID", "Lease Agreement"], timeAgo: "1d ago",  isNew: false, type: "families", worker: "Brian Okafor"   },
  { id: 9,  clientName: "Priya Nair",       initials: "PN", action: "uploaded",      docTypes: ["Utility Bill"],                     timeAgo: "1d ago",  isNew: false, type: "workers",  worker: "David Chung"    },
  { id: 10, clientName: "Marcus Bell",      initials: "MB", action: "acknowledged",  docTypes: ["Lease Agreement"],                  timeAgo: "2d ago",  isNew: false, type: "families", worker: "Elena Vasquez"  },
];

// ── Team Notes ────────────────────────────────────────────────────────────────
export const teamNotes = [
  { id: 1, author: "Angela Torres", date: "May 13, 2026", text: "Devon Williams has resubmitted their birth certificate — please review and confirm." },
  { id: 2, author: "Brian Okafor",  date: "May 12, 2026", text: "Luz Ortega's lease agreement is still pending landlord signature. Follow up needed." },
  { id: 3, author: "Clara Mendez",  date: "May 11, 2026", text: "Maria Santos confirmed appointment for May 15 at 10 AM." },
];

// ── Clients ───────────────────────────────────────────────────────────────────
export const clients = [
  { id: "C-1042", firstName: "Maria",    lastName: "Santos",    program: "Runaway Village Stage 1",                dob: "03/15/1988", email: "m.santos@email.com",      language: "Spanish"    },
  { id: "C-0887", firstName: "Devon",    lastName: "Williams",  program: "HFA San Isidro Affordable Housing",      dob: "07/22/1994", email: "d.williams@email.com",     language: "English"    },
  { id: "C-1105", firstName: "Luz",      lastName: "Ortega",    program: "Runaway Village Stage 1",                dob: "11/03/1979", email: "l.ortega@email.com",       language: "Spanish"    },
  { id: "C-0934", firstName: "James",    lastName: "Fitch",     program: "HFA San Isidro Affordable Housing",      dob: "02/28/1965", email: "j.fitch@email.com",        language: "English"    },
  { id: "C-1220", firstName: "Aisha",    lastName: "Coleman",   program: "Family Stability Initiative",            dob: "09/14/1991", email: "a.coleman@email.com",      language: "English"    },
  { id: "C-0761", firstName: "Robert",   lastName: "Tran",      program: "HFA San Isidro Affordable Housing",      dob: "06/30/1972", email: "r.tran@email.com",         language: "Vietnamese" },
  { id: "C-1301", firstName: "Priya",    lastName: "Nair",      program: "Family Stability Initiative",            dob: "04/05/1985", email: "p.nair@email.com",         language: "English"    },
  { id: "C-0590", firstName: "Marcus",   lastName: "Bell",      program: "Runaway Village Stage 2",                dob: "12/19/1970", email: "m.bell@email.com",         language: "English"    },
  { id: "C-1455", firstName: "Fatima",   lastName: "Al-Hassan", program: "Refugee Resettlement Program",           dob: "08/08/1996", email: "f.alhassan@email.com",     language: "Arabic"     },
  { id: "C-1188", firstName: "Carmen",   lastName: "Rivera",    program: "Runaway Village Stage 1",                dob: "01/25/1983", email: "c.rivera@email.com",       language: "Spanish"    },
];

// ── All Documents ─────────────────────────────────────────────────────────────
export const allDocuments = [
  { id: 1,  name: "Proof of Income — May 2026",    objectName: "Maria Santos",     familyMember: "Maria Santos",    status: "pending",      date: "05/13/26", assignedTo: "Angela Torres"  },
  { id: 2,  name: "Birth Certificate (corrected)",  objectName: "Devon Williams",   familyMember: "Devon Williams",  status: "resubmitted",  date: "05/13/26", assignedTo: "Brian Okafor"   },
  { id: 3,  name: "Lease Agreement 2026",           objectName: "Luz Ortega",       familyMember: "Luz Ortega",      status: "in_review",    date: "05/12/26", assignedTo: "Clara Mendez"   },
  { id: 4,  name: "State ID — Resubmission",        objectName: "James Fitch",      familyMember: "James Fitch",     status: "resubmitted",  date: "05/12/26", assignedTo: "David Chung"    },
  { id: 5,  name: "Medical Records — Complete",     objectName: "Aisha Coleman",    familyMember: "Aisha Coleman",   status: "in_review",    date: "05/11/26", assignedTo: "Elena Vasquez"  },
  { id: 6,  name: "Proof of Income Q1 2026",        objectName: "Robert Tran",      familyMember: "Robert Tran",     status: "approved",     date: "05/10/26", assignedTo: "Angela Torres"  },
  { id: 7,  name: "Utility Bill — April 2026",      objectName: "Priya Nair",       familyMember: "Priya Nair",      status: "pending",      date: "05/10/26", assignedTo: "Brian Okafor"   },
  { id: 8,  name: "Lease Agreement (unsigned)",     objectName: "Marcus Bell",      familyMember: "Marcus Bell",     status: "overdue",      date: "05/09/26", assignedTo: "Clara Mendez"   },
  { id: 9,  name: "Income Verification — Apr",      objectName: "Devon Williams",   familyMember: "Devon Williams",  status: "approved",     date: "05/09/26", assignedTo: "David Chung"    },
  { id: 10, name: "Passport — Primary ID",          objectName: "Fatima Al-Hassan", familyMember: "Fatima Al-Hassan",status: "pending",      date: "05/08/26", assignedTo: "Elena Vasquez"  },
  { id: 11, name: "Birth Certificate",              objectName: "Carmen Rivera",    familyMember: "Carmen Rivera",   status: "resubmitted",  date: "05/07/26", assignedTo: "Angela Torres"  },
  { id: 12, name: "Proof of Address",               objectName: "Fatima Al-Hassan", familyMember: "Fatima Al-Hassan",status: "pending",      date: "05/06/26", assignedTo: "Brian Okafor"   },
  { id: 13, name: "Rental Agreement 2025-2026",     objectName: "Luz Ortega",       familyMember: "Luz Ortega",      status: "approved",     date: "05/05/26", assignedTo: "Clara Mendez"   },
  { id: 14, name: "School Enrollment Record",       objectName: "Maria Santos",     familyMember: "Elena Santos",    status: "in_review",    date: "05/04/26", assignedTo: "David Chung"    },
];

// ── Client Detail ─────────────────────────────────────────────────────────────
export const clientDetails = {
  "C-1042": {
    id: "C-1042",
    firstName: "Maria",
    lastName: "Santos",
    program: "Runaway Village Stage 1",
    caseWorker: "CW Close",
    familyMembers: [
      { name: "Maria Santos",  initials: "MS" },
      { name: "Elena Santos",  initials: "ES" },
      { name: "Carlos Santos", initials: "CS" },
    ],
    programs: [
      { name: "Runaway Village Stage 1", docCount: 4, thumb: null },
      { name: "Family Stability Initiative", docCount: 2, thumb: null },
    ],
    checklist: [
      { familyMember: "Maria Santos",  status: "approved",    count: 3, action: "View",   reupload: false },
      { familyMember: "Elena Santos",  status: "in_review",   count: 2, action: "Review", reupload: true  },
      { familyMember: "Carlos Santos", status: "pending",     count: 1, action: "Upload", reupload: false },
    ],
    notes: [
      { id: 1, text: "Client called to confirm appointment on 05/15/26.", date: "May 13, 2026", author: "Angela Torres" },
      { id: 2, text: "Lease agreement pending landlord signature — follow up needed.", date: "May 12, 2026", author: "Angela Torres" },
    ],
    eligibilityDocs: [
      { label: "Proof of Income",    required: 2, uploaded: 2 },
      { label: "ID / Photo ID",      required: 1, uploaded: 1 },
      { label: "Lease Agreement",    required: 1, uploaded: 0 },
      { label: "Birth Certificate",  required: 3, uploaded: 3 },
      { label: "Medical Records",    required: 1, uploaded: 0 },
      { label: "Utility Bill",       required: 1, uploaded: 1 },
    ],
  },
};

// Legacy / compatibility
export const tasks = [];
export const teamMembers = [];
export const documents = [];
export const notices = [];
export const activity = [];
export const docTypes = [];
export const statusOptions = [];
