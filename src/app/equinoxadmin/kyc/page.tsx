'use client';
import React, { useState, useEffect } from 'react';
import styles from '../admin-table.module.css';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminKYC() {
  const [kycs, setKycs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { fetchKycs(); }, []);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3500); };

  const fetchKycs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminKyc, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      if (data.status === 'success') setKycs(data.data);
      else setError('Failed to load KYC applications.');
    } catch { setError('Network error.'); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id: number) => {
    if (!confirm('Approve this KYC application? This will verify the user.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminKycApprove(id), {
        method: 'PATCH',
        headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_approved: true })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        showToast('KYC approved successfully!');
        fetchKycs();
      } else {
        showToast(data.detail || 'Failed to approve KYC.');
      }
    } catch { showToast('Error approving KYC.'); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>KYC Verifications</h1>
          <p className={styles.subtitle}>Review identity documents and approve user KYC submissions.</p>
        </div>
      </div>

      {error && <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th><th>Full Name</th><th>Email</th><th>Phone</th>
              <th>Nationality</th><th>Documents</th><th>Submitted</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className={styles.emptyState}>Loading KYC applications...</td></tr>
            ) : kycs.length === 0 ? (
              <tr><td colSpan={9} className={styles.emptyState}>No KYC applications found.</td></tr>
            ) : kycs.map(kyc => (
              <tr key={kyc.id}>
                <td>{kyc.id}</td>
                <td><strong>{kyc.first_name} {kyc.last_name}</strong></td>
                <td>{kyc.email}</td>
                <td>{kyc.phone_number}</td>
                <td>{kyc.nationality}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {kyc.document_front && (
                      <a href={`${ENDPOINTS.BASE_URL.slice(0, -1)}${kyc.document_front}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#2CD4D1', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Front ↗
                      </a>
                    )}
                    {kyc.document_back && (
                      <a href={`${ENDPOINTS.BASE_URL.slice(0, -1)}${kyc.document_back}`} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#2CD4D1', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        Back ↗
                      </a>
                    )}
                  </div>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(kyc.submitted_at).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${kyc.is_approved ? styles.badgeSuccess : styles.badgeWarning}`}>
                    {kyc.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>
                  {!kyc.is_approved && (
                    <button className={`${styles.actionBtn} ${styles.approveBtn}`} onClick={() => handleApprove(kyc.id)}>
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
}
