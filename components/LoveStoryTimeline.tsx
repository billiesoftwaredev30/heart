'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import { TIMELINE_MILESTONES, Milestone } from '@/lib/timelineData';
import { ALL_PHOTOS, PhotoItem } from '@/lib/photosData';
import styles from './LoveStoryTimeline.module.css';

interface LoveStoryTimelineProps {
  onPhotoClick: (photo: PhotoItem) => void;
}

export default function LoveStoryTimeline({ onPhotoClick }: LoveStoryTimelineProps) {
  const handleMilestonePhotoClick = (milestone: Milestone) => {
    // Find matching photo in ALL_PHOTOS or create a temporary PhotoItem
    const found = ALL_PHOTOS.find((p) => p.src === milestone.photo);
    if (found) {
      onPhotoClick(found);
    } else {
      onPhotoClick({
        id: milestone.id,
        filename: milestone.photo,
        src: milestone.photo,
        title: milestone.title,
        category: 'dates',
        caption: milestone.description,
        date: milestone.date,
        location: milestone.location,
      });
    }
  };

  return (
    <section id="timeline" className={styles.timelineSection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>🌷</span>
          <span>Chapters of Us</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Our Love Story <em>Timeline</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          From the first spark to forever. Here is the unfolding journey of how two hearts connected and grew into an unbreakable bond.
        </p>
      </div>

      {/* Timeline Track */}
      <div className={styles.timelineContainer}>
        <div className={styles.timelineLine} />

        {TIMELINE_MILESTONES.map((milestone, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={milestone.id}
              className={`${styles.milestoneRow} ${
                isEven ? styles.milestoneLeft : styles.milestoneRight
              }`}
            >
              {/* Central Tulip Blossom Node */}
              <div className={styles.timelineNode}>
                <span>🌷</span>
              </div>

              {/* Milestone Content Card */}
              <div className={styles.timelineContent}>
                <div className={styles.timelineCard}>
                  <div className={styles.milestoneBadge}>
                    <span>{milestone.year}</span>
                    <span>•</span>
                    <span>{milestone.tag}</span>
                  </div>

                  <h3 className={styles.milestoneTitle}>{milestone.title}</h3>

                  <div className={styles.milestoneDate}>
                    <Calendar size={14} />
                    <span>{milestone.date}</span>
                    {milestone.location && (
                      <>
                        <span>•</span>
                        <MapPin size={14} />
                        <span>{milestone.location}</span>
                      </>
                    )}
                  </div>

                  <p className={styles.milestoneDesc}>{milestone.description}</p>

                  {milestone.quote && (
                    <div className={styles.quoteBox}>
                      <p>{milestone.quote}</p>
                    </div>
                  )}

                  {/* Photo Preview */}
                  <div
                    className={styles.milestonePhotoFrame}
                    onClick={() => handleMilestonePhotoClick(milestone)}
                    title="Click to view photo"
                  >
                    <Image
                      src={milestone.photo}
                      alt={milestone.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className={styles.milestonePhoto}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
