import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import Cookies from 'js-cookie';
import { getMessageError } from '../../utils/errors';

/////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////// Iniciar sesión y guardar Token
/////////////////////////////////////////////////////////////////////////////
export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (token) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart());
        Cookies.set('AUTH_TOKEN', '');
        axios.defaults.headers.common['Authorization'] = 'Bearer ';
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                mail: email,
                password: password
            }
        })
        .then(function (response) {
            if (!response.data.error) {
                Cookies.set('AUTH_TOKEN', response.data.token);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                dispatch(loginSuccess(response.data.token));
            } else {
                dispatch(loginFail(getMessageError(response.data.error)));
            }
        })
        .catch(function (error) {
            dispatch(loginFail(getMessageError(error.response.status)));
        });
    };
};

/////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////// Cerrar sesión y borrar Token
/////////////////////////////////////////////////////////////////////////////
export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};

export const logoutFail = (error) => {
    return {
        type: actionTypes.LOGOUT_FAIL,
        error: error
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(logoutStart());
        Cookies.set('AUTH_TOKEN', '');
        dispatch(logoutSuccess());
    };
};