'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Check, Plus, Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_BUCKET_LIST, BucketItem } from '@/lib/bucketListData';
import { playChime } from '@/utils/audio';
import styles from './BucketList.module.css';

export default function BucketList() {
  const [items, setItems] = useState<BucketItem[]>(INITIAL_BUCKET_LIST);
  const [newDream, setNewDream] = useState('');

  const fetchBucketList = useCallback(async () => {
    try {
      const res = await fetch('/api/bucketlist', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          setItems(data.items);
          try {
            localStorage.setItem('heart_billie_bucketlist', JSON.stringify(data.items));
          } catch {
            // storage
          }
        }
      }
    } catch {
      try {
        const saved = localStorage.getItem('heart_billie_bucketlist');
        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch {
        // storage
      }
    }
  }, []);

  useEffect(() => {
    fetchBucketList();
    const interval = setInterval(fetchBucketList, 10000);
    const onFocus = () => fetchBucketList();
    window.addEventListener('focus', onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchBucketList]);

  const toggleItem = async (id: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const nextStatus = !item.completed;
        if (nextStatus) {
          playChime();
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#FB7185', '#FDA4AF', '#F43F5E'],
          });
        }
        return {
          ...item,
          completed: nextStatus,
          dateCompleted: nextStatus
            ? new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : undefined,
        };
      }
      return item;
    });

    setItems(updated);

    try {
      const res = await fetch('/api/bucketlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.items) {
          setItems(data.items);
        }
      }
    } catch (err) {
      console.error('Failed to sync bucket list item:', err);
    }
  };

  const handleAddDream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDream.trim()) return;

    const draftItem: BucketItem = {
      id: `dream-${Date.now()}`,
      title: newDream.trim(),
      category: 'Memories',
      completed: false,
    };

    setItems((prev) => [...prev, draftItem]);
    setNewDream('');
    playChime();

    try {
      const res = await fetch('/api/bucketlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', item: draftItem }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.items) {
          setItems(data.items);
        }
      }
    } catch (err) {
      console.error('Failed to add bucket item to server:', err);
    }
  };

  const completedCount = items.filter((i) => i.completed).length;
  const percentage = Math.round((completedCount / items.length) * 100) || 0;

  return (
    <section id="bucketlist" className={styles.bucketSection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>✨</span>
          <span>Our Future Adventures</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Our Couple <em>Bucket List</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          Dreams we have conquered together and magical milestones we look forward to living side by side.
        </p>
      </div>

      <div className={styles.bucketContainer}>
        {/* Progress Tracker */}
        <div className={styles.progressBox}>
          <div className={styles.progressStats}>
            <span>
              {completedCount} of {items.length} Dreams Fulfilled
            </span>
            <span style={{ color: 'var(--color-pink-500)' }}>{percentage}% Completed</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Bucket List Items */}
        <div className={styles.bucketListGrid}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.bucketCard} ${
                item.completed ? styles.bucketCardDone : ''
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <div
                className={`${styles.checkboxBtn} ${
                  item.completed ? styles.checkboxDone : ''
                }`}
              >
                {item.completed && <Check size={14} />}
              </div>

              <div>
                <p
                  className={`${styles.bucketTitle} ${
                    item.completed ? styles.bucketTitleDone : ''
                  }`}
                >
                  {item.title}
                </p>
                <span className={styles.bucketMeta}>
                  {item.category} {item.dateCompleted ? `• ${item.dateCompleted}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Dream */}
        <form onSubmit={handleAddDream} className={styles.addDreamRow}>
          <input
            type="text"
            placeholder="Add a new dream or bucket list goal together..."
            value={newDream}
            onChange={(e) => setNewDream(e.target.value)}
            className={styles.addDreamInput}
          />
          <button type="submit" className={styles.addDreamBtn}>
            <Plus size={18} />
            <span>Add Dream</span>
          </button>
        </form>
      </div>
    </section>
  );
}
