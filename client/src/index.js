import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import './index.css';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store = {store}>
    <App/>
    </Provider>
    ,
     document.getElementById('root')
    );
