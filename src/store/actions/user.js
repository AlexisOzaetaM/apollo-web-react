import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { isEmpty } from '../../utils/objects';
import { getMessageError } from '../../utils/errors';

export const cleanUser = () => {
    return {
        type: actionTypes.CLEAN_USER_STATE
    };
};

export const cleanUserState = () => {
    return dispatch => {
        dispatch(cleanUser())
    }
}

// ///////////////////////////////////////////////////////////////////////////
// //////////////////////////////// Obtener todos los datos del usuario actual
// ///////////////////////////////////////////////////////////////////////////
export const getUserDataStart = () => {
    return {
        type: actionTypes.USER_GET_DATA_START
    };
};

export const getUserDataSuccess = (userData) => {
    return {
        type: actionTypes.USER_GET_DATA_SUCCESS,
        userData: userData
    };
};

export const getUserDataFail = (error) => {
    return {
        type: actionTypes.USER_GET_DATA_FAIL,
        error: error
    };
};

export const getUserData = () => {
    return dispatch => {
        dispatch(getUserDataStart());
        axios({
            method: 'GET',
            url: '/user/0'
        })
            .then((response) => {
                dispatch(getUserDataSuccess(response.data.user));
            })
            .catch((error) => {
                dispatch(getUserDataFail(getMessageError(error.response.status)));
            });
    };
};

/////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// Guardar los datos principales del perfil
/////////////////////////////////////////////////////////////////////////////
export const saveUserDetailsStart = () => {
    return {
        type: actionTypes.PROFILE_DETAILS_START
    };
};

export const saveUserDetailsSuccess = (message) => {
    return {
        type: actionTypes.PROFILE_DETAILS_SUCCESS,
        message: message
    };
};

export const saveUserDetailsFail = (error) => {
    return {
        type: actionTypes.PROFILE_DETAILS_FAIL,
        error: error
    };
};

export const saveProfileDetails = (avatar, username, display_name, email) => {
    return (dispatch) => {
        dispatch(saveUserDetailsStart());
        axios({
            method: 'PUT',
            url: '/user',
            data: {
                username: username,
                display_name: display_name,
                mail: email,
                avatar: avatar
            }
        })
            .then(function (response) {
                dispatch(saveUserDetailsSuccess('Datos de perfil guardados correctamente'));
            })
            .catch(function (error) {
                dispatch(saveUserDetailsFail(getMessageError(error.response.status)));
            });
    }
};

//////////////////////////////////////////////////////////////////////////////////////////
// Actualizar el estado de first_configuration a 1 porque ya completó el registro de datos
//////////////////////////////////////////////////////////////////////////////////////////
export const firstConfigurationStart = () => {
    return {
        type: actionTypes.FIRST_CONFIGURATION_START
    };
};

export const firstConfigurationSuccess = (isFirstConfigurationCompleted) => {
    return {
        type: actionTypes.FIRST_CONFIGURATION_SUCCESS,
        isFirstConfigurationCompleted: isFirstConfigurationCompleted
    };
};

export const firstConfigurationCompletedSuccess = (message) => {
    return {
        type: actionTypes.FIRST_CONFIGURATION_COMPLETED_SUCCESS,
        message: message
    };
};

export const firstConfigurationFail = (error) => {
    return {
        type: actionTypes.FIRST_CONFIGURATION_FAIL,
        error: error
    };
};

export const firstConfigurationHasCompleted = () => {
    return (dispatch) => {
        dispatch(firstConfigurationStart());
        axios({
            method: 'PATCH',
            url: '/user',
            data: qs.stringify({
                field: 'first_configuration',
                newValue: true
            })
        })
            .then(function (response) {
                dispatch(firstConfigurationCompletedSuccess('Configuración finalizada.'));
            })
            .catch(function (error) {
                dispatch(firstConfigurationFail(getMessageError(error.response.status)));
            });
    }
};

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////// Guardar y testear el token de GitLab
// ///////////////////////////////////////////////////////////////////////////
export const SyncGitStart = () => {
    return {
        type: actionTypes.SYNC_GITLAB_GITHUB_START
    };
};

export const SyncGitSuccess = (message) => {
    return {
        type: actionTypes.SYNC_GITLAB_GITHUB_SUCCESS,
        message: message
    };
};

export const SyncGitFail = (error) => {
    return {
        type: actionTypes.SYNC_GITLAB_GITHUB_FAIL,
        error: error
    };
};

export const SyncGitLabToken = (GitLabToken) => {
    return (dispatch) => {
        dispatch(SyncGitStart());
        axios({
            method: 'PATCH',
            url: '/user',
            data: qs.stringify({
                field: 'gitlab_token',
                newValue: GitLabToken
            })
        })
            .then(function (response) {
                axios({
                    method: 'GET',
                    url: '/user/gitlab/verify'
                })
                    .then(function (response) {
                        if (!isEmpty(response.data))
                            dispatch(SyncGitSuccess('Token de GitLab guardado correctamente.'));
                        else
                            axios({
                                method: 'PATCH',
                                url: '/user',
                                data: {
                                    field: 'gitlab_token',
                                    newValue: ''
                                }
                            })
                                .then(function (response) {
                                    dispatch(SyncGitFail('Token inválido.'));
                                })
                                .catch(function (error) {
                                    dispatch(SyncGitFail(error.response.statusText));
                                });
                    })
                    .catch(function (error) {
                        dispatch(SyncGitFail('Token inválido.'));
                    });
            })
            .catch(function (error) {
                dispatch(SyncGitFail(getMessageError(error.response.status)));
            })
    }
};

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////// Guardar y testear el token de GitHub
// ///////////////////////////////////////////////////////////////////////////
export const SyncGitHubToken = (GitHubToken) => {
    return (dispatch) => {
        dispatch(SyncGitStart());
        axios({
            method: 'PATCH',
            url: '/user',
            data: qs.stringify({
                field: 'github_token',
                newValue: GitHubToken
            })
        })
            .then(function (response) {
                axios({
                    method: 'GET',
                    url: '/user/github/verify'
                })
                    .then(function (response) {
                        if (!isEmpty(response.data))
                            dispatch(SyncGitSuccess('Token de GitHub guardado correctamente.'));
                        else
                            axios({
                                method: 'PATCH',
                                url: '/user',
                                data: {
                                    field: 'github_token',
                                    newValue: ''
                                }
                            })
                                .then(function (response) {
                                    dispatch(SyncGitFail('Token inválido.'));
                                })
                                .catch(function (error) {
                                    dispatch(SyncGitFail(getMessageError(error.err)));
                                });
                    })
                    .catch(function (error) {
                        dispatch(SyncGitFail('Token inválido.'));
                    });
            })
            .catch(function (error) {
                dispatch(SyncGitFail(getMessageError(error.response.status)));
            })
    }
};

// ///////////////////////////////////////////////////////////////////////////
// //////////////////////////// Obtener usuarios que concuerden con el buscado
// ///////////////////////////////////////////////////////////////////////////
export const GetUsernamesLikeStart = () => {
    return {
        type: actionTypes.USER_GET_USERNAMES_LIKE_START
    };
};

export const GetUsernamesLikeSuccess = (message, resultOptions) => {
    return {
        type: actionTypes.USER_GET_USERNAMES_LIKE_SUCCESS,
        message: message,
        searchOptions: resultOptions
    };
};

export const GetUsernamesLikeFail = (error) => {
    return {
        type: actionTypes.USER_GET_USERNAMES_LIKE_FAIL,
        error: error
    };
};

export const GetUsernamesLike = (username) => {
    return (dispatch) => {
        dispatch(GetUsernamesLikeStart());
        axios({
            method: 'POST',
            url: '/user/username/like',
            data: {
                'username': username
            }
        })
            .then((response) => {
                const options = response.data;
                let optionsFormatted = [];
                options.forEach(user => {
                    if (user.username !== '')
                        optionsFormatted.push({ value: user.id, label: user.username })
                });
                dispatch(GetUsernamesLikeSuccess('Usuarios encontrados.', optionsFormatted))
            })
            .catch((error) => {
                dispatch(GetUsernamesLikeFail(getMessageError(error.response.status)))
            });
    }
};
////////////////////////////
////////////////////////
// ///////////////////////////////////////////////////////////////////////////
// //////////////////////////////// 
// ///////////////////////////////////////////////////////////////////////////

export const updateUserDataStart = () => {
    return {
        type: actionTypes.USER_UPDATE_DATA_START
    }
}

export const updateUserDataSuccess = (message, data) => {
    return {
        type: actionTypes.USER_UPDATE_DATA_SUCCESS,
        message: message,
        userData: data
    }
}

export const updateUserDataFail = (error) => {
    return {
        type: actionTypes.USER_UPDATE_DATA_FAIL,
        error: error
    }
}

export const updateUserData = (display_name, username, email, avatar) => {
    return (dispatch) => {
        dispatch(updateUserDataStart());
        axios({
            method: 'PATCH',
            url: '/user',
            data: {
                display_name: display_name,
                username: username,
                mail: email,
                avatar: avatar
            }
        })
            .then(function (response) {
                dispatch(updateUserDataSuccess('Datos de perfil guardados correctamente', response.data));
            })
            .catch(function (error) {
                dispatch(updateUserDataFail(getMessageError(error.response.status)));
            });
    }
};