'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';

const PAGE_SIZE_OPTIONS = [5, 10, 25];

export default function ProfitsPage() {
  const [search, setSearch]     = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage]         = useState(1);
  const [profits, setProfits]   = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authService.getProfits();
        setProfits(data.profits || []);
      } catch (err) {
        console.error("Failed to fetch profits:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = profits.filter(
    p => (p.plan || '').toLowerCase().includes(search.toLowerCase()) ||
         String(p.amount).includes(search) ||
         (p.type || '').toLowerCase().includes(search.toLowerCase())
  );

  const total  = filtered.length;
  const pages  = Math.max(1, Math.ceil(total / pageSize));
  const sliced = filtered.slice((page - 1) * pageSize, page * pageSize);
  const from   = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to     = Math.min(page * pageSize, total);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Profit History</h1>
          <p className={styles.pageSub}>View your earnings from all active investment plans</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total Profits</p>
          <p className={styles.statValue}>${profits.reduce((a, p) => a + Number(p.amount || 0), 0).toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Profit Entries</p>
          <p className={styles.statValue}>{profits.length}</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Latest Profit</p>
          <p className={styles.statValue}>${profits.length > 0 ? Number(profits[0].amount).toLocaleString() : '0'}</p>
        </div>
      </div>

      {/* Card */}
      <div className={styles.card}>
        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.showEntries}>
            <span>Show</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>entries</span>
          </div>
          <div className={styles.searchBox}>
            <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className={styles.emptyCell}>Loading records...</td></tr>
              ) : sliced.length === 0 ? (
                <tr><td colSpan={4} className={styles.emptyCell}>No profit records found.</td></tr>
              ) : sliced.map((p, i) => (
                <tr key={p.id || i}>
                  <td className={styles.planCell}>{p.plan}</td>
                  <td className={styles.amountCell}>${Number(p.amount).toLocaleString()}</td>
                  <td>
                    <span className={styles.typeBadge}>{p.type || 'profit'}</span>
                  </td>
                  <td className={styles.dateCell}>{p.date ? new Date(p.date).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {from} to {to} of {total} entries
          </span>
          <div className={styles.paginationBtns}>
            <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Previous
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
