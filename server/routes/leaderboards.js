import express from 'express';
import { getTierSummoners } from '../controllers/leaderboards.js';

const router = express.Router();

router.get('/:region/:tier', getTierSummoners);

export default router;