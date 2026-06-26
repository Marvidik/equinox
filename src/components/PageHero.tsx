import React from 'react';
import Link from 'next/link';
import styles from './PageHero.module.css';

interface PageHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.href ? (
                  <Link href={crumb.href} className={styles.link}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={styles.current}>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className={styles.separator}>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.graphics}>
          {/* Mockup for the background graphics seen in Image 3 */}
          <svg className={styles.chartGraphic} viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 Q 50 50 100 120 T 200 80 T 300 110 T 400 40" stroke="url(#paint0_linear)" strokeWidth="3" fill="none"/>
            <path d="M0 80 Q 80 150 150 70 T 250 100 T 350 50 T 400 90" stroke="#00e676" strokeWidth="1" fill="none"/>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00e676" />
                <stop offset="1" stopColor="#00b0ff" />
              </linearGradient>
            </defs>
            {/* Bars */}
            <rect x="20" y="80" width="4" height="40" fill="#00e676" opacity="0.6"/>
            <rect x="40" y="60" width="4" height="60" fill="#00b0ff" opacity="0.6"/>
            <rect x="60" y="90" width="4" height="30" fill="#00e676" opacity="0.6"/>
            <rect x="80" y="40" width="4" height="80" fill="#00b0ff" opacity="0.6"/>
            <rect x="100" y="70" width="4" height="50" fill="#00e676" opacity="0.6"/>
            <rect x="120" y="100" width="4" height="20" fill="#00b0ff" opacity="0.6"/>
            <rect x="140" y="50" width="4" height="70" fill="#00e676" opacity="0.6"/>
            <rect x="160" y="30" width="4" height="90" fill="#00b0ff" opacity="0.6"/>
            <rect x="180" y="60" width="4" height="60" fill="#00e676" opacity="0.6"/>
            <rect x="200" y="80" width="4" height="40" fill="#00b0ff" opacity="0.6"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
