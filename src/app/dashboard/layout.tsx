'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';
import { authService } from '@/services/authService';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = authService.getSession();
    if (session.token) {
      setUser(session.user);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.dashboardLayout}>
      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#2CD4D1"/>
                <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#ffffff"/>
              </svg>
            </div>
            <span className={styles.logoText}>Equinox</span>
          </div>
          <button className={styles.closeSidebarBtn} onClick={() => setMobileMenuOpen(false)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className={styles.menuSection}>
          <p className={styles.menuTitle}>Menu</p>
          <nav className={styles.navLinks}>
            <Link href="/dashboard" className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              Overview
            </Link>
            <Link href="/dashboard/plans" className={`${styles.navLink} ${isActive('/dashboard/plans') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              My Plans
            </Link>
            <Link href="/dashboard/buy-plan" className={`${styles.navLink} ${isActive('/dashboard/buy-plan') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              Buy Plan
            </Link>
            <Link href="/dashboard/deposit" className={`${styles.navLink} ${isActive('/dashboard/deposit') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Deposit
            </Link>
            <Link href="/dashboard/withdraw" className={`${styles.navLink} ${isActive('/dashboard/withdraw') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Withdraw
            </Link>
            <Link href="/dashboard/transfer" className={`${styles.navLink} ${isActive('/dashboard/transfer') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
              Transfer
            </Link>
          </nav>
        </div>

        <div className={styles.menuSection}>
          <p className={styles.menuTitle}>History</p>
          <nav className={styles.navLinks}>
            <Link href="/dashboard/transactions" className={`${styles.navLink} ${isActive('/dashboard/transactions') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              Transactions
            </Link>
            <Link href="/dashboard/profits" className={`${styles.navLink} ${isActive('/dashboard/profits') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Profit History
            </Link>
          </nav>
        </div>

        <div className={styles.menuSection}>
          <p className={styles.menuTitle}>Manage</p>
          <nav className={styles.navLinks}>
            <Link href="/dashboard/referral" className={`${styles.navLink} ${isActive('/dashboard/referral') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Referral
            </Link>
            <Link href="/dashboard/settings" className={`${styles.navLink} ${isActive('/dashboard/settings') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </Link>
            <button
              onClick={() => authService.logout()}
              className={styles.navLink}
              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#f87171' }}
            >
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* OVERLAY for mobile */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <main className={styles.mainArea}>
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.mobileHamburger} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg width="26" height="26" fill="none" stroke="#111827" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
          <div className={styles.headerRight}>
            <Link href="/dashboard/kyc" className={styles.kycHeaderBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              <span>KYC</span>
            </Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
