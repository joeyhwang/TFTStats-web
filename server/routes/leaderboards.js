import express from 'express';
import { getChallengers } from '../controllers/leaderboards.js';

const router = express.Router();

router.get('/:region', getChallengers);

export default router;