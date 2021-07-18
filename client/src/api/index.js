import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});


export const fetchSummonerBySearch = (name, region) => API.get(`/profile/${region}/${name}`);
export const fetchMatchByMatchID = (match,region) => API.get(`/profile/${region}/match/${match}`);
export const getChallengers = (region) => API.get(`/leaderboards/${region}`);
export const changeRegion = (newPost) => API.post(newPost);

export const items = axios.get('/json-data/items.json').then((res)=> {
    return res.data;
});

export const summonerIcon = axios.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json').then((res) => {
    return res.data;
});

export const ddragonVersion = axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then((res) => {
    return res.data[0];
});