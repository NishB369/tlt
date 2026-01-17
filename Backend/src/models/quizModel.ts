import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
    question: string;
    type: 'mcq' | 'true-false' | 'short-answer';
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    points: number;
}

export interface IQuiz extends Document {
    title: string;
    description: string;
    novel: mongoose.Types.ObjectId;
    chapter: string;
    relatedVideoId?: mongoose.Types.ObjectId;
    questions: IQuestion[];
    totalPoints: number;
    timeLimit?: number; // in minutes
    passingScore: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    type: {
        type: String,
        enum: ['mcq', 'true-false', 'short-answer'],
        required: true,
    },
    options: [{ type: String }],
    correctAnswer: { type: Schema.Types.Mixed, required: true }, // string or number (index)
    explanation: { type: String },
    points: { type: Number, default: 1 },
});

const quizSchema = new Schema<IQuiz>(
    {
        title: { type: String, required: true },
        description: { type: String },
        novel: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
        chapter: { type: String, required: true },
        relatedVideoId: { type: Schema.Types.ObjectId, ref: 'Video' },
        questions: [questionSchema],
        totalPoints: { type: Number, default: 0 },
        timeLimit: { type: Number },
        passingScore: { type: Number, required: true },
        isPublished: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Pre-save hook to calculate total points if not manually set (optional, or handled in logic)
quizSchema.pre('save', async function () {
    if (this.questions && this.questions.length > 0) {
        this.totalPoints = this.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    }
});

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
