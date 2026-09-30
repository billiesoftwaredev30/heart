'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Sun, Moon, Menu, X, Music, Lock } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLock: () => void;
  currentTrackTitle?: string;
}

export default function Navbar({
  isPlaying,
  onTogglePlay,
  theme,
  onToggleTheme,
  onLock,
  currentTrackTitle = 'Aking Heart',
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Scrapbook', href: '#scrapbook' },
    { label: 'Our Story', href: '#timeline' },
    { label: 'Love Diary', href: '#diary' },
    { label: 'Tulip Garden', href: '#tulip-garden' },
    { label: 'Bucket List', href: '#bucketlist' },
    { label: 'Couple Quiz', href: '#quiz' },
  ];

  return (
    <header className={styles.navHeader} style={{ top: isScrolled ? '12px' : '20px' }}>
      <nav className={styles.navContainer}>
        {/* Brand */}
        <Link href="#" className={styles.brandGroup}>
          <div className={styles.brandIconWrapper}>
            <span>🌷</span>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>Cora & Billie</span>
            <span className={styles.brandSub}>Forever & Always</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href} className={styles.navItem}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className={styles.navActions}>
          {/* Music Quick Toggle */}
          <button
            onClick={onTogglePlay}
            className={styles.actionButton}
            title={isPlaying ? `Pause (${currentTrackTitle})` : `Play Soundtrack (${currentTrackTitle})`}
            aria-label="Toggle Soundtrack"
          >
            {isPlaying ? (
              <div className={styles.soundWaveActive}>
                <span className={styles.soundWaveBar} />
                <span className={styles.soundWaveBar} />
                <span className={styles.soundWaveBar} />
                <span className={styles.soundWaveBar} />
              </div>
            ) : (
              <Music size={18} />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={styles.actionButton}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Lock Vault */}
          <button
            onClick={onLock}
            className={styles.actionButton}
            title="Lock Love Vault"
            aria-label="Lock Scrapbook"
          >
            <Lock size={17} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuBtn}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={styles.mobileDropdown}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
