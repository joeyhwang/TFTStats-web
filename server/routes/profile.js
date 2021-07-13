import express from 'express';
import {getSummonerBySearch, getMatchDetails} from '../controllers/profile.js';

const router = express.Router();

router.get('/:region/:name', getSummonerBySearch);
router.get('/:region/match/:match', getMatchDetails);
export default router;