export interface DiaryLetter {
  id: string;
  sender: 'Billie' | 'Heart';
  recipient: 'Heart' | 'Billie';
  title: string;
  date: string;
  excerpt: string;
  fullLetter: string[];
  themeColor: string;
  stampEmoji: string;
  isSealedByDefault?: boolean;
}

export const DIARY_LETTERS: DiaryLetter[] = [
  {
    id: 'letter-1',
    sender: 'Billie',
    recipient: 'Heart',
    title: 'To My Dearest Heart, My Whole World',
    date: 'A Quiet Midnight',
    excerpt: 'I wrote this website as a digital sanctuary of our love story...',
    themeColor: '#FDA4AF',
    stampEmoji: '🌷',
    isSealedByDefault: false,
    fullLetter: [
      'My dearest Heart,',
      'If you ever wonder how much you mean to me, just look through these pages, photos, and memories we’ve created together. Every snapshot is proof that having you in my life is the greatest blessing I have ever received.',
      'Thank you for your warmth, your patience, your adorable laughter, and the way you always make ordinary moments feel like something straight out of a romance film. When the world gets chaotic, being with you brings me absolute stillness and peace.',
      'I will always choose you, cherish you, and bring you pink tulips whenever you need a reminder of how deeply you are adored.',
      'Forever and always yours,',
      '— Billie'
    ]
  },
  {
    id: 'letter-2',
    sender: 'Heart',
    recipient: 'Billie',
    title: 'To My Safe Haven, Billie',
    date: 'A Gentle Sunny Morning',
    excerpt: 'Thank you for loving me in all the ways that make my heart feel safe and cherished...',
    themeColor: '#F472B6',
    stampEmoji: '💖',
    isSealedByDefault: true,
    fullLetter: [
      'Dearest Billie,',
      'Meeting you was the sweetest plot twist of my life. You are not only my partner in love, but my best friend, my greatest cheerleader, and the one who always knows how to make me smile even on difficult days.',
      'I love how thoughtful you are, the little ways you take care of me, and how you hold my hand through every journey. Thank you for filling our world with so much warmth and sweetness.',
      'Here is to a lifetime of late-night food runs, laughing at each other’s jokes, and growing old together hand in hand.',
      'With all my love,',
      '— Your Heart'
    ]
  },
  {
    id: 'letter-3',
    sender: 'Billie',
    recipient: 'Heart',
    title: 'A Little Promise for Every Tomorrow',
    date: 'Anniversary Note',
    excerpt: 'No matter where life leads us, my promise to you remains unshakable...',
    themeColor: '#FB7185',
    stampEmoji: '✨',
    isSealedByDefault: true,
    fullLetter: [
      'My Heart,',
      'I promise to listen to your stories with all my attention, to kiss your forehead whenever you feel tired, to celebrate your biggest victories, and to be your anchor whenever the waves get high.',
      'You are my home, my peace, and my greatest dream come true.',
      'Mahal na mahal kita, Heart ko.',
      '— Billie'
    ]
  }
];

export interface ReasonWhy {
  id: number;
  reason: string;
  icon: string;
  tag: string;
}

export const REASONS_WHY_I_LOVE_YOU: ReasonWhy[] = [
  { id: 1, reason: "The way your eyes wrinkle with joy whenever you laugh out loud.", icon: "✨", tag: "Smile" },
  { id: 2, reason: "How you make even a simple grocery or coffee run feel like a magical date.", icon: "☕", tag: "Dates" },
  { id: 3, reason: "Your gentle kindness and how genuinely you care for everyone around you.", icon: "🌸", tag: "Soul" },
  { id: 4, reason: "Your love for pink tulips and how your face brightens up when you see them.", icon: "🌷", tag: "Tulips" },
  { id: 5, reason: "How safe and peaceful I feel whenever you rest your head on my shoulder.", icon: "🕊️", tag: "Comfort" },
  { id: 6, reason: "Your adorable reactions and silly faces when we take candid selfies.", icon: "📸", tag: "Candid" },
  { id: 7, reason: "The way you always remember the small details about what I like.", icon: "💌", tag: "Sweet" },
  { id: 8, reason: "How you hold my hand tightly whenever we are walking in a crowded street.", icon: "🤝", tag: "Touch" },
  { id: 9, reason: "Our late-night deep conversations when the whole world is asleep.", icon: "🌙", tag: "Nights" },
  { id: 10, reason: "The delicious food we share and how we always steal bites from each other.", icon: "🍰", tag: "Food" },
  { id: 11, reason: "How you motivate and inspire me to become a better person every day.", icon: "🌱", tag: "Growth" },
  { id: 12, reason: "Simply because you are you—my Heart, my forever partner.", icon: "💖", tag: "Forever" }
];
