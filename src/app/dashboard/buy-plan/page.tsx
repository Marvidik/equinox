'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const QUICK_AMOUNTS = [100, 250, 500, 1000, 1500, 2000];

export default function BuyPlanPage() {
  const [plan, setPlan] = useState('Basic Plan');
  const [amount, setAmount] = useState<number | ''>(1000);
  const [reinvest, setReinvest] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Account Balance');

  return (
    <div className={styles.pageWrap}>
      <div className={styles.headerArea}>
        <h1 className={styles.pageTitle}>Get started with your investment</h1>
      </div>

      <div className={styles.page}>
        <div className={styles.layout}>
          {/* Main Form */}
          <div className={styles.mainCol}>
            {/* Plan selection */}
            <div className={styles.sectionCard}>
              <div className={styles.selectWrap}>
                <div className={styles.selectIcon}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <select value={plan} onChange={e => setPlan(e.target.value)} className={styles.select}>
                  <option value="Basic Plan">Basic Plan</option>
                  <option value="Standard Plan">Standard Plan</option>
                  <option value="Premium Plan">Premium Plan</option>
                </select>
                <svg className={styles.selectArrow} width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
            </div>

            {/* Amount */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Choose Quick Amount to Invest</p>
              <div className={styles.quickGrid}>
                {QUICK_AMOUNTS.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    className={`${styles.quickBtn} ${amount === amt ? styles.quickBtnActive : ''}`}
                    onClick={() => setAmount(amt)}
                  >
                    ${amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Or Enter Your Amount</p>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  className={styles.input}
                  value={amount}
                  onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Enter amount"
                />
                <div className={styles.spinnerBtns}>
                  <button type="button" onClick={() => setAmount(Number(amount) + 10)}><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg></button>
                  <button type="button" onClick={() => setAmount(Number(amount) - 10)}><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg></button>
                </div>
              </div>
            </div>

            {/* Reinvest */}
            <div className={styles.sectionCard}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={reinvest} onChange={e => setReinvest(e.target.checked)} className={styles.checkbox} />
                <span>Auto Reinvest</span>
              </label>
            </div>

            {/* Payment Method */}
            <div className={styles.sectionCard}>
              <p className={styles.sectionTitle}>Choose Payment Method</p>
              <div className={styles.methodBox}>
                <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span className={styles.methodName}>Account Balance</span>
                <span className={styles.methodBal}>$1,332,363</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sideCol}>
            <div className={styles.detailsCard}>
              <h3 className={styles.detailsTitle}>Your Investment Details</h3>

              <div className={styles.detailGrid}>
                <div>
                  <span className={styles.detailLabel}>Name of plan</span>
                  <span className={styles.detailValueBlue}>{plan}</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Plan Price</span>
                  <span className={styles.detailValueDark}>$50</span>
                </div>

                <div>
                  <span className={styles.detailLabel}>Duration</span>
                  <span className={styles.detailValue}>24 hours</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Profit</span>
                  <span className={styles.detailValue}>8% Hourly</span>
                </div>

                <div>
                  <span className={styles.detailLabel}>Minimum Deposit</span>
                  <span className={styles.detailValueDark}>$50</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Maximum Deposit</span>
                  <span className={styles.detailValueDark}>$499</span>
                </div>

                <div>
                  <span className={styles.detailLabel}>Minimum Return</span>
                  <span className={styles.detailValueDark}>8%</span>
                </div>
                <div>
                  <span className={styles.detailLabel}>Maximum Return</span>
                  <span className={styles.detailValueDark}>8%</span>
                </div>

                <div>
                  <span className={styles.detailLabel}>Bonus</span>
                  <span className={styles.detailValueDark}>$0</span>
                </div>
                <div />

                <div className={styles.fullWidth}>
                  <div className={styles.flexBetween}>
                    <span className={styles.detailLabel}>Payment method:</span>
                    <span className={styles.detailValueDark}>{paymentMethod}</span>
                  </div>
                </div>

                <div className={styles.fullWidth}>
                  <div className={styles.flexBetween}>
                    <span className={styles.detailLabelBlue}>Amount to Invest:</span>
                    <span className={styles.detailValueBig}>${amount || 0}</span>
                  </div>
                </div>
              </div>

              <button className={styles.submitBtn}>
                Confirm &amp; Invest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
