import React, {useState, useEffect} from 'react'
import {Container, Grid, Typography,Button, Paper} from '@material-ui/core'
import useStyles from './styles';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {profileJson, matchJson, summonerDetailsJson} from '../../constants/summonerJson';
import {getSummonerBySearch, getMatchByMatchID} from '../../actions/profile.js';
import StarIcon from '@material-ui/icons/Star';
import { Bar } from 'react-chartjs-2';
import TimeAgo from 'react-timeago';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table'

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const classes = useStyles();
    const [summonerName,setName] = useState('');
    const [puuid, setPuuid] = useState('');
    const [profileIconId, setId] = useState(0);
    const [summonerLevel, setSummonerLevel] = useState(0);
    const [lp, setLP] = useState(0);
    const [rankNumeral, setRankNumeral] = useState('');
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [tier, setTier] = useState('');
    const { region, name } = useParams();
    const [matchesArray, setMatchesArray] = useState([]);
    const [summonerExists, setSummonerExists] = useState(true);
    const [loading, setLoading] = useState(true);
    const [itemDictionary, setItemDictionary] = useState(null);
    const [littleLegendDictionary, setLittleLegendDictionary] = useState(null);
    let placementData = [0,0,0,0,0,0,0,0];
    const numberOfGames = 10;
    const placementChartData = {
      labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
      datasets: [
        {
          label: `Past ${numberOfGames} Games`,
          data: placementData,
          
          backgroundColor: [
            'lightGreen',
            'lightBlue',
            'lightBlue',
            'lightBlue',
            'lightGray',
            'lightGray',
            'lightGray',
            'lightGray',
          ]
        }
      ], 
    }

    useEffect(() => {
      //fetch item and little legend json and convert it into a dictionary to store it in the state
        let itemD = {};
        fetch("/json-data/items.json"
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }
        ).then( itemResponse =>{
            return itemResponse.json();
        }).then( itemJson => {
          for (let item = 0; item < itemJson.length; item++) {          
            itemD[itemJson[item]['id']] = itemJson[item]['name'];
          }
          setItemDictionary(itemD);
        });

        let llDict = {};

        fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/companions.json"
        ).then( llResponse => {
          return llResponse.json();
        }).then (llJson => {
          for (let i = 0; i< llJson.length; i++) {
            llDict[llJson[i]['contentId']] = [llJson[i]['loadoutsIcon'].substring(21).toLowerCase(),llJson[i]['name']];
          }
        });
        setLittleLegendDictionary(llDict);
    }, []);
    
    useEffect(() => {
        setMatchesArray([]);
        setSummonerExists(true);
        setLoading(true);
        dispatch(getSummonerBySearch(name, region)).then(res => {
          //get ranked tft data for summoner
          try {
          if (res[summonerDetailsJson][0]['queueType'] !== 'RANKED_TFT_TURBO') {
            setLP(res[summonerDetailsJson][0]['leaguePoints']);
            setWins(res[summonerDetailsJson][0]['wins']);
            setLosses(res[summonerDetailsJson][0]['losses']);
            setTier(res[summonerDetailsJson][0]['tier']);
            setRankNumeral(res[summonerDetailsJson][0]['rank']);
          } else {
            setLP(res[summonerDetailsJson][1]['leaguePoints']);
            setWins(res[summonerDetailsJson][1]['wins']);
            setLosses(res[summonerDetailsJson][1]['losses']);
            setTier(res[summonerDetailsJson][1]['tier']);
            setRankNumeral(res[summonerDetailsJson][1]['rank']);
          }

          //set all profile variables
          setName(res[profileJson]['name']);
          setId(res[profileJson]['profileIconId']);
          setSummonerLevel(res[profileJson]['summonerLevel']);
          setPuuid(res[profileJson]['puuid']);
          } catch (e) {
            setSummonerExists(false);
            setLoading(false);
          }
          res[profileJson][matchJson].forEach(matchId => {
            dispatch(getMatchByMatchID(matchId, region)).then(res => {
              
              setMatchesArray(arr => [...arr, res['info']]);
            })
          })
          setLoading(false);
        }).catch(err => {
          //summoner doesn't exist
          setSummonerExists(false);
          setLoading(false);
        }); 
      }, [location]);
    
    const getParticipantIndex = (match) => {
        const p = match['participants'];
        let participantIndex = 0;
        for (let i = 0; i < p.length; i++) {
          if (p[i]['puuid'] === puuid) {
            participantIndex = i;
          }
        }
        return participantIndex;
    }

    const displayMatchDetails = (match) => {
        const p = match['participants'];
        let participantIndex = getParticipantIndex(match);
        let traitDictionary = {};
        let placementColor = 'white';
        let queueType = '';
        
        //set variables to display
        const traits = match['participants'][participantIndex]['traits'];
        const lastRound = p[participantIndex]['last_round'];
        const convertedLastRound = convertLastRound(lastRound);
        const placement = p[participantIndex]['placement'];
        const level = p[participantIndex]['level']
        const queue_id = match['queue_id'];
        let littleLegend = littleLegendDictionary[p[participantIndex]['companion']['content_ID']];
        let llLink = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default" + littleLegend[0] ;
        //get the traits and put it into a dictionary
        for (let j = 0; j < traits.length; j++) {
          if (traits[j]['style'] > 0) {
            traitDictionary[`${traits[j]['num_units']} ${traits[j]['name'].substring(5)}`] = traits[j]['style'];
          }
        }
        
        //sort traits by descending order
        let sortedTraitsArray = Object.keys(traitDictionary).map(function(key) {
          return [key, traitDictionary[key]];
        });
        
        // Sort the array based on the second element
        sortedTraitsArray.sort(function(first, second) {
          return second[1] - first[1];
        });

        //set placement data
        switch (placement) {
          case 1:
            placementColor = 'lightGreen';
            break;
          case 2: case 3: case 4: 
            placementColor = 'lightBlue';
            break;
          default:
            placementColor = 'lightGray';
        }
        //sessionWins += placement;
        placementData[placement-1] = placementData[placement-1] + 1;
        //sessionWins += 1;
        //convert queue id to queue type
        switch (queue_id) {
          case 1090:
            queueType = 'Normal';
            break;
          case 1100:
            queueType = 'Ranked';
            break;
          case 1110:
            queueType = 'Tutorial';
            break;
          default:
            queueType = 'Test';
        }

        return(
            <>
            <Grid container direction = "row" className = {classes.matchContainer} spacing = {2} style = {{borderLeft: `6px solid ${placementColor}`, borderRight: `6px solid ${placementColor}`}} >
              <Grid item md = {1} className = {classes.matchSubContainer}>
                <Typography className = {classes.placementText} style = {{color: placementColor}}>#{placement}</Typography>
                <Typography className = {classes.matchSubContainerText}>{queueType}</Typography>
                <Typography className = {classes.matchSubContainerText} >{new Date(p[participantIndex]['time_eliminated'] * 1000).toISOString().substr(14, 5)}</Typography>
                <TimeAgo className = {classes.timeAgo} date = {new Date(match['game_datetime'])}></TimeAgo>
              </Grid>
              <Grid item md = {2} className = {classes.matchSubContainer} >
                <img className = {classes.llImage} alt = "beef" src = {llLink} title = {littleLegend[1]}/>
                <Typography className = {classes.matchSubContainerText}>Round {convertedLastRound}</Typography>
                <Typography className = {classes.matchSubContainerText}>Level {level}</Typography>
              </Grid>

              <Grid item md = {2}  className = {classes.traitSubContainer}>
                <Grid md = {10} item container direction = "row">
                {
                  sortedTraitsArray.map((traitArray, index) => {
                    return ( <div key = {index}>
                              <Grid  item> 
                                <div style = {{backgroundImage: `url(/traits/${traitArray[1]}.png)`, backgroundPosition: 'center', 
                                height: '25px', width: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                                  
                                  <img className = {classes.traits} alt = {traitArray[0].substring(2).toLowerCase()} 
                                  src = {`/traits/${traitArray[0].substring(2).toLowerCase()}.svg`} title = {`${traitArray[0]}`} />
                                </div>
                              </Grid>
                            </div>
                          )
                    }
                  )
                }
                </Grid>
              </Grid>

              <Grid item md = {7} className = {classes.championSubContainer} >
                <Grid md = {12} item container direction = "row">
              {
                match['participants'][participantIndex]['units'].map((champion, index) => {
                  return (<div key = {index}>
                          <Grid>
                            {championImageDetails(champion)}
                          </Grid>
                          
                        </div>
                        )
                  }
                )
              }
                </Grid>
              </Grid>
            </Grid>
            </> 
      )
    }

    const convertLastRound = (lastRound) => {
      //function for converting the last round integer into game rounds
      switch (lastRound) {
        case 12: 
          return "3-1";
        case 13:
          return "3-2";
        case 14:
          return "3-3";
        case 15:
          return "3-4";
        case 16:
          return "3-5";
        case 17:
          return "3-6";
        case 18:
          return "3-7";
        case 19:
          return "4-1";
        case 20:
          return "4-2";
        case 21:
          return "4-3";
        case 22:
          return "4-4";
        case 23:
          return "4-5";
        case 24:
          return "4-6";
        case 25:
          return "4-7";
        case 26:
          return "5-1";
        case 27:
          return "5-2";
        case 28:
          return "5-3";
        case 29:
          return "5-4";
        case 30:
          return "5-5";
        case 31:
          return "5-6";
        case 32:
          return "5-7";
        case 33:
          return "6-1";
        case 34:
          return "6-2";
        case 35:
          return "6-3";
        case 36:
          return "6-4";
        case 37:
          return "6-5";
        case 38:
          return "6-6";
        case 39:
          return "6-7";
        case 40:
          return "7-1";
        case 41:
          return "7-2";
        case 42:
          return "7-3";
        case 43:
          return "7-4";
        case 44:
          return "7-5";
        case 45:
          return "7-6";
        case 46:
          return "7-7";
        default: 
         return '1-1';
      }
    }

    const championImageDetails = (champion) => {
      const rarity = champion['rarity'];
      let borderColor = 'white';
      //set correct border color of champions
      switch (rarity) {
        case 0:
          borderColor = 'lightGray';
          break;
        case 1:
          borderColor = 'lightGreen';
          break;
        case 2:
          borderColor = 'aqua';
          break;
        case 3:
          borderColor = 'magenta';
          break;
        default:
          borderColor = 'gold';
      }

      return (
         <>
            <Grid container direction = "row" alignItems = "center" justify = "center">
              {
                Array.from(Array(champion['tier']), (e, key) => {
                  return (
                    <div key = {key}>
                    <Grid item>
                      <StarIcon style = {{color: `${borderColor}`}} className = {classes.star}/>
                    </Grid>
                    </div>
                        )
                }) 
              }
            </Grid>

           <img alt = "champ" style = {{borderColor: `${borderColor}`}} className = {classes.championImage} 
           src = {`/champions/${champion['character_id']}.png`} title = {`${champion['character_id'].substring(5)}`} />
          <Grid container direction = "row" alignItems = "center" justify = "center">
          {
            champion['items'].map((item, index) => {
              return (<div key = {index}>
                    <Grid item>
                    
                    <img alt = "item" className = {classes.items} src = {`/items/${item}.png`} title = {`${itemDictionary[item]}`}></img>
                    </Grid>
              
              </div>)
            }) 
          
          }
          </Grid>
        </>
      )
    }

    const placementSection = () => {
      
      let avgRank, numberOfWins, numberOfTops;
      avgRank = numberOfWins = numberOfTops = 0; 
      const matchArray = [...matchesArray].sort((a,b) => {
        return b.game_datetime - a.game_datetime;
      })
      for (let i = 0; i < matchArray.length; i++) {
        
        let participantIndex = getParticipantIndex(matchArray[i]);
        const p = matchArray[i]['participants'];
        let placement = p[participantIndex]['placement'];

        avgRank += placement;
        console.log(numberOfWins);
        if (placement == 1) {
          numberOfWins += 1;
        } 
        if (placement <= 4 && placement > 1) {
          numberOfTops += 1;
        }
        
      }
      avgRank = avgRank / matchArray.length;
      
      return (
      <>
      <Grid >
        <Grid container direction = "row" justify = 'space-around' alignItems = 'center' className = {classes.avgRankContainer}>
          <Grid item >
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography className = {classes.avgRankText}>Avg Rank:</Typography>
              <Typography className = {classes.winsText}>{avgRank}</Typography>
            </div>
          </Grid>
          <Grid item>
            <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography className = {classes.avgRankText}>Wins:</Typography>
              <Typography className = {classes.winsText}>{numberOfWins}</Typography>
            </div>
          </Grid>
          <Grid item>
          <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Typography  className = {classes.avgRankText}>Tops:</Typography>
              <Typography className = {classes.winsText}>{numberOfTops}</Typography>
            </div>
          </Grid>
        </Grid>
        <div class = 'col-md-8' style = {{marginTop: '5px'}} >
          <Bar width = {350} height = {110} options={{ maintainAspectRatio: false }} data = {placementChartData}/>
        </div>
       </Grid>
      
      </>)
    }

    const createTableArray = () => {
      let championDict = {};
      const matchArray = [...matchesArray].sort((a,b) => {
        return b.game_datetime - a.game_datetime;
      })
      for  (let i = 0; i < matchArray.length; i++) {
        let participantIndex = getParticipantIndex(matchArray[i]);
        const p = matchArray[i]['participants'];
        let placement = p[participantIndex]['placement'];
        let unitArray = p[participantIndex]['units'];
        let checkDuplicateChampArray = [];

        for (let j = 0; j < unitArray.length; j++) {
          let win = 0;
          let top = 0;
          let championId = unitArray[j]['character_id'];
          if (checkDuplicateChampArray.includes(championId)) {
            continue
          } 
          checkDuplicateChampArray.push(championDict[championId]);
          if (placement == 1) {
            win = 1;
          } else if (placement > 1 && placement < 5) {
            top = 1;
          }
          //key is an array with 0 = rarity, 1 = games, 2 = placement, 3 = tops, 4 = wins
          if (championDict.hasOwnProperty(unitArray[j]['character_id'])) {
            championDict[unitArray[j]['character_id']][1] += 1;
            championDict[unitArray[j]['character_id']][2] += placement;
            championDict[unitArray[j]['character_id']][3] += top;
            championDict[unitArray[j]['character_id']][4] += win;
          } else {
            championDict[unitArray[j]['character_id']] = [unitArray[j]['rarity'], 1, placement, top, win];
          }
      }
    }

      return (<>
          <Table dict = {championDict}></Table>          
      </>)
  }

    return (
        <div className = {classes.root}>
        
            <Container maxWidth = "lg" className = {classes.background}>
                {loading ?
                  <CircularProgress /> :
                
                summonerExists ?
                
                <Grid container direction="row"  className = {classes.container}>  
                  <Grid container spacing = {3} className = {classes.firstRowContainer}>
                    <Grid item md = {4} sm = {6} xs = {12}  className = {classes.firstRowSubContainer}>
                      <Paper elevation = {3} className = {classes.firstRowPaper}>
                        <Grid container direction = "row" spacing = {2}>
                            <Grid item >
                              <img alt = "icon" src = {`https://ddragon.leagueoflegends.com/cdn/11.13.1/img/profileicon/${profileIconId}.png`} className = {classes.profileIcon}></img>
                            </Grid>
                            <Grid item>
                              <Typography display = "inline" className = {classes.title}>{summonerName} </Typography>
                              <Typography display =  "inline" className = {classes.region} >{region.toUpperCase()}</Typography>
                              <Typography gutterBottom className = {classes.summonerLevel}>Level {summonerLevel}</Typography>
                              <Button variant = "contained" className = {classes.renewButton}>Renew</Button>
                              <Typography></Typography>
                            </Grid>
                        </Grid>  
                        </Paper>
                    </Grid>
                    
                    <Grid item md = {4} sm = {6} xs = {12} className = {classes.firstRowSubContainer}>
                      <Paper elevation = {3}  className = {classes.firstRowPaper}>
                      <Grid container direction = "row" spacing = {2}>
                      <Grid item>
                        <img className = {classes.rankEmblem} src = {`/ranked-emblems/Emblem_${tier}.png`}/>
                      </Grid>
                      
                      <Grid item>
                        <Typography className = {classes.title}>{`${tier} ${rankNumeral}`}</Typography>
                        <Typography className = {classes.lp}> {`LP: ${lp}`}</Typography>
                        <Typography className = {classes.winsText}>{`Wins: ${wins}`}</Typography>
                        <Typography className = {classes.winsText}>{`Losses: ${losses}`}</Typography>
                        <Typography className = {classes.winsText}>{`Total Games: ${wins + losses}`}</Typography>
                        <Typography className = {classes.winsText}>{`Win Rate: ${Number.parseFloat((wins/(wins + losses))* 100).toFixed(2)}%`}</Typography>
                        
                      </Grid>
                        
                      </Grid>
                      </Paper>
                    </Grid>
                    
                    <Grid item md = {4} sm = {6} xs = {12} className = {classes.firstRowSubContainer}>
                       <Paper elevation = {3}  className = {classes.firstRowPaper}>
                      { matchesArray.length === numberOfGames &&
                        placementSection()
                      }  
       
                      </Paper>
                  
                    </Grid>
                   
                  </Grid>
                  
                  <Grid container spacing = {8} >

                  <Grid item md = {8} sm = {12}>
                      
                      <Typography className = {classes.title} gutterBottom>Match History</Typography>
                      
                      <Grid container direction = "column" spacing = {2} >
                      { matchesArray.length === numberOfGames &&
                      
                        [...matchesArray].sort((a,b) => {
                          return b.game_datetime - a.game_datetime;
                          }).map((match, key) => {
                              return( 
                                    <React.Fragment key = {key}>
                                      {displayMatchDetails(match)}
                                    </React.Fragment>
                                    )
                                  }
                                )
                      }
                      </Grid>
                    </Grid>

                    <Grid item md = {4} sm = {6} xs = {12}>
                      <Typography className = {classes.title} style = {{marginLeft: '8px'}} gutterBottom>Champion Stats</Typography>
                      
                        { matchesArray.length === numberOfGames &&
                        createTableArray()
                        }
                      
                    </Grid>
                
                   
                    </Grid>

                </Grid>
               : 
               <Container style ={{display: 'flex', direction: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Grid>
                  <img alt = 'dog' src = '/kekwdoge.png' style = {{borderRadius: '30px'}}/>
                    
                  </Grid>
                  <Grid>
                    
                    <Typography className = {classes.summonerError}>{name} {region.toUpperCase()} doesn't have any ranked TFT Stats or doesn't exist</Typography>
                  </Grid>

                
               </Container>
              }
            </Container>
            
        </div>
    )
}

export default Profile
