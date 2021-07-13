import {combineReducers} from 'redux';
import summoner from './summoner.js';
import leaderboards from './leaderboards.js';

export const reducers = combineReducers({summoner,leaderboards});

