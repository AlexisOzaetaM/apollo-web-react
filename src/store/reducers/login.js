import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    token: null,
    success: false,
    error: null,
    loading: false,
    logout: false
};

const loginStart = (state, action) => {
    return updateObject(state, { 
        error: null, 
        loading: true,
        logout: false
    });
}

const loginSuccess = (state, action) => {
    return updateObject(state, { 
        token: action.token,
        success: true,
        error: null, 
        loading: false,
        logout: false
    });
}

const loginFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        success: false,
        loading: false,
        logout: false
    });
}

const logoutStart = (state, action) => {
    return updateObject(state, { 
        success: false,
        error: null, 
        loading: true,
        logout: false
    });
}

const logoutSuccess = (state, action) => {
    return updateObject(state, {
        success: false,
        error: null, 
        loading: false,
        logout: true
    });
}

const logoutFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        success: false,
        loading: false,
        logout: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.LOGOUT_START: return logoutStart(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        case actionTypes.LOGOUT_FAIL: return logoutFail(state, action);
        default: return state;
    }
};

export default reducer;