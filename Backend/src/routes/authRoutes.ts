import express from 'express';
import { googleLogin, refreshAccessToken, logout } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/google', googleLogin);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);

// Example protected route (optional)
router.get('/me', authenticateToken, (req: any, res) => {
    // In a real app, you might fetch user from DB using req.user
    res.json({ message: 'This is a protected route', userId: req.user });
});

export default router;
