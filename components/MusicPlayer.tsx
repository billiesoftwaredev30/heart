'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  SkipForward,
  SkipBack,
  ListMusic,
  Music,
  Sparkles,
  X
} from 'lucide-react';
import { MUSIC_PLAYLIST, SongTrack } from '@/utils/audio';
import styles from './MusicPlayer.module.css';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  minimized: boolean;
  onToggleMinimize: () => void;
  currentTrackIndex?: number;
  onTrackChange?: (index: number) => void;
}

export default function MusicPlayer({
  isPlaying,
  onTogglePlay,
  minimized,
  onToggleMinimize,
  currentTrackIndex = 0,
  onTrackChange,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [internalTrackIndex, setInternalTrackIndex] = useState(currentTrackIndex);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const activeIndex = onTrackChange ? currentTrackIndex : internalTrackIndex;
  const currentTrack: SongTrack = MUSIC_PLAYLIST[activeIndex] || MUSIC_PLAYLIST[0];

  const handleSelectTrack = (index: number) => {
    if (onTrackChange) {
      onTrackChange(index);
    } else {
      setInternalTrackIndex(index);
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (activeIndex + 1) % MUSIC_PLAYLIST.length;
    handleSelectTrack(nextIndex);
  };

  const handlePrevTrack = () => {
    const prevIndex = (activeIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    handleSelectTrack(prevIndex);
  };

  // Synchronize audio source when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentTrack.src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay may need user gesture
      });
    }
  }, [activeIndex, currentTrack.src]);

  // Synchronize play / pause state
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
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNextTrack}
      />

      {minimized ? (
        <div className={styles.minimizedPill} onClick={onToggleMinimize}>
          <div
            className={`${styles.vinylDisc} ${isPlaying ? styles.spinning : ''}`}
            style={{ width: 32, height: 32 }}
          >
            <div className={styles.vinylCenter} style={{ width: 12, height: 12 }}>
              <span>🌷</span>
            </div>
          </div>
          <span className={styles.pillText}>{currentTrack.title}</span>
          <span className={styles.pillBadge}>
            {activeIndex + 1}/{MUSIC_PLAYLIST.length}
          </span>
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

          {/* Playlist Panel (Drawer) */}
          {showPlaylist && (
            <div className={styles.playlistPanel}>
              <div className={styles.playlistHeader}>
                <span className={styles.playlistTitle}>
                  <Music size={14} /> Our Soundtrack Playlist
                </span>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className={styles.controlBtn}
                  style={{ width: 24, height: 24 }}
                  title="Close Playlist"
                >
                  <X size={14} />
                </button>
              </div>
              {MUSIC_PLAYLIST.map((track, idx) => (
                <button
                  key={track.id}
                  onClick={() => {
                    handleSelectTrack(idx);
                    setShowPlaylist(false);
                  }}
                  className={`${styles.playlistItem} ${
                    idx === activeIndex ? styles.playlistItemActive : ''
                  }`}
                >
                  <div className={styles.playlistItemInfo}>
                    <div className={styles.playlistItemTitle}>{track.title}</div>
                    <div className={styles.playlistItemArtist}>{track.artist}</div>
                  </div>
                  {idx === activeIndex && (
                    <span className={styles.playlistItemActiveIndicator}>
                      {isPlaying ? '▶ Playing' : 'Selected'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

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
              <h4 className={styles.songTitle}>{currentTrack.title}</h4>
              <span className={styles.songBadge}>
                Track {activeIndex + 1}/{MUSIC_PLAYLIST.length}
              </span>
            </div>
            <p className={styles.songArtist}>{currentTrack.artist}</p>

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
            {/* Prev Track */}
            <button
              onClick={handlePrevTrack}
              className={styles.controlBtn}
              title="Previous Track"
              aria-label="Previous Track"
            >
              <SkipBack size={16} />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onTogglePlay}
              className={styles.playPauseBtn}
              title={isPlaying ? 'Pause' : 'Play'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} fill="#ffffff" /> : <Play size={18} fill="#ffffff" />}
            </button>

            {/* Next Track */}
            <button
              onClick={handleNextTrack}
              className={styles.controlBtn}
              title="Next Track: Bulacan Hanggang Dasma"
              aria-label="Next Track"
            >
              <SkipForward size={16} />
            </button>

            {/* Playlist Drawer Toggle */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={styles.controlBtn}
              title="View Playlist"
              aria-label="View Playlist"
              style={{ color: showPlaylist ? 'var(--color-pink-500)' : undefined }}
            >
              <ListMusic size={16} />
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className={styles.controlBtn}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
