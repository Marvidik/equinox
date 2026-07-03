'use client';
import React, { useEffect, useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../login/page.module.css';
import { authService } from '@/services/authService';

const FLOATING_AVATARS = [
  { src: '/images/team1.jpg', style: { top: '10%', left: '4%' } },
  { src: '/images/team2.jpg', style: { top: '35%', left: '2%' } },
  { src: '/images/team3.jpg', style: { bottom: '18%', left: '8%' } },
  { src: '/images/team4.jpg', style: { top: '8%', right: '5%' } },
  { src: '/images/team1.jpg', style: { top: '45%', right: '3%' } },
  { src: '/images/team2.jpg', style: { bottom: '15%', right: '7%' } },
];

function VerifyAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('user_id');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("Invalid verification link. No user ID provided.");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        await authService.verifyAccount(userId);
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (err: any) {
        setError(err.message || "Account verification failed. The link may have expired or is invalid.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [userId, router]);

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
        <div className={styles.formCard} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          {loading ? (
            <>
              <div style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '4px solid rgba(59, 209, 211, 0.2)', borderTopColor: '#3bd1d3', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <h2 className={styles.formTitle}>Verifying Account...</h2>
              <p className={styles.formSubtitle}>Please wait while we verify your account securely.</p>
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </>
          ) : success ? (
            <>
              <div style={{ color: '#3bd1d3', fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>✓</div>
              <h1 className={styles.formTitle}>Account Verified!</h1>
              <p className={styles.formSubtitle} style={{ marginBottom: '2rem' }}>
                Your account has been verified successfully. You will be redirected to the login page shortly.
              </p>
              <Link href="/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', padding: '1rem 2rem' }}>
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <div style={{ color: '#ef4444', fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>✗</div>
              <h1 className={styles.formTitle}>Verification Failed</h1>
              <p className={styles.formSubtitle} style={{ marginBottom: '2rem', color: '#b91c1c' }}>
                {error}
              </p>
              <Link href="/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', padding: '1rem 2rem', background: '#374151', color: '#fff' }}>
                Return to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyAccount() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#080811' }}>Loading...</div>}>
      <VerifyAccountContent />
    </Suspense>
  );
}
