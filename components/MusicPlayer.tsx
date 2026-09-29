'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Minimize2, Maximize2, Music, Sparkles } from 'lucide-react';
import { MUSIC_TRACK } from '@/utils/audio';
import styles from './MusicPlayer.module.css';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  minimized: boolean;
  onToggleMinimize: () => void;
}

export default function MusicPlayer({
  isPlaying,
  onTogglePlay,
  minimized,
  onToggleMinimize,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay may need user gesture
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={styles.floatingPlayerContainer}>
      <audio
        ref={audioRef}
        src={MUSIC_TRACK.src}
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      {minimized ? (
        <div className={styles.minimizedPill} onClick={onToggleMinimize}>
          <div className={`${styles.vinylDisc} ${isPlaying ? styles.spinning : ''}`} style={{ width: 32, height: 32 }}>
            <div className={styles.vinylCenter} style={{ width: 12, height: 12 }}>
              <span>🌷</span>
            </div>
          </div>
          <span className={styles.pillText}>Aking Heart</span>
          <Maximize2 size={15} color="var(--color-pink-500)" />
        </div>
      ) : (
        <div className={styles.playerCard}>
          {/* Minimize Button */}
          <button
            onClick={onToggleMinimize}
            className={styles.minimizeBtn}
            title="Minimize Player"
            aria-label="Minimize"
          >
            <Minimize2 size={13} />
          </button>

          {/* Vinyl Disc / Cover */}
          <div
            className={`${styles.vinylDisc} ${isPlaying ? styles.spinning : ''}`}
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <div className={styles.vinylCenter}>
              <span>🌷</span>
            </div>
          </div>

          {/* Player Info & Controls */}
          <div className={styles.playerInfo}>
            <div className={styles.songHeader}>
              <h4 className={styles.songTitle}>{MUSIC_TRACK.title}</h4>
              <span className={styles.songBadge}>Soundtrack</span>
            </div>
            <p className={styles.songArtist}>{MUSIC_TRACK.artist}</p>

            {/* Scrubber */}
            <div className={styles.progressRow}>
              <span className={styles.timeText}>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className={styles.progressBar}
                aria-label="Audio scrubber"
              />
              <span className={styles.timeText}>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.controlsGroup}>
            <button
              onClick={toggleMute}
              className={styles.controlBtn}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button
              onClick={onTogglePlay}
              className={styles.playPauseBtn}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
