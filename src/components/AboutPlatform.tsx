import Image from 'next/image';
import Link from 'next/link';
import styles from './AboutPlatform.module.css';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Diversified Strategies',
    text: 'Expert-managed portfolios across crypto, forex, and real estate with optimized risk-adjusted returns.',
    color: '#1A9E8C',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Transparent Operations',
    text: 'Real-time portfolio tracking and comprehensive reporting you can access 24/7 from any device.',
    color: '#F47C1F',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Risk Management',
    text: 'Advanced hedging strategies and position sizing algorithms to protect and grow your capital.',
    color: '#1A9E8C',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: '24/7 Support',
    text: 'Dedicated financial advisors and support team available around the clock, globally.',
    color: '#1A9E8C',
  },
];

const stats = [
  { value: '98.7%', label: 'Success Rate' },
  { value: '$2.8B+', label: 'Assets Managed' },
  { value: '15K+', label: 'Active Investors' },
  { value: '50+', label: 'Global Markets' },
];

export default function AboutPlatform() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Top badge */}
        <div className={styles.topBadge}>
          <span className={styles.badgeDash}></span>
          About Our Platform
          <span className={styles.badgeDash}></span>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>

          {/* Cell 1 — Large headline + description */}
          <div className={`${styles.cell} ${styles.cellHero}`}>
            <h2 className={styles.heroTitle}>
              Professional<br />
              Investment<br />
              <span className={styles.accent}>Management</span>
            </h2>
            <p className={styles.heroDesc}>
              Our sophisticated platform combines institutional-grade technology with expert market analysis to deliver consistent returns across multiple asset classes.
            </p>
            <Link href="/register" className={styles.ctaBtn}>
              Start Investing Today
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Cell 2 — Main image */}
          <div className={`${styles.cell} ${styles.cellImage1}`}>
            <Image src="/images/chart2.jpg" alt="Real-Time Market Data" fill style={{ objectFit: 'cover' }} />
            <div className={styles.imgLabel}>
              <span className={styles.imgLabelDot}></span>
              Real-Time Market Data
            </div>
          </div>

          {/* Cell 3 — Stats row */}
          <div className={`${styles.cell} ${styles.cellStats}`}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Cell 4 — Features grid */}
          <div className={`${styles.cell} ${styles.cellFeatures}`}>
            {features.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon} style={{ color: f.color, background: `${f.color}15` }}>
                  {f.icon}
                </div>
                <div>
                  <h4 className={styles.featureTitle}>{f.title}</h4>
                  <p className={styles.featureText}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cell 5 — Second image */}
          <div className={`${styles.cell} ${styles.cellImage2}`}>
            <Image src="/images/new1.jpg" alt="Platform Overview" fill style={{ objectFit: 'cover' }} />
            <div className={styles.imgLabel}>
              <span className={styles.imgLabelDot}></span>
              Platform Overview
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
