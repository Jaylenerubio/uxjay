import { useState } from 'react';
import { clients } from '../data/mockData';
import { Icon } from './Icons';

const PAGE_SIZE = 7;

// Extend mock data to 100 clients
function generateClients() {
  const programs = [
    'Runaway Village Stage 1',
    'Runaway Village Stage 2',
    'HFA San Isidro Affordable Housing',
    'Family Stability Initiative',
    'Refugee Resettlement Program',
  ];
  const languages = ['English', 'Spanish', 'Vietnamese', 'Arabic', 'Mandarin', 'Tagalog'];
  const firstNames = ['Maria', 'Devon', 'Luz', 'James', 'Aisha', 'Robert', 'Priya', 'Marcus', 'Fatima', 'Carmen',
    'Elena', 'Carlos', 'Jess', 'Andre', 'Yuki', 'Samuel', 'Grace', 'Tyler', 'Nadia', 'Victor'];
  const lastNames = ['Santos', 'Williams', 'Ortega', 'Fitch', 'Coleman', 'Tran', 'Nair', 'Bell', 'Al-Hassan', 'Rivera',
    'Chen', 'Okafor', 'Torres', 'Kim', 'Patel', 'Johnson', 'Garcia', 'Martinez', 'Wilson', 'Brown'];

  const extended = [...clients];
  let counter = 1500;
  while (extended.length < 100) {
    const fn = firstNames[extended.length % firstNames.length];
    const ln = lastNames[Math.floor(extended.length / 2) % lastNames.length];
    counter++;
    extended.push({
      id: `C-${counter}`,
      firstName: fn,
      lastName: ln,
      program: programs[extended.length % programs.length],
      dob: `${String(Math.floor(Math.random() * 12) + 1).padStart(2,'0')}/${String(Math.floor(Math.random() * 28) + 1).padStart(2,'0')}/19${60 + (extended.length % 40)}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${extended.length}@email.com`,
      language: languages[extended.length % languages.length],
    });
  }
  return extended;
}

const allClients = generateClients();

export default function ClientsPage({ onClientSelect }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = allClients.filter(c => {
    const q = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.program.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageClients = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Client list</div>
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <span style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray-400)',
            display: 'flex',
          }}>
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search clients…"
            value={search}
            onChange={handleSearch}
            style={{ paddingLeft: 32 }}
          />
        </div>
      </div>

      <div className="records-line">
        Records: {filtered.length} | Page by {PAGE_SIZE}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>First name</th>
              <th>Last name</th>
              <th>CLIENT ID</th>
              <th>Date of birth</th>
              <th>Email</th>
              <th>Language</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {pageClients.map(client => (
              <tr
                key={client.id}
                onClick={() => onClientSelect && onClientSelect(client.id)}
              >
                <td style={{ maxWidth: 200 }}>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 500,
                    background: 'var(--blue-light)',
                    color: 'var(--blue)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}>
                    {client.program}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--gray-600)' }}>{client.id}</td>
                <td style={{ color: 'var(--gray-600)', fontSize: 12 }}>{client.dob}</td>
                <td style={{ color: 'var(--gray-600)', fontSize: 12 }}>{client.email}</td>
                <td>
                  <span className="chip">{client.language}</span>
                </td>
                <td>
                  <span style={{ color: 'var(--gray-400)' }}>
                    <Icon name="chevron" size={16} />
                  </span>
                </td>
              </tr>
            ))}
            {pageClients.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: 40, color: 'var(--gray-400)' }}>
                  No clients match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 18px',
            borderTop: '1px solid var(--card-border)',
            justifyContent: 'flex-end',
          }}>
            <button
              className="btn btn-ghost btn-sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              ← Prev
            </button>
            <span style={{ fontSize: 12, color: 'var(--gray-600)' }}>
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
