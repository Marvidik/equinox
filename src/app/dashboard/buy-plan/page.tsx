'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000, 25000];

const formatCurrency = (val: any) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(val) || 0);

export default function BuyPlanPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [reinvest, setReinvest] = useState(true);
  const [investing, setInvesting] = useState(false);

  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, dashData] = await Promise.all([
          authService.getPlans(),
          authService.getDashboardData()
        ]);
        setPlans(plansData || []);
        setDashboardData(dashData);
        if (plansData && plansData.length > 0) {
          setSelectedPlanId(String(plansData[0].id));
          setAmount(Number(plansData[0].min_deposit));
        }
      } catch (err) {
        console.error('Failed to fetch plans data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedPlan = plans.find(p => String(p.id) === selectedPlanId);
  const balance = dashboardData?.account_balance || 0;
  const hasEnough = Number(amount) <= Number(balance);
  const meetsMin = Number(amount) >= Number(selectedPlan?.min_deposit || 0);
  const isDataReady = plans.length > 0 && dashboardData;

  const handlePlanChange = (id: string) => {
    setSelectedPlanId(id);
    const plan = plans.find(p => String(p.id) === id);
    if (plan) setAmount(Number(plan.min_deposit));
  };

  const handleInvest = async () => {
    if (!selectedPlanId || !amount) return;
    if (!hasEnough) {
      setModal({ isOpen: true, type: 'error', title: 'Insufficient Balance', message: 'Your account balance is too low for this investment.' });
      return;
    }
    setInvesting(true);
    try {
      await authService.createInvestment({ plan: selectedPlanId, amount: Number(amount), auto_reinvest: reinvest });
      setModal({ isOpen: true, type: 'success', title: 'Investment Successful', message: 'Your investment has been successfully created.' });
    } catch (err: any) {
      setModal({ isOpen: true, type: 'error', title: 'Investment Failed', message: err.message || 'Failed to create investment.' });
    } finally {
      setInvesting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Invest in a Plan</h1>
          <p className={styles.pageSub}>Select a plan and choose your investment amount to get started</p>
        </div>
      </div>

      {loading ? (
        <div className={styles.skeleton} />
      ) : (
        <div className={styles.splitLayout}>
          {/* ── LEFT: Plan selector + settings ── */}
          <div className={styles.leftPanel}>
            <div>
              <p className={styles.sectionLabel}>Select Plan</p>
              <div className={styles.planSelectWrap}>
                <select
                  className={styles.planSelect}
                  value={selectedPlanId}
                  onChange={e => handlePlanChange(e.target.value)}
                >
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>{plan.name}</option>
                  ))}
                </select>
                <svg className={styles.planSelectArrow} width="16" height="16" fill="none" stroke="#94a3b8" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <div>
              <p className={styles.sectionLabel}>Auto Reinvest</p>
              <div className={styles.toggleRow}>
                <div className={styles.toggleLabel}>
                  <span className={styles.toggleTitle}>Auto Reinvest Profits</span>
                  <span className={styles.toggleDesc}>Automatically reinvest earnings</span>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={reinvest} onChange={e => setReinvest(e.target.checked)} />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>

            <div>
              <p className={styles.sectionLabel}>Available Balance</p>
              <div className={styles.balanceCard}>
                <span className={styles.balanceLabel}>Account Balance</span>
                <span className={styles.balanceValue}>{formatCurrency(balance)}</span>
              </div>
            </div>

            <div className={styles.infoNote}>
              <svg width="18" height="18" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Funds are deducted from your account balance. Make sure you have sufficient funds before investing.</span>
            </div>
          </div>

          {/* ── RIGHT: Amount entry + plan details ── */}
          <div className={styles.rightPanel}>
            <div className={styles.amountCard}>
              <h2 className={styles.amountCardTitle}>Enter Investment Amount</h2>
              <p className={styles.amountCardSub}>Choose a quick amount or enter your own below</p>

              <span className={styles.amountLabel}>Amount (USD)</span>
              <div className={styles.bigAmountField}>
                <span className={styles.bigCurrencySymbol}>$</span>
                <input
                  type="number"
                  placeholder={selectedPlan?.min_deposit || '100'}
                  min={selectedPlan?.min_deposit || 100}
                  value={amount}
                  onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
                />
              </div>
              <p className={styles.amountHint}>
                Min: {formatCurrency(selectedPlan?.min_deposit)} · Max: {formatCurrency(selectedPlan?.max_deposit)}
              </p>

              <div className={styles.quickChips}>
                {QUICK_AMOUNTS.map(amt => (
                  <button
                    key={amt}
                    className={`${styles.chip} ${amount === amt ? styles.chipActive : ''}`}
                    onClick={() => setAmount(amt)}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <button
                className={styles.investBtn}
                onClick={handleInvest}
                disabled={!isDataReady || investing || amount === '' || !meetsMin || !hasEnough}
              >
                {investing ? 'Processing...' : !hasEnough ? 'Insufficient Balance' : `Confirm & Invest ${amount ? formatCurrency(amount) : ''}`}
              </button>
            </div>

            {/* Plan details */}
            {selectedPlan && (
              <div className={styles.detailsCard}>
                <h3 className={styles.detailsTitle}>Plan Details — {selectedPlan.name}</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration</span>
                    <span className={styles.detailValue}>{selectedPlan.duration} hrs</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Profit Rate</span>
                    <span className={styles.detailValueGreen}>{selectedPlan.profit_percent}%</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Min Deposit</span>
                    <span className={styles.detailValue}>{formatCurrency(selectedPlan.min_deposit)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Max Deposit</span>
                    <span className={styles.detailValue}>{formatCurrency(selectedPlan.max_deposit)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Min Return</span>
                    <span className={styles.detailValueTeal}>{selectedPlan.min_return_percent}%</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Max Return</span>
                    <span className={styles.detailValueTeal}>{selectedPlan.max_return_percent}%</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Bonus</span>
                    <span className={styles.detailValueGreen}>{formatCurrency(selectedPlan.bonus)}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Payment</span>
                    <span className={styles.detailValue}>Account Balance</span>
                  </div>
                </div>

                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Amount to Invest</span>
                  <span className={styles.totalValue}>{amount ? formatCurrency(amount) : '—'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
    </div>
  );
}
