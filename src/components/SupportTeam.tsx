import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './SupportTeam.module.css';

export default function SupportTeam() {
  return (
    <section className={styles.supportSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
              </svg>
              24/7 Dedicated Support
            </div>
            
            <h2 className={styles.title}>Experts Ready to Help</h2>
            
            <p className={styles.subtitle}>
              Whether you're seeking help with your account, planning your next investment, or simply have a question, our team is ready to assist you with fast, personalized solutions.
            </p>
            
            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>Global Multi-lingual Team</div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>Average 5-minute Response Time</div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <div className={styles.featureText}>VIP Account Managers for Premium Clients</div>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <Link href="/contact" className={styles.exploreBtn}>Contact Support</Link>
              <Link href="/faq" className={styles.faqLink}>Read FAQs &rarr;</Link>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageCard}>
              <Image 
                src="/images/chart3.jpg" 
                alt="Expert Support Team" 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              <div className={styles.floatingCard}>
                <div className={styles.floatingIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                </div>
                <div className={styles.floatingText}>
                  <h4>Need Immediate Help?</h4>
                  <p>+1(888) 456-09-86</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
