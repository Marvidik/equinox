'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home', sub: 'Welcome To Equinox' },
  { href: '/about', label: 'About Us', sub: 'Know More About Us' },
  { href: '/plans', label: 'Plans', sub: 'Investment Plans' },
  { href: '/contact', label: 'Contact', sub: 'Get Touch With Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) {
      const code = match[1] === 'zh-CN' ? 'zh' : match[1];
      const lang = LANGUAGES.find(l => l.code === code);
      if (lang) setCurrentLang(lang);
    }
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLangChange = (lang: typeof LANGUAGES[0]) => {
    setCurrentLang(lang);
    setLangOpen(false);
    const code = lang.code === 'zh' ? 'zh-CN' : lang.code;
    document.cookie = `googtrans=/en/${code}; path=/`;
    window.location.reload();
  };

  return (
    <>
      {/* Top info bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarInner}>
          <div className={styles.topBarBrand}>
            <div className={styles.logoIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#c9a227" stroke="#c9a227" strokeWidth="1" strokeLinejoin="round"/>
                <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#1a2d5a" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <span className={styles.brandName}>Equinox</span>
              <span className={styles.brandSub}>Global Assets</span>
            </div>
          </div>
          <div className={styles.topBarContacts}>
            <div className={styles.topContact}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <span className={styles.topContactLabel}>Location</span>
                <span className={styles.topContactValue}>Binghamton, New York</span>
              </div>
            </div>
            <div className={styles.topContact}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <span className={styles.topContactLabel}>Working Hours</span>
                <span className={styles.topContactValue}>09:00 to 18:00, Mon–Sat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className={styles.navbarWrapper}>
        <nav className={styles.navbar}>
          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                <span className={styles.navLinkMain}>{link.label}</span>
                <span className={styles.navLinkSub}>{link.sub}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
            <Link href={isLoggedIn ? '/dashboard' : '/login'} className={styles.registerBtn}>
              {isLoggedIn ? 'Dashboard' : 'Get Started'}
            </Link>

            <div className={styles.langContainer} ref={dropdownRef}>
              <button className={styles.langBtn} onClick={() => setLangOpen(!langOpen)}>
                <span className={styles.flag}>{currentLang.flag}</span>
                <span className={styles.langName}>{currentLang.name}</span>
                <svg className={`${styles.chevron} ${langOpen ? styles.open : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              {langOpen && (
                <div className={styles.langDropdown}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`${styles.langOption} ${currentLang.code === lang.code ? styles.selected : ''}`}
                      onClick={() => handleLangChange(lang)}
                    >
                      <span className={styles.flag}>{lang.flag}</span>
                      <span>{lang.name}</span>
                      {currentLang.code === lang.code && (
                        <svg className={styles.checkIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span className={`${styles.bar} ${mobileOpen ? styles.barTop : ''}`}></span>
            <span className={`${styles.bar} ${mobileOpen ? styles.barMid : ''}`}></span>
            <span className={`${styles.bar} ${mobileOpen ? styles.barBot : ''}`}></span>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <Link href="/" className={styles.drawerLogo} onClick={() => setMobileOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#c9a227"/>
              <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#1a2d5a"/>
            </svg>
            <span>Equinox Global Assets</span>
          </Link>
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <nav className={styles.drawerNav}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${pathname === link.href ? styles.drawerLinkActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/login" className={styles.drawerLoginBtn} onClick={() => setMobileOpen(false)}>Login</Link>
          <Link href="/register" className={styles.drawerRegisterBtn} onClick={() => setMobileOpen(false)}>Get Started</Link>

          {/* Language Section */}
          <div className={styles.drawerLangSection}>
            <button className={styles.drawerLangToggle} onClick={() => setLangOpen(!langOpen)}>
              <div className={styles.drawerLangToggleLeft}>
                <span className={styles.drawerLangLabel}>Language:</span>
                <div className={styles.drawerLangValue}>
                  <span className={styles.flag}>{currentLang.flag}</span>
                  <span className={styles.langName}>{currentLang.name}</span>
                </div>
              </div>
              <svg className={`${styles.chevron} ${langOpen ? styles.open : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {langOpen && (
              <div className={styles.drawerLangGrid}>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    className={`${styles.drawerLangItem} ${currentLang.code === lang.code ? styles.drawerLangActive : ''}`}
                    onClick={() => { handleLangChange(lang); setMobileOpen(false); }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
