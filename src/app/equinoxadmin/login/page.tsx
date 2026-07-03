'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        // Save some user info if needed, or just redirect
        router.push('/equinoxadmin');
      } else {
        setError(data.error || data.detail || 'Invalid admin credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#2CD4D1"/>
              <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#ffffff"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1 className={styles.logoText}>Equinox Admin</h1>
            <p className={styles.subtitle}>Secure Administrator Access</p>
          </div>
        </div>

        {error && <div className={styles.errorText}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="admin@equinox.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
