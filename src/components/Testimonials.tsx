import React from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const reviews = [
  {
    id: 1,
    text: "Equinox Global Assets completely transformed my investment approach. The institutional-grade tools are world-class and the returns have been exceptional. My portfolio grew 60% in just 8 months.",
    name: "James Richardson",
    location: "New York, USA",
    role: "Senior Portfolio Manager",
    image: "/images/profile1.jpg",
    invested: "$25,000",
    return: "+60%"
  },
  {
    id: 2,
    text: "I tried many platforms but nothing matches the transparency and reliability of Equinox. Their forex and crypto strategies are proven. The 24/7 support team is always ready to assist.",
    name: "Michael Brown",
    location: "London, UK",
    role: "Forex & Crypto Investor",
    image: "/images/profile2.jpg",
    invested: "$10,000",
    return: "+45%"
  },
  {
    id: 3,
    text: "The real-time market analysis and dedicated account management helped me make confident trading decisions. Withdrawals are instant and the process is completely seamless.",
    name: "Sarah Johnson",
    location: "Toronto, Canada",
    role: "Multi-Asset Trader",
    image: "/images/profile3.jpg",
    invested: "$50,000",
    return: "+78%"
  }
];

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-gold)" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </span>
            Client Success Stories
          </div>
          <h2 className={styles.title}>What Our Investors Say</h2>
          <p className={styles.subtitle}>
            Join thousands of satisfied investors who trust Equinox Global Assets to grow and protect their wealth globally.
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  <Image src={review.image} alt={review.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{review.name}</h4>
                  <span className={styles.role}>{review.role}</span>
                </div>
              </div>
              
              <div className={styles.stars}>★★★★★</div>
              
              <p className={styles.reviewText}>"{review.text}"</p>
              
              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Invested</span>
                  <span className={styles.statValue}>{review.invested}</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Return</span>
                  <span className={`${styles.statValue} ${styles.returnValue}`}>{review.return}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
