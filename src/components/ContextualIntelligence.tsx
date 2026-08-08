'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ContextualIntelligence.module.css';

function getDateLabel(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getMonthLabel(offset: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + offset);
  return d.toLocaleDateString('en-US', { month: 'short' });
}

// Simulate a fluctuating live price
function randomBtcPrice(base: number) {
  return base + Math.floor((Math.random() - 0.5) * 400);
}

export default function ContextualIntelligence() {
  const [btcPrice, setBtcPrice] = useState(68240);
  const [forecast, setForecast] = useState(72180);
  const [confidence, setConfidence] = useState(87);
  const [actualCap, setActualCap] = useState(2.5);
  const [volume, setVolume] = useState([60, 80, 70]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBtc = randomBtcPrice(68240);
      setBtcPrice(newBtc);
      setForecast(Math.round(newBtc * 1.058));
      setConfidence(Math.floor(Math.random() * 8) + 83); // 83–90%
      setActualCap(parseFloat((2.45 + Math.random() * 0.15).toFixed(2)));
      setVolume([
        Math.floor(Math.random() * 30) + 50,
        Math.floor(Math.random() * 30) + 60,
        Math.floor(Math.random() * 30) + 55,
      ]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const pctChange = (((forecast - btcPrice) / btcPrice) * 100).toFixed(1);

  // Dates
  const today = getDateLabel(0);
  const futureDate = getDateLabel(7);
  const months = [getMonthLabel(-2), getMonthLabel(-1), getMonthLabel(0)];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.visualSide}>
          <div className={styles.glowBg}></div>
          
          <div className={styles.cardsContainer}>
            {/* Top Left Card - Crypto Market Cap */}
            <div className={`${styles.card} ${styles.cardTopLeft}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Crypto Market Cap</div>
                <div className={styles.cardLegend}>
                  <span className={styles.legendDot} style={{background: '#e0e0e0'}}></span> Est $2.4T
                  <span className={styles.legendDot} style={{background: '#3bd1d3'}}></span> Actual ${actualCap}T
                </div>
              </div>
              <div className={styles.lineChart}>
                <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                  <path d="M0,40 Q10,45 20,35 T40,50 T60,30 T80,45 T100,20 T120,40 T140,25 T160,35 T180,15 T200,25" fill="none" stroke="#3bd1d3" strokeWidth="2"/>
                </svg>
              </div>
              <div className={styles.chartAxis}>
                <span>{months[0]}<br/>$2.2T</span>
                <span>{months[1]}<br/>$2.4T</span>
                <span>{months[2]}<br/>${actualCap}T</span>
              </div>
            </div>

            {/* Top Right Card - Trading Volume */}
            <div className={`${styles.card} ${styles.cardTopRight}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>Volume vs Liquidity</div>
                <div className={styles.cardLegend}>
                  <span className={styles.legendDot} style={{background: '#3bd1d3'}}></span> Volume
                  <span className={styles.legendDot} style={{background: '#5b5bf0'}}></span> Liquidity
                </div>
              </div>
              <div className={styles.barChart}>
                {volume.map((v, i) => (
                  <div key={i} className={styles.barGroup}>
                    <div className={styles.barWrap}><div className={styles.barCyan} style={{height: `${v}%`}}></div></div>
                    <div className={styles.barWrap}><div className={styles.barPurple} style={{height: `${v * 0.6}%`}}></div></div>
                  </div>
                ))}
              </div>
              <div className={styles.chartAxis}>
                <span>{months[0]}</span>
                <span>{months[1]}</span>
                <span>{months[2]}</span>
              </div>
            </div>

            {/* Bottom Card - BTC Prediction */}
            <div className={`${styles.card} ${styles.cardBottom}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>AI Predictions</div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
              
              <div className={styles.predictionInfo}>
                <div className={styles.sparkleIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#3bd1d3" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
                  </svg>
                </div>
                <span className={styles.predTitle}>BTC Price Prediction</span>
                <span className={styles.predTag}>(7 Days)</span>
              </div>

              <div className={styles.predStatsGrid}>
                <div className={styles.predStat}>
                  <div className={styles.statLabel}>Current</div>
                  <div className={styles.statValue}>${btcPrice.toLocaleString()}</div>
                </div>
                <div className={styles.predStat}>
                  <div className={styles.statLabel}>Forecast</div>
                  <div className={styles.statValue}>${forecast.toLocaleString()} <span className={styles.positive}>(+{pctChange}%)</span></div>
                </div>
                <div className={styles.predStat}>
                  <div className={styles.statLabel}>Confidence</div>
                  <div className={styles.statValue}>{confidence}%</div>
                </div>
              </div>

              <div className={styles.predGraph}>
                <svg viewBox="0 0 400 60" preserveAspectRatio="none">
                  <path d="M0,50 L100,50 L120,48 L140,50 L160,45 L180,48 L200,40 L220,45 L240,30 L260,35 L280,25 L300,30 L320,15 L340,25 L360,10 L380,20 L400,5" fill="none" stroke="#3bd1d3" strokeWidth="2"/>
                </svg>
              </div>
              <div className={styles.predAxis}>
                <span>{today}</span>
                <span>{futureDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentSide}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#3bd1d3" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
              </svg>
            </span> 
            Contextual Intelligence
          </div>
          
          <h2 className={styles.title}>
            Performance, risk, and<br/>
            market context<br/>
            <span className={styles.highlight}>explained together</span>
          </h2>
          
          <p className={styles.description}>
            Most platforms separate data into tabs. Our AI Insights connects crypto portfolio performance, 
            allocation, trading risk exposure, and market signals into one coherent investment strategy.
          </p>
          
          <Link href="/register" className={styles.primaryButton} style={{ display: 'inline-block', textDecoration: 'none' }}>
            Start Trading Now
          </Link>
        </div>
      </div>
    </section>
  );
}
