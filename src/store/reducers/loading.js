import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    success: null
};

const tokenStart = (state, action) => {
    return updateObject(state, {
        success: false
    });
};

const tokenSuccess = (state, action) => {
    return updateObject(state, {
        success: true
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_TOKEN_START: return tokenStart(state, action);
        case actionTypes.SAVE_TOKEN_SUCCESS: return tokenSuccess(state, action);
        default: return state;
    };
};

export default reducer;