import React from 'react';
import Image from 'next/image';
import styles from './Testimonials.module.css';

const reviews = [
  {
    id: 1,
    text: "Equinox has completely transformed how I manage my investments. The portfolio tracker is intuitive and helps me see my diversification at a glance.",
    name: "John Doe",
    location: "Los Angeles, USA",
    image: "/images/profile1.jpg"
  },
  {
    id: 2,
    text: "The institutional-grade tools are a game-changer. I can easily monitor my passive income and plan better for the future with their strategies.",
    name: "Michael Brown",
    location: "New York, USA",
    image: "/images/profile2.jpg"
  },
  {
    id: 3,
    text: "I love the advanced market analysis features. Being able to track global markets in real-time helps me make incredibly informed decisions.",
    name: "Sarah Johnson",
    location: "Miami, USA",
    image: "/images/profile3.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What our customers say.</h2>
          <div className={styles.navButtons}>
            <button className={styles.navBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className={`${styles.navBtn} ${styles.navBtnActive}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {reviews.map((review, index) => (
            <div key={review.id} className={`${styles.card} ${index === 0 ? styles.activeCard : ''}`}>
              <p className={styles.reviewText}>{review.text}</p>
              
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <Image src={review.image} alt={review.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{review.name}</h4>
                  <span className={styles.location}>{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
