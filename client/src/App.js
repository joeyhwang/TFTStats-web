import React from 'react';
import Appbar from './components/Appbar/Appbar';
import Home from './Home'
import Profile from './components/Profile/Profile';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Leaderboards from './components/Leaderboards/Leaderboards';

const App = () => {

  

    return (
        <BrowserRouter>
            
            <Appbar/>
            
            <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/profile/:region/:name" exact component = {Profile}/>
                <Route path = "/leaderboards/na" exact component = {Leaderboards}/>
                <Route path = "/leaderboards/oce" exact component = {Leaderboards}/>
            </Switch>
           

        </BrowserRouter>
    )
}

export default App; 