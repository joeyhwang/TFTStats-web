import {FETCH_SUMMONER, FETCH_MATCH} from '../constants/actionTypes';

const summoner = (state = { data: [], matches: []}, action) => {
    switch (action.type) {
      case FETCH_SUMMONER:
        return { ...state, data: action.payload.data };
      case FETCH_MATCH:
        return { ...state, matches: [...state.matches, action.payload.data]};
      default:
        return state;
    }
  };

  export default summoner;