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

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await authService.resetPassword({
        email: email,
        new_password: formData.password
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.page}>
        <div className={styles.bgImage}>
          <Image src="/images/chart1.jpg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
          <div className={styles.bgOverlay}></div>
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.formCard} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ color: '#3bd1d3', fontSize: '4rem', marginBottom: '1rem', lineHeight: 1 }}>✓</div>
            <h1 className={styles.formTitle}>Success!</h1>
            <p className={styles.formSubtitle} style={{ marginBottom: '2rem' }}>Your password has been successfully reset. You will be redirected to the login page shortly.</p>
            <Link href="/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none', padding: '1rem 2rem' }}>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <h2 className={styles.formTitle}>Create New Password</h2>
            <p className={styles.formSubtitle}>Set a strong password for your account</p>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>New Password</label>
              <div className={styles.inputWithIcon}>
                <input 
                  type={showPassword ? "text" : "password"}
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  placeholder="Enter new password" 
                  required 
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm New Password</label>
              <div className={styles.inputWithIcon}>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                  placeholder="Confirm new password" 
                  required 
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading} style={{ marginTop: '1rem' }}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#080811' }}>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
