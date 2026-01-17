import mongoose, { Document, Schema } from 'mongoose';

// --- User Video Progress ---
export interface IUserVideoProgress extends Document {
    userId: mongoose.Types.ObjectId;
    videoId: mongoose.Types.ObjectId;
    watchedSeconds: number;
    totalSeconds: number;
    completed: boolean;
    lastWatched: Date;
    bookmarkedTimestamps: number[];
    notes: string;
}

const userVideoProgressSchema = new Schema<IUserVideoProgress>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
        watchedSeconds: { type: Number, default: 0 },
        totalSeconds: { type: Number, default: 0 },
        completed: { type: Boolean, default: false },
        lastWatched: { type: Date, default: Date.now },
        bookmarkedTimestamps: [{ type: Number }],
        notes: { type: String },
    },
    { timestamps: true }
);

// Compound index to ensure one progress record per user per video
userVideoProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export const UserVideoProgress = mongoose.model<IUserVideoProgress>(
    'UserVideoProgress',
    userVideoProgressSchema
);

// --- Quiz Attempt ---
export interface IQuizAttempt extends Document {
    userId: mongoose.Types.ObjectId;
    quizId: mongoose.Types.ObjectId;
    answers: Array<{ questionId: string; answer: string | number }>;
    score: number;
    totalPoints: number;
    percentage: number;
    timeTaken: number; // seconds
    passed: boolean;
    attemptNumber: number;
    completedAt: Date;
}

const quizAttemptSchema = new Schema<IQuizAttempt>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, required: true }, // or string if purely embedded
                answer: { type: Schema.Types.Mixed, required: true },
            },
        ],
        score: { type: Number, required: true },
        totalPoints: { type: Number, required: true },
        percentage: { type: Number, required: true },
        timeTaken: { type: Number, default: 0 },
        passed: { type: Boolean, required: true },
        attemptNumber: { type: Number, default: 1 },
        completedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const QuizAttempt = mongoose.model<IQuizAttempt>(
    'QuizAttempt',
    quizAttemptSchema
);

// --- User Note (Personal Notes on Content) ---
export interface IUserNote extends Document {
    userId: mongoose.Types.ObjectId;
    noteId: mongoose.Types.ObjectId; // Reference to the Content Note (or generic item)
    personalNotes: string;
    highlights: Array<{ start: number; end: number; color: string }>;
    lastRead: Date;
    isBookmarked: boolean;
}

const userNoteSchema = new Schema<IUserNote>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        noteId: { type: Schema.Types.ObjectId, ref: 'Note', required: true },
        personalNotes: { type: String },
        highlights: [
            {
                start: { type: Number, required: true },
                end: { type: Number, required: true },
                color: { type: String, default: 'yellow' },
            },
        ],
        lastRead: { type: Date, default: Date.now },
        isBookmarked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userNoteSchema.index({ userId: 1, noteId: 1 }, { unique: true });

export const UserNote = mongoose.model<IUserNote>('UserNote', userNoteSchema);
