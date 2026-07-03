'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/page.module.css';
import { authService } from '@/services/authService';

const FLOATING_AVATARS = [
  { src: '/images/team1.jpg', style: { top: '10%', left: '4%' } },
  { src: '/images/team2.jpg', style: { top: '35%', left: '2%' } },
  { src: '/images/team3.jpg', style: { bottom: '18%', left: '8%' } },
  { src: '/images/team4.jpg', style: { top: '8%', right: '5%' } },
  { src: '/images/team1.jpg', style: { top: '45%', right: '3%' } },
  { src: '/images/team2.jpg', style: { bottom: '15%', right: '7%' } },
];

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.requestOtp(email);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=reset`);
    } catch (err: any) {
      setError(err.message || "Failed to send reset code. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

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
            <h2 className={styles.formTitle}>Reset Password</h2>
            <p className={styles.formSubtitle}>Enter your email to receive a reset code</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter registered email" 
                required 
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Sending Code...' : 'Send Reset Code'}
            </button>
            
            <div className={styles.footerText}>
              Remembered your password? <Link href="/login" className={styles.link}>Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
