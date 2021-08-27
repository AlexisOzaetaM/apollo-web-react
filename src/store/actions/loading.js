import * as actionTypes from './actionTypes';
import Cookies from 'js-cookie';

export const tokenStart = () => {
    return {
        type: actionTypes.SAVE_TOKEN_START
    };
};

export const tokenSuccess = () => {
    return {
        type: actionTypes.SAVE_TOKEN_SUCCESS
    };
};

export const saveToken = (token) => {
    return dispatch => {
        dispatch(tokenStart());
        Cookies.set("AUTH_TOKEN", token);
        dispatch(tokenSuccess());
    }
};