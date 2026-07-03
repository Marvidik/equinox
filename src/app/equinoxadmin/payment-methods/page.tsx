'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminPaymentMethods() {
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNetwork, setNewNetwork] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => { fetchMethods(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchMethods = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminPaymentMethods, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setMethods(data.data);
      else showToast('Failed to load payment methods.');
    } catch { showToast('Network error.'); }
    finally { setLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminCreatePaymentMethod, {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, network: newNetwork, address: newAddress })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Payment method added!');
        setNewName(''); setNewNetwork(''); setNewAddress('');
        setShowForm(false);
        fetchMethods();
      } else {
        showToast(data.error || 'Failed to create payment method.');
      }
    } catch { showToast('Error creating payment method.'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this payment method?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminDeletePaymentMethod(id), {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      if (res.ok || res.status === 204) {
        setMethods(prev => prev.filter(m => m.id !== id));
        showToast('Payment method deleted.');
      } else {
        showToast('Failed to delete payment method.');
      }
    } catch { showToast('Error deleting payment method.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Payment Methods</h1>
          <p className={styles.subtitle}>Manage the crypto wallet addresses users can send deposits to.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`${styles.actionBtn} ${styles.approveBtn}`} style={{ height: '42px', padding: '0 1.25rem' }}>
          {showForm ? 'Cancel' : '+ Add Method'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem', color: '#111827' }}>New Payment Method</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '150px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Coin Name</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. Tether" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: '150px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Network</label>
              <input type="text" value={newNetwork} onChange={e => setNewNetwork(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. TRC20" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 3, minWidth: '200px' }}>
              <label style={{ fontSize: '0.8rem', color: '#4B5563', fontWeight: 700 }}>Wallet Address</label>
              <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB' }} placeholder="e.g. TXf1B34xEj23D5fg..." />
            </div>
            <button type="submit" className={`${styles.actionBtn} ${styles.approveBtn}`} style={{ height: '44px', padding: '0 1.5rem' }}>
              Add
            </button>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Network</th><th>Wallet Address</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className={styles.emptyState}>Loading payment methods...</td></tr>
            ) : methods.length === 0 ? (
              <tr><td colSpan={5} className={styles.emptyState}>No payment methods found. Add one above.</td></tr>
            ) : methods.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td><strong>{m.name}</strong></td>
                <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{m.network}</span></td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{m.address}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(m.id)}>Delete</button>
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
