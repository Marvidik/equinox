'use client';

import { useState, useEffect } from 'react';
import styles from './ChartMockup.module.css';

export default function ChartMockup() {
  const [price, setPrice] = useState("$64,235.80");
  const [change, setChange] = useState("+2.45%");
  const [isPositive, setIsPositive] = useState(true);
  const [pathData, setPathData] = useState("M0,130 C20,135 40,110 60,115 C80,120 100,90 120,85 C140,80 160,105 180,95 C200,85 220,60 240,70 C260,80 280,45 300,50 C320,55 340,30 360,40 C380,50 400,20 420,30 C440,40 460,15 480,25 C500,35 520,50 540,45 C560,40 580,70 600,60 C620,50 640,40 660,35 C680,30 700,55 720,45 C740,35 760,20 780,15 C800,10 800,10 800,10");
  
  const [stats, setStats] = useState({
    prevClose: "$62,698.30",
    high: "$64,800.00",
    low: "$61,500.00",
    open: "$62,700.00",
    volume: "45,210",
    count: "1,245,600"
  });

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const fetchData = async () => {
      try {
        // Fetch 24h ticker
        const tickerRes = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT', {
          signal: controller.signal,
        });
        if (tickerRes.ok) {
          const tickerData = await tickerRes.json();
          const currentPrice = parseFloat(tickerData.lastPrice);
          const priceChangePct = parseFloat(tickerData.priceChangePercent);
          
          setPrice(currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
          setChange(`${priceChangePct >= 0 ? '+' : ''}${priceChangePct.toFixed(2)}%`);
          setIsPositive(priceChangePct >= 0);
          
          setStats({
            prevClose: parseFloat(tickerData.prevClosePrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            high: parseFloat(tickerData.highPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            low: parseFloat(tickerData.lowPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            open: parseFloat(tickerData.openPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            volume: parseFloat(tickerData.volume).toLocaleString('en-US'),
            count: tickerData.count.toLocaleString('en-US')
          });
        }

        // Fetch klines for the graph (24 hours, 1h intervals)
        const klinesRes = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24', {
          signal: controller.signal,
        });
        if (klinesRes.ok) {
          const klinesData = await klinesRes.json();
          
          const prices = klinesData.map((k: any) => parseFloat(k[4]));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const range = maxPrice - minPrice || 1;
          
          const width = 800; // svg width
          const height = 150; // svg height
          
          const points = prices.map((p: number, i: number) => {
            const x = (i / (prices.length - 1)) * width;
            const y = height - ((p - minPrice) / range) * (height - 20) - 10;
            return `${x},${y}`;
          });

          let path = `M${points[0]}`;
          for (let i = 1; i < points.length; i++) {
            const [prevX, prevY] = points[i - 1].split(',').map(Number);
            const [currX, currY] = points[i].split(',').map(Number);
            const cp1x = prevX + (currX - prevX) / 2;
            const cp1y = prevY;
            const cp2x = prevX + (currX - prevX) / 2;
            const cp2y = currY;
            path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${currX},${currY}`;
          }
          setPathData(path);
        }
      } catch (err) {
        // Silently fall back to default static data when API is unreachable
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <div className={styles.chartContainer}>
      <p className={styles.introText}>Here's Bitcoin's (BTC) performance for this week:</p>
      
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.stockInfo}>
            <div className={styles.stockIcon} style={{ background: 'rgba(247, 147, 26, 0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F7931A" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 9.5C15.3284 9.5 16 8.82843 16 8C16 7.17157 15.3284 6.5 14.5 6.5H10V9.5H14.5Z" />
                <path d="M15 14.5C15.8284 14.5 16.5 13.8284 16.5 13C16.5 12.1716 15.8284 11.5 15 11.5H10V14.5H15Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8 5V6.5H6.5V8H8V16H6.5V17.5H8V19H9.5V17.5H11.5V19H13V17.5H14.5C16.9853 17.5 19 15.4853 19 13C19 11.2335 17.9818 9.70473 16.485 9.02021C17.3912 8.3516 18 7.24838 18 6C18 3.79086 16.2091 2 14 2H13V5H11.5V2H9.5V5H8Z" />
              </svg>
            </div>
            <div>
              <div className={styles.stockSymbol}>BTC • Crypto • USD</div>
              <div className={styles.stockName}>Bitcoin</div>
            </div>
          </div>
          <div className={styles.cardActions}>
            <button className={styles.iconButton}>☆</button>
            <button className={styles.priceAlertButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              Price Alert
            </button>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.price}>{price}</div>
          <div className={styles.change} style={{ color: isPositive ? '#3cdb3c' : '#ff4d4d' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {isPositive ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
            {change} <span className={styles.time}>Live Data (Last 24H)</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>1D</button>
          <button className={styles.tab}>5D</button>
          <button className={styles.tab}>1M</button>
          <button className={styles.tab}>6M</button>
          <button className={styles.tab}>YTD</button>
          <button className={styles.tab}>1Y</button>
          <button className={styles.tab}>5Y</button>
          <button className={styles.tab}>All</button>
        </div>

        <div className={styles.graphArea}>
          <svg className={styles.graphSvg} viewBox="0 0 800 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7931A" />
                <stop offset="50%" stopColor="#3bd1d3" />
                <stop offset="100%" stopColor="#3bd1d3" />
              </linearGradient>
            </defs>
            <path 
              d={pathData} 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          <div className={styles.graphCursor} style={{ right: '0%', transform: 'translate(0, -50%)' }}>
            <div className={styles.cursorDot} style={{ background: isPositive ? '#3bd1d3' : '#ff4d4d', boxShadow: `0 0 10px ${isPositive ? '#3bd1d3' : '#ff4d4d'}` }}></div>
          </div>
        </div>
        
        <div className={styles.xAxis}>
          <span>-24h</span>
          <span>-18h</span>
          <span>-12h</span>
          <span>-6h</span>
          <span>Now</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>Prev close</div>
            <div className={styles.statValue}>{stats.prevClose}</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>24H High</div>
            <div className={styles.statValue}>{stats.high}</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>24H Volume (BTC)</div>
            <div className={styles.statValue}>{stats.volume}</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>Open</div>
            <div className={styles.statValue}>{stats.open}</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>24H Low</div>
            <div className={styles.statValue}>{stats.low}</div>
          </div>
          <div className={styles.statRow}>
            <div className={styles.statLabel}>Trades</div>
            <div className={styles.statValue}>{stats.count}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
