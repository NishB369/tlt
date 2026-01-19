import express from 'express';
import * as videoController from '../controllers/videoController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes
// router.use(authenticateToken); // Uncomment when ready to protect

router
    .route('/')
    .get(videoController.getAllVideos)
    .post(videoController.createVideo);

router
    .route('/:id')
    .get(videoController.getVideo)
    .patch(videoController.updateVideo)
    .delete(videoController.deleteVideo);

export default router;
