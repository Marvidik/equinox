'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/countries';
import styles from './page.module.css';

const FLOATING_AVATARS = [
  { src: '/images/team1.jpg', style: { top: '8%', left: '3%' } },
  { src: '/images/team3.jpg', style: { top: '40%', left: '2%' } },
  { src: '/images/team4.jpg', style: { bottom: '12%', left: '5%' } },
  { src: '/images/team2.jpg', style: { top: '6%', right: '4%' } },
  { src: '/images/team4.jpg', style: { top: '42%', right: '2%' } },
  { src: '/images/team1.jpg', style: { bottom: '10%', right: '5%' } },
];

export default function Register() {

  return (
    <div className={styles.page}>
      {/* Full Background */}
      <div className={styles.bgImage}>
        <Image src="/images/chart3.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
        <div className={styles.bgOverlay}></div>
      </div>

      {/* Glow orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>

      {/* Floating Avatars */}
      {FLOATING_AVATARS.map((av, i) => (
        <div key={i} className={styles.floatingAvatar} style={av.style as React.CSSProperties}>
          <Image src={av.src} alt="Team member" fill style={{ objectFit: 'cover' }} sizes="80px" />
        </div>
      ))}

      {/* Floating Stat Chips */}
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
            <h2 className={styles.formTitle}>Create Account</h2>
            <p className={styles.formSubtitle}>Join thousands of smart investors today</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Choose a username" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmEmail">Confirm Email</label>
                <input type="email" id="confirmEmail" placeholder="Confirm your email" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="+1 240 457 2508" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="country">Country</label>
                <select id="country">
                  <option value="">Select your country</option>
                  {COUNTRIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="accountType">Account Type</label>
                <select id="accountType">
                  <option value="">Choose account type</option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter your full address" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a strong password" />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" />
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree with <Link href="#" className={styles.link}>Terms and Conditions</Link>
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>Create Account</button>
            
            <div className={styles.footerText}>
              Already have an account? <Link href="/login" className={styles.link}>Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
