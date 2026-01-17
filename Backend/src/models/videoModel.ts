import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
    youtubeId: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    novel: mongoose.Types.ObjectId; // Reference to Novel
    chapter: string;
    order: number;
    tags: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
    {
        youtubeId: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        thumbnail: { type: String },
        duration: { type: Number, default: 0 },
        novel: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
        chapter: { type: String, required: true },
        order: { type: Number, default: 0 },
        tags: [{ type: String }],
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Video = mongoose.model<IVideo>('Video', videoSchema);
