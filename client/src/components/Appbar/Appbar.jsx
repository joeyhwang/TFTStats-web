import React, {useState} from 'react';
import {Button, AppBar, CssBaseline, Toolbar} from '@material-ui/core';
import useStyles from './styles';
import SearchBar from '../SearchBar/SearchBar'
import {useLocation, Link } from 'react-router-dom';


const Appbar = () => {
    const classes = useStyles();
    const location = useLocation();
    const [region] = useState(localStorage.getItem('region') === null ? 'br' : localStorage.getItem('region').toLowerCase()); 

    return (
        <div>
        <CssBaseline>
            <AppBar position = "static"  style = {{background: 'black'}} >
            <Toolbar style = {{height: '100px'}}>
                <Link to ="/" style={{ textDecoration: 'none' }}>
                <h1 className = {classes.title} >TFT Stats</h1>
                </Link>
                <div className = {classes.linkContainer}>
                    <Button href = {`/leaderboards/${region}/challenger`} className = {classes.title}>Leaderboards</Button>                
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
