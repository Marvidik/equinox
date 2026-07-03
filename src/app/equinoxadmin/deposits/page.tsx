'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminDeposits() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { fetchDeposits(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminDeposits, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setDeposits(data.data);
      else setError('Failed to load deposits.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id: number) => {
    if (!confirm('Approve this deposit?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminApproveDeposit(id), {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Deposit approved successfully!');
        fetchDeposits();
      } else {
        showToast(data.detail || 'Failed to approve deposit.');
      }
    } catch { showToast('Error approving deposit.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Deposits</h1>
          <p className={styles.subtitle}>Review and approve user deposit requests.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>User</th><th>Amount</th><th>Coin</th><th>Proof</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className={styles.emptyState}>Loading deposits...</td></tr>
            ) : deposits.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyState}>No deposits found.</td></tr>
            ) : deposits.map(dep => (
              <tr key={dep.id}>
                <td>{dep.id}</td>
                <td>{dep.user}</td>
                <td><strong>${dep.amount.toLocaleString()}</strong></td>
                <td>{dep.coin}</td>
                <td>
                  {dep.proof ? (
                    <a href={`${ENDPOINTS.BASE_URL.slice(0, -1)}${dep.proof}`} target="_blank" rel="noopener noreferrer"
                      style={{ color: '#2CD4D1', fontWeight: 600, textDecoration: 'none' }}>
                      View Proof ↗
                    </a>
                  ) : <span style={{ color: '#9CA3AF' }}>No proof</span>}
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(dep.date).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${dep.status ? styles.badgeSuccess : styles.badgeWarning}`}>
                    {dep.status ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>
                  {!dep.status && (
                    <button className={`${styles.actionBtn} ${styles.approveBtn}`} onClick={() => handleApprove(dep.id)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
