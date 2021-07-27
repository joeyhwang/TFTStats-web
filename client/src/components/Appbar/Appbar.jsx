import React from 'react';
import {Button, Typography, AppBar, CssBaseline, Toolbar} from '@material-ui/core';
import useStyles from './styles';
import SearchBar from '../SearchBar/SearchBar'
import {useLocation } from 'react-router-dom';

const Appbar = () => {
    const classes = useStyles();
    const location = useLocation();
    
    return (
        <div>
        <CssBaseline>
            <AppBar position = "static"  style = {{background: 'black'}} >
            <Toolbar style = {{height: '100px'}}>
                
                <Typography className = {classes.title} >TFT Stats</Typography>
                <div className = {classes.linkContainer}>
                    <Button href = "/" className = {classes.title}>Home</Button>
                    <Button href = "/" className = {classes.title}>Leaderboards</Button>
                    <Button href = "/champions" className = {classes.title}>Champions</Button>
                    <Button href = "/items" className = {classes.title}>Items</Button>

                
                </div>
                {location.pathname !== '/' &&
                <div  style ={{display: 'flex', alignItems: 'center',  width:'550px'}}>
                    <SearchBar className = {classes.searchBox} />
                </div>
                }

            </Toolbar>
            </AppBar>
        </CssBaseline>
        </div>
    )
}

export default Appbar
