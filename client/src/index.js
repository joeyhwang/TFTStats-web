import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducers } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <Provider store = {store}>
    <App/>
    </Provider>
    ,
     document.getElementById('root')
    );
