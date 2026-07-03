'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminPenalties() {
  const [penalties, setPenalties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => { fetchPenalties(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchPenalties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminPenalties, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setPenalties(data.data);
      else showToast('Failed to load penalties.');
    } catch { showToast('Network error.'); }
    finally { setLoading(false); }
  };

  const handleCreatePenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminCreatePenalty, {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: parseInt(userId), amount: parseFloat(amount), reason })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Penalty issued successfully!');
        setUserId(''); setAmount(''); setReason('');
        setShowForm(false);
        fetchPenalties();
      } else {
        showToast(data.error || 'Failed to issue penalty.');
      }
    } catch { showToast('Error issuing penalty.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Penalties</h1>
          <p className={styles.subtitle}>Issue and view penalties applied to user accounts.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`${styles.actionBtn} ${styles.deleteBtn}`} style={{ height: '42px', padding: '0 1.25rem' }}>
          {showForm ? 'Cancel' : '+ Issue Penalty'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem', color: '#111827' }}>Issue Penalty to User</h3>
          <form onSubmit={handleCreatePenalty} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '0 0 160px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>User ID</label>
              <input type="number" value={userId} onChange={e => setUserId(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. 1" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: '0 0 160px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Amount ($)</label>
              <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. 50" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 2, minWidth: '200px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Reason</label>
              <input type="text" value={reason} onChange={e => setReason(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. Violation of terms" />
            </div>
            <button type="submit" className={`${styles.actionBtn} ${styles.deleteBtn}`} style={{ height: '44px', padding: '0 1.5rem' }}>
              Issue Penalty
            </button>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>User</th><th>Amount</th><th>Reason</th><th>Date</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className={styles.emptyState}>Loading penalties...</td></tr>
            ) : penalties.length === 0 ? (
              <tr><td colSpan={5} className={styles.emptyState}>No penalties found.</td></tr>
            ) : penalties.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.user}</td>
                <td><strong style={{ color: '#DC2626' }}>-${p.amount}</strong></td>
                <td>{p.reason}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
