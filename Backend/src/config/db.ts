import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        // Log connection attempt (masking password for security)
        const maskedURI = mongoURI.replace(/:([^@]+)@/, ':****@');
        console.log(`Attempting to connect to MongoDB: ${maskedURI}`);

        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected Successfully');
    } catch (err: any) {
        console.error('MongoDB connection error:', err);

        // Provide specific advice for common Atlas connection issues
        if (err.name === 'MongooseServerSelectionError' || err.message.includes('IP address is not whitelisted')) {
            console.error('TIP: Your server IP may not be whitelisted in MongoDB Atlas.');
            console.error('Go to MongoDB Atlas -> Network Access -> Add IP Address (0.0.0.0/0 for all)');
        }
        process.exit(1);
    }
};
