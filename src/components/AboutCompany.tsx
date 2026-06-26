import React from 'react';
import Image from 'next/image';
import styles from './AboutCompany.module.css';

const AboutCompany = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>About Company</div>
          <p className={styles.description}>
            Our sophisticated investment platform combines institutional-grade technology with expert market analysis to deliver consistent returns across multiple asset classes. We leverage advanced algorithms and human expertise to optimize your portfolio performance.
          </p>
        </div>

        <h2 className={styles.title}>
          Pioneering Strategies for<br />
          Your Financial Success
        </h2>

        <div className={styles.content}>
          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h3>Diversified Strategies</h3>
                <p>Expert-managed portfolios across crypto, forex, real estate, and commodities</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h3>Transparent Operations</h3>
                <p>Real-time portfolio tracking and comprehensive reporting</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h3>Risk Management</h3>
                <p>Advanced hedging strategies and position sizing algorithms</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.featureText}>
                <h3>24/7 Support</h3>
                <p>Expert-managed portfolios across crypto, forex, real estate, and commodities</p>
              </div>
            </div>
          </div>

          <div className={styles.images}>
            <div className={styles.mainImagePlaceholder}>
              <Image src="/images/chart1.jpg" alt="Main Team Image" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.sideContent}>
              <div className={styles.videoImagePlaceholder}>
                <Image src="/images/chart2.jpg" alt="Video Thumbnail Image" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                <div className={styles.playButton} style={{ zIndex: 10 }}>▶</div>
              </div>
              <div className={styles.reviews}>
                <div className={styles.avatars}>
                  <div className={styles.avatar}>
                    <Image src="/images/profile1.jpg" alt="Reviewer 1" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.avatar}>
                    <Image src="/images/profile2.jpg" alt="Reviewer 2" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.avatar}>
                    <Image src="/images/profile3.jpg" alt="Reviewer 3" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <div className={styles.rating}>
                  <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                  <span>(1.5k+ Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;
