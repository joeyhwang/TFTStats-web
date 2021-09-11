import React from 'react';
import Appbar from './components/Appbar/Appbar';
import Home from './Home'
import Profile from './components/Profile/Profile';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Leaderboards from './components/Leaderboards/Leaderboards';
import Champions from './components/Champions/Champions.jsx';
import Items from './components/Items/Items.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <Appbar/>
            <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path = "/profile/:region/:name" exact component = {Profile}/>
                <Route path = "/champions" exact component = {Champions}/>
                <Route path = "/items" exact component = {Items}/>
                <Route path = "/leaderboards/:region/:tier" exact component = {Leaderboards}/>
            </Switch>
           

        </BrowserRouter>
    )
}

export default App; 