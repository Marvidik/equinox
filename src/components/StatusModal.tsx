import React from 'react';
import styles from './StatusModal.module.css';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
  buttonText?: string;
}

export default function StatusModal({ isOpen, onClose, type, title, message, buttonText = 'Dismiss' }: StatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconWrapper} style={{ background: type === 'success' ? '#ecfdf5' : '#fff1f2' }}>
          {type === 'success' ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c5a8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          style={{ background: type === 'success' ? '#22c5a8' : '#ef4444' }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
