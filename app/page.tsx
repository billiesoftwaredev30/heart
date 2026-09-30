'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrapbookGallery from '@/components/ScrapbookGallery';
import LoveStoryTimeline from '@/components/LoveStoryTimeline';
import DiaryJournal from '@/components/DiaryJournal';
import TulipBlossom from '@/components/TulipBlossom';
import BucketList from '@/components/BucketList';
import LoveQuiz from '@/components/LoveQuiz';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import PhotoLightbox from '@/components/PhotoLightbox';
import FloatingPetals from '@/components/FloatingPetals';
import SecretGate from '@/components/SecretGate';
import { ALL_PHOTOS, PhotoItem } from '@/lib/photosData';
import { playChime } from '@/utils/audio';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerMinimized, setPlayerMinimized] = useState(false);
  
  // Lightbox state
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});

  // Initialize theme, auth, and likes from localStorage
  useEffect(() => {
    try {
      const auth = localStorage.getItem('heart_billie_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }

      const savedTheme = localStorage.getItem('heart_billie_theme') as 'light' | 'dark';
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      }

      const savedLikes = localStorage.getItem('heart_billie_likes');
      if (savedLikes) {
        setLikedPhotos(JSON.parse(savedLikes));
      }
    } catch {
      // storage
    } finally {
      setIsAuthLoaded(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsAuthenticated(true);
    setIsPlaying(true);
    try {
      localStorage.setItem('heart_billie_auth', 'true');
    } catch {
      // storage
    }
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setIsPlaying(false);
    try {
      localStorage.removeItem('heart_billie_auth');
    } catch {
      // storage
    }
    playChime();
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('heart_billie_theme', nextTheme);
    } catch {
      // storage
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleOpenPhoto = (photo: PhotoItem) => {
    const idx = ALL_PHOTOS.findIndex((p) => p.id === photo.id);
    setCurrentIndex(idx !== -1 ? idx : 0);
    setSelectedPhoto(photo);
    playChime();
  };

  const handleClosePhoto = () => {
    setSelectedPhoto(null);
  };

  const handlePrevPhoto = () => {
    const newIdx = (currentIndex - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length;
    setCurrentIndex(newIdx);
    setSelectedPhoto(ALL_PHOTOS[newIdx]);
  };

  const handleNextPhoto = () => {
    const newIdx = (currentIndex + 1) % ALL_PHOTOS.length;
    setCurrentIndex(newIdx);
    setSelectedPhoto(ALL_PHOTOS[newIdx]);
  };

  const handleToggleLike = (id: string) => {
    setLikedPhotos((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('heart_billie_likes', JSON.stringify(next));
      } catch {
        // storage
      }
      return next;
    });
    playChime();
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Ambient Falling Tulip Petals */}
      <FloatingPetals />

      {/* Secret Passcode Gate */}
      {isAuthLoaded && !isAuthenticated && (
        <SecretGate onUnlock={handleUnlock} />
      )}

      {/* Main Website Content (Accessible once unlocked) */}
      {isAuthenticated && (
        <>
          {/* Glassmorphic Navbar */}
          <Navbar
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            theme={theme}
            onToggleTheme={toggleTheme}
            onLock={handleLock}
          />

          {/* Hero Section */}
          <Hero
            onPhotoClick={handleOpenPhoto}
            onOpenMusic={() => {
              setIsPlaying(true);
              setPlayerMinimized(false);
            }}
          />

          {/* Scrapbook Photo Gallery */}
          <ScrapbookGallery
            onPhotoClick={handleOpenPhoto}
            likedPhotos={likedPhotos}
            onToggleLike={handleToggleLike}
          />

          {/* Chapters Love Story Timeline */}
          <LoveStoryTimeline onPhotoClick={handleOpenPhoto} />

          {/* Cora's Tulip Garden */}
          <TulipBlossom />

          {/* Love Diary & Unsealed Letters */}
          <DiaryJournal />

          {/* Couple Bucket List */}
          <BucketList />

          {/* Love Quiz Game */}
          <LoveQuiz />

          {/* Romantic Footer */}
          <Footer />

          {/* Floating Music Player */}
          <MusicPlayer
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            minimized={playerMinimized}
            onToggleMinimize={() => setPlayerMinimized((m) => !m)}
          />

          {/* Fullscreen Photo Lightbox */}
          <PhotoLightbox
            photo={selectedPhoto}
            onClose={handleClosePhoto}
            onPrev={handlePrevPhoto}
            onNext={handleNextPhoto}
            currentIndex={currentIndex}
            totalPhotos={ALL_PHOTOS.length}
            isLiked={selectedPhoto ? !!likedPhotos[selectedPhoto.id] : false}
            onToggleLike={handleToggleLike}
          />
        </>
      )}
    </main>
  );
}
