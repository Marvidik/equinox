'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const FLOATING_AVATARS = [
  { src: '/images/team1.jpg', style: { top: '10%', left: '4%' } },
  { src: '/images/team2.jpg', style: { top: '35%', left: '2%' } },
  { src: '/images/team3.jpg', style: { bottom: '18%', left: '8%' } },
  { src: '/images/team4.jpg', style: { top: '8%', right: '5%' } },
  { src: '/images/team1.jpg', style: { top: '45%', right: '3%' } },
  { src: '/images/team2.jpg', style: { bottom: '15%', right: '7%' } },
];

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={styles.page}>
      {/* Full Background */}
      <div className={styles.bgImage}>
        <Image src="/images/chart1.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
        <div className={styles.bgOverlay}></div>
      </div>

      {/* Floating Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      {/* Floating Avatars */}
      {FLOATING_AVATARS.map((av, i) => (
        <div key={i} className={styles.floatingAvatar} style={av.style as React.CSSProperties}>
          <Image src={av.src} alt="Team member" fill style={{ objectFit: 'cover' }} sizes="80px" />
        </div>
      ))}

      {/* Floating Stats Chip */}
      <div className={styles.floatingChip1}>
        <span className={styles.chipNum}>10 Years</span>
        <span className={styles.chipLabel}>Trading Experience</span>
      </div>
      <div className={styles.floatingChip2}>
        <span className={styles.chipNum}>25K+</span>
        <span className={styles.chipLabel}>Satisfied Investors</span>
      </div>

      {/* Logo */}
      <Link href="/" className={styles.topLogo}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
        <span>Equinox</span>
      </Link>

      {/* Centered Form */}
      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <p className={styles.formSubtitle}>Welcome back — access your portfolio</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password">Password</label>
                <Link href="#" className={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div className={styles.inputWithIcon}>
                <input type={showPass ? 'text' : 'password'} id="password" placeholder="Enter your password" />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>Sign In</button>
            
            <div className={styles.footerText}>
              Don&apos;t have an account? <Link href="/register" className={styles.link}>Create one here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
