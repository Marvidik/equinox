import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Team.module.css';

const teamMembers = [
  { id: 1, name: "Alexander Wright", role: "Chief Executive Officer", src: '/images/team4.jpg' },
  { id: 2, name: "Kathryn Lorie Smith", role: "Head of Trading Strategy", src: '/images/kary.jpeg' },
  { id: 3, name: "Marcus Johnson", role: "Lead Market Analyst", src: '/images/team2.jpg' },
];

export default function Team() {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            Our Support Team
          </div>
          <h2 className={styles.title}>Experts Ready to Help</h2>
          <p className={styles.subtitle}>
            Behind every solution is a real person who's ready to assist you with professionalism and care. Meet our financial advisors, tech team, and service consultants.
          </p>
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className={styles.overlay}>
                  <div className={styles.socials}>
                    <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/about" className={styles.ctaBtn}>
            Learn More About Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
