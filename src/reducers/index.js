import { combineReducers } from '../combineReducers';
import { currentUser } from './currentUser';
import { activeChannel } from './activeChannel';
import { channels } from './channels';
import { userInfo } from './userInfo';
export const reducer = combineReducers({
    activeChannel,
    channels,
    currentUser,
    userInfo
});