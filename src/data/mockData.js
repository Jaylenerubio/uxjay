export const documents = [
  { id: 1, clientName: "Maria Santos", clientId: "C-1042", caseId: "2024-1042", docType: "Proof of Income", receivedDate: "2026-05-13", status: "pending", isResubmission: false, requestedDate: null, fileLabel: "paystub_may2026.pdf" },
  { id: 2, clientName: "Devon Williams", clientId: "C-0887", caseId: "2024-0887", docType: "Birth Certificate", receivedDate: "2026-05-13", status: "needs_review", isResubmission: true, requestedDate: "2026-05-06", fileLabel: "birth_cert_corrected.pdf" },
  { id: 3, clientName: "Luz Ortega", clientId: "C-1105", caseId: "2025-1105", docType: "Lease Agreement", receivedDate: "2026-05-12", status: "pending", isResubmission: false, requestedDate: null, fileLabel: "lease_ortega_2026.pdf" },
  { id: 4, clientName: "James Fitch", clientId: "C-0934", caseId: "2024-0934", docType: "ID / Photo ID", receivedDate: "2026-05-12", status: "pending", isResubmission: true, requestedDate: "2026-05-01", fileLabel: "state_id_fitch.pdf" },
  { id: 5, clientName: "Aisha Coleman", clientId: "C-1220", caseId: "2025-1220", docType: "Medical Records", receivedDate: "2026-05-11", status: "needs_review", isResubmission: false, requestedDate: null, fileLabel: "medical_records_may.pdf" },
  { id: 6, clientName: "Robert Tran", clientId: "C-0761", caseId: "2024-0761", docType: "Proof of Income", receivedDate: "2026-05-10", status: "approved", isResubmission: false, requestedDate: null, fileLabel: "tran_income_q1.pdf" },
  { id: 7, clientName: "Priya Nair", clientId: "C-1301", caseId: "2025-1301", docType: "Utility Bill", receivedDate: "2026-05-10", status: "pending", isResubmission: false, requestedDate: null, fileLabel: "utility_apr2026.pdf" },
  { id: 8, clientName: "Marcus Bell", clientId: "C-0590", caseId: "2023-0590", docType: "Lease Agreement", receivedDate: "2026-05-09", status: "rejected", isResubmission: false, requestedDate: null, fileLabel: "lease_bell_unsigned.pdf" },
  { id: 9, clientName: "Devon Williams", clientId: "C-0887", caseId: "2024-0887", docType: "Proof of Income", receivedDate: "2026-05-09", status: "approved", isResubmission: true, requestedDate: "2026-04-28", fileLabel: "williams_income_apr.pdf" },
  { id: 10, clientName: "Fatima Al-Hassan", clientId: "C-1455", caseId: "2025-1455", docType: "ID / Photo ID", receivedDate: "2026-05-08", status: "pending", isResubmission: false, requestedDate: null, fileLabel: "alhassan_passport.pdf" },
];

export const notices = [
  { id: 1, clientName: "Marcus Bell", clientId: "C-0590", caseId: "2023-0590", noticeType: "Missing Document", detail: "Lease agreement missing signature — client must resubmit", dueDate: "2026-05-17", sentDate: null, status: "draft", acknowledged: null },
  { id: 2, clientName: "Luz Ortega", clientId: "C-1105", caseId: "2025-1105", noticeType: "Eligibility Decision", detail: "Benefits approved pending lease verification", dueDate: "2026-05-15", sentDate: "2026-05-12", status: "sent", acknowledged: null },
  { id: 3, clientName: "Aisha Coleman", clientId: "C-1220", caseId: "2025-1220", noticeType: "Request for Information", detail: "Medical records incomplete — page 3 missing", dueDate: "2026-05-16", sentDate: "2026-05-11", status: "sent", acknowledged: "2026-05-13" },
  { id: 4, clientName: "James Fitch", clientId: "C-0934", caseId: "2024-0934", noticeType: "Eligibility Decision", detail: "Benefits denied — ID not accepted, must provide state-issued ID", dueDate: "2026-05-14", sentDate: "2026-05-08", status: "sent", acknowledged: null },
  { id: 5, clientName: "Fatima Al-Hassan", clientId: "C-1455", caseId: "2025-1455", noticeType: "Missing Document", detail: "Proof of address required in addition to passport", dueDate: "2026-05-20", sentDate: null, status: "draft", acknowledged: null },
  { id: 6, clientName: "Robert Tran", clientId: "C-0761", caseId: "2024-0761", noticeType: "Eligibility Decision", detail: "Benefits approved — enrollment begins June 1", dueDate: "2026-05-10", sentDate: "2026-05-09", status: "sent", acknowledged: "2026-05-11" },
];

export const activity = [
  { id: 1, time: "9:41 AM", event: "Devon Williams resubmitted Birth Certificate", tag: "resubmission" },
  { id: 2, time: "9:15 AM", event: "Aisha Coleman acknowledged Request for Information notice", tag: "acknowledged" },
  { id: 3, time: "8:52 AM", event: "Maria Santos submitted Proof of Income", tag: "new_doc" },
  { id: 4, time: "8:30 AM", event: "James Fitch resubmitted ID / Photo ID", tag: "resubmission" },
  { id: 5, time: "Yesterday", event: "Robert Tran acknowledged Eligibility Decision notice", tag: "acknowledged" },
  { id: 6, time: "Yesterday", event: "Priya Nair submitted Utility Bill", tag: "new_doc" },
];

export const docTypes = ["All Types", "Proof of Income", "Birth Certificate", "Lease Agreement", "ID / Photo ID", "Medical Records", "Utility Bill"];
export const statusOptions = ["All Statuses", "pending", "needs_review", "approved", "rejected"];
