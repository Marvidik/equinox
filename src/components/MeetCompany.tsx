import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MeetCompany.module.css';

export default function MeetCompany() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Left side: Image with Stats */}
        <div className={styles.visuals}>
          <div className={styles.mainImageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/chart3.jpg"
                alt="Equinox Global Assets team analyzing markets"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 480px"
              />
              <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.statCardTop}>
              <span className={styles.statNumber}>10 Years</span>
              <span className={styles.statText}>Trading Experience</span>
            </div>

            <div className={styles.statCardBottom}>
              <span className={styles.statNumber}>25K+</span>
              <span className={styles.statText}>Satisfied Investors</span>
            </div>
          </div>
        </div>

        {/* Right side: Content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#902cf6" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </span>
            About Us
          </div>
          <h2 className={styles.title}>
            Your Trusted Partner in <span className={styles.highlight}>Global Investments</span>
          </h2>
          <p className={styles.description}>
            At Equinox Global Assets, we combine institutional-grade market intelligence with
            personalised wealth management to help you achieve your financial goals. Our seasoned
            team of analysts and portfolio managers leverages advanced AI-driven strategies and
            real-time market data to deliver consistent, above-market returns. Whether you are a
            first-time investor or a seasoned trader, we provide tailored plans with principal
            protection and transparent reporting.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statVal}>$2.5B+</span>
              <span className={styles.statLabel}>Assets Managed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>98%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>150+</span>
              <span className={styles.statLabel}>Countries Served</span>
            </div>
          </div>

          <Link href="/plans" className={styles.ctaBtn}>Discover Our Plans</Link>
        </div>
      </div>
    </section>
  );
}
