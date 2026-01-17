import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    googleId: string;
    picture?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
        },
        googleId: {
            type: String,
            required: true,
            unique: true,
        },
        picture: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>('User', userSchema);
