"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const heroContent = [
  {
    title: "Empowering Smart Investors",
    description: "Leverage cutting-edge technology and decades of expertise to build a diversified portfolio aligned with your goals.",
    image: "/images/heroimg2.jpg"
  },
  {
    title: "Institutional Grade Investment Strategies",
    description: "Access premium global markets with precision-driven trading algorithms and expert guidance.",
    image: "/images/heroimg1.jpg"
  },
  {
    title: "Build Your Wealth With Confidence",
    description: "We leverage advanced algorithms and human expertise to optimize your portfolio performance.",
    image: "/images/chart4.jpg"
  }
];

const stats = [
  { value: "<2min", label: "Withdrawal Time" },
  { value: "25K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Customer Support" },
];

const features = [
  {
    label: "Analytics\nDashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Compliance\nReady",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Dedicated\nSupport",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroContent.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setFade(false);
    setTimeout(() => { setCurrentIndex(index); setFade(true); }, 500);
  };

  const nextSlide = () => { setFade(false); setTimeout(() => { setCurrentIndex((p) => (p + 1) % heroContent.length); setFade(true); }, 500); };
  const prevSlide = () => { setFade(false); setTimeout(() => { setCurrentIndex((p) => (p - 1 + heroContent.length) % heroContent.length); setFade(true); }, 500); };

  return (
    <div className={styles.heroSection}>
      {heroContent.map((slide, i) => (
        <div
          key={i}
          className={`${styles.bgImage} ${i === currentIndex ? styles.activeBg : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className={styles.overlay} />

      <button className={styles.navButton} onClick={prevSlide} style={{ left: '20px' }}>‹</button>

      <div className={styles.content}>
        {/* ── Left column ── */}
        <div className={styles.leftCol}>
          <div className={styles.badge}>Equinox Global Assets</div>

          <div className={`${styles.textTransition} ${fade ? styles.fadeIn : styles.fadeOut}`}>
            <h1 className={styles.title}>{heroContent[currentIndex].title}</h1>
            <p className={styles.description}>{heroContent[currentIndex].description}</p>
          </div>

          <div className={styles.ctaGroup}>
            <Link href={isLoggedIn ? '/dashboard' : '/register'} className={styles.primaryButton}>
              Start Investing
            </Link>
            <Link href="/about" className={styles.secondaryButton}>
              Our Track Record
            </Link>
          </div>
        </div>

        {/* ── Right column — Stats ── */}
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.value} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Feature badges (full-width bottom row) ── */}
        <div className={styles.featureRow}>
          {features.map((f) => (
            <div key={f.label} className={styles.featureBadge}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <span className={styles.featureText} style={{ whiteSpace: 'pre-line' }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.navButton} onClick={nextSlide} style={{ right: '20px' }}>›</button>

      <div className={styles.sliderControls}>
        {heroContent.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
