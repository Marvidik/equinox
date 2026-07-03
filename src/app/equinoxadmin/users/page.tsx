'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminUsers, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setUsers(data.data);
      } else {
        setError('Failed to load users.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users Management</h1>
          <p className={styles.subtitle}>View and manage all registered platform users.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Account Type</th>
              <th>Status</th>
              <th>KYC</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className={styles.emptyState}>Loading users...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyState}>No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td><strong>{user.user?.username || 'N/A'}</strong></td>
                  <td>{user.full_name}</td>
                  <td>{user.user?.email || 'N/A'}</td>
                  <td>{user.phone}</td>
                  <td>{user.account_type}</td>
                  <td>
                    <span className={`${styles.badge} ${user.status === 'Verified' ? styles.badgeSuccess : styles.badgeWarning}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${user.kyc ? styles.badgeSuccess : styles.badgeDanger}`}>
                      {user.kyc ? 'Done' : 'None'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
