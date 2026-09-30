'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Heart, KeyRound, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime } from '@/utils/audio';
import styles from './SecretGate.module.css';

interface SecretGateProps {
  onUnlock: () => void;
}

const VALID_PASSCODES = [
  '0919',
  '919',
  '09192026',
  '091926',
  '20260919',
  'cora',
  'heart',
  'billie',
  'coraandbillie',
  'billieandcora',
  'heartandbillie',
  'billieandheart',
  'tulip',
  'tulips',
  'akingheart',
  '143',
];

export default function SecretGate({ onUnlock }: SecretGateProps) {
  const [passcode, setPasscode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passcode.trim().toLowerCase().replace(/[\s\-_]/g, '');

    if (VALID_PASSCODES.includes(cleanInput)) {
      setHasError(false);
      playChime();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FDA4AF', '#F472B6', '#FB7185', '#F43F5E'],
      });
      onUnlock();
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  return (
    <div className={styles.gateOverlay}>
      <div className={styles.gateCard}>
        {/* Lock / Tulip Icon */}
        <div className={styles.lockIconWrapper}>
          <span>🌷</span>
        </div>

        {/* Title */}
        <h2 className={styles.gateTitle}>
          The Love Vault <em>of Us</em>
        </h2>

        {/* Subtitle */}
        <p className={styles.gateSubtitle}>
          This scrapbook is a private sanctuary for Cora & Billie. Enter our secret key or anniversary date to open.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.passcodeForm}>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Enter Secret Key..."
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (hasError) setHasError(false);
              }}
              className={`${styles.passcodeInput} ${
                hasError ? styles.inputError : ''
              }`}
              autoFocus
              required
            />
          </div>

          {hasError && (
            <p className={styles.errorText}>
              Oops! Only Cora & Billie know the secret key. 🌷
            </p>
          )}

          <button type="submit" className={styles.unlockBtn}>
            <KeyRound size={18} />
            <span>Unlock Our Scrapbook</span>
          </button>
        </form>

        {/* Hint Option */}
        <div>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={styles.hintToggleBtn}
          >
            <HelpCircle size={14} />
            <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
          </button>

          {showHint && (
            <div className={styles.hintBox}>
              ✨ <em>Something only the two of us hold close to our hearts...</em>
            </div>
          )}
        </div>

        <p className={styles.gateFooterNote}>
          "Ikaw ang aking mahal, magpakailanman."
        </p>
      </div>
    </div>
  );
}
