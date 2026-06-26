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
  { href: '/about', label: 'About' },
  { href: '/plans', label: 'Plans' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) {
      const code = match[1] === 'zh-CN' ? 'zh' : match[1];
      const lang = LANGUAGES.find(l => l.code === code);
      if (lang) setCurrentLang(lang);
    }
  }, []);

  // Close mobile menu on route change
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
      <div className={styles.navbarWrapper}>
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
          
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.logoText}>Equinox</span>
          </Link>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className={styles.actions}>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
            
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
                    <button key={lang.code} className={`${styles.langOption} ${currentLang.code === lang.code ? styles.selected : ''}`} onClick={() => handleLangChange(lang)}>
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
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span>Equinox</span>
          </Link>
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <nav className={styles.drawerNav}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className={`${styles.drawerLink} ${pathname === link.href ? styles.drawerLinkActive : ''}`} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}

          {/* Language Section */}
          <div className={styles.drawerLangSection}>
            <p className={styles.drawerLangLabel}>Language</p>
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
          </div>
        </nav>

        <div className={styles.drawerActions}>
          <Link href="/login" className={styles.drawerLoginBtn} onClick={() => setMobileOpen(false)}>Login</Link>
          <Link href="/register" className={styles.drawerRegisterBtn} onClick={() => setMobileOpen(false)}>Get Started</Link>
        </div>
      </div>
    </>
  );
}
