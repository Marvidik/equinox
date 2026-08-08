import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ClientRecognition.module.css';

const tiers = [
  {
    tier: 'Platinum Tier',
    title: 'Luxury Vehicle Package',
    subtitle: 'Premium Transportation',
    image: '/images/gifts1.jpg',
    tierColor: '#e2e8f0',
    tierText: '#475569',
    accent: 'platinum',
  },
  {
    tier: 'Diamond Tier',
    title: 'Supercar Experience',
    subtitle: 'Elite Performance',
    image: '/images/gifts4.jpg',
    tierColor: '#bfdbfe',
    tierText: '#1e40af',
    accent: 'diamond',
  },
  {
    tier: 'Gold Tier',
    title: 'Precious Metal Portfolio',
    subtitle: 'Alternative Assets',
    image: '/images/gifts3.jpg',
    tierColor: '#fef08a',
    tierText: '#92400e',
    accent: 'gold',
  },
  {
    tier: 'Executive Tier',
    title: 'Luxury Timepiece Collection',
    subtitle: 'Premium Accessories',
    image: '/images/gifts2.jpg',
    tierColor: '#f5d0fe',
    tierText: '#6b21a8',
    accent: 'executive',
  },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Performance Based',
    desc: 'Rewards are tied to investment performance and portfolio milestones.',
    color: '#3bd1d3',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Exclusive Access',
    desc: 'Premium tier investors gain access to exclusive opportunities.',
    color: '#902cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    label: 'Recognition Program',
    desc: 'Celebrating our most committed and successful investors.',
    color: '#f59e0b',
  },
];

export default function ClientRecognition() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.headerBand}>
        <div className={styles.headerContent}>
          <div className={styles.crownIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#3bd1d3">
              <path d="M2 20h20v2H2zM3.19 9.14L5 16h14l1.81-6.86A1 1 0 0019 8a1 1 0 00-1 1 .97.97 0 00.18.58L16 11.17 13.06 5.4A1 1 0 0012 5a1 1 0 00-1.06.4L8 11.17 5.82 9.58A.97.97 0 006 9a1 1 0 00-1-1 1 1 0 00-.81 1.14z" />
            </svg>
          </div>
          <h2 className={styles.headerTitle}>Exclusive Client Recognition</h2>
          <p className={styles.headerSub}>
            Premium investors who achieve significant milestones are eligible for our exclusive rewards
            program, recognising their commitment to long-term financial growth.
          </p>
        </div>
      </div>

      {/* Tier Cards */}
      <div className={styles.cardsSection}>
        <div className={styles.cardsGrid}>
          {tiers.map((t, i) => (
            <div key={i} className={`${styles.card} ${styles[t.accent]}`}>
              <div className={styles.cardImageWrap}>
                <Image
                  src={t.image}
                  alt={t.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.cardImgOverlay} />
                <span className={styles.tierBadge} style={{ background: t.tierColor, color: t.tierText }}>
                  {t.tier}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardSub}>{t.subtitle}</p>
                <div className={styles.rewardRow}>
                  <span className={styles.rewardLabel}>TIER REWARD</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className={styles.featuresRow}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureItem}>
            <div className={styles.featureIconWrap} style={{ color: f.color, background: `${f.color}18` }}>
              {f.icon}
            </div>
            <h4 className={styles.featureLabel}>{f.label}</h4>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      CTA Banner
      <div className={styles.ctaBanner}>
        <div className={styles.ctaBannerGlow} />
        <h3 className={styles.ctaTitle}>Ready to Qualify for Exclusive Rewards?</h3>
        <p className={styles.ctaSub}>
          Join our elite investor community and unlock access to premium rewards and recognition benefits.
        </p>
        <Link href="/register" className={styles.ctaBtn}>
          Start Your Investment Journey
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
