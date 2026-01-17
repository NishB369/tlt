import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
    title: string;
    content: string; // Markdown or HTML
    novel: mongoose.Types.ObjectId;
    chapter: string;
    relatedVideoId?: mongoose.Types.ObjectId;
    tags: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const noteSchema = new Schema<INote>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        novel: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
        chapter: { type: String, required: true },
        relatedVideoId: { type: Schema.Types.ObjectId, ref: 'Video' },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Note = mongoose.model<INote>('Note', noteSchema);
