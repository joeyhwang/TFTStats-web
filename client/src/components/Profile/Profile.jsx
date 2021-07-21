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
import * as api from '../../api/index.js';
import ReactPaginate from 'react-paginate';
import "./Profile.css";

const Profile = () => {
    const { region, name } = useParams();
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
    const [matchIdArray, setMatchIdArray] = useState([]);
    const [matchesArray, setMatchesArray] = useState([]);
    const [summonerExists, setSummonerExists] = useState(true);
    const [loading, setLoading] = useState(true);
    const [itemDictionary, setItemDictionary] = useState(null);
    const [littleLegendDictionary, setLittleLegendDictionary] = useState(null);
    const [cachedMatchesArray, setCatchedMatchesArray] = useState([]);
    let placementData = [0,0,0,0,0,0,0,0];
    const numberOfGames = 10;
    const [ddragonVersion, setDdragonVersion] = useState("");
    const matchesPerPage = 10;

    const pageCount = Math.ceil(matchIdArray.length / matchesPerPage);
    // const displayUsers = matchIdArray.slice(pagesVisited, pagesVisited + matchesPerPage); 


    useEffect(() => {
      //fetch item and little legend json and convert it into a dictionary to store it in the state
        let itemD = {};
        let llDict = {};
        api.items.then((itemResponse)=>{
          for (let item = 0; item < itemResponse.length; item++) {          
            itemD[itemResponse[item]['id']] = itemResponse[item]['name'];
          }
          setItemDictionary(itemD);
        });
        
        api.summonerIcon.then((summonerIconResponse) => {
          for (let i = 0; i< summonerIconResponse.length; i++) {
            llDict[summonerIconResponse[i]['contentId']] = [summonerIconResponse[i]['loadoutsIcon'].substring(21).toLowerCase(),summonerIconResponse[i]['name']]; 
          }
          setLittleLegendDictionary(llDict);
        });

        api.ddragonVersion.then((ddragonResponse) => {
          setDdragonVersion(ddragonResponse);
        });

    }, []);
    
    useEffect(() => {
        //runs whenever a summoner is searched
        setMatchesArray([]);
        setSummonerExists(true);
        setLoading(true);
        dispatch(getSummonerBySearch(name, region)).then(res => {
          //get ranked tft data for summoner
          try {
            if (res[summonerDetailsJson][0]['queueType'] !== 'RANKED_TFT_TURBO') {
              const {leaguePoints, wins, losses, tier, rank} = res[summonerDetailsJson][0];
              setLP(leaguePoints);
              setWins(wins);
              setLosses(losses);
              setTier(tier);
              setRankNumeral(rank);
            } else {
              const {leaguePoints, wins, losses, tier, rank} = res[summonerDetailsJson][1];
              setLP(leaguePoints);
              setWins(wins);
              setLosses(losses);
              setTier(tier);
              setRankNumeral(rank);
            }
              //set all profile variables
              const {name, profileIconId, summonerLevel, puuid} = res[profileJson];
              setName(name);
              setId(profileIconId);
              setSummonerLevel(summonerLevel);
              setPuuid(puuid);
          } catch (e) {
            setSummonerExists(false);
            setLoading(false);
          }
          
          setMatchIdArray(res[profileJson][matchJson]);
          for (const matchId of res[profileJson][matchJson].slice(0, matchesPerPage)) {
            dispatch(getMatchByMatchID(matchId, region)).then(res => {
              console.log(res);
              setMatchesArray(arr => [...arr, res['info']]);
            })
          }
                    
          setLoading(false);
        }).catch(err => {
          //summoner doesn't exist
          console.error(err);
          setSummonerExists(false);
          setLoading(false);
        }); 
      }, [location]);
      
      //pagination function 
      const changePage = ({selected}) => {
        setMatchesArray([]);
        let pagesVisited = selected * matchesPerPage;
        for (const matchId of matchIdArray.slice(pagesVisited, pagesVisited + matchesPerPage)) {
          dispatch(getMatchByMatchID(matchId, region)).then(res => {
            setMatchesArray(arr => [...arr, res['info']]);
          })
        }
      }
  
      //chart function
      const placementChartData = {
        labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'],
        datasets: [
          {
            data: placementData,
            dataColor: 'white',
            backgroundColor: [
              'lightGreen',
              'aqua',
              'aqua',
              'aqua',
              'lightGray',
              'lightGray',
              'lightGray',
              'lightGray',
            ]
          }
        ],       
      }
      
      //chart options
      const options = {
        plugins: {
          legend: {
              display: false,
          },
          title: {
            display: true,
            text: `Match History (${numberOfGames}) Games`,
            color: 'white',  
          },
          body: {
            color: 'white',
          }
        }
      }

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

    
    //function for converting the last round integer into game rounds
    const convertLastRound = (lastRound) => {
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

      //function for displaying the first two cards: name and tier
      const nameAndTierSection = () => {
        return (
          <>
          <Grid item md = {4} sm = {6} xs = {12}  className = {classes.firstRowSubContainer}>
            <Paper elevation = {3} className = {classes.firstRowPaper}>
              <Grid container direction = "row" spacing = {2}>
                  <Grid item >
                    <img alt = "icon" src = {`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${profileIconId}.png`} className = {classes.profileIcon}></img>
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
                    <img className = {classes.rankEmblem} src = {`/ranked-emblems/Emblem_${tier}.png`} alt = ""/>
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
          </>
        )
      }

      
    //function for the third card: avg rank, wins, tops
    const placementSection = () => {
      let avgRank, numberOfWins, numberOfTops;
      avgRank = numberOfWins = numberOfTops = 0; 
      const matchArray = [...matchesArray];
      for (let i = 0; i < matchArray.length; i++) {
        let participantIndex = getParticipantIndex(matchArray[i]);
        const p = matchArray[i]['participants'];
        let {placement} = p[participantIndex];

        avgRank += placement;
        if (placement === 1) {
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
            <div className = {classes.avgRankTextContainer}>
              <Typography className = {classes.avgRankText}>Avg Rank:</Typography>
              <Typography className = {classes.winsText}>{avgRank}</Typography>
            </div>
          </Grid>
          <Grid item>
            <div className = {classes.avgRankTextContainer} >
              <Typography className = {classes.avgRankText}>Wins:</Typography>
              <Typography className = {classes.winsText}>{numberOfWins}</Typography>
            </div>
          </Grid>
          <Grid item>
          <div className = {classes.avgRankTextContainer}>
              <Typography  className = {classes.avgRankText}>Tops:</Typography>
              <Typography className = {classes.winsText}>{numberOfTops}</Typography>
            </div>
          </Grid>
        </Grid>
        <div  style = {{marginTop: '2px'}} >
          <Bar width = {350} height = {110} options={options} data = {placementChartData}/>
        </div>
       </Grid>
      
      </>)
    }
    
    //function for displaying each match in the match history
    const displayMatchDetails = (match) => {
        const p = match['participants'];
        let participantIndex = getParticipantIndex(match);
        let traitDictionary = {};
        let placementColor = 'white';
        let queueType = '';
        
        //set variables to display
        const {last_round, placement, level} = p[participantIndex];
        const {traits} = match['participants'][participantIndex];
        const convertedLastRound = convertLastRound(last_round);

        const {queue_id} = match;
        let littleLegend = littleLegendDictionary[p[participantIndex]['companion']['content_ID']];
        let llLink = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default" + littleLegend[0] ;
        //get the traits and put it into a dictionary
        for (let j = 0; j < traits.length; j++) {
          if (traits[j]['style'] > 0) {
            traitDictionary[`${traits[j]['num_units']} ${traits[j]['name'].substring(5)}`] = traits[j]['style'];
          }
        }
        
        //sort traits by descending order
        let sortedTraitsArray = Object.keys(traitDictionary).map((key) => {
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
            placementColor = 'aqua';
            break;
          default:
            placementColor = 'lightGray';
        }
        //sessionWins += placement;
        placementData[placement-1] = placementData[placement-1] + 1;
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

    //function to get each champion image, star, and items
    const championImageDetails = (champion) => {
      const {rarity} = champion;
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

    //function for creating the champion stats table
    const createTableArray = () => {
      let championDict = {};
      const matchArray = [...matchesArray];
      for  (let i = 0; i < matchArray.length; i++) {
        let participantIndex = getParticipantIndex(matchArray[i]);
        const p = matchArray[i]['participants'];
        let placement = p[participantIndex]['placement'];
        let unitArray = p[participantIndex]['units'];
        let checkDuplicateChampArray = [];

        for (let j = 0; j < unitArray.length; j++) {
          let win, top;
          win = top = 0;
          let championId = unitArray[j]['character_id'];
          if (checkDuplicateChampArray.includes(championId)) {
            continue
          } 
          checkDuplicateChampArray = [...checkDuplicateChampArray, championDict[championId]];
          if (placement === 1) {
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
                    {
                      nameAndTierSection()
                    }
                    
                    <Grid item md = {4} sm = {6} xs = {12} className = {classes.firstRowSubContainer}>
                       <Paper elevation = {3}  className = {classes.firstRowPaper}>
                      { matchesArray.length >= matchesPerPage &&
                        placementSection()
                      }  
       
                      </Paper>
                  
                    </Grid>
                   
                  </Grid>
                  
                  <Grid container spacing = {8} >

                    <Grid item md = {8} sm = {12}>
                      
                      <Typography variant = "h4" gutterBottom>Match History</Typography>
                      
                      <Grid container direction = "column" spacing = {2} >
                      { matchesArray.length >= matchesPerPage &&
                      
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
                      <ReactPaginate
                        previousLabel = {"Prev"} nextLabel = {"Next"} pageCount = {pageCount} onPageChange = {changePage} containerClassName={"paginationBtns"}
                        previousLinkClassName={"previousBtn"} nextLinkClassName={"nextBtn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}
                      />
                      </Grid>
                    </Grid>

                      <Grid item md = {4} sm = {6} xs = {12}>
                        <Typography variant = "h4" style = {{marginLeft: '8px'}} gutterBottom>Champion Stats</Typography>
                        
                          { matchesArray.length >= matchesPerPage &&
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
