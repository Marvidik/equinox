'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

interface Plan {
  id: number;
  name: string;
  amount: number;
  profit: number;
  reinvest: boolean;
}

const ACTIVE_PLANS: Plan[] = [
  { id: 1, name: 'Basic Plan', amount: 100, profit: 0, reinvest: false },
];

export default function PlansPage() {
  const [plans, setPlans] = useState(ACTIVE_PLANS);

  const toggleReinvest = (id: number) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, reinvest: !p.reinvest } : p));
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
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.emptyCell}>
                    You do not have any active investment plans.
                  </td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td className={styles.planName}>{plan.name}</td>
                    <td className={styles.planAmount}>${plan.amount.toLocaleString()}</td>
                    <td className={styles.planProfit}>${plan.profit.toLocaleString()}</td>
                    <td>
                      <span className={styles.statusBadge}>Active</span>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className={styles.reinvestCheck}
                        checked={plan.reinvest}
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
    </div>
  );
}
