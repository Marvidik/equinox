'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { COUNTRIES } from '@/lib/countries';
import { authService } from '@/services/authService';
import StatusModal from '@/components/StatusModal';

type Tab = 'personal' | 'withdrawal' | 'password' | 'other';

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('personal');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success' as 'success' | 'error', title: '', message: '' });

  /* ── Personal ── */
  const [fullname, setFullname]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [country, setCountry]     = useState('');
  const [address, setAddress]     = useState('');
  const [pSaved, setPSaved]       = useState(false);

  /* ── Withdrawal ── */
  const [bankName, setBankName]   = useState('');
  const [accName, setAccName]     = useState('');
  const [accNum, setAccNum]       = useState('');
  const [swift, setSwift]         = useState('');
  const [btc, setBtc]             = useState('');
  const [eth, setEth]             = useState('');
  const [ltc, setLtc]             = useState('');
  const [usdt, setUsdt]           = useState('');
  const [wSaved, setWSaved]       = useState(false);

  /* ── Password ── */
  const [oldPass, setOldPass]         = useState('');
  const [newPass, setNewPass]         = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showOld, setShowOld]         = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showCon, setShowCon]         = useState(false);
  const [passErr, setPassErr]         = useState('');
  const [passSaved, setPassSaved]     = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  /* ── Other ── */
  const [otpEmail, setOtpEmail]     = useState(true);
  const [profitEmail, setProfitEmail] = useState(false);
  const [planEmail, setPlanEmail]   = useState(true);
  const [oSaved, setOSaved]         = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user } = authService.getSession();
        if (user) {
          setFullname(user.full_name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setCountry(user.country || '');
          setAddress(user.address || '');
        }

        const withdrawData = await authService.getWithdrawalInfo();
        if (withdrawData) {
          const info = Array.isArray(withdrawData) ? withdrawData[0] : withdrawData;
          if (info) {
            setBankName(info.bank_name || '');
            setAccName(info.account_name || '');
            setAccNum(info.account_number || '');
            setSwift(info.swift_code || '');
            setBtc(info.bitcoin_address || '');
            setEth(info.ethereum_address || '');
            setLtc(info.litecoin_address || '');
            setUsdt(info.usdt_trc20_address || '');
          }
        }

        const settingsData = await authService.getOtherSettings();
        if (settingsData) {
          const s = Array.isArray(settingsData) ? settingsData[0] : settingsData;
          if (s) {
            setOtpEmail(s.send_otp_on_withdrawal ?? true);
            setProfitEmail(s.notify_on_profit ?? false);
            setPlanEmail(s.notify_on_plan_expiry ?? true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch settings data:", err);
      }
    };
    fetchData();
  }, []);

  const savePersonal = async () => {
    setLoading(true);
    try {
      await authService.updateProfile({
        full_name: fullname,
        phone,
        country,
        address
      });
      const { token, user } = authService.getSession();
      authService.setSession(token!, { ...user, full_name: fullname, phone, country, address });
      setPSaved(true);
      setTimeout(() => setPSaved(false), 3000);
    } catch (err: any) {
      setModal({ isOpen: true, type: 'error', title: 'Update Failed', message: err.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const saveWithdrawal = async () => {
    setLoading(true);
    try {
      await authService.createWithdrawalInfo({
        bank_name: bankName,
        account_name: accName,
        account_number: accNum,
        swift_code: swift,
        bitcoin_address: btc,
        ethereum_address: eth,
        litecoin_address: ltc,
        usdt_trc20_address: usdt
      });
      setWSaved(true);
      setTimeout(() => setWSaved(false), 3000);
    } catch (err: any) {
      setModal({ isOpen: true, type: 'error', title: 'Update Failed', message: err.message || 'Failed to update withdrawal info.' });
    } finally {
      setLoading(false);
    }
  };

  const savePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassErr('');
    if (newPass.length < 6) { setPassErr('New password must be at least 6 characters.'); return; }
    if (newPass !== confirmPass) { setPassErr('Passwords do not match.'); return; }
    setPassLoading(true);
    try {
      await authService.changePassword({
        old_password: oldPass,
        new_password: newPass
      });
      setPassSaved(true);
      setOldPass(''); setNewPass(''); setConfirmPass('');
      setTimeout(() => setPassSaved(false), 3000);
    } catch (err: any) {
      setPassErr(err.message || 'Failed to update password.');
    } finally {
      setPassLoading(false);
    }
  };

  const saveOther = async () => {
    setLoading(true);
    try {
      await authService.updateOtherSettings({
        send_otp_on_withdrawal: otpEmail,
        notify_on_profit: profitEmail,
        notify_on_plan_expiry: planEmail
      });
      setOSaved(true);
      setTimeout(() => setOSaved(false), 3000);
    } catch (err: any) {
      setModal({ isOpen: true, type: 'error', title: 'Update Failed', message: err.message || 'Failed to update settings.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const EyeIcon = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button type="button" className={styles.eyeBtn} onClick={toggle} tabIndex={-1}>
      <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
        {show
          ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
          : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
        }
      </svg>
    </button>
  );

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'personal', label: 'Personal Settings',
      icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    },
    {
      key: 'withdrawal', label: 'Withdrawal Settings',
      icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    },
    {
      key: 'password', label: 'Password / Security',
      icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    },
    {
      key: 'other', label: 'Other Settings',
      icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.74 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.74 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Account Settings</h1>
          <p className={styles.pageSub}>Manage your profile, security and notification preferences</p>
        </div>
      </div>

      <div className={styles.card}>
        <nav className={styles.tabNav}>
          {tabs.map(t => (
            <button
              key={t.key}
              className={`${styles.tabBtn} ${tab === t.key ? styles.tabActive : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.tabBody}>
          {/* ── PERSONAL ── */}
          {tab === 'personal' && (
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Personal Information</h2>
                <p>Update your personal details and contact information.</p>
              </div>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Enter your full name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" disabled />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 000 000 0000" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Country</label>
                  <div className={styles.selectWrap}>
                    <select className={styles.select} value={country} onChange={e => setCountry(e.target.value)}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className={styles.selectChevron} width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Address</label>
                <textarea className={styles.textarea} value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your full address" rows={3} />
              </div>
              <div className={styles.actionRow}>
                <button className={styles.saveBtn} onClick={savePersonal} disabled={loading}>
                  {pSaved ? <><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Saved!</> : loading ? 'Updating...' : 'Update Profile'}
                </button>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* ── WITHDRAWAL ── */}
          {tab === 'withdrawal' && (
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Withdrawal Settings</h2>
                <p>Set up your bank and crypto wallet details for withdrawals.</p>
              </div>
              <div className={styles.subSection}>
                <div className={styles.subSectionLabel}>
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  Bank Details
                </div>
                <div className={styles.grid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Bank Name</label>
                    <input className={styles.input} value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Enter bank name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Account Name</label>
                    <input className={styles.input} value={accName} onChange={e => setAccName(e.target.value)} placeholder="Enter account name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Account Number</label>
                    <input className={styles.input} value={accNum} onChange={e => setAccNum(e.target.value)} placeholder="Enter account number" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Swift Code</label>
                    <input className={styles.input} value={swift} onChange={e => setSwift(e.target.value)} placeholder="Enter swift code" />
                  </div>
                </div>
              </div>

              <div className={styles.subSection}>
                <div className={styles.subSectionLabel}>
                  <svg width="16" height="16" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
                  Crypto Wallets
                </div>
                <div className={styles.grid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Bitcoin (BTC)</label>
                    <input className={styles.input} value={btc} onChange={e => setBtc(e.target.value)} placeholder="Enter Bitcoin address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Ethereum (ETH)</label>
                    <input className={styles.input} value={eth} onChange={e => setEth(e.target.value)} placeholder="Enter Ethereum address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Litecoin (LTC)</label>
                    <input className={styles.input} value={ltc} onChange={e => setLtc(e.target.value)} placeholder="Enter Litecoin address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>USDT (TRC20)</label>
                    <input className={styles.input} value={usdt} onChange={e => setUsdt(e.target.value)} placeholder="Enter USDT TRC20 address" />
                  </div>
                </div>
              </div>
              <div className={styles.actionRow}>
                <button className={styles.saveBtn} onClick={saveWithdrawal} disabled={loading}>
                  {wSaved ? <><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Saved!</> : loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}

          {/* ── PASSWORD ── */}
          {tab === 'password' && (
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Password &amp; Security</h2>
                <p>Keep your account safe by using a strong, unique password.</p>
              </div>
              <div className={styles.passwordCard}>
                <div className={styles.securityTip}>
                  <svg width="18" height="18" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <div>
                    <p className={styles.tipTitle}>Security Tips</p>
                    <p className={styles.tipBody}>Use at least 8 characters with a mix of letters, numbers, and symbols.</p>
                  </div>
                </div>
                <form onSubmit={savePassword}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Password</label>
                    <div className={styles.passField}>
                      <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input type={showOld ? 'text' : 'password'} placeholder="Enter your current password" value={oldPass} onChange={e => setOldPass(e.target.value)} required />
                      <EyeIcon show={showOld} toggle={() => setShowOld(s => !s)} />
                    </div>
                  </div>
                  <div className={styles.grid2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>New Password</label>
                      <div className={styles.passField}>
                        <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type={showNew ? 'text' : 'password'} placeholder="Enter new password" value={newPass} onChange={e => { setNewPass(e.target.value); setPassErr(''); }} required />
                        <EyeIcon show={showNew} toggle={() => setShowNew(s => !s)} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Confirm New Password</label>
                      <div className={styles.passField}>
                        <svg width="17" height="17" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <input type={showCon ? 'text' : 'password'} placeholder="Confirm new password" value={confirmPass} onChange={e => { setConfirmPass(e.target.value); setPassErr(''); }} required />
                        <EyeIcon show={showCon} toggle={() => setShowCon(s => !s)} />
                      </div>
                    </div>
                  </div>
                  {passErr && (
                    <div className={styles.errorBox}>
                      <svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {passErr}
                    </div>
                  )}
                  {passSaved && (
                    <div className={styles.successBox}>
                      <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      Password updated successfully!
                    </div>
                  )}
                  <div className={styles.actionRow}>
                    <button type="submit" className={styles.saveBtn} disabled={passLoading}>{passLoading ? 'Updating…' : 'Update Password'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ── OTHER ── */}
          {tab === 'other' && (
            <div className={styles.section}>
              <div className={styles.sectionHeading}>
                <h2>Notification Preferences</h2>
                <p>Control which email notifications you want to receive.</p>
              </div>
              <div className={styles.toggleList}>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <p className={styles.toggleTitle}>Withdrawal OTP Confirmation</p>
                    <p className={styles.toggleDesc}>Send confirmation OTP to my email when withdrawing my funds.</p>
                  </div>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="otp" checked={otpEmail} onChange={() => setOtpEmail(true)} /><span>Yes</span></label>
                    <label className={styles.radioLabel}><input type="radio" name="otp" checked={!otpEmail} onChange={() => setOtpEmail(false)} /><span>No</span></label>
                  </div>
                </div>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <p className={styles.toggleTitle}>Profit Notification</p>
                    <p className={styles.toggleDesc}>Send me an email when I receive profit from my investment plan.</p>
                  </div>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="profit" checked={profitEmail} onChange={() => setProfitEmail(true)} /><span>Yes</span></label>
                    <label className={styles.radioLabel}><input type="radio" name="profit" checked={!profitEmail} onChange={() => setProfitEmail(false)} /><span>No</span></label>
                  </div>
                </div>
                <div className={styles.toggleItem}>
                  <div className={styles.toggleInfo}>
                    <p className={styles.toggleTitle}>Plan Expiry Notification</p>
                    <p className={styles.toggleDesc}>Send me an email when my investment plan expires.</p>
                  </div>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}><input type="radio" name="plan" checked={planEmail} onChange={() => setPlanEmail(true)} /><span>Yes</span></label>
                    <label className={styles.radioLabel}><input type="radio" name="plan" checked={!planEmail} onChange={() => setPlanEmail(false)} /><span>No</span></label>
                  </div>
                </div>
              </div>
              <div className={styles.actionRow}>
                <button className={styles.saveBtn} onClick={saveOther} disabled={loading}>
                  {oSaved ? <><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Saved!</> : loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <StatusModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} type={modal.type} title={modal.title} message={modal.message} />
    </div>
  );
}
