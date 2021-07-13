import React from 'react'
import { Grid,  Typography} from '@material-ui/core';
import useStyles from './styles';
import SearchBar from '../SearchBar/SearchBar'


const HomeBody = () => {
    const classes = useStyles();

    return (
        <div className = {classes.root}>
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '60vh' }}
            >

            <Grid item xs={3}>
                <Typography className = {classes.title}>TFT Stats</Typography>
            </Grid>   

            <SearchBar></SearchBar>
            
        </Grid> 
        </div>
    )
}

export default HomeBody
