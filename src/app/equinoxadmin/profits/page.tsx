'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminProfits() {
  const [profits, setProfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchProfits(); }, []);

  const fetchProfits = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminProfits, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setProfits(data.data);
      else setError('Failed to load profits.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Profits</h1>
          <p className={styles.subtitle}>View all profit distributions across the platform.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>User</th><th>Plan</th><th>Amount</th><th>Type</th><th>Date</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className={styles.emptyState}>Loading profits...</td></tr>
            ) : profits.length === 0 ? (
              <tr><td colSpan={6} className={styles.emptyState}>No profits found.</td></tr>
            ) : profits.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.user}</td>
                <td>{p.plan}</td>
                <td><strong>${p.amount}</strong></td>
                <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{p.type}</span></td>
                <td>{new Date(p.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
