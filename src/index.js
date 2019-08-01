import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { createStore,compose,applyMiddleware,combineReducers} from 'redux';
import { Provider} from 'react-redux'
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import locationReducer from './Stores/Reducers/Location';
import authReducer from './Stores/Reducers/Auth';

import {ProductProvider} from './Components/Pcatogory/context' 

const logger=store=>{
    return next=>{
        return action=>{
            console.log('[Middleware] Dispatching',action);
            const result = next(action);
            console.log('[Middleware] next state',store.getState());
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
    auth:authReducer,
    location:locationReducer
});

const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
