'use client';
import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const type = searchParams.get('type') || 'register';

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prev = (e.currentTarget.previousSibling as HTMLInputElement);
      if (prev) prev.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setError("Please enter the full 4-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.verifyOtp(email, otpCode);
      setSuccess("Verification successful!");
      
      setTimeout(() => {
        if (type === 'reset') {
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
          router.push('/login');
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await authService.requestOtp(email);
      setSuccess("A new code has been sent to your email.");
    } catch (err: any) {
      setError(err.message || "Failed to resend the code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgImage}>
        <Image src="/images/chart1.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
        <div className={styles.bgOverlay}></div>
      </div>
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      {FLOATING_AVATARS.map((av, i) => (
        <div key={i} className={styles.floatingAvatar} style={av.style as React.CSSProperties}>
          <Image src={av.src} alt="Team member" fill style={{ objectFit: 'cover' }} sizes="80px" />
        </div>
      ))}
      <Link href="/" className={styles.topLogo}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#3bd1d3" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
        <span>Equinox</span>
      </Link>

      <div className={styles.formWrapper}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Verify OTP</h2>
            <p className={styles.formSubtitle}>Enter the code sent to {email}</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {success}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '10px' }}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  onFocus={e => e.target.select()}
                  style={{
                    width: '45px',
                    height: '55px',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    borderRadius: '8px',
                    border: '1.5px solid #e5e7eb',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    background: '#f9fafb',
                    color: '#1f2937'
                  }}
                  required
                />
              ))}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div className={styles.footerText} style={{ marginTop: '15px' }}>
              Didn&apos;t receive the code?{' '}
              <button 
                type="button"
                onClick={handleResend} 
                disabled={loading}
                style={{ background: 'none', border: 'none', color: '#3bd1d3', fontWeight: 700, cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
              >
                Resend
              </button>
            </div>

            <div className={styles.footerText}>
              <Link href="/login" className={styles.link}>← Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#080811' }}>Loading...</div>}>
      <OTPContent />
    </Suspense>
  );
}
