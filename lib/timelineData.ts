export interface Milestone {
  id: string;
  year: string;
  date: string;
  title: string;
  tag: string;
  description: string;
  photo: string;
  quote?: string;
  location?: string;
}

export const TIMELINE_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    year: 'Chapter 01',
    date: 'The Beginning',
    title: 'The First Spark & First Hello',
    tag: 'First Chapter',
    description: 'The moment our paths crossed and an ordinary conversation turned into the most meaningful connection of our lives. From nervous smiles to effortless giggles that lasted until late at night.',
    photo: '/photos/08975B8F-7A6A-44E6-83F6-ED4D2272664C.jpeg',
    quote: '"From the first minute we spoke, I knew you were going to be someone special."',
    location: 'Where it all began'
  },
  {
    id: 'm-2',
    year: 'Chapter 02',
    date: 'Our First Date',
    title: 'Butterflies & Endless Coffee',
    tag: 'Sweet Beginnings',
    description: 'Sitting across from you, admiring your smile, wondering how someone could be so effortlessly beautiful and kind. Time completely melted away as we shared our favorite stories and dreams.',
    photo: '/photos/3ED6208D-F11C-4DBA-93F5-B7AFBDF638F0.jpeg',
    quote: '"I still remember what you wore and how my heart skipped when you laughed."',
    location: 'Cozy Café Corner'
  },
  {
    id: 'm-3',
    year: 'Chapter 03',
    date: 'September 19, 2026 — The Day It Became Official',
    title: 'You & Me Against the World',
    tag: 'Official',
    description: 'The day we promised to choose each other, through every high and low, every quiet evening and exciting journey. Holding hands and knowing that home is wherever you are.',
    photo: '/photos/49BB58DD-00F8-4679-8761-0BA8E1A35D93.jpeg',
    quote: '"The easiest ‘yes’ our hearts ever made."',
    location: 'Under the Evening Sky'
  },
  {
    id: 'm-4',
    year: 'Chapter 04',
    date: 'Tulip Fields & Surprises',
    title: 'A Touch of Pink Tulips',
    tag: 'Special Memory',
    description: 'Surprising Cora with gentle pink tulips—her favorite flower representing true love, softness, and new beginnings. Seeing her eyes light up was worth everything in the world.',
    photo: '/photos/4B211529-C5BB-451E-935A-8C7F7B207B25.jpeg',
    quote: '"Tulips for my Cora, blooming forever."',
    location: 'Flower Garden'
  },
  {
    id: 'm-5',
    year: 'Chapter 05',
    date: 'Adventures & Getaways',
    title: 'Exploring the World Hand in Hand',
    tag: 'Road Trips',
    description: 'From scenic coastal drives to mountain tops and city nightscapes. Tasting new food, singing along in the car, and taking endless candid photos to keep forever.',
    photo: '/photos/BA5C5807-B3EC-4841-BE8B-0B4BC591940E.jpeg',
    quote: '"Any destination is paradise as long as you are by my side."',
    location: 'Road Trip Haven'
  },
  {
    id: 'm-6',
    year: 'Chapter 06',
    date: 'Anniversaries & Milestones',
    title: 'Celebrating Our Everlasting Love',
    tag: 'Forever Love',
    description: 'Looking back on how much we have grown together, supported each other’s dreams, and built a sanctuary of pure warmth, respect, and deep romance.',
    photo: '/photos/86CC7901-8947-48F0-832F-6B381EAB3058.jpeg',
    quote: '"Aking Cora, ikaw at ako hanggang dulo."',
    location: 'Celebration Lights'
  },
  {
    id: 'm-7',
    year: 'Chapter 07',
    date: 'Our Tomorrow',
    title: 'The Future We Are Building',
    tag: 'Future Dreams',
    description: 'Our shared bucket lists, future home filled with cozy light and pink tulips, traveling to dream countries, and waking up next to each other for all the years to come.',
    photo: '/photos/F9BD2808-BCE1-482A-84B8-7D5DB4A0E085.jpeg',
    quote: '"The best chapters of our story are still waiting to be written."',
    location: 'Our Forever Future'
  }
];
