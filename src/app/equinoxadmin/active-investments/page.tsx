'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminActiveInvestments() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchInvestments(); }, []);

  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminActiveInvestments, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setInvestments(data.data);
      else setError('Failed to load investments.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Active Investments</h1>
          <p className={styles.subtitle}>View all user investments across the platform.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>User Email</th><th>Plan</th><th>Amount</th>
              <th>Profit Earned</th><th>Start Date</th><th>End Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className={styles.emptyState}>Loading investments...</td></tr>
            ) : investments.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyState}>No investments found.</td></tr>
            ) : investments.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.user_email}</td>
                <td><strong>{inv.plan}</strong></td>
                <td>${inv.amount.toLocaleString()}</td>
                <td>${inv.profit_earned}</td>
                <td>{new Date(inv.start_date).toLocaleDateString()}</td>
                <td>{new Date(inv.end_date).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${inv.is_active ? styles.badgeSuccess : inv.matured ? styles.badgeWarning : styles.badgeDanger}`}>
                    {inv.is_active ? 'Active' : inv.matured ? 'Matured' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
