import express from 'express';
import * as novelController from '../controllers/novelController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(authenticateToken); // Uncomment to protect

router
    .route('/')
    .get(novelController.getAllNovels)
    .post(novelController.createNovel);

router
    .route('/:id')
    .get(novelController.getNovel)
    .patch(novelController.updateNovel)
    .put(novelController.updateNovel)
    .delete(novelController.deleteNovel);

export default router;
