import * as api from '../api/index.js';

export const getChallengers = (region) => async (dispatch) => {
    try {
      const { data: {data} } = await api.getChallengers(region);
      dispatch({type: "FETCH_LEADERBOARDS", payload: {data}});
      var temp = []
      for(var i = 0; i  < data.entries.length; i++)
      {
          temp.push(JSON.parse(JSON.stringify(data.entries[i])))
        
      }
      
      temp.sort(function (a, b) {
          return (a.leaguePoints < b.leaguePoints) ? 1 : (a.leaguePoints > b.leaguePoints) ? -1 : 0;
      });
      //console.dir(temp, {'maxArrayLength': null})
      return temp;

    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const changeRegion = (leaderboards) => async (dispatch) => {
  try {
      const{data} = await api.changeRegion(leaderboards);

      dispatch({type: "CHANGE_REGION", payload: data});
    
  } catch (error) {
      console.log(error);
  }
};