'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

const COIN_COLORS: Record<string, string> = {
  BTC: '#f7931a', ETH: '#627eea', USDT: '#26a17b', LTC: '#bfbbbb',
  BNB: '#f3ba2f', XRP: '#346aa9', SOL: '#9945ff',
};

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);
  const [methods, setMethods] = useState<any[]>([]);
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [proof, setProof] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: ''
  });

  const showModal = (type: 'success' | 'error', title: string, message: string) => {
    setModal({ isOpen: true, type, title, message });
  };

  useEffect(() => {
    authService.getPaymentMethods()
      .then(data => setMethods(data || []))
      .catch(err => console.error('Failed to fetch payment methods:', err))
      .finally(() => setLoadingMethods(false));
  }, []);

  const selectedMethod = methods.find(m => m.id === selectedMethodId);
  const fee = parseFloat(amount || '0') * 0.001;
  const total = parseFloat(amount || '0') + fee;
  const canProceed = parseFloat(amount) >= 10 && selectedMethodId !== null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!proof || !selectedMethodId || !amount) {
      showModal('error', 'Incomplete Details', 'Please fill all fields and upload proof of payment');
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('coin', selectedMethod.name);
      formData.append('proof', proof);
      await authService.submitDeposit(formData);
      showModal('success', 'Deposit Submitted', 'Your deposit request has been submitted and is pending approval.');
      setStep('form');
      setAmount('');
      setProof(null);
      setSelectedMethodId(null);
    } catch (err: any) {
      showModal('error', 'Deposit Failed', err.message || 'Failed to submit deposit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── PAYMENT STEP ─── */
  if (step === 'payment' && selectedMethod) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <button className={styles.backLink} onClick={() => setStep('form')}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <div>
            <h1 className={styles.pageTitle}>Payment Details</h1>
            <p className={styles.pageSub}>Send exactly ${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })} using the address below</p>
          </div>
        </div>

        <div className={styles.payLayout}>
          {/* Left: summary */}
          <div className={styles.payLeft}>
            <div className={styles.amountBubble}>
              <span className={styles.bubbleLabel}>You are sending</span>
              <span className={styles.bubbleAmt}>${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className={styles.payInfoBlock}>
              <p className={styles.payInfoTitle}>Transaction Summary</p>
              <div className={styles.payInfoRow}><span>Deposit Amount</span><span>${parseFloat(amount).toFixed(2)}</span></div>
              <div className={styles.payInfoRow}><span>Processing Fee (0.1%)</span><span>${fee.toFixed(4)}</span></div>
              <div className={styles.payInfoRow}><span>Total</span><span style={{ color: '#3bd1d3', fontWeight: 800 }}>${total.toFixed(2)}</span></div>
              <div className={styles.payInfoRow}><span>Network</span><span>{selectedMethod.network}</span></div>
              <div className={styles.payInfoRow}><span>Coin</span><span>{selectedMethod.name}</span></div>
            </div>

            <div className={styles.secureNote}>
              <svg width="16" height="16" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              All transactions use 256-bit SSL encryption.
            </div>
          </div>

          {/* Right: address & upload */}
          <div className={styles.payRight}>
            <h2 className={styles.payTitle}>Send Payment</h2>

            <div className={styles.addressBlock}>
              <span className={styles.addressBlockLabel}>{selectedMethod.name} Wallet Address</span>
              <div className={styles.addressRow}>
                <code className={styles.addressCode}>{selectedMethod.address}</code>
                <button
                  className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ''}`}
                  onClick={() => handleCopy(selectedMethod.address)}
                >
                  {copied
                    ? <><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
                    : <><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy</>
                  }
                </button>
              </div>
              <span className={styles.networkTag}>Network: {selectedMethod.network}</span>
            </div>

            <div className={styles.uploadGroup}>
              <label className={styles.uploadLabel}>Upload Payment Proof</label>
              <div
                className={`${styles.dropZone} ${proof ? styles.dropZoneDone : ''}`}
                onClick={() => document.getElementById('proof-input')?.click()}
              >
                <input type="file" id="proof-input" hidden onChange={e => setProof(e.target.files?.[0] || null)} accept="image/*" />
                {proof ? (
                  <>
                    <svg width="32" height="32" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
                    <p style={{ color: '#059669' }}>{proof.name}</p>
                  </>
                ) : (
                  <>
                    <svg width="32" height="32" fill="none" stroke="#cbd5e1" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p>Click to upload payment proof</p>
                    <span>PNG, JPG or JPEG accepted</span>
                  </>
                )}
              </div>
            </div>

            <div className={styles.payActions}>
              <button className={styles.backBtn} onClick={() => setStep('form')}>← Back</button>
              <button className={styles.submitPayBtn} disabled={!proof || submitting} onClick={handleSubmit}>
                {submitting ? 'Submitting...' : 'Submit Payment →'}
              </button>
            </div>
          </div>
        </div>

        <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
      </div>
    );
  }

  /* ─── FORM STEP ─── */
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Fund Account Balance</h1>
          <p className={styles.pageSub}>Add funds to your Equinox trading account instantly</p>
        </div>
      </div>

      <div className={styles.splitLayout}>
        {/* LEFT: method selector */}
        <div className={styles.leftPanel}>
          <div>
            <p className={styles.sectionLabel}>Select Method</p>
            <div className={styles.methodList}>
              <button className={`${styles.methodItem} ${styles.methodItemActive}`}>
                <div className={styles.methodIconBox}>
                  <svg width="20" height="20" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M8 12h8"/></svg>
                </div>
                <div>
                  <p className={styles.methodName}>Crypto</p>
                  <p className={styles.methodDesc}>BTC · ETH · USDT · and more</p>
                </div>
                <div className={`${styles.methodRadio} ${styles.methodItemActive}`} />
              </button>
            </div>
          </div>

          <div>
            <p className={styles.sectionLabel}>Select Coin</p>
            {loadingMethods ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ height: '60px', background: '#f8fafc', borderRadius: '12px', animation: 'pulse 1.5s infinite' }} />
                ))}
              </div>
            ) : (
              <div className={styles.coinList}>
                {methods.map(m => (
                  <button
                    key={m.id}
                    className={`${styles.coinItem} ${selectedMethodId === m.id ? styles.coinItemActive : ''}`}
                    onClick={() => setSelectedMethodId(m.id)}
                  >
                    <div
                      className={styles.coinAvatar}
                      style={{ background: COIN_COLORS[m.name?.toUpperCase()] || '#3bd1d3' }}
                    >
                      {m.name?.slice(0, 1)}
                    </div>
                    <div>
                      <p className={styles.coinName}>{m.name}</p>
                      <p className={styles.coinNetwork}>{m.network}</p>
                    </div>
                    {selectedMethodId === m.id && (
                      <svg style={{ marginLeft: 'auto', flexShrink: 0 }} width="18" height="18" fill="none" stroke="#3bd1d3" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: amount entry */}
        <div className={styles.rightPanel}>
          <div className={styles.amountCard}>
            <h2 className={styles.amountCardTitle}>Enter Deposit Amount</h2>
            <p className={styles.amountCardSub}>Choose or type your preferred deposit amount below</p>

            <span className={styles.amountLabel}>Amount (USD)</span>
            <div className={styles.bigAmountField}>
              <span className={styles.bigCurrencySymbol}>$</span>
              <input
                type="number"
                placeholder="100"
                min="10"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <p className={styles.amountHint}>Min: $10 · No maximum limit</p>

            <div className={styles.quickChips}>
              {['100', '500', '1000', '5000'].map(v => (
                <button
                  key={v}
                  className={`${styles.chip} ${amount === v ? styles.chipActive : ''}`}
                  onClick={() => setAmount(v)}
                >
                  ${parseInt(v).toLocaleString()}
                </button>
              ))}
            </div>

            <button className={styles.continueBtn} disabled={!canProceed} onClick={() => setStep('payment')}>
              Continue →
            </button>
          </div>

          <div className={styles.summaryStrip}>
            <div className={styles.stripItem}>
              <span className={styles.stripLabel}>Amount</span>
              <span className={styles.stripValue}>${parseFloat(amount || '0').toFixed(2)}</span>
            </div>
            <div className={styles.stripDivider} />
            <div className={styles.stripItem}>
              <span className={styles.stripLabel}>Processing Fee</span>
              <span className={styles.stripValue}>${fee.toFixed(4)}</span>
            </div>
            <div className={styles.stripDivider} />
            <div className={styles.stripItem}>
              <span className={styles.stripLabel}>Total</span>
              <span className={styles.stripValueTeal}>${total.toFixed(2)}</span>
            </div>
            <div className={styles.stripDivider} />
            <div className={styles.stripItem}>
              <span className={styles.stripLabel}>Selected Coin</span>
              <span className={styles.stripValue}>{selectedMethod?.name || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
    </div>
  );
}
