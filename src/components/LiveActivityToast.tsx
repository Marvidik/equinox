'use client';
import React, { useState, useEffect } from 'react';
import styles from './LiveActivityToast.module.css';

const activities = [
  { name: 'James', country: 'Ghana', action: 'made a deposit of', amount: '$701', flag: '🇬🇭' },
  { name: 'Sofia', country: 'Spain', action: 'made a deposit of', amount: '$2,500', flag: '🇪🇸' },
  { name: 'Marcus', country: 'Nigeria', action: 'made a deposit of', amount: '$1,200', flag: '🇳🇬' },
  { name: 'Yuki', country: 'Japan', action: 'withdrew profits of', amount: '$3,840', flag: '🇯🇵' },
  { name: 'Amara', country: 'Kenya', action: 'made a deposit of', amount: '$500', flag: '🇰🇪' },
  { name: 'Carlos', country: 'Mexico', action: 'started trading on', amount: 'Standard Plan', flag: '🇲🇽' },
  { name: 'Priya', country: 'India', action: 'withdrew profits of', amount: '$6,200', flag: '🇮🇳' },
  { name: 'David', country: 'USA', action: 'made a deposit of', amount: '$10,000', flag: '🇺🇸' },
  { name: 'Fatima', country: 'UAE', action: 'upgraded to', amount: 'Premium Plan', flag: '🇦🇪' },
  { name: 'Lucas', country: 'Brazil', action: 'made a deposit of', amount: '$1,800', flag: '🇧🇷' },
  { name: 'Emma', country: 'UK', action: 'withdrew profits of', amount: '$4,500', flag: '🇬🇧' },
  { name: 'Kwame', country: 'Ghana', action: 'made a deposit of', amount: '$950', flag: '🇬🇭' },
  { name: 'Lena', country: 'Germany', action: 'upgraded to', amount: 'Master Plan', flag: '🇩🇪' },
  { name: 'Omar', country: 'Saudi Arabia', action: 'made a deposit of', amount: '$25,000', flag: '🇸🇦' },
  { name: 'Isabelle', country: 'France', action: 'withdrew profits of', amount: '$2,100', flag: '🇫🇷' },
];

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getRandomIndex(current: number, max: number): number {
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * max);
  }
  return next;
}

export default function LiveActivityToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setTime(getTime());
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const cycle = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setIdx(prev => getRandomIndex(prev, activities.length));
        setTime(getTime());
        setVisible(true);
      }, 600);
    }, 6000);
    return () => clearInterval(cycle);
  }, [dismissed]);

  if (dismissed) return null;

  const act = activities[idx];

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.iconWrap}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3bd1d3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      </div>

      <div className={styles.content}>
        <p className={styles.message}>
          <span className={styles.name}>{act.name}</span>
          {' '}
          <span className={styles.flag}>{act.flag}</span>
          {' '}from{' '}
          <span className={styles.country}>{act.country}</span>
          {' '}just {act.action}{' '}
          <span className={styles.amount}>{act.amount}</span>
        </p>
        <div className={styles.meta}>
          <span className={styles.dot} />
          <span className={styles.timeText}>{time}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.liveText}>Live</span>
        </div>
      </div>

      <button className={styles.closeBtn} onClick={() => setDismissed(true)} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
