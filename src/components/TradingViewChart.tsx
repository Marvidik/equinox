'use client';

import React, { useEffect, memo } from 'react';
import Script from 'next/script';
import styles from './TradingViewChart.module.css';

declare global {
  interface Window {
    TradingView: any;
  }
}

interface TradingViewChartProps {
  hideHeader?: boolean;
  theme?: 'light' | 'dark';
  backgroundColor?: string;
}

function TradingViewChart({ hideHeader = false, theme = 'dark', backgroundColor = '#0F0F0F' }: TradingViewChartProps) {
  const initWidget = () => {
    if (typeof window.TradingView !== 'undefined' && document.getElementById('tv_chart_container')) {
      // Clear container first
      document.getElementById('tv_chart_container')!.innerHTML = '';
      
      new window.TradingView.widget({
        autosize: true,
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: theme,
        style: '1',
        locale: 'en',
        enable_publishing: false,
        backgroundColor: backgroundColor,
        gridColor: theme === 'dark' ? 'rgba(242, 242, 242, 0.06)' : 'rgba(0, 0, 0, 0.06)',
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: true,
        container_id: 'tv_chart_container',
        hide_side_toolbar: true,
        allow_symbol_change: true,
        calendar: false,
        details: false,
        hotlist: false,
        hide_volume: false,
      });
    }
  };

  useEffect(() => {
    initWidget();
  }, [theme, backgroundColor]);

  return (
    <section className={hideHeader ? '' : styles.section} id="live-chart" style={hideHeader ? { padding: 0, height: '100%' } : {}}>
      <Script 
        src="https://s3.tradingview.com/tv.js" 
        strategy="lazyOnload" 
        onLoad={initWidget} 
      />
      <div className={styles.container} style={hideHeader ? { padding: 0, margin: 0, maxWidth: '100%', height: '100%' } : {}}>
        {!hideHeader && (
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-cyan)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </span>
              Live Market Data
            </div>
            <h2 className={styles.title}>
              Real-Time <span className={styles.highlight}>Market Analysis</span>
            </h2>
            <p className={styles.description}>
              Track live price movements, analyze trends with professional-grade tools, and make informed decisions with our integrated TradingView charts.
            </p>
          </div>
        )}
        <div className={styles.chartWrapper} style={hideHeader ? { height: '100%', minHeight: '400px', margin: 0, border: 'none', borderRadius: 0 } : {}}>
          <div id="tv_chart_container" style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </section>
  );
}

export default memo(TradingViewChart);
