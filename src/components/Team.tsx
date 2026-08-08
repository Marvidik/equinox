'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Team.module.css';

const teamMembers = [
  { id: 1, src: '/images/team1.jpg', alt: 'Team Member 1' },
  { id: 2, src: '/images/team2.jpg', alt: 'Team Member 2' },
  { id: 3, src: '/images/team3.jpg', alt: 'Team Member 3' },
  { id: 4, src: '/images/team4.jpg', alt: 'Team Member 4' },
  { id: 5, src: '/images/team1.jpg', alt: 'Team Member 5' },
];

export default function Team() {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  // Helper to get circularly shifted array
  const getVisibleMembers = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push(teamMembers[(startIndex + i) % teamMembers.length]);
    }
    return visible;
  };

  const visibleMembers = getVisibleMembers();

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>[ Our Support Team ]</div>
          <h2 className={styles.title}>Experts Ready to Help</h2>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack}>
            {visibleMembers.map((member, idx) => (
              <div 
                key={`${member.id}-${idx}`} 
                className={idx === 2 ? styles.teamMemberCenter : styles.teamMember}
              >
                <div className={idx === 2 ? styles.imageWrapperCenter : styles.imageWrapper}>
                  <Image src={member.src} alt={member.alt} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button className={styles.arrowBtn} onClick={handlePrev}>←</button>
          <button className={styles.arrowBtn} onClick={handleNext}>→</button>
        </div>

        <div className={styles.footer}>
          <p className={styles.description}>
            Behind every solution is a real person who's ready to assist you with professionalism and care. Meet our financial advisors, tech team, and service consultants.
          </p>
          <Link href="/about" className={styles.ctaBtn}>Check Our Team</Link>
        </div>
      </div>
    </section>
  );
}
