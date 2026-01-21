import { Request, Response } from 'express';
import { Novel } from '../models/novelModel';
import { Video } from '../models/videoModel';
import { Summary } from '../models/summaryModel';
import { Note } from '../models/noteModel';
import { Quiz } from '../models/quizModel';

import { User } from '../models/userModel';

export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const [novelCount, videoCount, summaryCount, noteCount, quizCount, userCount] = await Promise.all([
            Novel.countDocuments(),
            Video.countDocuments(),
            Summary.countDocuments(),
            Note.countDocuments(),
            Quiz.countDocuments(),
            User.countDocuments()
        ]);

        const contentDistribution = [
            { name: 'Novels', count: novelCount, color: '#2563EB' },
            { name: 'Videos', count: videoCount, color: '#9333EA' },
            { name: 'Summaries', count: summaryCount, color: '#EA580C' },
            { name: 'Notes', count: noteCount, color: '#CA8A04' },
            { name: 'Quizzes', count: quizCount, color: '#16A34A' },
        ];

        res.status(200).json({
            status: 'success',
            data: {
                counts: {
                    novelCount,
                    videoCount,
                    summaryCount,
                    noteCount,
                    quizCount,
                    userCount
                },
                contentDistribution
            }
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error fetching stats'
        });
    }
};
