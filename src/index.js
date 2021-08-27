import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import loginReducer from './store/reducers/login';
import signupReducer from './store/reducers/signup';
import loadingReducer from './store/reducers/loading';
import projectReducer from './store/reducers/project';
import userReducer from './store/reducers/user';
import modalReducer from './store/reducers/modal';
import lateralMenuReducer from './store/reducers/lateralMenu';
import levelReducer from './store/reducers/level'
import teamReducer from './store/reducers/team';
import taskReducer from './store/reducers/task';
import commentReducer from './store/reducers/comment';

import './index.css';

const rootReducer = combineReducers({
    login: loginReducer,
    signup: signupReducer,
    loading: loadingReducer,
    project: projectReducer,
    user: userReducer,
    modal: modalReducer,
    lateralMenu: lateralMenuReducer,
    level: levelReducer,
    team: teamReducer,
    task: taskReducer,
    comment: commentReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
