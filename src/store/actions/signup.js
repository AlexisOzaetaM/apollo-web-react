import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import { getMessageError } from '../../utils/errors';

export const signupStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signupSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS
    };
};

export const signupFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const signup = (email, password, confirmPassword) => {
    return dispatch => {
        dispatch(signupStart());
        if (password !== confirmPassword) {
            dispatch(signupFail(getMessageError(1150)));
        } else {
            axios({
                method: 'post',
                url: '/auth/signup',
                data: {
                    mail: email,
                    password: password
                }
            })
                .then(function (response) {
                    if (response.data.error)
                        dispatch(signupFail(getMessageError(response.data.error)))
                    else
                        dispatch(signupSuccess());
                })
                .catch(function (error) {
                    dispatch(signupFail(getMessageError(error.response.status)));
                });
        }
    };
};