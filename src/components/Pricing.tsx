import React from 'react';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'BASIC PLAN',
    percentage: '8',
    duration: 'AFTER 24 HOURS',
    min: '$50',
    max: '$499',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: false,
    theme: 'dark'
  },
  {
    name: 'STANDARD PLAN',
    percentage: '15',
    duration: 'AFTER 24 HOURS',
    min: '$500',
    max: '$999',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: true,
    theme: 'accent'
  },
  {
    name: 'MASTER PLAN',
    percentage: '30',
    duration: 'AFTER 48 HOURS',
    min: '$1,000',
    max: '$1,999',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: true,
    theme: 'accent'
  },
  {
    name: 'PREMIUM PLAN',
    percentage: '45',
    duration: 'AFTER 72 HOURS',
    min: '$2,000',
    max: '$9,999',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: false,
    theme: 'purple'
  },
  {
    name: 'ULTIMATE PLAN',
    percentage: '60',
    duration: 'AFTER 96 HOURS',
    min: '$10,000',
    max: '$14,999',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: false,
    theme: 'dark'
  },
  {
    name: 'COOPERATE PLAN',
    percentage: '70',
    duration: 'AFTER 5 DAYS',
    min: '$15,000',
    max: 'UNLIMITED',
    referral: '3% • 1% • 0.8% • 0.5% • 0.3%',
    principal: 'Principal Protected & Included',
    popular: false,
    theme: 'purple'
  }
];

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-cyan)" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
              </svg>
            </span>
            Investment Plans
          </div>
          <h2 className={styles.title}>
            Choose Your <span className={styles.highlight}>Investment Plan</span>
          </h2>
          <p className={styles.subtitle}>
            Select the plan that best fits your financial goals and start earning today.
          </p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <div key={index} className={`${styles.card} ${plan.theme === 'accent' ? styles.cardAccent : plan.theme === 'purple' ? styles.cardPurple : styles.cardDark}`}>
              {plan.popular && (
                <div className={styles.popularBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  RECOMMENDED CHOICE
                </div>
              )}
              
              <div className={styles.cardHeaderArea}>
                <div className={styles.cardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
                </div>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{plan.percentage}</span>
                  <span className={styles.currency}>%</span>
                </div>
                <div className={styles.duration}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {plan.duration}
                </div>
              </div>

              <div className={styles.cardBodyArea}>
                
                <div className={styles.referenceBlock}>
                  <div className={styles.refIconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="9" height="9" fill="#f25022"/>
                      <rect x="13" y="2" width="9" height="9" fill="#7fba00"/>
                      <rect x="2" y="13" width="9" height="9" fill="#00a4ef"/>
                      <rect x="13" y="13" width="9" height="9" fill="#ffb900"/>
                    </svg>
                  </div>
                  <div className={styles.refInfo}>
                    <span className={styles.refTitle}>MSFT Reference</span>
                    <span className={styles.refSub}>Live Market Price</span>
                  </div>
                  <div className={styles.refValues}>
                    <span className={styles.refPrice}>$365.46</span>
                    <span className={styles.refDrop}>-2.27%</span>
                  </div>
                </div>

                <div className={styles.rangeBlock}>
                  <p className={styles.blockTitle}>Investment Range</p>
                  <div className={styles.rangeRow}>
                    <div className={styles.rangeCol}>
                      <span className={styles.rangeLabel}>Minimum</span>
                      <span className={styles.rangeValue}>{plan.min}</span>
                    </div>
                    <div className={styles.rangeCol}>
                      <span className={styles.rangeLabel}>Maximum</span>
                      <span className={styles.rangeValue}>{plan.max}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.referralBlock}>
                  <p className={styles.blockTitle}>Referral Commission Structure</p>
                  <p className={styles.referralValue}>{plan.referral}</p>
                </div>

                <div className={styles.principalBlock}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  {plan.principal}
                </div>

                <button className={plan.theme === 'accent' ? styles.btnAccent : plan.theme === 'purple' ? styles.btnPurple : styles.btnOutline}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  INVEST NOW
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
