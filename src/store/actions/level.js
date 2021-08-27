import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { getMessageError } from '../../utils/errors';

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////// Limpiar state
// ////////////////////////////////////////////////////////////////////////////////////////
export const cleanLevel = () => {
    return {
        type: actionTypes.CLEAN_LEVEL_STATE
    }
}

export const cleanLevelState = () => {
    return dispatch => {
        dispatch(cleanLevel())
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////// Guardar un rol
// ////////////////////////////////////////////////////////////////////////////////////////
export const levelStart = () => {
    return {
        type: actionTypes.LEVEL_START
    }
}

export const levelSuccess = (message) => {
    return {
        type: actionTypes.LEVEL_SUCCESS,
        message: message
    }
}

export const levelFail = (error) => {
    return {
        type: actionTypes.LEVEL_FAIL,
        error: error
    }
}

export const saveLevel = (levelName, idProject, transactions) => {
    return (dispatch) => {
        dispatch(levelStart());
        axios({
            method: 'POST',
            url: '/userlevel',
            data: qs.stringify({
                name: levelName,
                project: idProject
            })
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(levelFail(getMessageError(response.data.error)));
                } else {
                    axios({
                        method: 'PATCH',
                        url: '/userlevel/permissions',
                        data: qs.stringify({
                            user_level: response.data.level.id,
                            transactions: transactions
                        })
                    })
                        .then(function (response) {
                            if (response.data.error)
                                dispatch(levelFail(getMessageError(response.data.error)));
                            else
                                dispatch(levelSuccess('El rol ' + levelName + ' se guardó correctamente.'));
                        })
                        .catch(function (error) {
                            dispatch(levelFail(error.err));
                        })
                }
            })
            .catch(function (error) {
                dispatch(levelFail(getMessageError(error.response.status)));
            })
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////// Editar un rol
// ////////////////////////////////////////////////////////////////////////////////////////
export const updateLevelStart = () => {
    return {
        type: actionTypes.UPDATE_LEVEL_START
    }
}

export const updateLevelSuccess = (message) => {
    return {
        type: actionTypes.UPDATE_LEVEL_SUCCESS,
        message: message
    }
}

export const updateLevelFail = (error) => {
    return {
        type: actionTypes.UPDATE_LEVEL_FAIL,
        error: error
    }
}

export const updateLevel = (levelName, userLevelId, transactions) => {
    return (dispatch) => {
        dispatch(updateLevelStart());
        axios({
            method: 'PATCH',
            url: '/userlevel',
            data: qs.stringify({
                name: levelName,
                user_level: userLevelId
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(updateLevelFail(getMessageError(response.data.error)))
                else {
                    axios({
                        method: 'PATCH',
                        url: '/userlevel/permissions',
                        data: qs.stringify({
                            user_level: userLevelId,
                            transactions: transactions
                        })
                    })
                        .then(function (response) {
                            if (response.data.error)
                                dispatch(updateLevelFail(getMessageError(response.data.error)))
                            else
                                dispatch(updateLevelSuccess('El rol se ha actualizado.'))
                        })
                        .catch(function (error) {
                            dispatch(updateLevelFail(getMessageError(error.response.status)))
                        })
                }
            })
            .catch(function (error) {
                dispatch(updateLevelFail(getMessageError(error.response.status)))
            })
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////// Obtener roles por proyecto
// ////////////////////////////////////////////////////////////////////////////////////////
export const getLevelsStart = () => {
    return {
        type: actionTypes.GET_LEVELS_START
    }
}

export const getLevelsSuccess = (resultOptions) => {
    return {
        type: actionTypes.GET_LEVELS_SUCCESS,
        levelsList: resultOptions
    }
}

export const getLevelsFail = (error) => {
    return {
        type: actionTypes.GET_LEVELS_FAIL,
        error: error
    }
}

export const getLevels = (projectId) => {
    return (dispatch) => {
        dispatch(getLevelsStart());
        axios({
            method: 'GET',
            url: '/userlevel/?project=' + projectId
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getLevelsFail(getMessageError(response.data.error)))
                else {
                    const options = response.data;
                    let optionsFormatted = [];
                    options.forEach(level => {
                        if (level.name !== '' || level.name !== null)
                            optionsFormatted.push({ value: level.id, label: level.name })
                    });
                    dispatch(getLevelsSuccess(optionsFormatted));
                }
            })
            .catch(function (error) {
                dispatch(getLevelsFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////// Eliminar rol
// ////////////////////////////////////////////////////////////////////////////////////////
export const deleteLevelStart = () => {
    return {
        type: actionTypes.DELETE_LEVEL_START
    }
}

export const deleteLevelSuccess = (message) => {
    return {
        type: actionTypes.DELETE_LEVEL_SUCCESS,
        message: message,

    }
}

export const deleteLevelFail = (error) => {
    return {
        type: actionTypes.DELETE_LEVEL_FAIL,
        error: error
    }
}

export const deleteLevel = (idLevel) => {
    return (dispatch) => {
        dispatch(deleteLevelStart());
        axios({
            method: 'DELETE',
            url: '/userlevel',
            data: {
                id: idLevel
            }
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(deleteLevelFail(getMessageError(response.data.error)))
                else
                    dispatch(deleteLevelSuccess('Rol eliminado'));
            })
            .catch(function (error) {
                dispatch(deleteLevelFail(getMessageError(error.response.status)));
            });
    }
};

// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////// Obtener rol
// ////////////////////////////////////////////////////////////////////////////////////////
export const getLevelStart = () => {
    return {
        type: actionTypes.GET_LEVEL_START
    }
}

export const getLevelSuccess = (resultOptions, levelName) => {
    return {
        type: actionTypes.GET_LEVEL_SUCCESS,
        levelList: resultOptions,
        levelName: levelName
    }
}

export const getLevelFail = (error) => {
    return {
        type: actionTypes.GET_LEVEL_FAIL,
        error: error
    }
}

export const getLevel = (idLevel) => {
    return (dispatch) => {
        dispatch(getLevelStart());
        axios({
            method: 'GET',
            url: '/userlevel/permissions/?user_level=' + idLevel
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getLevelFail(getMessageError(response.data.error)))
                else {
                    const options = response.data.permissions;
                    let optionsFormatted = [];
                    options.forEach(permission => {
                        optionsFormatted.push({
                            id: permission.transaction.id,
                            checked: permission.granted
                        })
                    });
                    optionsFormatted.sort(function (a, b) { return a.id - b.id })
                    dispatch(getLevelSuccess(optionsFormatted, response.data.name));
                }
            })
            .catch(function (error) {
                dispatch(getLevelFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////// Editar rol de un usuario
// ////////////////////////////////////////////////////////////////////////////////////////
export const updateUserLevelStart = () => {
    return {
        type: actionTypes.UPDATE_USER_LEVEL_START
    }
}

export const updateUserLevelSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_LEVEL_SUCCESS
    }
}

export const updateUserLevelFail = (error) => {
    return {
        type: actionTypes.UPDATE_USER_LEVEL_FAIL,
        error: error
    }
}

export const getUsersByProjectStart = () => {
    return {
        type: actionTypes.GET_USERS_BY_PROJECT_START
    }
}

export const getUsersByProjectSuccess = (projectUsers) => {
    return {
        type: actionTypes.GET_USERS_BY_PROJECT_SUCCESS,
        projectUsers: projectUsers
    }
}

export const getUsersByProjectFail = (error) => {
    return {
        type: actionTypes.GET_USERS_BY_PROJECT_FAIL,
        error: error
    }
}

export const updateUserLevel = (projectId, userId, levelId) => {
    return (dispatch) => {
        dispatch(updateUserLevelStart());
        axios({
            method: 'PATCH',
            url: '/assignuserlevel',
            data: qs.stringify({
                project: projectId,
                user: userId,
                userlevel: levelId
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(updateUserLevelFail(getMessageError(response.data.error)))
                else {
                    dispatch(getUsersByProjectStart());
                    axios({
                        method: 'GET',
                        url: '/projectusers/' + projectId
                    })
                        .then(function (response) {
                            if (response.data.error)
                                dispatch(getUsersByProjectFail(getMessageError(response.data.error)));
                            else
                                dispatch(getUsersByProjectSuccess(response.data));
                        })
                        .catch(function (error) {
                            dispatch(getUsersByProjectFail(getMessageError(error.response.status)));
                        });
                }
            })
            .catch(function (error) {
                dispatch(updateUserLevelFail(getMessageError(error.response.status)));
            });
    }
}