'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Filter, Eye } from 'lucide-react';
import { ALL_PHOTOS, PhotoItem } from '@/lib/photosData';
import styles from './ScrapbookGallery.module.css';

interface ScrapbookGalleryProps {
  onPhotoClick: (photo: PhotoItem) => void;
  likedPhotos: Record<string, boolean>;
  onToggleLike: (id: string) => void;
}

export default function ScrapbookGallery({
  onPhotoClick,
  likedPhotos,
  onToggleLike,
}: ScrapbookGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Memories', count: ALL_PHOTOS.length },
    { id: 'favorites', label: 'Our Favorites 💖' },
    { id: 'dates', label: 'Sweet Dates ☕' },
    { id: 'travel', label: 'Trips & Travel ✈️' },
    { id: 'moments', label: 'Soft Moments 🕊️' },
    { id: 'candid', label: 'Candid Smiles 📸' },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? ALL_PHOTOS
      : ALL_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <section id="scrapbook" className={styles.gallerySection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>📸</span>
          <span>Living Photo Album</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Our Memory <em>Scrapbook</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          Every picture holds a feeling, a laugh, a sweet conversation, or a secret kiss. Click any polaroid to explore its story in full detail.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`${styles.filterBtn} ${
              selectedCategory === cat.id ? styles.filterActive : ''
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scrapbook Grid */}
      <div className={styles.scrapbookGrid}>
        {filteredPhotos.map((photo, index) => {
          const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2, 2];
          const rot = photo.rotation !== undefined ? photo.rotation : rotations[index % rotations.length];
          const isLiked = !!likedPhotos[photo.id];

          return (
            <div
              key={photo.id}
              className={styles.polaroidCard}
              style={{ transform: `rotate(${rot}deg)` }}
              onClick={() => onPhotoClick(photo)}
            >
              {/* Washi Tape */}
              <div className={styles.tapeTop} />

              {/* Photo Frame */}
              <div className={styles.imageFrame}>
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                  loading={index < 6 ? 'eager' : 'lazy'}
                />

                {/* Heart Button */}
                <button
                  className={`${styles.cardHeartBadge} ${
                    isLiked ? styles.cardHeartLiked : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(photo.id);
                  }}
                  title={isLiked ? 'Loved memory' : 'Love this memory'}
                >
                  <Heart
                    size={16}
                    fill={isLiked ? '#ffffff' : 'none'}
                    color={isLiked ? '#ffffff' : 'var(--color-pink-500)'}
                  />
                </button>
              </div>

              {/* Caption & Notes */}
              <div className={styles.captionArea}>
                <h3 className={styles.cardTitle}>{photo.title}</h3>
                <p className={styles.cardCaption}>"{photo.caption}"</p>
                <div className={styles.cardFooter}>
                  <span>{photo.date || 'Timeless'}</span>
                  <span>{photo.location || 'Together'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
