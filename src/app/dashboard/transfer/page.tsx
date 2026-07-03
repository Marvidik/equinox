'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

type Step = 'verify' | 'transfer' | 'success';

export default function TransferPage() {
  const [step, setStep] = useState<Step>('verify');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transferPass, setTransferPass] = useState('');
  const [showTPass, setShowTPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);

  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });
  const showModal = (type: 'success' | 'error', title: string, message: string) => setModal({ isOpen: true, type, title, message });

  useEffect(() => {
    authService.getDashboardData().then(d => setBalance(d?.account_balance || 0)).catch(() => {});
  }, []);

  const fee = parseFloat(amount || '0') * 0.02;
  const totalSend = parseFloat(amount || '0') + fee;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');
    if (password.length < 6) { setVerifyError('Password must be at least 6 characters.'); return; }
    setVerifying(true);
    await new Promise(r => setTimeout(r, 1200));
    setVerifying(false);
    setStep('transfer');
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount || !transferPass) {
      showModal('error', 'Missing Fields', 'Please fill all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      await authService.submitTransfer({
        amount: parseFloat(amount),
        recipient,
        password: transferPass
      });
      setStep('success');
    } catch (err: any) {
      showModal('error', 'Transfer Failed', err.message || 'Failed to process transfer.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.successCard}>
          <div className={styles.successIconWrap}>
            <svg width="40" height="40" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2>Transfer Successful!</h2>
          <p>You transferred <strong>${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })}</strong> to <strong>{recipient}</strong>.</p>
          <button className={styles.ctaBtn} onClick={() => { setStep('verify'); setPassword(''); setRecipient(''); setAmount(''); setTransferPass(''); }}>
            Make Another Transfer
          </button>
        </div>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div className={styles.page}>
        <div className={styles.verifyWrap}>
          <div className={styles.shieldRing}>
            <svg width="30" height="30" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 className={styles.verifyTitle}>Secure Verification</h2>
          <p className={styles.verifySub}>Confirm your identity before making a transfer.</p>
          <div className={styles.noticeBox}>
            <svg width="17" height="17" fill="none" stroke="#d97706" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <p>You&apos;re accessing a sensitive section. Enter your account password to proceed.</p>
          </div>
          <form onSubmit={handleVerify} className={styles.verifyForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Account Password</label>
              <div className={`${styles.inputField} ${verifyError ? styles.inputError : ''}`}>
                <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={password}
                  onChange={e => { setPassword(e.target.value); setVerifyError(''); }} autoFocus />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPass(s => !s)}>
                  <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                    {showPass
                      ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                      : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    }
                  </svg>
                </button>
              </div>
              {verifyError && <p className={styles.errorText}>{verifyError}</p>}
            </div>
            <div className={styles.verifyActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => window.history.back()}>Cancel</button>
              <button type="submit" className={styles.verifyBtn} disabled={verifying}>
                {verifying ? <><span className={styles.spinner}/> Verifying…</> : 'Verify Identity'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Transfer Funds</h1>
          <p className={styles.pageSub}>Send funds to another Equinox account instantly</p>
        </div>
      </div>

      <div className={styles.transferLayout}>
        <div className={styles.transferMain}>
          <div className={styles.balanceStrip}>
            <div className={styles.balanceIcon}>
              <svg width="22" height="22" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div>
              <p className={styles.balanceLabel}>Your Account Balance</p>
              <p className={styles.balanceValue}>{balance !== null ? `$${balance.toLocaleString('en', { minimumFractionDigits: 2 })}` : '$...'}</p>
            </div>
          </div>

          <div className={styles.formCard}>
            <form onSubmit={handleTransfer}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Recipient Email or Username <span className={styles.required}>*</span></label>
                <div className={styles.inputField}>
                  <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input type="text" placeholder="Enter recipient email or username" value={recipient} onChange={e => setRecipient(e.target.value)} required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Amount ($) <span className={styles.required}>*</span></label>
                <div className={styles.amountField}>
                  <span className={styles.currencySymbol}>$</span>
                  <input type="number" placeholder="0.00" min="1" value={amount} onChange={e => setAmount(e.target.value)} required />
                </div>
                <p className={styles.hint}>Transfer Charges: <strong className={styles.feeHighlight}>2%</strong>{amount && ` · Fee: $${fee.toFixed(2)}`}</p>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password <span className={styles.required}>*</span></label>
                <div className={styles.inputField}>
                  <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input type={showTPass ? 'text' : 'password'} placeholder="Enter your password" value={transferPass} onChange={e => setTransferPass(e.target.value)} required />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowTPass(s => !s)}>
                    <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
                      {showTPass
                        ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                      }
                    </svg>
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.proceedBtn} disabled={submitting || !recipient || !amount || !transferPass}>
                {submitting ? <><span className={styles.spinner}/> Processing…</> : 'Proceed →'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.transferSide}>
          <div className={styles.summaryCard}>
            <h3 className={styles.sideTitle}>Transfer Summary</h3>
            <div className={styles.summaryRow}><span>Amount</span><strong>${parseFloat(amount || '0').toFixed(2)}</strong></div>
            <div className={styles.summaryRow}><span>Charge (2%)</span><strong>${fee.toFixed(2)}</strong></div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total Deducted</span><strong>${totalSend.toFixed(2)}</strong></div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className={styles.infoTitle}>Instant Transfers</p>
              <p className={styles.infoBody}>Funds transfer instantly between Equinox accounts. A 2% service charge applies.</p>
            </div>
          </div>
        </div>
      </div>

      <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
    </div>
  );
}
