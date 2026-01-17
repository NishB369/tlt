import mongoose, { Document, Schema } from 'mongoose';

export interface ISummary extends Document {
    title: string;
    content: string;
    novel: mongoose.Types.ObjectId;
    chapter: string;
    relatedVideoId?: mongoose.Types.ObjectId;
    importantQuotes: Array<{ quote: string; context: string }>;
    characterMap?: string; // URL or JSON structure
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const summarySchema = new Schema<ISummary>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        novel: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
        chapter: { type: String, required: true },
        relatedVideoId: { type: Schema.Types.ObjectId, ref: 'Video' },
        importantQuotes: [
            {
                quote: { type: String, required: true },
                context: { type: String, required: true },
            },
        ],
        characterMap: { type: String },
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Summary = mongoose.model<ISummary>('Summary', summarySchema);
