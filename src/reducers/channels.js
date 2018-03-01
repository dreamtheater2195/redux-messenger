import { createReducer } from './../utility';
import { UPDATE_CHANNEL_INPUT_TEXT, SUBMIT_CHANNEL_INPUT_TEXT, UPDATE_CHANNEL_FETCHED_STATUS, SET_CHANNEL_INFO, COMPLETE_CHANNEL_CREATION, FETCHED, REQUEST_CREATE_CHANNEL, RECEIVE_MESSAGE } from '../actions';
import * as selectors from './../selectors';
import { fromJS } from 'immutable';

export const channels = createReducer(null, {
    [COMPLETE_CHANNEL_CREATION](state, action) {
        const index = state.findIndex(channel => channel.get(`id`) === action.channelID);
        return state.setIn([index, `fetchStatus`], FETCHED);
    },
    [REQUEST_CREATE_CHANNEL](state, { ownID, contactID, channelID, channelName }) {
        return state.push(fromJS({
            id: channelID,
            participants: [ownID, contactID],
            messages: [],
            fetchStatus: `FETCHING`,
            name: channelName
        }));
    },
    [RECEIVE_MESSAGE](state, { message }) {
        const index = state.findIndex(channel => channel.get(`id`) === message.channelID);
        if (index === -1) {
            return state;
        }
        const channel = state.get(index);
        let messages = channel.get(`messages`);

        if (messages.map(message => message.get(`id`)).includes(message.id)) {
            return state;
        }

        let newMessages = messages.push(fromJS({
            id: message.id,
            content: message.content,
            owner: message.owner,
            date: new Date()
        }));
        return state.setIn([index, `messages`], newMessages);
    },
    [UPDATE_CHANNEL_INPUT_TEXT](state, action) {
        const index = state.findIndex(channel => channel.get(`id`) === action.channel);
        return state.setIn([index, `currentUserText`], action.text);
    },
    [SUBMIT_CHANNEL_INPUT_TEXT](state, action) {
        const index = state.findIndex(channel => channel.get(`id`) === action.channel);
        const channel = state.get(index);
        let messages = channel.get(`messages`);

        let newMessages = messages.push(fromJS({
            id: action.id,
            content: {
                text: action.text
            },
            owner: action.owner,
            date: new Date()
        }));

        let newState = state.setIn([index, `messages`], newMessages);
        newState = newState.setIn([index, `currentUserText`], "");
        return newState;
    },
    [UPDATE_CHANNEL_FETCHED_STATUS](state, action) {
        const index = state.findIndex(channel => channel.get(`id`) === action.channel);
        return state.setIn([index, "fetchStatus"], action.status);
    },
    [SET_CHANNEL_INFO](state, action) {
        const index = state.findIndex(channel => channel.get(`id`) === action.channel.get(`id`));
        return state.set(index, action.channel);
    }
});