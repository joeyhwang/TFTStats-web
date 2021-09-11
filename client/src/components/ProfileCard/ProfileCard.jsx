import React from 'react'
import {Grid, Typography,Button, Paper} from '@material-ui/core'
import useStyles from './styles'
const ProfileCard = ({ddragonVersion, region, profileInfo}) => {
    const classes = useStyles()
    
    return (
        <>
        <Grid item md = {4} sm = {6} xs = {12}  className = {classes.firstRowSubContainer}>
          <Paper elevation = {3} className = {classes.firstRowPaper}>
            <Grid container direction = "row" spacing = {2}>
                <Grid item >
                  <img alt = "" src = {`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${profileInfo.profileIconId}.png`} className = {classes.profileIcon}></img>
                </Grid>
                <Grid item >
                  <div>
                    <Typography display = "inline" className = {classes.title}>{profileInfo.name} </Typography>
                    <Typography display =  "inline" className = {classes.region} >{region.toUpperCase()}</Typography>
                    <Typography gutterBottom className = {classes.summonerLevel}>Level {profileInfo.summonerLevel}</Typography>
                  </div>
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
                  <img className = {classes.rankEmblem} src = {`/ranked-emblems/Emblem_${profileInfo.tier}.png`} alt = ""/>
                </Grid>
                
                <Grid item>
                  <Typography className = {classes.title}>{`${profileInfo.tier} ${profileInfo.rank}`}</Typography>
                  <Typography className = {classes.lp}> {`LP: ${profileInfo.leaguePoints}`}</Typography>
                  <Typography className = {classes.winsText}>{`Wins: ${profileInfo.wins}`}</Typography>
                  <Typography className = {classes.winsText}>{`Losses: ${profileInfo.losses}`}</Typography>
                  <Typography className = {classes.winsText}>{`Total Games: ${profileInfo.wins + profileInfo.losses}`}</Typography>
                  <Typography className = {classes.winsText}>{`Win Rate: ${Number.parseFloat((profileInfo.wins/(profileInfo.wins + profileInfo.losses))* 100).toFixed(2)}%`}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
    )
}

export default ProfileCard
