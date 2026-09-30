'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, Flower2, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime } from '@/utils/audio';
import styles from './TulipBlossom.module.css';

interface TulipAffirmation {
  id: number;
  name: string;
  emoji: string;
  message: string;
}

const TULIP_FLOWERS: TulipAffirmation[] = [
  {
    id: 1,
    name: 'Blush Tulip',
    emoji: '🌷',
    message: 'Your smile lights up the room brighter than a thousand sunlit gardens.',
  },
  {
    id: 2,
    name: 'Rose Tulip',
    emoji: '🌸',
    message: 'You are Billie’s favorite thought in the morning and sweetest dream at night.',
  },
  {
    id: 3,
    name: 'Tulip of Peace',
    emoji: '🕊️',
    message: 'Every moment in your arms feels like finally arriving home.',
  },
  {
    id: 4,
    name: 'Forever Bloom',
    emoji: '💖',
    message: 'No matter how many seasons pass, my love for you only grows deeper.',
  },
  {
    id: 5,
    name: 'Golden Tulip',
    emoji: '✨',
    message: 'You make the simplest days feel like a romantic holiday adventure.',
  },
  {
    id: 6,
    name: 'Tulip of Joy',
    emoji: '🌷',
    message: 'Your laughter is the sweetest melody that could ever play in my life.',
  },
];

export default function TulipBlossom() {
  const [selectedTulip, setSelectedTulip] = useState<TulipAffirmation | null>(
    TULIP_FLOWERS[0]
  );
  const [plantedCount, setPlantedCount] = useState(128);

  const handlePickTulip = (tulip: TulipAffirmation) => {
    setSelectedTulip(tulip);
    playChime();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FDA4AF', '#F472B6', '#FB7185'],
    });
  };

  const handlePlantTulip = () => {
    setPlantedCount((prev) => prev + 1);
    playChime();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F43F5E', '#FDA4AF', '#F472B6'],
    });
  };

  return (
    <section id="tulip-garden" className={styles.gardenSection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>🌷</span>
          <span>Cora’s Flower Sanctuary</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Cora’s <em>Tulip Garden</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          Pink tulips symbolize pure affection, caring, and sweet love. Pluck a tulip to receive a romantic note or plant a fresh bloom in our garden!
        </p>
      </div>

      <div className={styles.gardenContainer}>
        {/* Selected Fortune Display */}
        {selectedTulip && (
          <div className={styles.fortuneBox}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>
              {selectedTulip.emoji}
            </span>
            <p className={styles.fortuneText}>"{selectedTulip.message}"</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-pink-500)', fontWeight: 600, marginTop: 8, display: 'block' }}>
              — Plucked from {selectedTulip.name}
            </span>
          </div>
        )}

        {/* Tulip Grid */}
        <div className={styles.tulipGrid}>
          {TULIP_FLOWERS.map((tulip) => (
            <div
              key={tulip.id}
              className={styles.tulipBudCard}
              onClick={() => handlePickTulip(tulip)}
            >
              <span className={styles.tulipIcon}>{tulip.emoji}</span>
              <span className={styles.tulipLabel}>{tulip.name}</span>
            </div>
          ))}
        </div>

        {/* Garden Footer */}
        <div className={styles.gardenFooter}>
          <button onClick={handlePlantTulip} className={styles.plantTulipBtn}>
            <Plus size={18} />
            <span>Plant a Tulip ({plantedCount} blooming)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
