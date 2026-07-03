'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Basic protection (replace with actual auth checking logic if token is stored differently)
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/equinoxadmin/login');
    }
  }, [router]);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/equinoxadmin/login');
  };

  return (
    <div className={styles.adminLayout}>
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
            <span className={styles.logoText}>EqAdmin</span>
          </div>
          <button className={styles.closeSidebarBtn} onClick={() => setMobileMenuOpen(false)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className={styles.menuSection}>
          <p className={styles.menuTitle}>Management</p>
          <nav className={styles.navLinks}>
            <Link href="/equinoxadmin" className={`${styles.navLink} ${isActive('/equinoxadmin') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              Overview
            </Link>
            <Link href="/equinoxadmin/users" className={`${styles.navLink} ${isActive('/equinoxadmin/users') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Users
            </Link>
            <Link href="/equinoxadmin/plans" className={`${styles.navLink} ${isActive('/equinoxadmin/plans') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              Investment Plans
            </Link>
            <Link href="/equinoxadmin/active-investments" className={`${styles.navLink} ${isActive('/equinoxadmin/active-investments') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              Active Investments
            </Link>
            <Link href="/equinoxadmin/profits" className={`${styles.navLink} ${isActive('/equinoxadmin/profits') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Profits
            </Link>
            <Link href="/equinoxadmin/withdrawals" className={`${styles.navLink} ${isActive('/equinoxadmin/withdrawals') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              Withdrawals
            </Link>
            <Link href="/equinoxadmin/deposits" className={`${styles.navLink} ${isActive('/equinoxadmin/deposits') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Deposits
            </Link>
            <Link href="/equinoxadmin/payment-methods" className={`${styles.navLink} ${isActive('/equinoxadmin/payment-methods') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
              Payment Methods
            </Link>
            <Link href="/equinoxadmin/kyc" className={`${styles.navLink} ${isActive('/equinoxadmin/kyc') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              KYC Verifications
            </Link>
            <Link href="/equinoxadmin/referrals" className={`${styles.navLink} ${isActive('/equinoxadmin/referrals') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              Referrals
            </Link>
            <Link href="/equinoxadmin/bonuses" className={`${styles.navLink} ${isActive('/equinoxadmin/bonuses') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
              Bonuses
            </Link>
            <Link href="/equinoxadmin/penalties" className={`${styles.navLink} ${isActive('/equinoxadmin/penalties') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              Penalties
            </Link>
            <Link href="/equinoxadmin/settings" className={`${styles.navLink} ${isActive('/equinoxadmin/settings') ? styles.active : ''}`}>
              <svg className={styles.navIcon} width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className={styles.navLink}
              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#fca5a5' }}
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
            <div className={styles.adminBadge}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>Admin Mode</span>
            </div>
            <div className={styles.profile}>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>Administrator</span>
                <span className={styles.profileEmail}>admin@equinox.com</span>
              </div>
              <div className={styles.avatar}>
                A
              </div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
