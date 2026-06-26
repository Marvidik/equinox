'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const PAYMENT_METHODS = [
  { id: 'btc',      label: 'BTC',          sub: 'Bitcoin',      color: '#f7931a', symbol: '₿',  address: 'bc1qf26msu5hvzwu9yyaac28egucj98w56lp76qyq6',     network: 'BTC'   },
  { id: 'usdt',     label: 'USDT (TRC20)', sub: 'USDT',         color: '#26a17b', symbol: '₮',  address: 'TRx8D2N9Y3kpKkT9bRxFtdwBwZ9Aj6PvMN',             network: 'TRC20' },
  { id: 'usdt_erc', label: 'USDT (ERC20)', sub: 'USDT',         color: '#26a17b', symbol: '₮',  address: '0xAbCdEf1234567890AbCdEf1234567890AbCdEf12',        network: 'ERC20' },
  { id: 'usdt_bep', label: 'USDT (BEP20)', sub: 'USDT',         color: '#f3ba2f', symbol: '₮',  address: '0xAbCdEf1234567890AbCdEf1234567890AbCdEf13',        network: 'BEP20' },
  { id: 'eth',      label: 'ETHEREUM',     sub: 'ETH',          color: '#627EEA', symbol: 'Ξ',  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',        network: 'ERC20' },
];

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const method = PAYMENT_METHODS.find(m => m.id === selected);
  const fee = parseFloat(amount || '0') * 0.001;
  const total = parseFloat(amount || '0') + fee;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = () => {
    setUploading(true);
    setTimeout(() => { setUploading(false); setFileUploaded(true); }, 1500);
  };

  // ── STEP: Success ──
  if (step === 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>
            <svg width="44" height="44" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2>Payment Submitted!</h2>
          <p>Your deposit is being verified. Funds will reflect in your account once confirmed on the blockchain.</p>
          <button className={styles.cta} onClick={() => { setStep('form'); setAmount(''); setSelected(null); setFileUploaded(false); }}>
            Make Another Deposit
          </button>
        </div>
      </div>
    );
  }

  // ── STEP: Payment details ──
  if (step === 'payment' && method) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <button className={styles.backLink} onClick={() => setStep('form')}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            Back
          </button>
          <div>
            <h1 className={styles.pageTitle}>Payment Details</h1>
            <p className={styles.pageSub}>Send exactly ${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })} using the address below</p>
          </div>
        </div>

        <div className={styles.payLayout}>
          <div className={styles.payMain}>
            <div className={styles.payCard}>
              {/* Coin pill */}
              <div className={styles.coinPill} style={{ background: `${method.color}18`, border: `1.5px solid ${method.color}40` }}>
                <div className={styles.coinDot} style={{ background: method.color }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}>{method.symbol}</span>
                </div>
                <div>
                  <p className={styles.coinLabel}>{method.label}</p>
                  <p className={styles.coinSub}>{method.network} Network</p>
                </div>
              </div>

              {/* Amount highlight */}
              <div className={styles.amountHighlight}>
                <span className={styles.amountSmall}>You are sending</span>
                <span className={styles.amountBig}>${parseFloat(amount).toLocaleString('en', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Address */}
              <div className={styles.addressBlock}>
                <label>{method.label} Wallet Address</label>
                <div className={styles.addressRow}>
                  <code className={styles.addressCode}>{method.address}</code>
                  <button className={styles.copyBtn} onClick={() => handleCopy(method.address)} title="Copy address">
                    {copied
                      ? <svg width="18" height="18" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      : <svg width="18" height="18" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    }
                  </button>
                </div>
                <span className={styles.networkTag}>Network: {method.network}</span>
              </div>

              {/* Upload */}
              <div className={styles.uploadGroup}>
                <label className={styles.uploadLabel}>Upload Payment Proof</label>
                <label className={`${styles.dropZone} ${fileUploaded ? styles.dropZoneDone : ''}`}>
                  <input type="file" accept="image/*,.pdf" className={styles.hiddenFile} onChange={handleFileChange} />
                  {uploading ? (
                    <><div className={styles.uploadSpinner}/><p>Uploading…</p></>
                  ) : fileUploaded ? (
                    <><svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg><p style={{ color: '#059669' }}>Proof uploaded!</p></>
                  ) : (
                    <><svg width="28" height="28" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><p>Click to upload or drag and drop</p><span>JPEG, PNG, GIF, WEBP, PDF</span></>
                  )}
                </label>
              </div>

              <div className={styles.payActions}>
                <button className={styles.backBtn} onClick={() => setStep('form')}>← Back</button>
                <button className={styles.submitPayBtn} disabled={!fileUploaded} onClick={() => setStep('success')}>
                  Submit Payment →
                </button>
              </div>
            </div>
          </div>

          <div className={styles.paySide}>
            <div className={styles.miniSummary}>
              <p className={styles.miniTitle}>Transaction Summary</p>
              <div className={styles.miniRow}><span>Deposit Amount</span><span>${parseFloat(amount).toFixed(2)}</span></div>
              <div className={styles.miniRow}><span>Processing Fee</span><span>${fee.toFixed(2)}</span></div>
              <div className={`${styles.miniRow} ${styles.miniTotal}`}><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>

            <div className={styles.secureBlock}>
              <div className={styles.secureIconBox}>
                <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              </div>
              <div>
                <p className={styles.secureTitle}>Secure Transactions</p>
                <p className={styles.secureBody}>All deposits use 256-bit SSL encryption and multi-signature verification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: Main form ──
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Fund Account Balance</h1>
          <p className={styles.pageSub}>Add funds to your trading account instantly</p>
        </div>
      </div>

      <div className={styles.depositLayout}>
        <div className={styles.depositMain}>
          <div className={styles.depositCard}>
            {/* Amount */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Deposit Amount</label>
              <div className={styles.amountField}>
                <span className={styles.currencySymbol}>$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  min="50"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <p className={styles.hint}>Minimum deposit: $50.00</p>
            </div>

            {/* Quick amounts */}
            <div className={styles.quickAmounts}>
              {['100', '500', '1000', '5000'].map(v => (
                <button key={v} className={`${styles.quickBtn} ${amount === v ? styles.quickActive : ''}`} onClick={() => setAmount(v)}>
                  ${parseInt(v).toLocaleString()}
                </button>
              ))}
            </div>

            {/* Payment Methods */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Select Payment Method</label>
              <div className={styles.methodGrid}>
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    className={`${styles.methodCard} ${selected === m.id ? styles.methodActive : ''}`}
                    onClick={() => setSelected(m.id)}
                    style={selected === m.id ? { borderColor: m.color, boxShadow: `0 0 0 3px ${m.color}22` } : {}}
                  >
                    <div className={styles.methodIcon} style={{ background: `${m.color}18` }}>
                      <span style={{ color: m.color, fontWeight: 800, fontSize: '1rem' }}>{m.symbol}</span>
                    </div>
                    <div className={styles.methodText}>
                      <p className={styles.methodLabel}>{m.label}</p>
                      <p className={styles.methodSub}>{m.sub}</p>
                    </div>
                    {selected === m.id && (
                      <div className={styles.methodCheck} style={{ background: m.color }}>
                        <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.proceedBtn}
              disabled={!amount || !selected || parseFloat(amount) < 50}
              onClick={() => setStep('payment')}
            >
              Proceed to Payment →
            </button>
          </div>
        </div>

        <div className={styles.depositSide}>
          <div className={styles.summaryCard}>
            <h3 className={styles.sideTitle}>Transaction Summary</h3>
            <div className={styles.summaryRow}><span>Deposit Amount</span><strong>${parseFloat(amount || '0').toFixed(2)}</strong></div>
            <div className={styles.summaryRow}><span>Processing Fee</span><strong>${fee.toFixed(2)}</strong></div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total Deposit</span><strong>${total.toFixed(2)}</strong></div>
          </div>

          <div className={styles.recentCard}>
            <div className={styles.recentHead}>
              <h3 className={styles.sideTitle}>Recent Deposits</h3>
              <button className={styles.viewAll}>View All</button>
            </div>
            <div className={styles.recentItem}>
              <div className={styles.recentLeft}>
                <div className={styles.recentDot} style={{ background: '#f7931a' }}>₿</div>
                <div>
                  <p className={styles.recentLabel}>BTC</p>
                  <p className={styles.recentTime}>7 months ago</p>
                </div>
              </div>
              <span className={styles.recentAmount}>+$315,000</span>
            </div>
          </div>

          <div className={styles.secureBlock}>
            <div className={styles.secureIconBox}>
              <svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div>
              <p className={styles.secureTitle}>Secure Transactions</p>
              <p className={styles.secureBody}>All deposits are secured with 256-bit SSL encryption and multi-signature verification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
