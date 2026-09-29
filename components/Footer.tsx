'use client';

import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.footerLogo}>
          <span className={styles.footerLogoIcon}>🌷</span>
          <span className={styles.footerLogoText}>Heart & Billie</span>
        </div>

        {/* Romantic quote */}
        <p className={styles.footerQuote}>
          "Ikaw ang aking Heart, aking tahanan, at aking magpakailanman."
        </p>

        {/* Links */}
        <div className={styles.footerLinks}>
          <a href="#scrapbook" className={styles.footerLink}>
            Scrapbook
          </a>
          <a href="#timeline" className={styles.footerLink}>
            Our Story
          </a>
          <a href="#diary" className={styles.footerLink}>
            Love Letters
          </a>
          <a href="#tulip-garden" className={styles.footerLink}>
            Tulip Garden
          </a>
          <a href="#bucketlist" className={styles.footerLink}>
            Bucket List
          </a>
          <a href="#quiz" className={styles.footerLink}>
            Love Quiz
          </a>
        </div>

        {/* Back to Top */}
        <button onClick={scrollToTop} className={styles.backToTopBtn}>
          <ArrowUp size={15} />
          <span>Back to Top</span>
        </button>

        {/* Copyright */}
        <p className={styles.copyrightText}>
          Made with <Heart size={14} fill="var(--color-pink-500)" color="var(--color-pink-500)" /> for Billie & Heart • Forever & Always (2026)
        </p>
      </div>
    </footer>
  );
}
