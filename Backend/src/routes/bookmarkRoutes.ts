import express from 'express';
import { toggleBookmark, getBookmarks } from '../controllers/bookmarkController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateToken); // All bookmark routes are protected

router.route('/')
    .get(getBookmarks)
    .post(toggleBookmark);

export default router;
