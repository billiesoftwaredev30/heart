export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  funFact: string;
}

export const COUPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Heart’s absolute favorite flower that brings the biggest smile to her face?",
    options: ["Red Roses", "Pink Tulips 🌷", "Sunflowers", "White Lilies"],
    correctIndex: 1,
    funFact: "Pink tulips symbolize affection, caring, and true love—just like Heart!"
  },
  {
    id: 2,
    question: "Who is more likely to suggest a spontaneous late-night food run or dessert?",
    options: ["Billie", "Heart", "Both at the exact same second!", "Depends on who smells the fries first"],
    correctIndex: 2,
    funFact: "Whenever one craves snacks, the other is already grabbing the keys!"
  },
  {
    id: 3,
    question: "What song is playing as the signature soundtrack of this love scrapbook?",
    options: ["Aking Heart", "Perfect by Ed Sheeran", "Lover by Taylor Swift", "Until I Found You"],
    correctIndex: 0,
    funFact: "‘_Aking Heart_’ was composed and dedicated especially for this sweet love story."
  },
  {
    id: 4,
    question: "What is the secret ingredient that makes Billie & Heart’s relationship so strong?",
    options: ["Infinite patience & humor", "Endless sweet hugs & pink tulips", "Deep communication & trust", "All of the above & more ❤️"],
    correctIndex: 3,
    funFact: "Every day is an opportunity to love, appreciate, and grow closer together."
  }
];
