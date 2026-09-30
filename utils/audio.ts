export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  tag?: string;
}

export const MUSIC_PLAYLIST: SongTrack[] = [
  {
    id: 'track-1',
    title: 'Aking Heart',
    artist: 'Dedicated to Cora & Billie',
    src: '/music/Aking_Heart.mp3',
    cover: '/photos/08975B8F-7A6A-44E6-83F6-ED4D2272664C.jpeg',
    tag: 'Original Soundtrack',
  },
  {
    id: 'track-2',
    title: 'Bulacan Hanggang Dasma',
    artist: 'Our Long Distance Love Story • Billie & Cora',
    src: '/music/Bulacan_Hanggang_Dasma.mp3',
    cover: '/photos/3ED6208D-F11C-4DBA-93F5-B7AFBDF638F0.jpeg',
    tag: 'Special Song',
  },
];

export const MUSIC_TRACK = MUSIC_PLAYLIST[0];


export const playChime = () => {
  if (typeof window === 'undefined') return;
  try {
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch {
    // AudioContext blocked or not supported
  }
};
