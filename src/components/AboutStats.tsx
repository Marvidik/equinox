import React from 'react';
import Image from 'next/image';
import styles from './AboutStats.module.css';

export default function AboutStats() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left side: Image and Stats */}
        <div className={styles.visuals}>
          <div className={styles.mainImageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/chart1.jpg"
                alt="Equinox Global Assets team analyzing financial markets"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 900px) 100vw, 500px"
              />
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
          <h2 className={styles.title}>
            Meet <span className={styles.highlight}>Equinox Global</span> — Your Gateway to Smart Investing
          </h2>
          <p className={styles.description}>
            Welcome to Equinox Global Assets — where strategic investment meets cutting-edge market intelligence. With over a decade of experience navigating global financial markets, our team of seasoned professionals is dedicated to maximizing your returns while safeguarding your capital. We combine data-driven analysis with diversified portfolio management to deliver consistent growth for investors at every level.
          </p>
          <button className={styles.exploreBtn}>Explore More</button>
        </div>

      </div>
    </section>
  );
}
