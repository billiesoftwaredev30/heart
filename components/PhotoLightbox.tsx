'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { PhotoItem } from '@/lib/photosData';
import styles from './PhotoLightbox.module.css';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalPhotos: number;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

export default function PhotoLightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalPhotos,
  isLiked,
  onToggleLike,
}: PhotoLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <div
        className={styles.lightboxModal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles.closeBtn}
          title="Close Lightbox (Esc)"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Image Display */}
        <div className={styles.imageSection}>
          <button
            onClick={onPrev}
            className={styles.navArrowLeft}
            title="Previous Photo (Left Arrow)"
            aria-label="Previous Photo"
          >
            <ChevronLeft size={24} />
          </button>

          <Image
            src={photo.src}
            alt={photo.title}
            width={800}
            height={900}
            className={styles.lightboxImage}
            priority
          />

          <button
            onClick={onNext}
            className={styles.navArrowRight}
            title="Next Photo (Right Arrow)"
            aria-label="Next Photo"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Info & Caption Details */}
        <div className={styles.infoSection}>
          <div>
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{photo.category}</span>
              <span>🌷</span>
            </div>

            <h3 className={styles.modalTitle}>{photo.title}</h3>

            <div className={styles.metaRow}>
              {photo.date && (
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  <span>{photo.date}</span>
                </div>
              )}
              {photo.location && (
                <div className={styles.metaItem}>
                  <MapPin size={14} />
                  <span>{photo.location}</span>
                </div>
              )}
            </div>

            <div className={styles.captionBox}>
              <p className={styles.captionText}>{photo.caption}</p>
            </div>
          </div>

          <div className={styles.footerActions}>
            <button
              onClick={() => onToggleLike(photo.id)}
              className={`${styles.likeBtn} ${isLiked ? styles.likedActive : ''}`}
            >
              <Heart
                size={16}
                fill={isLiked ? '#ffffff' : 'none'}
                color={isLiked ? '#ffffff' : 'var(--color-pink-500)'}
              />
              <span>{isLiked ? 'Cherished memory' : 'Heart this memory'}</span>
            </button>

            <span className={styles.photoCounter}>
              {currentIndex + 1} of {totalPhotos}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
