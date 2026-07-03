'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { COUNTRIES } from '@/lib/countries';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referralId, setReferralId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'success' as 'success' | 'error' });

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    confirmEmail: '',
    phone: '',
    country: '',
    accountType: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  useEffect(() => {
    const savedReferral = localStorage.getItem('referral_id');
    if (savedReferral) {
      setReferralId(savedReferral);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.email !== formData.confirmEmail) {
      setError("Emails do not match");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        account_type: formData.accountType || 'Basic',
        address: formData.address,
        dob: new Date().toISOString(),
        password: formData.password,
        referal_id: referralId || ''
      };

      await authService.register(payload);

      setModalContent({
        title: "Registration Successful!",
        message: "Please check your email and verify your account to continue.",
        type: 'success',
      });
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (modalContent.type === 'success') {
      router.push('/login');
    }
  };

  return (
    <>
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

            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Choose a username" 
                    required 
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmEmail">Confirm Email</label>
                  <input 
                    type="email" 
                    id="confirmEmail" 
                    name="confirmEmail" 
                    value={formData.confirmEmail} 
                    onChange={handleChange} 
                    placeholder="Confirm your email" 
                    required 
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="+1 240 457 2508" 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="country">Country</label>
                  <select 
                    id="country" 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    required
                  >
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
                  <select 
                    id="accountType" 
                    name="accountType" 
                    value={formData.accountType} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Choose account type</option>
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="address">Address</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Enter your full address" 
                    required 
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Create a strong password" 
                    required 
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Confirm your password" 
                    required 
                  />
                </div>
              </div>

              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="agreeTerms" 
                  checked={formData.agreeTerms} 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="terms">
                  I agree with <Link href="#" className={styles.link}>Terms and Conditions</Link>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <div className={styles.footerText}>
                Already have an account? <Link href="/login" className={styles.link}>Sign in here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <StatusModal 
        isOpen={showModal}
        onClose={handleModalClose}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </>
  );
}
