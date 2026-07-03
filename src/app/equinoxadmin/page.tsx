'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ENDPOINTS } from '@/utils/apiConfig';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(ENDPOINTS.adminDashboard, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const json = await res.json();
      if (json.status === 'success') {
        setData(json.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, sub }: { title: string; value: string | number; sub: string }) => (
    <div style={{
      background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex',
      flexDirection: 'column', gap: '0.5rem', borderTop: '3px solid #2CD4D1'
    }}>
      <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</span>
      <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{value}</span>
      <span style={{ fontSize: '0.8rem', color: '#4B5563' }}>{sub}</span>
    </div>
  );

  if (loading) {
    return (
      <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: '#6B7280' }}>
        <svg width="20" height="20" fill="none" stroke="#2CD4D1" strokeWidth="2" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Loading dashboard data...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ background: '#FDE8E8', color: '#9B1C1C', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          {error || 'Failed to load dashboard data.'}
        </div>
        <button onClick={fetchDashboard} style={{ background: '#2CD4D1', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'var(--font-inter), sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>Admin Dashboard</h1>
      <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Overview of platform statistics.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Total Users" value={data.users.total} sub={`Verified: ${data.users.verified} | Unverified: ${data.users.unverified}`} />
        <StatCard title="Investment Volume" value={`$${data.investment.total_amount}`} sub={`Active: ${data.investment.active} | Completed: ${data.investment.completed}`} />
        <StatCard title="Total Deposits" value={`$${data.deposit.total_amount}`} sub={`Approved: ${data.deposit.approved} | Pending: ${data.deposit.pending}`} />
        <StatCard title="Total Withdrawals" value={`$${data.withdrawal.total_amount}`} sub={`Completed: ${data.withdrawal.completed} | Pending: ${data.withdrawal.pending}`} />
        <StatCard title="KYC Applications" value={data.kyc.total} sub={`Approved: ${data.kyc.approved} | Pending: ${data.kyc.pending}`} />
        <StatCard title="Referral Bonuses" value={`$${data.referrals.total_amount}`} sub={`Total Referrals: ${data.referrals.count}`} />
      </div>

      <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1.25rem' }}>Recent Users</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                {['Name', 'Balance', 'Deposit', 'KYC'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 0', color: '#6B7280', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.user_data?.map((u: any) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '1rem 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#0B131F', color: '#2CD4D1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                        {u.initials}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: '#111827' }}>{u.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', fontWeight: 600 }}>${u.account_balance}</td>
                  <td style={{ padding: '1rem 0' }}>${u.deposit}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600,
                      background: u.kyc ? '#DEF7EC' : '#FDE8E8',
                      color: u.kyc ? '#03543F' : '#9B1C1C'
                    }}>
                      {u.kyc ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                </tr>
              ))}
              {(!data.user_data || data.user_data.length === 0) && (
                <tr><td colSpan={4} style={{ padding: '2rem 0', color: '#6B7280', textAlign: 'center' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
