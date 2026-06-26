'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

type Step = 'initial' | 'form' | 'success';

export default function KYCPage() {
  const [step, setStep] = useState<Step>('initial');
  const [docType, setDocType] = useState<'passport' | 'id' | 'license'>('passport');

  // Form states
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [social, setSocial] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [nationality, setNationality] = useState('');

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className={styles.pageWrap}>
        <div className={styles.centerCard}>
          <div className={styles.successIcon}>
            <svg width="40" height="40" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2>Application Submitted!</h2>
          <p>Your KYC application has been received. We will review it shortly and notify you of the status.</p>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className={styles.pageWrap}>
        <div className={styles.formHeader}>
          <h2>Begin your ID-Verification</h2>
          <p>To comply with regulation each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.</p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Personal Details</h3>
              <p className={styles.sectionDesc}>Your simple personal information required for identification</p>
              <p className={styles.sectionNote}>Please type carefully and fill out the form with your personal details. You can&apos;t edit these details once you submitted the form.</p>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First name <span>*</span></label>
                  <input type="text" className={styles.input} value={fname} onChange={e => setFname(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last name <span>*</span></label>
                  <input type="text" className={styles.input} value={lname} onChange={e => setLname(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email <span>*</span></label>
                  <div className={styles.inputWrap}>
                    <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input type="email" className={styles.inputIcon} value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number <span>*</span></label>
                  <div className={styles.inputWrap}>
                    <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <input type="tel" className={styles.inputIcon} value={phone} onChange={e => setPhone(e.target.value)} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date of birth <span>*</span></label>
                  <div className={styles.inputWrap}>
                    <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <input type="text" placeholder="dd/mm/yyyy" className={styles.inputIcon} value={dob} onChange={e => setDob(e.target.value)} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Twitter or Facebook username <span>*</span></label>
                  <input type="text" className={styles.input} value={social} onChange={e => setSocial(e.target.value)} required />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Your Address</h3>
              <p className={styles.sectionDesc}>Your simple location information required for identification</p>
              
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Address line <span>*</span></label>
                  <div className={styles.inputWrap}>
                    <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <input type="text" className={styles.inputIcon} value={address} onChange={e => setAddress(e.target.value)} required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City <span>*</span></label>
                  <input type="text" className={styles.input} value={city} onChange={e => setCity(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>State <span>*</span></label>
                  <input type="text" className={styles.input} value={state} onChange={e => setState(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nationality <span>*</span></label>
                  <div className={styles.inputWrap}>
                    <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <input type="text" className={styles.inputIcon} value={nationality} onChange={e => setNationality(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionTitle}>Document Upload</h3>
              <p className={styles.sectionDesc}>Your simple personal document required for identification</p>
              
              <div className={styles.docToggles}>
                <button type="button" className={`${styles.docBtn} ${docType === 'passport' ? styles.docActive : ''}`} onClick={() => setDocType('passport')}>
                  <span className={styles.docIconWrap}><svg width="20" height="20" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg></span>
                  Int&apos;l Passport
                </button>
                <button type="button" className={`${styles.docBtn} ${docType === 'id' ? styles.docActive : ''}`} onClick={() => setDocType('id')}>
                  <span className={styles.docIconWrap}><svg width="20" height="20" fill="none" stroke="#9333ea" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><circle cx="8" cy="10" r="3"/><line x1="14" y1="15" x2="20" y2="15"/></svg></span>
                  National ID
                </button>
                <button type="button" className={`${styles.docBtn} ${docType === 'license' ? styles.docActive : ''}`} onClick={() => setDocType('license')}>
                  <span className={styles.docIconWrap}><svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><circle cx="7" cy="15" r="2"/><circle cx="17" cy="15" r="2"/></svg></span>
                  Drivers License
                </button>
              </div>

              <div className={styles.criteriaBox}>
                <p className={styles.criteriaTitle}>To avoid delays when verifying account, Please make sure your document meets the criteria below:</p>
                <ul className={styles.criteriaList}>
                  <li><svg width="14" height="14" fill="#16a34a" viewBox="0 0 24 24"><path d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Chosen credential must not have expired.</li>
                  <li><svg width="14" height="14" fill="#16a34a" viewBox="0 0 24 24"><path d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Document should be good condition and clearly visible.</li>
                  <li><svg width="14" height="14" fill="#16a34a" viewBox="0 0 24 24"><path d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Make sure that there is no light glare on the card.</li>
                </ul>
              </div>

              <div className={styles.uploadBlock}>
                <label className={styles.label}>Upload front side <span>*</span></label>
                <div className={styles.uploadRow}>
                  <label className={styles.fileInputWrap}>
                    <input type="file" hidden onChange={e => setFrontFile(e.target.files?.[0] || null)} />
                    <span className={styles.fileLabel}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      {frontFile ? frontFile.name : 'Choose file'}
                    </span>
                  </label>
                  <div className={styles.uploadPreviewIcon}><svg width="40" height="40" fill="none" stroke="#9ca3af" strokeWidth="1" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><circle cx="8" cy="12" r="3"/><line x1="14" y1="12" x2="20" y2="12"/><line x1="14" y1="15" x2="20" y2="15"/></svg></div>
                </div>
              </div>

              <div className={styles.uploadBlock}>
                <label className={styles.label}>Upload back side <span>*</span></label>
                <div className={styles.uploadRow}>
                  <label className={styles.fileInputWrap}>
                    <input type="file" hidden onChange={e => setBackFile(e.target.files?.[0] || null)} />
                    <span className={styles.fileLabel}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      {backFile ? backFile.name : 'Choose file'}
                    </span>
                  </label>
                  <div className={styles.uploadPreviewIcon}><svg width="40" height="40" fill="none" stroke="#9ca3af" strokeWidth="1" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="15" x2="18" y2="15"/></svg></div>
                </div>
              </div>

              <div className={styles.confirmBox}>
                <label className={styles.checkLabel}>
                  <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                  <span>All The Information I Have Entered Is Correct.</span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={!confirmed}>Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Initial step
  return (
    <div className={styles.pageWrap}>
      <div className={styles.centerCard}>
        <h2 className={styles.pageTitle}>KYC Verification</h2>
        <p className={styles.pageDesc}>To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.</p>
        
        <div className={styles.iconBig}>
          <svg width="48" height="48" fill="none" stroke="#3b82f6" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>

        <p className={styles.statusText}>You have not submitted your necessary documents to verify your identity. In order to enjoy our investment system, please verify your identity.</p>

        <button className={styles.startBtn} onClick={() => setStep('form')}>
          Click here to complete your KYC
        </button>
      </div>

      <div className={styles.helpCard}>
        <div className={styles.helpLeft}>
          <div className={styles.helpIcon}>
            <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div>
            <h3>We&apos;re here to help you!</h3>
            <p>Ask a question, manage request, report an issue. Our support team will get back to you by email.</p>
          </div>
        </div>
        <button className={styles.supportBtn}>Get Support Now</button>
      </div>

      <div className={styles.infoCardsRow}>
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.dotGreen}></div>
            <h4>Secure Process</h4>
          </div>
          <p>Your documents are encrypted and processed securely according to international standards.</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <div className={styles.dotBlue}></div>
            <h4>Quick Verification</h4>
          </div>
          <p>Most verifications are completed within 24-48 hours after document submission.</p>
        </div>
      </div>
    </div>
  );
}
