'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  MailOpen,
  Heart,
  Sparkles,
  Send,
  PenTool,
  CheckCircle2,
  RotateCcw,
  Loader2,
  Users,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIARY_LETTERS, REASONS_WHY_I_LOVE_YOU } from '@/lib/diaryEntries';
import { playChime } from '@/utils/audio';
import styles from './DiaryJournal.module.css';

export interface UserMemoryNote {
  id: string;
  sender: string;
  content: string;
  date: string;
  stamp: string;
  createdAt?: number;
}

export default function DiaryJournal() {
  const [openLetterIds, setOpenLetterIds] = useState<Record<string, boolean>>({
    'letter-1': true,
  });

  const [notes, setNotes] = useState<UserMemoryNote[]>([]);
  const [senderName, setSenderName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('🌷');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch shared notes from backend API
  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch('/api/notes', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.notes)) {
          setNotes(data.notes);
          try {
            localStorage.setItem('heart_billie_notes', JSON.stringify(data.notes));
          } catch {
            // storage fallback
          }
        }
      }
    } catch {
      // Offline fallback: load from localStorage
      try {
        const saved = localStorage.getItem('heart_billie_notes');
        if (saved) {
          setNotes(JSON.parse(saved));
        }
      } catch {
        // storage
      }
    }
  }, []);

  // Initial load and polling every 7 seconds + window focus
  useEffect(() => {
    fetchNotes();

    const interval = setInterval(() => {
      fetchNotes();
    }, 7000);

    const onFocus = () => fetchNotes();
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [fetchNotes]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotes();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const toggleLetter = (id: string) => {
    setOpenLetterIds((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        playChime();
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#FDA4AF', '#F472B6', '#FECDD3'],
        });
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !noteContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const newNoteDraft: UserMemoryNote = {
      id: `note-${Date.now()}`,
      sender: senderName.trim(),
      content: noteContent.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      stamp: selectedStamp,
      createdAt: Date.now(),
    };

    // Optimistic UI update
    setNotes((prev) => [newNoteDraft, ...prev]);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: senderName.trim(),
          content: noteContent.trim(),
          stamp: selectedStamp,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.notes) {
          setNotes(data.notes);
          try {
            localStorage.setItem('heart_billie_notes', JSON.stringify(data.notes));
          } catch {
            // storage
          }
        }
      }
    } catch (err) {
      console.error('Failed to post note to server:', err);
    } finally {
      setIsSubmitting(false);
      setNoteContent('');
      setSavedSuccess(true);
      playChime();

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FB7185', '#FDA4AF', '#F43F5E'],
      });

      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const stamps = ['🌷', '💖', '💌', '☕', '✨', '🕊️'];

  return (
    <section id="diary" className={styles.diarySection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>💌</span>
          <span>Letters & Reflections</span>
        </div>
        <h2 className={styles.sectionTitle}>
          Our Love <em>Diary</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          Heartfelt letters, quiet midnight thoughts, and unsealed promises kept safe in our timeless journal.
        </p>
      </div>

      {/* Letters Grid */}
      <div className={styles.lettersGrid}>
        {DIARY_LETTERS.map((letter) => {
          const isOpen = !!openLetterIds[letter.id];

          return (
            <div key={letter.id} className={styles.letterCard}>
              <div>
                <div className={styles.letterHeader}>
                  <div className={styles.letterStamp}>
                    <span>{letter.stampEmoji}</span>
                  </div>
                  <div className={styles.letterMeta}>
                    <span className={styles.letterFromTo}>
                      {letter.sender} → {letter.recipient}
                    </span>
                    <span className={styles.letterDate}>{letter.date}</span>
                  </div>
                </div>

                <h3 className={styles.letterTitle}>{letter.title}</h3>

                {isOpen ? (
                  <div className={styles.letterContentExpanded}>
                    {letter.fullLetter.map((p, pIdx) => (
                      <p key={pIdx} className={styles.letterParagraph}>
                        {p}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className={styles.letterExcerpt}>{letter.excerpt}</p>
                )}
              </div>

              <button
                onClick={() => toggleLetter(letter.id)}
                className={`${styles.unsealBtn} ${
                  isOpen ? styles.unsealedStateBtn : ''
                }`}
              >
                {isOpen ? (
                  <>
                    <MailOpen size={16} />
                    <span>Fold Letter</span>
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    <span>Unseal Letter 🌷</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* 12 Reasons Why Section */}
      <div className={styles.reasonsBlock}>
        <h3 className={styles.subSectionTitle}>12 Little Reasons Why I Love You</h3>
        <p className={styles.subSectionSubtitle}>
          Just a handful of the infinite reasons my heart chose you.
        </p>

        <div className={styles.reasonsGrid}>
          {REASONS_WHY_I_LOVE_YOU.map((item) => (
            <div key={item.id} className={styles.reasonCard}>
              <div className={styles.reasonCardHeader}>
                <span className={styles.reasonIcon}>{item.icon}</span>
                <span className={styles.reasonNumber}>#{item.id}</span>
              </div>
              <p className={styles.reasonText}>"{item.reason}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add a Memory Note / Digital Sticky */}
      <div className={styles.writeNoteBox}>
        <div className={styles.syncBadge}>
          <span className={styles.liveDot} />
          <span>Shared Cloud Vault • Synced live between Cora & Billie</span>
        </div>

        <h3 className={styles.noteFormTitle}>Write a Little Love Note</h3>
        <p className={styles.subSectionSubtitle} style={{ textAlign: 'left', marginBottom: 16 }}>
          Leave a sweet message or secret diary note that saves permanently so both of you can see it on any device.
        </p>

        {/* Quick Sender Selector */}
        <div className={styles.senderPills}>
          <span className={styles.senderPillLabel}>I am:</span>
          <button
            type="button"
            onClick={() => setSenderName('Cora')}
            className={`${styles.senderChip} ${senderName === 'Cora' ? styles.senderChipActive : ''}`}
          >
            🌷 Cora
          </button>
          <button
            type="button"
            onClick={() => setSenderName('Billie')}
            className={`${styles.senderChip} ${senderName === 'Billie' ? styles.senderChipActive : ''}`}
          >
            💙 Billie
          </button>
        </div>

        <form onSubmit={handleAddNote}>
          <div className={styles.noteInputRow}>
            <input
              type="text"
              placeholder="Your Name (Cora or Billie)..."
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={styles.noteInput}
              required
            />
          </div>

          <textarea
            placeholder="Write your heartfelt note, memory, or sweet message here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className={styles.noteTextarea}
            required
          />

          <div className={styles.noteFormFooter}>
            <div className={styles.stampSelector}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', fontWeight: 500 }}>
                Pick Stamp:
              </span>
              {stamps.map((stamp) => (
                <button
                  type="button"
                  key={stamp}
                  onClick={() => setSelectedStamp(stamp)}
                  className={`${styles.stampChoice} ${
                    selectedStamp === stamp ? styles.stampSelected : ''
                  }`}
                >
                  {stamp}
                </button>
              ))}
            </div>

            <button type="submit" className={styles.unsealBtn} disabled={isSubmitting}>
              {savedSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Saved to Shared Vault!</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Love Note 💌</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Display User Added Notes */}
        {notes.length > 0 && (
          <div className={styles.savedNotesSection}>
            <div className={styles.savedNotesHeader}>
              <h4 className={styles.savedNotesTitle}>
                <span>💌</span>
                <span>Our Shared Love Notes ({notes.length})</span>
              </h4>
              <button
                type="button"
                onClick={handleManualRefresh}
                className={styles.refreshBtn}
                title="Refresh notes from server"
              >
                <RotateCcw size={13} style={{ animation: isRefreshing ? 'spinSlow 1s linear infinite' : undefined }} />
                <span>Sync now</span>
              </button>
            </div>

            <div className={styles.savedNotesGrid}>
              {notes.map((n) => (
                <div key={n.id} className={styles.stickyNoteCard}>
                  <div>
                    <div className={styles.noteCardHeader}>
                      <span className={styles.noteCardStamp}>{n.stamp}</span>
                      <div className={styles.noteCardMeta}>
                        <span className={styles.noteCardSender}>{n.sender}</span>
                        <span className={styles.noteCardDate}>{n.date}</span>
                      </div>
                    </div>
                    <p className={styles.noteCardContent}>"{n.content}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
