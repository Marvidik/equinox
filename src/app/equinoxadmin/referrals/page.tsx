'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchReferrals(); }, []);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminReferrals, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setReferrals(data.data);
      else setError('Failed to load referrals.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Referrals</h1>
          <p className={styles.subtitle}>View all user referral relationships across the platform.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>Referrer</th><th>Client Name</th><th>Ref Level</th><th>Client Status</th><th>Date Registered</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className={styles.emptyState}>Loading referrals...</td></tr>
            ) : referrals.length === 0 ? (
              <tr><td colSpan={6} className={styles.emptyState}>No referrals found.</td></tr>
            ) : referrals.map(ref => (
              <tr key={ref.id}>
                <td>{ref.id}</td>
                <td>{ref.user}</td>
                <td><strong>{ref.client_name}</strong></td>
                <td>{ref.ref_level}</td>
                <td>
                  <span className={`${styles.badge} ${ref.client_status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
                    {ref.client_status}
                  </span>
                </td>
                <td>{new Date(ref.date_registered).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
