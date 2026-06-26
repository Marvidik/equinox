'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

type Step = 'form' | 'withdraw';

export default function WithdrawPage() {
  const [step, setStep] = useState<Step>('form');
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  const [amount, setAmount] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // OTP cooldown timer
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const t = setTimeout(() => setOtpCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');
    if (password.length < 6) {
      setVerifyError('Password must be at least 6 characters.');
      return;
    }
    setVerifying(true);
    await new Promise(r => setTimeout(r, 1200));
    setVerifying(false);
    setShowModal(false);
    setStep('withdraw');
  };

  const handleRequestOtp = () => {
    setOtpSent(true);
    setOtpCooldown(60);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      {/* ── PASSWORD VERIFY MODAL ── */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalShieldWrap}>
              <div className={styles.modalShieldRing}>
                <svg width="32" height="32" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
            </div>
            <div className={styles.modalHead}>
              <h2>Secure Access Required</h2>
              <p>Sensitive section verification</p>
            </div>

            <div className={styles.noticeBox}>
              <div className={styles.noticeIcon}>
                <svg width="18" height="18" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className={styles.noticeBold}>Security Notice</p>
                <p className={styles.noticeBody}>You&apos;re accessing a sensitive section. Please verify your identity by entering your account password.</p>
              </div>
            </div>

            <form onSubmit={handleVerify}>
              <label className={styles.label}>Account Password</label>
              <div className={`${styles.inputField} ${verifyError ? styles.inputError : ''}`}>
                <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setVerifyError(''); }}
                  autoFocus
                />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(s => !s)}>
                  {showPassword
                    ? <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {verifyError && <p className={styles.errorText}>{verifyError}</p>}

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => window.history.back()}>Cancel</button>
                <button type="submit" className={styles.verifyBtn} disabled={verifying}>
                  {verifying ? (
                    <><span className={styles.spinner}/> Verifying…</>
                  ) : (
                    <><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Verify Identity</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── WITHDRAWAL FORM (shown after verification) ── */}
      {step === 'withdraw' && (
        <div className={styles.formPage}>
          <div className={styles.formPageHeader}>
            <div className={styles.headerBadge}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div>
              <h1 className={styles.formTitle}>Withdraw Funds</h1>
              <p className={styles.formSub}>Enter your USDT TRC20 details below</p>
            </div>
          </div>

          {submitted ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <svg width="40" height="40" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Withdrawal Request Submitted!</h3>
              <p>Your request is being processed. You will receive a confirmation to your email within 24–48 hours.</p>
              <button className={styles.newWithdrawBtn} onClick={() => { setSubmitted(false); setAmount(''); setUsdtAddress(''); setOtp(''); setOtpSent(false); }}>
                Make Another Withdrawal
              </button>
            </div>
          ) : (
            <div className={styles.withdrawLayout}>
              <div className={styles.withdrawMain}>
                <div className={styles.withdrawCard}>
                  <form onSubmit={handleSubmit}>
                    {/* Amount */}
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Enter Amount to Withdraw ($)</label>
                      <div className={styles.amountField}>
                        <span className={styles.currencySymbol}>$</span>
                        <input type="number" placeholder="0.00" min="1" value={amount} onChange={e => setAmount(e.target.value)} required />
                      </div>
                    </div>

                    {/* Address */}
                    <div className={styles.formGroup}>
                      <label className={styles.label}>USDT TRC20 Address</label>
                      <div className={styles.inputField}>
                        <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type="text" placeholder="Enter USDT TRC20 Address" value={usdtAddress} onChange={e => setUsdtAddress(e.target.value)} required />
                      </div>
                    </div>

                    {/* OTP */}
                    <div className={styles.formGroup}>
                      <label className={styles.label}>One-Time Password (OTP)</label>
                      <div className={styles.otpGroup}>
                        <div className={styles.inputField}>
                          <svg width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.95a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} />
                        </div>
                        <button type="button" className={`${styles.otpBtn} ${otpSent ? styles.otpSent : ''}`} onClick={handleRequestOtp} disabled={otpCooldown > 0}>
                          {otpCooldown > 0 ? `Resend in ${otpCooldown}s` : otpSent ? '✓ Resend OTP' : 'Request OTP'}
                        </button>
                      </div>
                      <p className={styles.hint}>OTP will be sent to your email when you request</p>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={submitting || !amount || !usdtAddress}>
                      {submitting ? <><span className={styles.spinner}/> Processing…</> : 'Submit Withdrawal Request →'}
                    </button>
                  </form>
                </div>
              </div>

              <div className={styles.withdrawSide}>
                <div className={styles.summaryCard}>
                  <h3 className={styles.sideTitle}>Withdrawal Summary</h3>
                  <div className={styles.summaryRow}><span>Amount</span><strong>${parseFloat(amount || '0').toFixed(2)}</strong></div>
                  <div className={styles.summaryRow}><span>Processing Fee</span><strong>$0.00</strong></div>
                  <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>You Receive</span><strong>${parseFloat(amount || '0').toFixed(2)}</strong></div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div>
                    <p className={styles.infoTitle}>Secure Withdrawal</p>
                    <p className={styles.infoBody}>Protected with OTP verification and encrypted protocols. Processed within 24–48 hours.</p>
                  </div>
                </div>

                <div className={styles.warningCard}>
                  <svg width="18" height="18" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  <p>Ensure your USDT TRC20 address is correct. Transactions cannot be reversed once submitted.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
