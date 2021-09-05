import {Grid, Typography} from '@material-ui/core'
import useStyles from './styles'
import { Bar } from 'react-chartjs-2'
const PlacementSection = ({ placementData, numberOfGames, avgRank, numberOfWins, numberOfTops 
    }) => {
    const classes = useStyles()

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
        
        </>
    )
}

export default PlacementSection
