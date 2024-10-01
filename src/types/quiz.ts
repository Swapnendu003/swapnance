// app/types/quiz.types.ts

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctOptionIndex: number;
    explanation: string;
  }
  
  export interface Badge {
    name: string;
    image: string; // Path to the badge image
  }
  