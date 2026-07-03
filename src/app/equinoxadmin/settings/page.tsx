'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminSettings() {
  const [kyc, setKyc] = useState(false);
  const [verification, setVerification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminSettings, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setKyc(data.kyc || false);
        setVerification(data.verification || false);
      } else {
        // Fallback for demo purposes
        setKyc(false);
        setVerification(false);
      }
    } catch (err) {
      console.error(err);
      // Fallback values if API fails
      setKyc(true);
      setVerification(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminSettings, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ kyc, verification })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.message || 'Settings updated successfully' });
      } else {
        setMessage({ type: 'error', text: data.detail || 'Failed to update settings.' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading settings...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Platform Settings</h1>
        <p className={styles.subtitle}>Configure global system requirements and features.</p>
      </div>

      <div className={styles.card}>
        <div className={styles.formGroup}>
          <div className={styles.labelGroup}>
            <span className={styles.label}>Require KYC</span>
            <span className={styles.description}>Enforce Identity Verification for all active users.</span>
          </div>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={kyc} 
              onChange={(e) => setKyc(e.target.checked)} 
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelGroup}>
            <span className={styles.label}>Require Verification</span>
            <span className={styles.description}>Enforce email/phone verification for withdrawals.</span>
          </div>
          <label className={styles.switch}>
            <input 
              type="checkbox" 
              checked={verification} 
              onChange={(e) => setVerification(e.target.checked)} 
            />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
