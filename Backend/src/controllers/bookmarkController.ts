import { Request, Response } from 'express';
import { Bookmark } from '../models/bookmarkModel';

interface AuthRequest extends Request {
    user?: string;
}

export const toggleBookmark = async (req: Request, res: Response): Promise<void> => {
    try {
        const { itemId, itemType } = req.body;
        const userId = (req as AuthRequest).user; // User attached by authenticateToken middleware

        // Validate itemType
        const allowedTypes = ['Video', 'Note', 'Quiz', 'Summary'];
        if (!allowedTypes.includes(itemType)) {
            res.status(400).json({ status: 'fail', message: 'Invalid item type' });
            return;
        }

        const existingBookmark = await Bookmark.findOne({
            user: userId,
            item: itemId,
            onModel: itemType,
        });

        if (existingBookmark) {
            // If it exists, remove it (toggle off)
            await Bookmark.findByIdAndDelete(existingBookmark._id);
            res.status(200).json({
                status: 'success',
                message: 'Bookmark removed',
                data: { bookmarked: false },
            });
        } else {
            // If it doesn't exist, create it (toggle on)
            await Bookmark.create({
                user: userId,
                item: itemId,
                onModel: itemType,
            });
            res.status(201).json({
                status: 'success',
                message: 'Bookmark added',
                data: { bookmarked: true },
            });
        }
    } catch (error) {
        console.error('Bookmark toggle error:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

export const getBookmarks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthRequest).user;

        const bookmarks = await Bookmark.find({ user: userId })
            .populate({
                path: 'item',
                populate: {
                    path: 'novel', // Populate nested novel field if it exists on the item
                    select: 'title', // Only select title from novel
                }
            })
            .sort({ createdAt: -1 });

        // Filter out null items (in case formatted content was deleted)
        const validBookmarks = bookmarks.filter(b => b.item !== null);

        res.status(200).json({
            status: 'success',
            results: validBookmarks.length,
            data: { bookmarks: validBookmarks },
        });
    } catch (error) {
        console.error('Get bookmarks error:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};
