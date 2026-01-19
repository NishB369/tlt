// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  createdAt: Date;
  lastLogin: Date;
  studyStreak: number;
  totalStudyTime: number;
  level: number;
  xp: number;
  preferences: {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
  };
}

// Video Types
export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  novel: string;
  chapter: string;
  order: number;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserVideoProgress {
  id: string;
  userId: string;
  videoId: string;
  watchedSeconds: number;
  totalSeconds: number;
  completed: boolean;
  lastWatched: Date;
  bookmarkedTimestamps: number[];
  notes: string;
}

// Note Types
export interface Note {
  id: string;
  title: string;
  content: string;
  novel: string;
  chapter: string;
  relatedVideoId?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserNote {
  id: string;
  userId: string;
  noteId: string;
  personalNotes: string;
  highlights: Array<{ start: number; end: number; color: string }>;
  lastRead: Date;
  isBookmarked: boolean;
}

// Quiz Types
export interface Question {
  id: string;
  question: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  novel: string;
  chapter: string;
  relatedVideoId?: string;
  questions: Question[];
  totalPoints: number;
  timeLimit?: number;
  passingScore: number;
  isPublished: boolean;
  createdAt: Date;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  answers: Array<{ questionId: string; answer: string | number }>;
  score: number;
  totalPoints: number;
  percentage: number;
  timeTaken: number;
  passed: boolean;
  attemptNumber: number;
  completedAt: Date;
}

// Summary Types
export interface Summary {
  id: string;
  title: string;
  content: string;
  novel: string;
  chapter: string;
  relatedVideoId?: string;
  keyPoints: string[];
  importantQuotes: Array<{ quote: string; context: string }>;
  characterMap?: string;
  isPublished: boolean;
  createdAt: Date;
}

// Bookmark Types
export interface Bookmark {
  id: string;
  userId: string;
  itemType: 'video' | 'note' | 'quiz' | 'summary';
  itemId: string;
  createdAt: Date;
}

// Study Session Types
export interface StudySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  itemType: 'video' | 'note' | 'quiz' | 'summary' | 'pomodoro';
  itemId?: string;
  notes?: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  userId: string;
  achievementType: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: Date;
}

// Novel Types
export interface Novel {
  id: string;
  _id?: string;
  title: string;
  author: string;
  description: string;
  totalChapters: number;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
}

// Navigation Types
export interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

// Stats Types
export interface UserStats {
  totalVideosWatched: number;
  totalQuizzesTaken: number;
  averageQuizScore: number;
  totalStudyTime: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  xp: number;
  achievements: Achievement[];
}
