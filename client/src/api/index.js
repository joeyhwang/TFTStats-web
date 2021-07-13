import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});


export const fetchSummonerBySearch = (name, region) => API.get(`/profile/${region}/${name}`);
export const fetchMatchByMatchID = (match,region) => API.get(`/profile/${region}/match/${match}`);
export const getChallengers = (region) => API.get(`/leaderboards/${region}`);
export const changeRegion = (newPost) => API.post(newPost);
