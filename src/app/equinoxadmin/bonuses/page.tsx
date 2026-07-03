'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminBonuses() {
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => { fetchBonuses(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchBonuses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminBonuses, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setBonuses(data.data);
      else showToast('Failed to load bonuses.');
    } catch { showToast('Network error.'); }
    finally { setLoading(false); }
  };

  const handleCreateBonus = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminCreateBonus, {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: parseInt(userId), amount: parseFloat(amount) })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast(`Bonus of $${amount} added successfully!`);
        setUserId(''); setAmount('');
        setShowForm(false);
        fetchBonuses();
      } else {
        showToast(data.error || 'Failed to add bonus.');
      }
    } catch { showToast('Error adding bonus.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Bonuses</h1>
          <p className={styles.subtitle}>Award and view bonuses given to users.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`${styles.actionBtn} ${styles.approveBtn}`} style={{ height: '42px', padding: '0 1.25rem' }}>
          {showForm ? 'Cancel' : '+ Add Bonus'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem', color: '#111827' }}>Award Bonus to User</h3>
          <form onSubmit={handleCreateBonus} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '160px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>User ID</label>
              <input type="number" value={userId} onChange={e => setUserId(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. 2" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '160px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Amount ($)</label>
              <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. 100" />
            </div>
            <button type="submit" className={`${styles.actionBtn} ${styles.approveBtn}`} style={{ height: '44px', padding: '0 1.5rem' }}>
              Add Bonus
            </button>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>User</th><th>Amount</th><th>Type</th><th>Date</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className={styles.emptyState}>Loading bonuses...</td></tr>
            ) : bonuses.length === 0 ? (
              <tr><td colSpan={5} className={styles.emptyState}>No bonuses found.</td></tr>
            ) : bonuses.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user}</td>
                <td><strong>${b.amount}</strong></td>
                <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{b.type}</span></td>
                <td>{new Date(b.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
