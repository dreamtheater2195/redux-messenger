import { createStore, applyMiddleware, compose } from 'redux';
import { createSocketMiddleware } from './socketMiddleware';
import { users } from './../server/db';
import { getPreloadedState } from './getPreloadedState';
import { initializeDB } from './../server/db/initializeDB';
import { createLogger } from 'redux-logger';
import { RECEIVE_MESSAGE } from './actions'
import { reducer } from './reducers';
import thunk from 'redux-thunk';

const io = window.io;

const socketMiddleware = createSocketMiddleware(io)({
    NEW_MESSAGE: (data) => ({
        type: RECEIVE_MESSAGE,
        message: data
    })
});

const logger = createLogger({
    stateTransformer: state => state.toJS()
});

const enhancer = compose(
    applyMiddleware(socketMiddleware, thunk, logger)
);

initializeDB();
const store = createStore(reducer, getPreloadedState(), enhancer);

export const getStore = () => store;
