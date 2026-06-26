import React from 'react';
import Image from 'next/image';
import styles from './SupportTeam.module.css';

export default function SupportTeam() {
  return (
    <section className={styles.supportSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Financial Journey Deserves Expert Support</h2>
          <p className={styles.subtitle}>
            Whether you're seeking help with your account, planning your next investment, or simply have a question, our team is ready to assist you with fast, personalized solutions.
          </p>
          <button className={styles.exploreBtn}>Explore Our Support</button>
        </div>

        <div className={styles.cardsContainer}>
          {/* Card 1: Team Meeting */}
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/chart3.jpg" 
                alt="Team Meeting" 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Card 2: History Transactions */}
          <div className={styles.historyCard}>
            <div className={styles.historyHeader}>
              <h3>History Transactions</h3>
              <span className={styles.viewAll}>View all</span>
            </div>
            
            <div className={styles.transactionList}>
              <div className={styles.transaction}>
                <div className={styles.iconWrapperGreen}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L12 4M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Order Revenue</div>
                  <div className={styles.txDate}>Apr 27, 22</div>
                </div>
                <div className={styles.txAmountPos}>+ $874</div>
              </div>

              <div className={styles.transaction}>
                <div className={styles.iconWrapperDark}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Withdrawal Initiated</div>
                  <div className={styles.txDate}>Apr 25, 22</div>
                </div>
                <div className={styles.txAmountNeg}>- $2490</div>
              </div>

              <div className={styles.transaction}>
                <div className={styles.iconWrapperGreen}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20L12 4M12 20L6 14M12 20L18 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.txDetails}>
                  <div className={styles.txTitle}>Order Revenue</div>
                  <div className={styles.txDate}>Mar 1, 22</div>
                </div>
                <div className={styles.txAmountPos}>+ $126</div>
              </div>
            </div>
          </div>

          {/* Card 3: Working Hands */}
          <div className={styles.imageCard}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/chart1.jpg" 
                alt="Expert Support" 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
