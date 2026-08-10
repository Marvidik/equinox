import Link from 'next/link';
import styles from './WhyChooseUs.module.css';

const features = [
  {
    title: 'Certified Excellence',
    desc: 'Fully licensed and regulated investment platform with internationally recognised industry certifications and compliance standards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    title: 'Bank-Grade Security',
    desc: '256-bit SSL encryption and multi-layer security protocols protect your assets and transactions at every step.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'Instant Withdrawals',
    desc: 'Process withdrawals 24/7 with near-instant fund transfers directly to your account — no delays, no waiting.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: '24/7 Expert Support',
    desc: 'Our dedicated team of investment professionals is available around the clock to assist with any queries or technical needs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    tag: 'Always Online',
  },
  {
    title: 'Diversified Portfolios',
    desc: 'Access crypto, forex, real estate and commodities — all managed by our expert algorithm-driven strategy engine.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A9E8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    tag: 'Multi-Asset',
  },
];

const stats = [
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7',  label: 'Market Access' },
  { value: '256-bit', label: 'SSL Encryption' },
  { value: '<2min', label: 'Withdrawal Time' },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Why Choose Us
          </div>
          <h2 className={styles.title}>
            Trusted by <span className={styles.titleAccent}>Thousands</span> of Investors
          </h2>
          <p className={styles.subtitle}>
            Experience the difference with our premium investment platform — built for modern investors who demand performance, security, and transparency.
          </p>
        </div>

        {/* Feature Bento Cards */}
        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              {f.tag && <span className={styles.tag}>✦ {f.tag}</span>}
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className={styles.statsStrip}>
          {stats.map((s) => (
            <div key={s.value} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
