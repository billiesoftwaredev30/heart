'use client';

import React, { useState } from 'react';
import { Sparkles, Trophy, RotateCcw, Heart, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COUPLE_QUIZ_QUESTIONS } from '@/lib/quizData';
import { playChime } from '@/utils/audio';
import styles from './LoveQuiz.module.css';

export default function LoveQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = COUPLE_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
      playChime();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#86EFAC', '#4ADE80', '#FDA4AF'],
      });
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < COUPLE_QUIZ_QUESTIONS.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
    } else {
      setIsFinished(true);
      playChime();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FDA4AF', '#F472B6', '#FB7185', '#F43F5E'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className={styles.quizSection}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTag}>
          <span>💖</span>
          <span>Couple Trivia Game</span>
        </div>
        <h2 className={styles.sectionTitle}>
          The Billie & Heart <em>Love Quiz</em>
        </h2>
        <p className={styles.sectionSubtitle}>
          How well do you know our inside jokes, favorite flowers, and memorable quirks? Test your score below!
        </p>
      </div>

      <div className={styles.quizCard}>
        {!isFinished ? (
          <div>
            <h3 className={styles.quizQuestion}>
              Question {currentIdx + 1}: {currentQ.question}
            </h3>

            <div className={styles.optionsGrid}>
              {currentQ.options.map((opt, oIdx) => {
                let btnClass = styles.optionBtn;
                if (selectedOpt !== null) {
                  if (oIdx === currentQ.correctIndex) {
                    btnClass = `${styles.optionBtn} ${styles.optionCorrect}`;
                  } else if (oIdx === selectedOpt) {
                    btnClass = `${styles.optionBtn} ${styles.optionWrong}`;
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOpt !== null && (
              <div className={styles.explanationBox}>
                <p className={styles.explanationText}>
                  💡 <strong>Did you know?</strong> {currentQ.funFact}
                </p>
              </div>
            )}

            <div className={styles.quizFooter}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)', fontWeight: 500 }}>
                Score: {score} / {COUPLE_QUIZ_QUESTIONS.length}
              </span>

              {selectedOpt !== null && (
                <button onClick={handleNext} className={styles.quizNextBtn}>
                  {currentIdx + 1 < COUPLE_QUIZ_QUESTIONS.length
                    ? 'Next Question →'
                    : 'View Final Result 🏆'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.resultBox}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🌷💖✨</div>
            <h3 className={styles.resultTitle}>
              {score === COUPLE_QUIZ_QUESTIONS.length
                ? 'Perfect 100% Love Match!'
                : score >= 2
                ? 'True Soulmates Forever!'
                : 'Sweetest Love Story!'}
            </h3>
            <p className={styles.resultSubtitle}>
              You scored {score} out of {COUPLE_QUIZ_QUESTIONS.length}! Every single answer proves how special and full of laughter Billie & Heart’s journey is.
            </p>

            <button onClick={handleRestart} className={styles.quizNextBtn}>
              <RotateCcw size={16} style={{ display: 'inline', marginRight: 6 }} />
              Play Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
