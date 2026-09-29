'use client';

import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Send, PenTool, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DIARY_LETTERS, REASONS_WHY_I_LOVE_YOU, DiaryLetter } from '@/lib/diaryEntries';
import { playChime } from '@/utils/audio';
import styles from './DiaryJournal.module.css';

interface UserMemoryNote {
  id: string;
  sender: string;
  content: string;
  date: string;
  stamp: string;
}

export default function DiaryJournal() {
  const [openLetterIds, setOpenLetterIds] = useState<Record<string, boolean>>({
    'letter-1': true,
  });

  const [notes, setNotes] = useState<UserMemoryNote[]>([]);
  const [senderName, setSenderName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedStamp, setSelectedStamp] = useState('🌷');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('heart_billie_notes');
      if (saved) {
        setNotes(JSON.parse(saved));
      }
    } catch {
      // localStorage fallback
    }
  }, []);

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

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !noteContent.trim()) return;

    const newNote: UserMemoryNote = {
      id: `note-${Date.now()}`,
      sender: senderName.trim(),
      content: noteContent.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      stamp: selectedStamp,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem('heart_billie_notes', JSON.stringify(updated));
    } catch {
      // storage
    }

    setSenderName('');
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
        <h3 className={styles.noteFormTitle}>Write a Little Love Note</h3>
        <p className={styles.subSectionSubtitle} style={{ textAlign: 'left', marginBottom: 20 }}>
          Leave a sweet message or secret diary note to be saved permanently in this scrapbook.
        </p>

        <form onSubmit={handleAddNote}>
          <div className={styles.noteInputRow}>
            <input
              type="text"
              placeholder="Your Name (Heart / Billie)..."
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

            <button type="submit" className={styles.unsealBtn}>
              {savedSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Saved to Diary!</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Save Love Note</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Display User Added Notes */}
        {notes.length > 0 && (
          <div style={{ marginTop: 32, borderTop: '1px dashed rgba(254, 205, 211, 0.6)', paddingTop: 24 }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: 16, color: 'var(--color-soft-dark)' }}>
              Saved Love Notes ({notes.length})
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {notes.map((n) => (
                <div
                  key={n.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(254, 205, 211, 0.6)',
                    borderRadius: 'var(--radius-md)',
                    padding: 16,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '1.2rem' }}>{n.stamp}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-pink-500)', fontWeight: 600 }}>
                      {n.sender} • {n.date}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-handwriting)', fontSize: '1.15rem', color: '#374151' }}>
                    "{n.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
