import { createReducer } from './../utility';
import { SET_ACTIVE_CHANNEL } from './../actions';

export const activeChannel = createReducer(null, {
    [SET_ACTIVE_CHANNEL](state, action) {
        return action.id;
    }
});