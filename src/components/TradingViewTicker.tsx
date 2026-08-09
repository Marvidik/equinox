'use client';

import React, { useEffect, useRef, memo } from 'react';
import styles from './TradingViewTicker.module.css';

function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear container to prevent duplicate injections on re-renders
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { description: "Microsoft", proName: "NASDAQ:MSFT" },
        { description: "Apple", proName: "NASDAQ:AAPL" },
        { description: "Tesla", proName: "NASDAQ:TSLA" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en"
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className={styles.section} id="ticker-tape">
      <div className={styles.container}>
        <div className="tradingview-widget-container" ref={containerRef}>
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </section>
  );
}

export default memo(TradingViewTicker);
