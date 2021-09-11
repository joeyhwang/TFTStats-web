import * as api from '../api/index.js';
import { FETCH_LEADERBOARDS, CHANGE_REGION } from '../constants/actionTypes.js';
export const getLeaderboards = (region, tier) => async (dispatch) => {
    try {
      const { data: {data} } = await api.getLeaderboards(region, tier);
      console.log(data)
      dispatch({type: FETCH_LEADERBOARDS, payload: {data}});

    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const changeRegion = (leaderboards) => async (dispatch) => {
  try {
      const{data} = await api.changeRegion(leaderboards);

      dispatch({type: CHANGE_REGION, payload: data});
    
  } catch (error) {
      console.log(error);
  }
};