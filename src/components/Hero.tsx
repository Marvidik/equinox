"use client";

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import ChartMockup from './ChartMockup';

const heroContent = [
  {
    title: "Professional Wealth",
    highlight: "Creation",
    description: "Build wealth through our expertly curated investment opportunities spanning cryptocurrency, forex, real estate, and precious metals with proven institutional-grade strategies."
  },
  {
    title: "Trade Stocks & Futures",
    highlight: "with Precision",
    description: "Access professional-grade stock and futures trading with real-time execution, deep liquidity, and advanced order types. Join thousands of traders achieving consistent returns.."
  },
  {
    title: "Institutional-Grade",
    highlight: "Investment ",
    description: "Multi-Asset Investment Platform. We leverage advanced algorithms and human expertise to optimize your portfolio performance and deliver consistent returns."
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
        setFade(true); // Fade back in
      }, 500); // Wait for fade out to complete

    }, 5000); // Change text every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>✦</span> Investment Platform
        </div>

        <div className={`${styles.textTransition} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          <h1 className={styles.title}>
            {heroContent[currentIndex].title}<br />
            <span className={styles.highlight}>{heroContent[currentIndex].highlight}</span>
          </h1>

          <p className={styles.description}>
            {heroContent[currentIndex].description}
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <button className={styles.primaryButton}>
            Get Started <span className={styles.arrow}>→</span>
          </button>
          <button className={styles.secondaryButton}>
            Live Dashboard
          </button>
        </div>
      </div>

      <div className={styles.mockupWrapper}>
        <ChartMockup />
      </div>
    </div>
  );
}
