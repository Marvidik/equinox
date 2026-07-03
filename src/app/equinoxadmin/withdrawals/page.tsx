'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { fetchWithdrawals(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminWithdrawals, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setWithdrawals(data.data);
      else setError('Failed to load withdrawals.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id: number) => {
    if (!confirm('Approve this withdrawal?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminApproveWithdrawal(id), {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Withdrawal approved successfully!');
        fetchWithdrawals();
      } else {
        showToast(data.detail || 'Failed to approve withdrawal.');
      }
    } catch { showToast('Error approving withdrawal.'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Permanently delete this withdrawal record?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminDeleteWithdrawal(id), {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setWithdrawals(prev => prev.filter(w => w.id !== id));
        showToast('Withdrawal deleted.');
      } else {
        showToast('Failed to delete withdrawal.');
      }
    } catch { showToast('Error deleting withdrawal.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Withdrawals</h1>
          <p className={styles.subtitle}>Review, approve and manage user withdrawal requests.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>User</th><th>Amount</th><th>Coin</th><th>Wallet</th><th>Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className={styles.emptyState}>Loading withdrawals...</td></tr>
            ) : withdrawals.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyState}>No withdrawals found.</td></tr>
            ) : withdrawals.map(wd => (
              <tr key={wd.id}>
                <td>{wd.id}</td>
                <td>{wd.user}</td>
                <td><strong>${wd.amount.toLocaleString()}</strong></td>
                <td>{wd.coin}</td>
                <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={wd.wallet}>{wd.wallet}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(wd.date).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${wd.status ? styles.badgeSuccess : styles.badgeWarning}`}>
                    {wd.status ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  {!wd.status && (
                    <button className={`${styles.actionBtn} ${styles.approveBtn}`} onClick={() => handleApprove(wd.id)}>Approve</button>
                  )}
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(wd.id)}>Delete</button>
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
