import {FETCH_LEADERBOARDS,CHANGE_REGION} from '../constants/actionTypes';

const leaderboard = (state = { data: null}, action) => {
    switch (action.type) {
      case FETCH_LEADERBOARDS:
        return { ...state, data: action.payload.data };
      case CHANGE_REGION:
        return { ...state, data: action.payload.data };
      default:
        return state;
    }
  };

  export default leaderboard;