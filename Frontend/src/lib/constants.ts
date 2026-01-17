import { Video, Note, Quiz, Summary, Novel } from '@/src/types';

// Navigation Items
export const NAV_ITEMS = [
    { name: 'Home', href: '/dashboard', icon: 'Home' },
    { name: 'Videos', href: '/dashboard/videos', icon: 'Video' },
    { name: 'Notes', href: '/dashboard/notes', icon: 'BookOpen' },
    { name: 'Quizzes', href: '/dashboard/quiz', icon: 'CheckCircle' },
    { name: 'Summary', href: '/dashboard/summary', icon: 'FileText' },
    { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: 'Bookmark' },
    { name: 'History', href: '/dashboard/history', icon: 'Clock' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart3' },
];

// XP Rewards
export const XP_REWARDS = {
    VIDEO_WATCHED: 10,
    VIDEO_COMPLETED: 20,
    QUIZ_TAKEN: 15,
    QUIZ_PASSED: 25,
    QUIZ_PERFECT: 50,
    NOTE_READ: 5,
    SUMMARY_READ: 5,
    DAILY_STREAK: 10,
    WEEKLY_STREAK: 50,
};

// Achievements
export const ACHIEVEMENTS = {
    FIRST_VIDEO: {
        id: 'first_video',
        title: 'First Steps',
        description: 'Watch your first video',
        icon: 'Film',
        xpReward: 25,
    },
    QUIZ_MASTER: {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Score 100% on 5 quizzes',
        icon: 'Target',
        xpReward: 100,
    },
    STREAK_7: {
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day study streak',
        icon: 'Flame',
        xpReward: 75,
    },
    STREAK_30: {
        id: 'streak_30',
        title: 'Dedicated Scholar',
        description: 'Maintain a 30-day study streak',
        icon: 'Star',
        xpReward: 250,
    },
    BOOKWORM: {
        id: 'bookworm',
        title: 'Bookworm',
        description: 'Read 10 notes',
        icon: 'BookOpen',
        xpReward: 50,
    },
    SPEED_LEARNER: {
        id: 'speed_learner',
        title: 'Speed Learner',
        description: 'Complete 5 chapters in one week',
        icon: 'Zap',
        xpReward: 100,
    },
};

// Motivational Quotes
export const MOTIVATIONAL_QUOTES = [
    "The more that you read, the more things you will know.",
    "A reader lives a thousand lives before he dies.",
    "Literature is the most agreeable way of ignoring life.",
    "Books are a uniquely portable magic.",
    "Reading is to the mind what exercise is to the body.",
    "There is no friend as loyal as a book.",
    "The only thing you absolutely have to know is the location of the library.",
    "A book is a dream that you hold in your hand.",
];

// Mock Novels
export const MOCK_NOVELS: Novel[] = [
    {
        id: 'pride-prejudice',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel following the emotional development of Elizabeth Bennet.',
        coverImage: '/images/pride-prejudice.jpg',
        totalChapters: 61,
        tags: ['Romance', 'Classic', 'Social Commentary'],
        difficulty: 'intermediate',
        isPublished: true,
    },
    {
        id: 'wuthering-heights',
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        description: 'A tale of passion, revenge, and the destructive effects of unrequited love.',
        coverImage: '/images/wuthering-heights.jpg',
        totalChapters: 34,
        tags: ['Gothic', 'Romance', 'Classic'],
        difficulty: 'advanced',
        isPublished: true,
    },
    {
        id: 'great-gatsby',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A critique of the American Dream set in the Jazz Age.',
        coverImage: '/images/great-gatsby.jpg',
        totalChapters: 9,
        tags: ['American Literature', 'Classic', 'Tragedy'],
        difficulty: 'intermediate',
        isPublished: true,
    },
];

// Mock Videos
export const MOCK_VIDEOS: Video[] = [
    {
        id: 'v1',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Pride & Prejudice - Chapter 1: Introduction',
        description: 'An introduction to the world of Pride and Prejudice',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 930,
        novel: 'Pride and Prejudice',
        chapter: 'Chapter 1',
        order: 1,
        tags: ['introduction', 'characters'],
        isPublished: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'v2',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Character Analysis: Elizabeth Bennet',
        description: 'Deep dive into the protagonist of Pride and Prejudice',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 1125,
        novel: 'Pride and Prejudice',
        chapter: 'Chapter 2',
        order: 2,
        tags: ['characters', 'analysis'],
        isPublished: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
    },
    {
        id: 'v3',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Character Analysis: Mr. Darcy',
        description: 'Understanding the complex character of Mr. Darcy',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 1350,
        novel: 'Pride and Prejudice',
        chapter: 'Chapter 3',
        order: 3,
        tags: ['characters', 'analysis'],
        isPublished: true,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
    },
    {
        id: 'v4',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'Wuthering Heights - Introduction',
        description: 'Introduction to Emily Brontë\'s masterpiece',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 1080,
        novel: 'Wuthering Heights',
        chapter: 'Chapter 1',
        order: 1,
        tags: ['introduction', 'gothic'],
        isPublished: true,
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04'),
    },
    {
        id: 'v5',
        youtubeId: 'dQw4w9WgXcQ',
        title: 'The Great Gatsby - Themes Overview',
        description: 'Exploring the major themes in The Great Gatsby',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 1560,
        novel: 'The Great Gatsby',
        chapter: 'Overview',
        order: 1,
        tags: ['themes', 'american-dream'],
        isPublished: true,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
    },
];

// Mock Notes
export const MOCK_NOTES: Note[] = [
    {
        id: 'n1',
        title: 'Character Analysis - The Bennet Family',
        content: `# The Bennet Family\n\nThe Bennet family forms the heart of Pride and Prejudice...\n\n## Mr. Bennet\nAn intelligent but detached father who finds amusement in his wife's follies.\n\n## Mrs. Bennet\nA nervous, superficial woman obsessed with marrying off her daughters.\n\n## The Daughters\n- **Jane** - The eldest, beautiful and kind\n- **Elizabeth** - Our protagonist, witty and independent\n- **Mary** - The middle child, bookish and moralizing\n- **Kitty** - Easily influenced by Lydia\n- **Lydia** - The youngest, flirtatious and reckless`,
        novel: 'Pride and Prejudice',
        chapter: 'Characters',
        tags: ['characters', 'analysis'],
        isPublished: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
    },
    {
        id: 'n2',
        title: 'Themes in Pride and Prejudice',
        content: `# Major Themes\n\n## Pride and Prejudice\nThe central theme explores how both pride and prejudice can lead to misunderstanding...\n\n## Marriage and Social Class\nAusten critiques the marriage market of her time...\n\n## First Impressions\nThe original title of the novel, highlighting how initial judgments can be wrong.`,
        novel: 'Pride and Prejudice',
        chapter: 'Themes',
        tags: ['themes', 'analysis'],
        isPublished: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
    },
    {
        id: 'n3',
        title: 'Gothic Elements in Wuthering Heights',
        content: `# Gothic Elements\n\nWuthering Heights is considered a masterpiece of Gothic literature...\n\n## Setting\nThe isolated moors create an atmosphere of mystery and danger.\n\n## Supernatural Elements\nGhosts and haunting are central to the narrative.\n\n## Dark Romance\nThe passionate, destructive love between Heathcliff and Catherine.`,
        novel: 'Wuthering Heights',
        chapter: 'Themes',
        tags: ['gothic', 'themes'],
        isPublished: true,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
    },
];

// Mock Quizzes
export const MOCK_QUIZZES: Quiz[] = [
    {
        id: 'q1',
        title: 'Pride & Prejudice - Chapter 1 Quiz',
        description: 'Test your understanding of the opening chapter',
        novel: 'Pride and Prejudice',
        chapter: 'Chapter 1',
        questions: [
            {
                id: 'q1-1',
                question: 'What is the famous opening line of Pride and Prejudice?',
                type: 'mcq',
                options: [
                    'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
                    'Call me Ishmael.',
                    'It was the best of times, it was the worst of times.',
                    'All happy families are alike; each unhappy family is unhappy in its own way.',
                ],
                correctAnswer: 0,
                explanation: 'This iconic opening line sets the tone for the entire novel, introducing the theme of marriage and fortune.',
                points: 10,
            },
            {
                id: 'q1-2',
                question: 'Who has just rented Netherfield Park?',
                type: 'mcq',
                options: ['Mr. Darcy', 'Mr. Bingley', 'Mr. Wickham', 'Mr. Collins'],
                correctAnswer: 1,
                explanation: 'Mr. Bingley, a wealthy young man from the north of England, has rented Netherfield Park.',
                points: 10,
            },
            {
                id: 'q1-3',
                question: 'How many daughters do Mr. and Mrs. Bennet have?',
                type: 'mcq',
                options: ['Three', 'Four', 'Five', 'Six'],
                correctAnswer: 2,
                explanation: 'The Bennets have five daughters: Jane, Elizabeth, Mary, Kitty, and Lydia.',
                points: 10,
            },
            {
                id: 'q1-4',
                question: 'Mrs. Bennet is primarily concerned with finding husbands for her daughters.',
                type: 'true-false',
                options: ['True', 'False'],
                correctAnswer: 0,
                explanation: 'Mrs. Bennet\'s main goal throughout the novel is to see her daughters married well.',
                points: 10,
            },
            {
                id: 'q1-5',
                question: 'What is Mr. Bennet\'s attitude toward his wife\'s matchmaking schemes?',
                type: 'mcq',
                options: ['Enthusiastic support', 'Amused detachment', 'Angry opposition', 'Complete agreement'],
                correctAnswer: 1,
                explanation: 'Mr. Bennet often takes an ironic, detached view of his wife\'s obsession with marriage.',
                points: 10,
            },
        ],
        totalPoints: 50,
        timeLimit: 600,
        passingScore: 30,
        isPublished: true,
        createdAt: new Date('2024-01-01'),
    },
    {
        id: 'q2',
        title: 'Character Analysis Quiz',
        description: 'How well do you know the characters?',
        novel: 'Pride and Prejudice',
        chapter: 'Characters',
        questions: [
            {
                id: 'q2-1',
                question: 'Which sister is described as the most beautiful?',
                type: 'mcq',
                options: ['Elizabeth', 'Jane', 'Lydia', 'Mary'],
                correctAnswer: 1,
                explanation: 'Jane Bennet is consistently described as the most beautiful of the five sisters.',
                points: 10,
            },
            {
                id: 'q2-2',
                question: 'What is Elizabeth\'s most notable characteristic?',
                type: 'mcq',
                options: ['Her beauty', 'Her wit and intelligence', 'Her musical talent', 'Her shyness'],
                correctAnswer: 1,
                explanation: 'Elizabeth is known for her quick wit, intelligence, and lively personality.',
                points: 10,
            },
        ],
        totalPoints: 20,
        passingScore: 12,
        isPublished: true,
        createdAt: new Date('2024-01-02'),
    },
];

// Mock Summaries
export const MOCK_SUMMARIES: Summary[] = [
    {
        id: 's1',
        title: 'Pride & Prejudice - Chapter 1 Summary',
        content: `# Chapter 1 Summary\n\nThe novel opens with one of the most famous lines in English literature...`,
        novel: 'Pride and Prejudice',
        chapter: 'Chapter 1',
        keyPoints: [
            'Introduction of the Bennet family',
            'Mr. Bingley arrives at Netherfield',
            'Mrs. Bennet\'s matchmaking ambitions',
            'Mr. Bennet\'s ironic humor',
            'The theme of marriage and fortune',
        ],
        importantQuotes: [
            {
                quote: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
                context: 'Opening line establishing the novel\'s satirical tone',
            },
        ],
        isPublished: true,
        createdAt: new Date('2024-01-01'),
    },
];

// Mock User Stats
export const MOCK_USER_STATS = {
    totalVideosWatched: 12,
    totalQuizzesTaken: 8,
    averageQuizScore: 82,
    totalStudyTime: 272,
    currentStreak: 7,
    longestStreak: 14,
    level: 5,
    xp: 850,
};

// Mock Recent Activity
export const MOCK_RECENT_ACTIVITY = [
    {
        id: 'a1',
        type: 'video',
        title: 'Watched: Character Analysis - Elizabeth Bennet',
        time: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    },
    {
        id: 'a2',
        type: 'quiz',
        title: 'Completed: Chapter 1 Quiz (85%)',
        time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
        id: 'a3',
        type: 'note',
        title: 'Read: Themes in Pride and Prejudice',
        time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
        id: 'a4',
        type: 'pomodoro',
        title: 'Completed Pomodoro Session (25m)',
        time: new Date(Date.now() - 1000 * 60 * 60 * 24), // Yesterday
    },
];
