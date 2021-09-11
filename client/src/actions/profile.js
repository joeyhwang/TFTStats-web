import * as api from '../api/index.js';
import {FETCH_SUMMONER, FETCH_MATCH} from '../constants/actionTypes';

export const getSummonerBySearch = (name, region) => async (dispatch) => {
    try {
      
      const { data: {data} } = await api.fetchSummonerBySearch(name, region);
      
      dispatch({type: FETCH_SUMMONER, payload: {data}});
      return data;
      
    } catch (error) {
      console.log(error);
    }
};

export const getMatchByMatchID = (match, region) => async (dispatch) => {
    try {
      const {data: {data}} = await api.fetchMatchByMatchID(match,region);
      
      dispatch({type: FETCH_MATCH, payload: {data}});
      return data;
    } catch (error) {
      console.log(error);
    }
  };