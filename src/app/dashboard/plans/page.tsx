'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

interface Plan {
  id: number;
  plan_name: string;
  amount: number;
  profit_earned: number;
  is_active: boolean;
  auto_reinvest: boolean;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await authService.getActiveInvestments();
      // API may return array directly or wrapped as { investments: [...] }
      const list = Array.isArray(data) ? data : (data?.investments || data?.results || []);
      setPlans(list);
    } catch (error) {
      console.error('Failed to fetch active investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReinvest = async (id: number) => {
    try {
      await authService.toggleAutoReinvest(id);
      setPlans(prev => prev.map(p => p.id === id ? { ...p, auto_reinvest: !p.auto_reinvest } : p));
      setModal({ isOpen: true, type: 'success', title: 'Updated', message: 'Auto-reinvest setting updated.' });
    } catch (err: any) {
      setModal({ isOpen: true, type: 'error', title: 'Update Failed', message: err.message || 'Failed to update setting.' });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerTitleWrap}>
            <svg width="22" height="22" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              <polyline points="17 6 23 6 23 12"/>
            </svg>
            <h1 className={styles.cardTitle}>Active Plan(s)</h1>
            <span className={styles.planCount}>({plans.length})</span>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Profit</th>
                <th>Status</th>
                <th>Reinvest</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>
                    Loading your investments...
                  </td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>
                    You do not have any active investment plans.
                  </td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td className={styles.planName}>{plan.plan_name}</td>
                    <td className={styles.planAmount}>${Number(plan.amount).toLocaleString('en', { minimumFractionDigits: 2 })}</td>
                    <td className={styles.planProfit}>${Number(plan.profit_earned || 0).toLocaleString('en', { minimumFractionDigits: 2 })}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: plan.is_active ? '#ecfdf5' : '#fff1f2', color: plan.is_active ? '#059669' : '#dc2626' }}>
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className={styles.reinvestCheck}
                        checked={plan.auto_reinvest}
                        onChange={() => toggleReinvest(plan.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
    </div>
  );
}
