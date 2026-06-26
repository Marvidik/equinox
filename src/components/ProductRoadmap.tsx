import React from 'react';
import styles from './ProductRoadmap.module.css';

const roadmapData = [
  {
    phase: 'P1',
    title: 'Market Analysis',
    description: 'Our team of expert analysts continuously monitors global financial markets, evaluating economic indicators, asset classes, and emerging opportunities to build the foundation for every investment strategy we offer.',
    side: 'right'
  },
  {
    phase: 'P2',
    title: 'Strategy Development',
    description: 'Leveraging advanced algorithms and decades of collective experience, we craft diversified investment strategies that balance growth potential with risk mitigation, tailored to various investor profiles and financial goals.',
    side: 'left'
  },
  {
    phase: 'P3',
    title: 'Risk Assessment',
    description: 'Every portfolio undergoes rigorous stress-testing and scenario analysis. We evaluate potential downside risks, volatility patterns, and market correlations to ensure your capital is protected against adverse conditions.',
    side: 'right'
  },
  {
    phase: 'P4',
    title: 'Portfolio Construction',
    description: 'Our wealth managers assemble optimised portfolios by allocating assets across equities, fixed income, commodities, and alternative investments — ensuring maximum diversification and consistent returns for our clients.',
    side: 'left'
  },
  {
    phase: 'P5',
    title: 'Active Management',
    description: 'Markets never sleep and neither does our team. We actively monitor and rebalance your investments in real-time, capitalizing on short-term opportunities while staying aligned with long-term growth objectives.',
    side: 'right'
  },
  {
    phase: 'P6',
    title: 'Returns & Growth',
    description: 'Watch your wealth grow with transparent reporting and consistent payouts. Our track record of delivering above-market returns, combined with principal protection, has earned the trust of thousands of investors worldwide.',
    side: 'left'
  }
];

export default function ProductRoadmap() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Investment <span className={styles.highlight}>Roadmap</span>
          </h2>
          <p className={styles.subtitle}>
            Our proven six-phase approach to wealth management ensures your capital is strategically deployed for maximum growth and security.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.centerLine}></div>
          
          <div className={styles.cardsContainer}>
            {roadmapData.map((item, index) => (
              <div 
                key={index} 
                className={`${styles.cardWrapper} ${item.side === 'left' ? styles.leftWrapper : styles.rightWrapper}`}
              >
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <span className={styles.cardPhase}>{item.phase}</span>
                  </div>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
