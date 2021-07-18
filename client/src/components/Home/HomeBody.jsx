import React from 'react'
import {Container, Grid,  Typography} from '@material-ui/core';
import useStyles from './styles';
import SearchBar from '../SearchBar/SearchBar'


const HomeBody = () => {
    const classes = useStyles();

    return (
        <div className = {classes.root}>
            <Container>
            
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

            </Container>
        </div>
    )
}

export default HomeBody
