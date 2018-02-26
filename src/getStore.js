import { createStore, applyMiddleware, compose } from 'redux';
import { createSocketMiddleware } from './socketMiddleware';
import { users } from './../server/db';
import { getDefaultState } from './../server/getDefaultState';
import { initializeDB } from './../server/db/initializeDB';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import { RECEIVE_MESSAGE } from './actions'
import { reducer } from './reducers';

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
    applyMiddleware(socketMiddleware, logger)
);

initializeDB();

const currentUser = users[0];
const defaultState = fromJS(getDefaultState(currentUser));
const store = createStore(reducer, defaultState, enhancer);

export const getStore = () => store;
