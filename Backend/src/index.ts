import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from '../src/config/db.js';
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import novelRoutes from './routes/novelRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { createCrudRouter } from './utils/createCrudRouter.js';
import { Summary } from './models/summaryModel.js';
import { Note } from './models/noteModel.js';
import { Quiz } from './models/quizModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/novels', novelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/summaries', createCrudRouter(Summary, { path: 'novel', select: 'title' }));
app.use('/api/notes', createCrudRouter(Note, { path: 'novel', select: 'title' }));
app.use('/api/quizzes', createCrudRouter(Quiz, { path: 'novel', select: 'title' }));
app.use('/api/stats', statsRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
