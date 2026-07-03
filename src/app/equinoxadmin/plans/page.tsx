'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminPlans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newProfitPercent, setNewProfitPercent] = useState('');
  const [newMinDeposit, setNewMinDeposit] = useState('');
  const [newMaxDeposit, setNewMaxDeposit] = useState('');
  const [newMinReturn, setNewMinReturn] = useState('');
  const [newMaxReturn, setNewMaxReturn] = useState('');
  const [newBonus, setNewBonus] = useState('');

  useEffect(() => { fetchPlans(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminPlans, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setPlans(data.data);
      else showToast('Failed to load plans');
    } catch { showToast('Network error'); }
    finally { setLoading(false); }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminPlans, {
        method: 'POST',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          price: parseFloat(newPrice),
          duration: parseInt(newDuration),
          profit_percent: parseFloat(newProfitPercent),
          min_deposit: parseFloat(newMinDeposit),
          max_deposit: parseFloat(newMaxDeposit),
          min_return_percent: parseFloat(newMinReturn),
          max_return_percent: parseFloat(newMaxReturn),
          bonus: parseFloat(newBonus)
        })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('Plan created successfully!');
        setNewName(''); setNewPrice(''); setNewDuration(''); setNewProfitPercent('');
        setNewMinDeposit(''); setNewMaxDeposit(''); setNewMinReturn(''); setNewMaxReturn(''); setNewBonus('');
        setShowForm(false);
        fetchPlans();
      } else {
        showToast(data.error || data.detail || 'Failed to create plan');
      }
    } catch { showToast('Error creating plan'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this investment plan? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminPlan(id), {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      if (res.ok) {
        setPlans(prev => prev.filter(p => p.id !== id));
        showToast('Plan deleted successfully');
      } else {
        showToast('Failed to delete plan');
      }
    } catch { showToast('Error deleting plan'); }
  };

  const iStyle = { padding: '0.75rem', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem', width: '100%' };
  const lStyle: React.CSSProperties = { fontSize: '0.8rem', color: '#4B5563', fontWeight: 700, marginBottom: '0.25rem' };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Investment Plans</h1>
          <p className={styles.subtitle}>Create and manage the platform&apos;s investment plans.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`${styles.actionBtn} ${styles.approveBtn}`}
          style={{ height: '42px', padding: '0 1.25rem' }}
        >
          {showForm ? 'Hide Form' : '+ Create Plan'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.25rem', fontSize: '1.05rem', color: '#111827' }}>New Investment Plan</h3>
          <form onSubmit={handleCreatePlan}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div><label style={lStyle}>Plan Name</label><input style={iStyle} type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Starter Plan" required /></div>
              <div><label style={lStyle}>Price ($)</label><input style={iStyle} type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="500" required /></div>
              <div><label style={lStyle}>Duration (Hours)</label><input style={iStyle} type="number" value={newDuration} onChange={e => setNewDuration(e.target.value)} placeholder="24" required /></div>
              <div><label style={lStyle}>Profit Percent (%)</label><input style={iStyle} type="number" step="0.01" value={newProfitPercent} onChange={e => setNewProfitPercent(e.target.value)} placeholder="5.5" required /></div>
              <div><label style={lStyle}>Min Deposit ($)</label><input style={iStyle} type="number" value={newMinDeposit} onChange={e => setNewMinDeposit(e.target.value)} placeholder="500" required /></div>
              <div><label style={lStyle}>Max Deposit ($)</label><input style={iStyle} type="number" value={newMaxDeposit} onChange={e => setNewMaxDeposit(e.target.value)} placeholder="999" required /></div>
              <div><label style={lStyle}>Min Return %</label><input style={iStyle} type="number" step="0.01" value={newMinReturn} onChange={e => setNewMinReturn(e.target.value)} placeholder="3" required /></div>
              <div><label style={lStyle}>Max Return %</label><input style={iStyle} type="number" step="0.01" value={newMaxReturn} onChange={e => setNewMaxReturn(e.target.value)} placeholder="7" required /></div>
              <div><label style={lStyle}>Bonus ($)</label><input style={iStyle} type="number" value={newBonus} onChange={e => setNewBonus(e.target.value)} placeholder="50" required /></div>
            </div>
            <button type="submit" className={`${styles.actionBtn} ${styles.approveBtn}`} style={{ height: '42px', padding: '0 2rem' }}>
              Create Plan
            </button>
          </form>
        </div>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Duration (Hrs)</th>
              <th>Profit %</th><th>Min–Max Deposit</th><th>Bonus</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className={styles.emptyState}>Loading plans...</td></tr>
            ) : plans.length === 0 ? (
              <tr><td colSpan={8} className={styles.emptyState}>No plans found. Create one above.</td></tr>
            ) : plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.id}</td>
                <td><strong>{plan.name}</strong></td>
                <td>${plan.price.toLocaleString()}</td>
                <td>{plan.duration}h</td>
                <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>{plan.profit_percent}%</span></td>
                <td>${plan.min_deposit} – ${plan.max_deposit}</td>
                <td>${plan.bonus}</td>
                <td>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(plan.id)}>Delete</button>
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
