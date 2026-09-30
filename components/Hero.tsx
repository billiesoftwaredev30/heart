'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Music, ArrowDown, Calendar } from 'lucide-react';
import { POLAROID_HERO_PHOTOS, PhotoItem } from '@/lib/photosData';
import styles from './Hero.module.css';

interface HeroProps {
  onPhotoClick: (photo: PhotoItem) => void;
  onOpenMusic: () => void;
}

export default function Hero({ onPhotoClick, onOpenMusic }: HeroProps) {
  // Relationship time tracker (calculates days, hours, mins, secs)
  // Let's set a romantic baseline anniversary or start date
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Relationship start date: September 19, 2026
    const startDate = new Date('2026-09-19T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        {/* Pill Badge */}
        <div className={styles.pillBadge}>
          <span>🌷</span>
          <span>Together Since September 19, 2026 • Our Living Love Scrapbook</span>
          <Sparkles size={15} />
        </div>

        {/* Hero Title */}
        <h1 className={styles.heroTitle}>
          Cora <em>&</em> Billie
        </h1>

        {/* Hero Subtitle */}
        <p className={styles.heroSubtitle}>
          A modern minimalist sanctuary dedicated to our sweetest memories, candid smiles, late-night talks, and endless love.
        </p>

        {/* Relationship Counter */}
        <div className={styles.counterCard}>
          <div className={styles.counterUnit}>
            <span className={styles.counterValue}>{timeTogether.days}</span>
            <span className={styles.counterLabel}>Days</span>
          </div>
          <span className={styles.counterDivider}>:</span>
          <div className={styles.counterUnit}>
            <span className={styles.counterValue}>
              {String(timeTogether.hours).padStart(2, '0')}
            </span>
            <span className={styles.counterLabel}>Hours</span>
          </div>
          <span className={styles.counterDivider}>:</span>
          <div className={styles.counterUnit}>
            <span className={styles.counterValue}>
              {String(timeTogether.minutes).padStart(2, '0')}
            </span>
            <span className={styles.counterLabel}>Mins</span>
          </div>
          <span className={styles.counterDivider}>:</span>
          <div className={styles.counterUnit}>
            <span className={styles.counterValue}>
              {String(timeTogether.seconds).padStart(2, '0')}
            </span>
            <span className={styles.counterLabel}>Secs</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.heroActions}>
          <a href="#scrapbook" className={styles.primaryBtn}>
            <Heart size={18} fill="#ffffff" />
            Explore Scrapbook
          </a>
          <button onClick={onOpenMusic} className={styles.secondaryBtn}>
            <Music size={18} />
            Listen to Our Song
          </button>
        </div>
      </div>

      {/* Interactive Polaroid Deck */}
      <div className={styles.polaroidDeck}>
        {POLAROID_HERO_PHOTOS.map((photo, idx) => {
          const rotations = [-3, 2, -2, 3, -1.5, 2.5];
          const rot = rotations[idx % rotations.length];
          return (
            <div
              key={photo.id}
              className={styles.polaroidCard}
              style={{ transform: `rotate(${rot}deg)` }}
              onClick={() => onPhotoClick(photo)}
            >
              <div className={styles.washiTape} />
              <div className={styles.polaroidImgWrapper}>
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="220px"
                  className={styles.polaroidImg}
                />
              </div>
              <p className={styles.polaroidCaption}>{photo.title}</p>
              <p className={styles.polaroidDate}>{photo.date}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
