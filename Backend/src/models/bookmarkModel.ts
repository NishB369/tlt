import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark extends Document {
    user: mongoose.Types.ObjectId;
    item: mongoose.Types.ObjectId; // Reference to Video, Note, Quiz, or Summary
    onModel: 'Video' | 'Note' | 'Quiz' | 'Summary';
    createdAt: Date;
}

const bookmarkSchema = new Schema<IBookmark>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        item: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: 'onModel',
        },
        onModel: {
            type: String,
            required: true,
            enum: ['Video', 'Note', 'Quiz', 'Summary'],
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
);

// Ensure a user can only bookmark an item once
bookmarkSchema.index({ user: 1, item: 1, onModel: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);
