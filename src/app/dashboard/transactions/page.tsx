'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';

type Tab = 'deposit' | 'withdrawal';

const PAGE_SIZE_OPTIONS = [5, 10, 25];

export default function TransactionsPage() {
  const [tab, setTab] = useState<Tab>('deposit');
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [depData, withData] = await Promise.all([
          authService.getDeposits(),
          authService.getWithdrawals()
        ]);
        setDeposits(depData || []);
        setWithdrawals(withData || []);
      } catch (err) {
        console.error("Failed to fetch transaction data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const depositFiltered = deposits.filter(
    d => (d.coin || d.mode || '').toLowerCase().includes(search.toLowerCase()) ||
         String(d.amount).includes(search)
  );
  const withdrawalFiltered = withdrawals.filter(
    w => (w.coin || w.mode || '').toLowerCase().includes(search.toLowerCase()) ||
         String(w.amount || w.amountReq).includes(search)
  );

  const data     = tab === 'deposit' ? depositFiltered : withdrawalFiltered;
  const total    = data.length;
  const pages    = Math.max(1, Math.ceil(total / pageSize));
  const sliced   = data.slice((page - 1) * pageSize, page * pageSize);
  const showFrom = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const showTo   = Math.min(page * pageSize, total);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Transaction History</h1>
          <p className={styles.pageSub}>Track all your deposits and withdrawals in one place</p>
        </div>
      </div>

      {/* Card */}
      <div className={styles.card}>
        {/* Tabs */}
        <div className={styles.tabsRow}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'deposit' ? styles.tabActive : ''}`}
              onClick={() => { setTab('deposit'); setPage(1); setSearch(''); }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Deposit
            </button>
            <button
              className={`${styles.tab} ${tab === 'withdrawal' ? styles.tabActive : ''}`}
              onClick={() => { setTab('withdrawal'); setPage(1); setSearch(''); }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Withdrawal
            </button>
          </div>
        </div>

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
          {tab === 'deposit' ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Payment Mode</th>
                  <th>Status</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className={styles.emptyCell}>Loading records...</td></tr>
                ) : sliced.length === 0 ? (
                  <tr><td colSpan={4} className={styles.emptyCell}>No records found.</td></tr>
                ) : sliced.map((d: any, i) => (
                  <tr key={d.id || i}>
                    <td className={styles.amountCell}>${Number(d.amount).toLocaleString()}</td>
                    <td>{d.coin || d.mode || 'N/A'}</td>
                    <td>
                      <span className={`${styles.badge} ${d.status ? styles.badgeSuccess : styles.badgePending}`}>
                        {d.status ? 'Processed' : 'Pending'}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{d.date ? new Date(d.date).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Amount Requested</th>
                  <th>Amount + Charges</th>
                  <th>Receiving Mode</th>
                  <th>Status</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className={styles.emptyCell}>Loading records...</td></tr>
                ) : sliced.length === 0 ? (
                  <tr><td colSpan={5} className={styles.emptyCell}>No records found.</td></tr>
                ) : sliced.map((w: any, i) => (
                  <tr key={w.id || i}>
                    <td className={styles.amountCell}>${Number(w.amount || w.amountReq).toLocaleString()}</td>
                    <td>${Number(w.amount || w.amountCharge).toLocaleString()}</td>
                    <td>{w.coin || w.mode || 'N/A'}</td>
                    <td>
                      <span className={`${styles.badge} ${w.status ? styles.badgeSuccess : styles.badgePending}`}>
                        {w.status ? 'Processed' : 'Pending'}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{w.date ? new Date(w.date).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {showFrom} to {showTo} of {total} entries
          </span>
          <div className={styles.paginationBtns}>
            <button
              className={styles.pageBtn}
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
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
            <button
              className={styles.pageBtn}
              disabled={page === pages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
