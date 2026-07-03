'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';

export default function KycPage() {
  const [step, setStep] = useState<'intro' | 'form' | 'success'>('intro');
  const [docType, setDocType] = useState('Passport');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    social_username: '',
    address_line: '',
    state: '',
    city: '',
    nationality: ''
  });
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (frontImage) data.append('document_front', frontImage);
      if (backImage) data.append('document_back', backImage);
      data.append('all_info_confirmed', confirm ? 'true' : 'false');

      await authService.submitKyc(data);
      setStep('success');
    } catch (err: any) {
      alert(err.message || 'KYC submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'intro') {
    return (
      <div className={styles.page}>
        <div className={styles.centerWrap}>
          <div className={styles.heroCard}>
            <div className={styles.heroIcon}>
              <svg width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h2 className={styles.heroTitle}>Identity Verification (KYC)</h2>
            <p className={styles.heroDesc}>
              To comply with global financial regulations and ensure the security of your account, Equinox requires all users to complete a brief identity verification process.
            </p>
            <button className={styles.startBtn} onClick={() => setStep('form')}>
              Start Verification
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.centerWrap}>
          <div className={styles.heroCard}>
            <div className={styles.heroIcon} style={{ background: 'rgba(59,209,211,0.1)', borderColor: 'rgba(59,209,211,0.3)', color: '#3bd1d3' }}>
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className={styles.heroTitle}>Application Submitted!</h2>
            <p className={styles.heroDesc}>
              Your KYC documents have been successfully uploaded and are currently under review. 
              We will notify you via email once the verification is complete (usually within 24 hours).
            </p>
            <button className={styles.startBtn} onClick={() => window.location.href = '/dashboard'}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Complete KYC</h1>
          <p className={styles.pageSub}>Provide your details and documents to verify your identity</p>
        </div>
      </div>

      <div className={styles.splitLayout}>
        {/* ── LEFT: Document Selector ── */}
        <div className={styles.leftPanel}>
          <div>
            <p className={styles.sectionLabel}>Select Document Type</p>
            <div className={styles.docTypeList}>
              {['Passport', 'Driver License', 'National ID'].map(type => (
                <button
                  key={type}
                  className={`${styles.docTypeBtn} ${docType === type ? styles.docTypeBtnActive : ''}`}
                  onClick={() => setDocType(type)}
                >
                  <div className={styles.docTypeIcon}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.docTypeName}>{type}</p>
                    <p className={styles.docTypeSub}>Official government-issued {type.toLowerCase()}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusIcon}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p className={styles.statusTitle}>Pending Verification</p>
              <p className={styles.statusDesc}>Complete the form on the right to unlock full account features.</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className={styles.rightPanel}>
          <form className={styles.formCard} onSubmit={handleSubmit}>
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Personal Details</h3>
              <p className={styles.sectionDesc}>Enter your details exactly as they appear on your ID.</p>
              
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name <span>*</span></label>
                  <input className={styles.input} type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required placeholder="John" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name <span>*</span></label>
                  <input className={styles.input} type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required placeholder="Doe" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email <span>*</span></label>
                  <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number <span>*</span></label>
                  <input className={styles.input} type="tel" name="phone_number" value={formData.phone_number} onChange={handleInputChange} required placeholder="+1 234 567 890" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date of Birth <span>*</span></label>
                  <input className={styles.input} type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Social Username (e.g. Telegram/X) <span>*</span></label>
                  <input className={styles.input} type="text" name="social_username" value={formData.social_username} onChange={handleInputChange} required placeholder="@username" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nationality <span>*</span></label>
                  <input className={styles.input} type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} required placeholder="e.g. American" />
                </div>
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Residential Address</h3>
              <p className={styles.sectionDesc}>Enter your current residential address.</p>
              <div className={styles.grid2}>
                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                  <label className={styles.label}>Full Address <span>*</span></label>
                  <input className={styles.input} type="text" name="address_line" value={formData.address_line} onChange={handleInputChange} required placeholder="Street address" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City <span>*</span></label>
                  <input className={styles.input} type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="New York" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>State / Region <span>*</span></label>
                  <input className={styles.input} type="text" name="state" value={formData.state} onChange={handleInputChange} required placeholder="NY" />
                </div>
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Document Upload</h3>
              <div className={styles.uploadRow}>
                <div className={`${styles.dropZone} ${frontImage ? styles.dropZoneDone : ''}`} onClick={() => document.getElementById('front-upload')?.click()}>
                  <input type="file" id="front-upload" hidden accept="image/*" onChange={(e) => handleFileChange(e, setFrontImage)} />
                  <svg width="28" height="28" fill="none" stroke={frontImage ? '#3bd1d3' : '#94a3b8'} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p>{frontImage ? frontImage.name : 'Upload Front Side'}</p>
                  <span>JPG, PNG or PDF</span>
                </div>

                <div className={`${styles.dropZone} ${backImage ? styles.dropZoneDone : ''}`} onClick={() => document.getElementById('back-upload')?.click()}>
                  <input type="file" id="back-upload" hidden accept="image/*" onChange={(e) => handleFileChange(e, setBackImage)} />
                  <svg width="28" height="28" fill="none" stroke={backImage ? '#3bd1d3' : '#94a3b8'} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <p>{backImage ? backImage.name : 'Upload Back Side'}</p>
                  <span>JPG, PNG or PDF</span>
                </div>
              </div>
            </div>

            <div className={styles.confirmBox}>
              <label className={styles.checkLabel}>
                <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
                I confirm that all provided information is accurate and matches the uploaded documents.
              </label>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={!confirm || submitting || !frontImage || !backImage}>
              {submitting ? 'Submitting...' : 'Submit KYC Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
