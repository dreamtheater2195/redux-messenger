import { createStore, applyMiddleware, compose } from 'redux';
import { createSocketMiddleware } from './socketMiddleware';
import createSagaMiddleware from 'redux-saga';
import { users } from './../server/db';
import { getPreloadedState } from './getPreloadedState';
import { initializeDB } from './../server/db/initializeDB';
import { createLogger } from 'redux-logger';
import { RECEIVE_MESSAGE } from './actions'
import { reducer } from './reducers';
import thunk from 'redux-thunk';
import { initSagas } from './initSagas';

//socket middleware
const io = window.io;
const socketConfigOut = {
    UPDATE_STATUS: (data) => ({
        type: "UPDATE_USER_STATUS",
        status: data
    })
};

const socketConfigIn = {
    NEW_MESSAGE: (data) => ({
        type: RECEIVE_MESSAGE,
        message: data
    })
};
const socketMiddleware = createSocketMiddleware(io)(socketConfigOut);

//logger middleware
const logger = createLogger({
    stateTransformer: state => state.toJS()
});

//saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(sagaMiddleware, thunk, socketMiddleware, logger)
);

initializeDB();
const store = createStore(reducer, getPreloadedState(), enhancer);

const socket = io();
for (const key in socketConfigIn) {
    socket.on(key, (data) => {
        store.dispatch(socketConfigIn[key](data));
    });
}

export const getStore = () => store;
initSagas(sagaMiddleware);