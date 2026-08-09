"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const heroContent = [
  {
    title: "INSTITUTIONAL GRADE",
    highlight: "INVESTMENT STRATEGIES",
    description: "Access premium global markets with precision-driven trading algorithms.",
    image: "/images/heroimg2.jpg"
  },
  {
    title: "EXPERT FINANCIAL",
    highlight: "GUIDANCE",
    description: "Navigate the complex markets with our proven institutional-grade strategies.",
    image: "/images/heroimg1.jpg"
  },
  {
    title: "BUILD YOUR WEALTH",
    highlight: "WITH CONFIDENCE",
    description: "We leverage advanced algorithms and human expertise to optimize your portfolio.",
    image: "/images/chart4.jpg"
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
        setFade(true);
      }, 500);

    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 500);
  };

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
      setFade(true);
    }, 500);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + heroContent.length) % heroContent.length);
      setFade(true);
    }, 500);
  };

  return (
    <div className={styles.heroSection}>
      {heroContent.map((slide, index) => (
        <div
          key={index}
          className={`${styles.bgImage} ${index === currentIndex ? styles.activeBg : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      <div className={styles.overlay}></div>

      <button className={styles.navButton} onClick={prevSlide} style={{ left: '20px' }}>
        &lt;
      </button>

      <div className={styles.content}>
        <div className={styles.badge}>
          Equinox Global Assets
        </div>

        <div className={`${styles.textTransition} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          <h1 className={styles.title}>
            {heroContent[currentIndex].title}<br />
            {heroContent[currentIndex].highlight}
          </h1>

          <p className={styles.description}>
            {heroContent[currentIndex].description}
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <Link href={isLoggedIn ? '/dashboard' : '/login'} className={styles.primaryButton}>
            Dashboard
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            Learn More
          </Link>
        </div>
      </div>

      <button className={styles.navButton} onClick={nextSlide} style={{ right: '20px' }}>
        &gt;
      </button>

      <div className={styles.sliderControls}>
        {heroContent.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
