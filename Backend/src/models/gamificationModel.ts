import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
    userId: mongoose.Types.ObjectId;
    achievementType: string; // e.g., 'streak_7_days', 'perfect_quiz'
    title: string;
    description: string;
    icon: string; // URL or icon identifier
    xpReward: number;
    unlockedAt: Date;
}

const achievementSchema = new Schema<IAchievement>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        achievementType: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        xpReward: { type: Number, default: 0 },
        unlockedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

// Ensure user doesn't get the same achievement type multiple times (unless that's desired behavior)
achievementSchema.index({ userId: 1, achievementType: 1 }, { unique: true });

export const Achievement = mongoose.model<IAchievement>(
    'Achievement',
    achievementSchema
);
