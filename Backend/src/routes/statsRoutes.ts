import express from 'express';
import { getAdminStats } from '../controllers/statsController';

const router = express.Router();

router.get('/', getAdminStats);

export default router;
