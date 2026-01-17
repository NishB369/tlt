import mongoose, { Document, Schema } from 'mongoose';

export interface INovel extends Document {
    title: string;
    author: string;
    description: string;
    coverImage: string;
    totalChapters: number;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const novelSchema = new Schema<INovel>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        coverImage: { type: String, required: true },
        totalChapters: { type: Number, default: 0 },
        tags: [{ type: String }],
        difficulty: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner',
        },
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Novel = mongoose.model<INovel>('Novel', novelSchema);
