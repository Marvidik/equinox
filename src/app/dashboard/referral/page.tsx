'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const REFERRAL_CODE = 'Martinez';
const REFERRAL_LINK = `https://equinoxglobalassets.com/ref/${REFERRAL_CODE}`;

interface Referral {
  id: number;
  name: string;
  level: number;
  status: 'active' | 'inactive' | 'pending';
  date: string;
}

const REFERRALS: Referral[] = [
  // Uncomment to test populated state:
  // { id: 1, name: 'James Holden',    level: 1, status: 'active',   date: 'Dec 5, 2025'  },
  // { id: 2, name: 'Sarah Okonkwo',   level: 1, status: 'inactive', date: 'Nov 30, 2025' },
  // { id: 3, name: 'Luca Ferretti',   level: 2, status: 'active',   date: 'Nov 18, 2025' },
  // { id: 4, name: 'Priya Nair',      level: 1, status: 'pending',  date: 'Dec 10, 2025' },
];

const PAGE_SIZE_OPTIONS = [5, 10, 25];

export default function ReferralPage() {
  const [copied, setCopied]         = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [search, setSearch]         = useState('');
  const [pageSize, setPageSize]     = useState(10);
  const [page, setPage]             = useState(1);

  const copyLink = () => {
    navigator.clipboard.writeText(REFERRAL_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(REFERRAL_CODE);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  const filtered = REFERRALS.filter(
    r => r.name.toLowerCase().includes(search.toLowerCase()) ||
         r.status.toLowerCase().includes(search.toLowerCase())
  );

  const total  = filtered.length;
  const pages  = Math.max(1, Math.ceil(total / pageSize));
  const sliced = filtered.slice((page - 1) * pageSize, page * pageSize);
  const from   = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to     = Math.min(page * pageSize, total);

  const activeCount   = REFERRALS.filter(r => r.status === 'active').length;
  const totalReferrals = REFERRALS.length;
  const bonusEarned   = activeCount * 25; // $25 per active referral (example)

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerBadge}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.pageTitle}>Referral Program</h1>
          <p className={styles.pageSub}>Invite friends and earn rewards when they join and invest</p>
        </div>
      </div>

      {/* Hero banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroBannerContent}>
          <div className={styles.heroIcon}>
            <svg width="28" height="28" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              <path d="M19 11l1 1 2-2"/>
            </svg>
          </div>
          <div>
            <h2 className={styles.heroTitle}>Refer &amp; Earn</h2>
            <p className={styles.heroDesc}>Share your unique referral link. Earn a bonus for every friend who registers and makes their first investment.</p>
          </div>
        </div>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeLabel}>Bonus per referral</span>
          <span className={styles.heroBadgeValue}>$25</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="cyan">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>Total Referrals</p>
            <p className={styles.statValue}>{totalReferrals}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="green">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>Active Referrals</p>
            <p className={styles.statValue}>{activeCount}</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="purple">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div>
            <p className={styles.statLabel}>Bonus Earned</p>
            <p className={styles.statValue}>${bonusEarned.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Share card */}
      <div className={styles.shareCard}>
        <h3 className={styles.shareTitle}>Your Referral Link</h3>
        <p className={styles.shareDesc}>Share this link with your friends to start earning rewards.</p>

        {/* Link copy */}
        <div className={styles.linkRow}>
          <div className={styles.linkBox}>
            <svg width="16" height="16" fill="none" stroke="#3bd1d3" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <span className={styles.linkText}>{REFERRAL_LINK}</span>
          </div>
          <button className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`} onClick={copyLink}>
            {copied
              ? <><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Copied!</>
              : <><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Link</>
            }
          </button>
        </div>

        {/* Referral ID */}
        <div className={styles.idRow}>
          <span className={styles.idLabel}>Or share your Referral ID:</span>
          <button className={`${styles.idChip} ${codeCopied ? styles.idChipDone : ''}`} onClick={copyCode}>
            <span>{REFERRAL_CODE}</span>
            {codeCopied
              ? <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </button>
        </div>

        {/* Share buttons */}
        <div className={styles.socialRow}>
          <span className={styles.socialLabel}>Share via:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=Join+Equinox+Global+Assets+and+start+investing!+Use+my+referral+link:+${encodeURIComponent(REFERRAL_LINK)}`}
            target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.socialTwitter}`}
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            Twitter
          </a>
          <a
            href={`https://wa.me/?text=Join+Equinox+Global+Assets!+${encodeURIComponent(REFERRAL_LINK)}`}
            target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.socialWhatsapp}`}
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=Join Equinox Global Assets&body=Join me on Equinox Global Assets! Use my referral link: ${REFERRAL_LINK}`}
            className={`${styles.socialBtn} ${styles.socialEmail}`}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email
          </a>
        </div>
      </div>

      {/* Referrals table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Your Referrals</h3>
          <p className={styles.tableSub}>{totalReferrals} total {totalReferrals === 1 ? 'person' : 'people'} referred</p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.showEntries}>
            <span>Show</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
              {PAGE_SIZE_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span>entries</span>
          </div>
          <div className={styles.searchBox}>
            <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search referrals…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Ref. Level</th>
                <th>Client Status</th>
                <th>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {sliced.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>
                        <svg width="32" height="32" fill="none" stroke="#d1d5db" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      </div>
                      <p>No data available in table</p>
                      <span>Share your referral link above to invite friends</span>
                    </div>
                  </td>
                </tr>
              ) : sliced.map(r => (
                <tr key={r.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.nameAvatar}>{r.name.charAt(0)}</div>
                    {r.name}
                  </td>
                  <td>
                    <span className={styles.levelBadge}>Level {r.level}</span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[`status_${r.status}`]}`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {from} to {to} of {total} entries
          </span>
          <div className={styles.paginationBtns}>
            <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ''}`} onClick={() => setPage(p)}>
                {p}
              </button>
            ))}
            <button className={styles.pageBtn} disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
