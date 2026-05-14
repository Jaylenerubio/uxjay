import { useState } from 'react';
import { clients } from '../data/mockData';
import { Icon } from './Icons';

const PAGE_SIZE = 7;

export default function ClientsPage({ onClientSelect }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = clients.filter(c => {
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
      {/* Page heading */}
      <h1 className="page-heading">Client list</h1>

      {/* Search bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <span style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--gray-400)',
            display: 'flex',
            pointerEvents: 'none',
          }}>
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by clients using their name, birthday, email, etc"
            value={search}
            onChange={handleSearch}
            style={{ paddingLeft: 42 }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button className="btn btn-outline btn-sm">
          Column view ▾
        </button>
        <button className="btn btn-outline btn-sm">
          <Icon name="filter" size={13} />
          Filter by ▾
        </button>
      </div>

      {/* Table card */}
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
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'var(--blue-light)',
                    color: 'var(--blue)',
                    padding: '3px 10px',
                    borderRadius: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    fontFamily: 'Public Sans, sans-serif',
                  }}>
                    {client.program}
                  </span>
                </td>
                <td style={{ fontWeight: 700 }}>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--secondary-text)' }}>{client.id}</td>
                <td style={{ color: 'var(--secondary-text)', fontSize: 13 }}>{client.dob}</td>
                <td style={{ color: 'var(--secondary-text)', fontSize: 13 }}>{client.email}</td>
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
                <td colSpan={8} style={{ textAlign: 'center', padding: 48, color: 'var(--gray-400)', fontSize: 14 }}>
                  No clients match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 20px',
          borderTop: '1px solid var(--card-border)',
          fontSize: 13,
          color: 'var(--secondary-text)',
          fontFamily: 'Public Sans, sans-serif',
        }}>
          <span>Page {page} of {totalPages || 1}</span>
          <span style={{ color: 'var(--gray-300)' }}>|</span>
          <span>Page by {PAGE_SIZE}</span>
          <Icon name="chevron-down" size={14} color="var(--gray-500)" />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button
              className="btn btn-outline btn-sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              style={{ opacity: page === 1 ? 0.4 : 1 }}
            >
              ← Prev
            </button>
            <button
              className="btn btn-outline btn-sm"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(p => p + 1)}
              style={{ opacity: (page === totalPages || totalPages === 0) ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
