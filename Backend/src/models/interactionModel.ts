import mongoose, { Document, Schema } from 'mongoose';

// --- Bookmark ---
export interface IBookmark extends Document {
    userId: mongoose.Types.ObjectId;
    itemType: 'video' | 'note' | 'quiz' | 'summary';
    itemId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        itemType: {
            type: String,
            enum: ['video', 'note', 'quiz', 'summary'],
            required: true,
        },
        itemId: { type: Schema.Types.ObjectId, required: true, refPath: 'itemTypeModel' }, // Dynamic ref handled by logic usually
    },
    { timestamps: true }
);

// Index for quick lookup and preventing duplicates
bookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);

// --- Study Session (Pomodoro/Time Tracking) ---
export interface IStudySession extends Document {
    userId: mongoose.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    duration: number; // usually calculated in minutes/seconds
    itemType: 'video' | 'note' | 'quiz' | 'summary' | 'pomodoro';
    itemId?: mongoose.Types.ObjectId;
    notes?: string;
}

const studySessionSchema = new Schema<IStudySession>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date }, // Can be null if currently active
        duration: { type: Number, default: 0 },
        itemType: {
            type: String,
            enum: ['video', 'note', 'quiz', 'summary', 'pomodoro'],
            default: 'pomodoro',
        },
        itemId: { type: Schema.Types.ObjectId },
        notes: { type: String },
    },
    { timestamps: true }
);

export const StudySession = mongoose.model<IStudySession>(
    'StudySession',
    studySessionSchema
);
