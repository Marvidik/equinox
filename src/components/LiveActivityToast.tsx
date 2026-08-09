'use client';
import React, { useState, useEffect } from 'react';
import styles from './LiveActivityToast.module.css';

type ActivityType = 'deposit' | 'withdrawal' | 'profit' | 'upgrade';

const activities: { name: string; country: string; action: string; amount: string; flag: string; type: ActivityType }[] = [
  { name: 'Michael', country: 'Finland', action: 'made a deposit of', amount: '$38,128', flag: '🇫🇮', type: 'deposit' },
  { name: 'Isabella', country: 'Italy', action: 'made a deposit of', amount: '$12,500', flag: '🇮🇹', type: 'deposit' },
  { name: 'Sofia', country: 'Spain', action: 'made a deposit of', amount: '$7,250', flag: '🇪🇸', type: 'deposit' },
  { name: 'Klaus', country: 'Germany', action: 'made a deposit of', amount: '$22,000', flag: '🇩🇪', type: 'deposit' },
  { name: 'Pierre', country: 'France', action: 'made a deposit of', amount: '$9,800', flag: '🇫🇷', type: 'deposit' },
  { name: 'Henrik', country: 'Sweden', action: 'made a deposit of', amount: '$15,000', flag: '🇸🇪', type: 'deposit' },
  { name: 'Anastasia', country: 'Greece', action: 'made a deposit of', amount: '$5,500', flag: '🇬🇷', type: 'deposit' },
  { name: 'Lena', country: 'Germany', action: 'just earned a profit of', amount: '$8,400', flag: '🇩🇪', type: 'profit' },
  { name: 'Marco', country: 'Italy', action: 'just earned a profit of', amount: '$3,750', flag: '🇮🇹', type: 'profit' },
  { name: 'Isabelle', country: 'France', action: 'just earned a profit of', amount: '$6,200', flag: '🇫🇷', type: 'profit' },
  { name: 'Lars', country: 'Norway', action: 'just earned a profit of', amount: '$11,900', flag: '🇳🇴', type: 'profit' },
  { name: 'Katarina', country: 'Netherlands', action: 'just earned a profit of', amount: '$4,320', flag: '🇳🇱', type: 'profit' },
  { name: 'Aleksander', country: 'Poland', action: 'withdrew profits of', amount: '$5,100', flag: '🇵🇱', type: 'withdrawal' },
  { name: 'Emma', country: 'United Kingdom', action: 'withdrew profits of', amount: '$14,500', flag: '🇬🇧', type: 'withdrawal' },
  { name: 'Lukas', country: 'Austria', action: 'withdrew profits of', amount: '$7,800', flag: '🇦🇹', type: 'withdrawal' },
  { name: 'Charlotte', country: 'Belgium', action: 'withdrew profits of', amount: '$3,200', flag: '🇧🇪', type: 'withdrawal' },
  { name: 'Nils', country: 'Denmark', action: 'upgraded to', amount: 'Master Plan', flag: '🇩🇰', type: 'upgrade' },
  { name: 'Eleni', country: 'Cyprus', action: 'upgraded to', amount: 'Premium Plan', flag: '🇨🇾', type: 'upgrade' },
  { name: 'Thomas', country: 'Switzerland', action: 'upgraded to', amount: 'Executive Plan', flag: '🇨🇭', type: 'upgrade' },
  { name: 'Valentina', country: 'Portugal', action: 'made a deposit of', amount: '$18,000', flag: '🇵🇹', type: 'deposit' },
];

const iconByType = (type: ActivityType) => {
  if (type === 'deposit') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1dbfc1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
  if (type === 'withdrawal') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
  if (type === 'profit') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
};

const colorByType = (type: ActivityType) => {
  if (type === 'deposit') return '#1dbfc1';
  if (type === 'withdrawal') return '#f59e0b';
  if (type === 'profit') return '#10b981';
  return '#c9a227';
};

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getRandomIndex(current: number, max: number): number {
  let next = current;
  while (next === current) next = Math.floor(Math.random() * max);
  return next;
}

function getRandomInterval(min = 5000, max = 10000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function LiveActivityToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => { setTime(getTime()); }, []);

  useEffect(() => {
    if (dismissed) return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setIdx(prev => getRandomIndex(prev, activities.length));
          setTime(getTime());
          setVisible(true);
          schedule();
        }, 10000);
      }, getRandomInterval(5000, 10000));
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [dismissed]);

  if (dismissed) return null;
  const act = activities[idx];

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.iconWrap} style={{ background: `${colorByType(act.type)}15`, borderColor: `${colorByType(act.type)}30` }}>
        {iconByType(act.type)}
      </div>
      <div className={styles.content}>
        <p className={styles.message}>
          <span className={styles.name}>{act.name}</span>
          {' '}<span className={styles.flag}>{act.flag}</span>{' '}
          from <span className={styles.country}>{act.country}</span>
          {' '}just {act.action}{' '}
          <span className={styles.amount} style={{ color: colorByType(act.type) }}>{act.amount}</span>
        </p>
        <div className={styles.meta}>
          <span className={styles.dot} />
          <span className={styles.timeText}>{time}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.liveText}>Live</span>
        </div>
      </div>
      <button className={styles.closeBtn} onClick={() => setDismissed(true)} aria-label="Dismiss">×</button>
    </div>
  );
}
