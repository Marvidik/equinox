'use client';
import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import TradingViewChart from '@/components/TradingViewChart';

export default function Dashboard() {
  return (
    <div className={styles.content}>
      <div className={styles.welcomeSection}>
        <div>
          <h1 className={styles.welcomeTitle}>Welcome back, Jeff Scholite 👋</h1>
          <p className={styles.welcomeSub}>Stay in control and maximize your profit opportunities.</p>
        </div>
        <div className={styles.actionButtons}>
          <Link href="/dashboard/withdraw" className={styles.withdrawBtn}>Withdraw</Link>
          <Link href="/dashboard/deposit" className={styles.depositBtn}>+ Deposit</Link>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="18" y2="12"></line><line x1="6" y1="16" x2="6" y2="16"></line><line x1="10" y1="16" x2="18" y2="16"></line></svg>
          </div>
          <div className={styles.statHeader}>Total Portfolio</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>$98,121</span>
            <span className={styles.statBadgeSuccess}>+24.8%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <div className={styles.statHeader}>Invested Assets</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>$27,191</span>
            <span className={styles.statBadgeDanger}>-0.5%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className={styles.statHeader}>Trading Balance</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>$5,416</span>
            <span className={styles.statBadgeDanger}>-1.1%</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper}>
            <svg width="24" height="24" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
          </div>
          <div className={styles.statHeader}>Net Profit / Loss</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>$8,540</span>
            <span className={styles.statBadgeSuccess}>+12.8%</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.analyticsCard}>
          <div className={styles.cardHeader}>
            <h3>Live Market Chart</h3>
          </div>
          <div className={styles.liveChartArea}>
            <TradingViewChart hideHeader={true} theme="light" backgroundColor="#ffffff" />
          </div>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.cardHeader}>
            <h3>Account History</h3>
          </div>
          <div className={styles.donutMockup}>
            <div className={styles.donutCenter}>
              <span className={styles.donutLabel}>Total Value</span>
              <span className={styles.donutValue}>$130k</span>
            </div>
          </div>
          <div className={styles.assetList}>
            <div className={styles.assetItem}>
              <div className={styles.assetBrand}>
                <svg width="20" height="20" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <span className={styles.assetName}>Profit</span>
              <span className={styles.successText}>+12.8%</span>
            </div>
            <div className={styles.assetItem}>
              <div className={styles.assetBrand}>
                <svg width="20" height="20" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <span className={styles.assetName}>Deposit</span>
              <span className={styles.assetPrice}>$27,191</span>
            </div>
            <div className={styles.assetItem}>
              <div className={styles.assetBrand}>
                <svg width="20" height="20" fill="none" stroke="#6366f1" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="6" y1="8" x2="6" y2="8"></line><line x1="10" y1="8" x2="18" y2="8"></line><line x1="6" y1="12" x2="6" y2="12"></line><line x1="10" y1="12" x2="18" y2="12"></line></svg>
              </div>
              <span className={styles.assetName}>Active Investment</span>
              <span className={styles.assetPrice}>$98,121</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.marketCard}>
          <div className={styles.cardHeader}>
            <h3>Active Plans</h3>
          </div>
          <div className={styles.emptyPlanState}>
            <div className={styles.emptyPlanIcon}>
              <svg width="40" height="40" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <p className={styles.emptyPlanText}>You do not have an active investment plan at the moment.</p>
            <Link href="/pricing" className={styles.buyPlanBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Buy a plan
            </Link>
          </div>
        </div>

        <div className={styles.referralCard}>
          <div className={styles.referralHeader}>
            <div className={styles.referralIcon}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <h3>Refer Us &amp; Earn</h3>
              <p>Invite friends and earn 3.00% commission on their investments.</p>
            </div>
          </div>
          <div className={styles.referralInputGroup}>
            <label>Your Referral Link</label>
            <div className={styles.copyBox}>
              <input type="text" readOnly value="https://equinoxglobalassets.com/ref/Jeffscholite" />
              <button className={styles.copyBtn}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>
          <div className={styles.commissionBanner}>
            <div>
              <span className={styles.comLabel}>Referral Commission</span>
              <span className={styles.comValue}>3.00%</span>
            </div>
            <div className={styles.comIcon}>$</div>
          </div>
        </div>
      </div>
    </div>
  );
}
