import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { getMessageError } from '../../utils/errors';

const cleanTeam = () => {
    return {
        type: actionTypes.CLEAN_TEAM_STATE
    }
}

export const cleanTeamState = () => {
    return dispatch => {
        dispatch(cleanTeam())
    }
}

// ///////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////// Guardar un nuevo equipo
// ///////////////////////////////////////////////////////////////////////////
export const saveNewTeamStart = () => {
    return {
        type: actionTypes.SAVE_NEW_TEAM_START
    };
};

export const saveNewTeamSuccess = (message) => {
    return {
        type: actionTypes.SAVE_NEW_TEAM_SUCCESS,
        message: message
    };
};

export const saveNewTeamFail = (error) => {
    return {
        type: actionTypes.SAVE_NEW_TEAM_FAIL,
        error: error
    };
};

export const saveNewTeam = (teamName, idProject, teamMembers) => {
    return dispatch => {
        dispatch(saveNewTeamStart());
        axios({
            method: 'POST',
            url: '/team',
            data: {
                name: teamName,
                project: idProject
            }
        })
            .then((response) => {
                if (response.data.error) {
                    dispatch(saveNewTeamFail(getMessageError(response.data.error)));
                } else if (teamMembers.length > 1) {
                    teamMembers.shift();
                    axios({
                        method: 'POST',
                        url: '/team/user',
                        data: {
                            team: response.data.team.id,
                            user: teamMembers
                        }
                    })
                        .then((response) => {
                            if (response.data.error)
                                dispatch(saveNewTeamFail(getMessageError(response.data.error)));
                            else
                                dispatch(saveNewTeamSuccess('Equipo ' + teamName + ' creado correctamente.'));
                        })
                        .catch((error) => {
                            dispatch(addTeamMemberFail(error.err));
                        });
                } else
                    dispatch(saveNewTeamSuccess('Equipo ' + teamName + ' creado correctamente.'));
            })
            .catch((error) => {
                dispatch(saveNewTeamFail(getMessageError(error.response.status)));
            })
    };
};

// ///////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////// Añadir miembro a cierto equipo
// ///////////////////////////////////////////////////////////////////////////
export const addTeamMemberStart = () => {
    return {
        type: actionTypes.ADD_TEAM_MEMBER_START
    };
};

export const addTeamMemberSuccess = (message, userAdded) => {
    return {
        type: actionTypes.ADD_TEAM_MEMBER_SUCCESS,
        message: message,
        userAdded: userAdded
    };
};

export const addTeamMemberFail = (error) => {
    return {
        type: actionTypes.ADD_TEAM_MEMBER_FAIL,
        error: error
    };
};

export const addTeamMember = (user, idTeam) => {
    return dispatch => {
        dispatch(addTeamMemberStart());
        axios({
            method: 'POST',
            url: '/team/user',
            data: {
                team: idTeam,
                user: [user.value]
            }
        })
            .then((response) => {
                if (response.data.error)
                    dispatch(addTeamMemberFail(getMessageError(response.data.error)));
                else
                    dispatch(addTeamMemberSuccess('El miembro del equipo ha sido añadido.', user));
            })
            .catch((error) => {
                dispatch(addTeamMemberFail(getMessageError(error.response.status)));
            })
    };
};

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////// Eliminar miembro a cierto equipo
// ///////////////////////////////////////////////////////////////////////////
export const deleteTeamMemberStart = () => {
    return {
        type: actionTypes.DELETE_TEAM_MEMBER_START
    };
};

export const deleteTeamMemberSuccess = (message, idUserDeleted) => {
    return {
        type: actionTypes.DELETE_TEAM_MEMBER_SUCCESS,
        message: message,
        idUserDeleted: idUserDeleted
    };
};

export const deleteTeamMemberFail = (error) => {
    return {
        type: actionTypes.DELETE_TEAM_MEMBER_FAIL,
        error: error
    };
};

export const deleteTeamMember = (idUser, idTeam) => {
    return dispatch => {
        dispatch(deleteTeamMemberStart());
        axios({
            method: 'DELETE',
            url: '/team/user',
            data: {
                team: idTeam,
                user: idUser
            }
        })
            .then((response) => {
                if (response.data.error)
                    dispatch(deleteTeamMemberFail(getMessageError(response.data.error)))
                else
                    dispatch(deleteTeamMemberSuccess('El miembro del equipo ha sido removido.', idUser));
            })
            .catch((error) => {
                dispatch(deleteTeamMemberFail(getMessageError(error.response.status)));
            })
    };
};

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////// Eliminar a cierto equipo
// ///////////////////////////////////////////////////////////////////////////
export const deleteTeamStart = () => {
    return {
        type: actionTypes.DELETE_TEAM_START
    };
};

export const deleteTeamSuccess = (message, idTeamDeleted) => {
    return {
        type: actionTypes.DELETE_TEAM_SUCCESS,
        message: message,
        idTeamDeleted: idTeamDeleted
    };
};

export const deleteTeamFail = (error) => {
    return {
        type: actionTypes.DELETE_TEAM_FAIL,
        error: error
    };
};

export const deleteTeam = (idTeam) => {
    return dispatch => {
        dispatch(deleteTeamStart());
        axios({
            method: 'DELETE',
            url: '/team',
            data: {
                team: idTeam
            }
        })
            .then((response) => {
                if (response.data.error)
                    dispatch(deleteTeamFail(getMessageError(response.data.error)))
                else
                    dispatch(deleteTeamSuccess('El miembro del equipo ha sido removido.', idTeam));
            })
            .catch((error) => {
                dispatch(deleteTeamFail(getMessageError(error.response.status)));
            })
    };
};

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////// Obtener equipos por proyecto
// ///////////////////////////////////////////////////////////////////////////
export const getTeamsStart = () => {
    return {
        type: actionTypes.GET_TEAMS_START
    };
};

export const getTeamsSuccess = (teamsList) => {
    return {
        type: actionTypes.GET_TEAMS_SUCCESS,
        teamsList: teamsList
    };
};

export const getTeamsFail = (error) => {
    return {
        type: actionTypes.GET_TEAMS_FAIL,
        error: error
    };
};

export const getTeams = (idProject) => {
    return dispatch => {
        dispatch(getTeamsStart());
        axios({
            method: 'GET',
            url: '/teams/?project=' + idProject
        })
            .then((response) => {
                if (response.data.error)
                    dispatch(getTeamsFail(getMessageError(response.data.error)))
                else {
                    const options = response.data;
                    let optionsFormatted = [];
                    options.forEach(team => {
                        if (team.name !== '' && team.name !== null)
                            optionsFormatted.push({
                                value: team.id,
                                data: {
                                    name: team.name,
                                    members: team.user.length
                                }
                            })
                    });
                    dispatch(getTeamsSuccess(optionsFormatted));
                }
            })
            .catch((error) => {
                dispatch(getTeamsFail(getMessageError(error.response.status)));
            })
    };
};

// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////// Obtener un equipo
// ///////////////////////////////////////////////////////////////////////////
export const getTeamStart = () => {
    return {
        type: actionTypes.GET_TEAM_START
    };
};

export const getTeamSuccess = (message, team) => {
    return {
        type: actionTypes.GET_TEAM_SUCCESS,
        message: message,
        teamSelected: team
    };
};

export const getTeamFail = (error) => {
    return {
        type: actionTypes.GET_TEAM_FAIL,
        error: error
    };
};

export const getTeam = (idTeam) => {
    return dispatch => {
        dispatch(getTeamStart());
        axios({
            method: 'GET',
            url: '/team/' + idTeam
        })
            .then((response) => {
                if (response.data.error)
                    dispatch(getTeamFail(getMessageError(response.data.error)))
                else {
                    const users = response.data.user
                    let usersList = []
                    users.forEach(team => {
                        if (team.display_name !== '')
                            usersList.push({ value: team.id, label: team.display_name })
                    })

                    dispatch(getTeamSuccess('Datos del equipo obtenidos.', {
                        id: response.data.id,
                        name: response.data.name,
                        users: usersList
                    }));
                }
            })
            .catch((error) => {
                dispatch(getTeamFail(getMessageError(error.response.status)));
            })
    };
};

export const getProjectTeamsStart = () => {
    return {
        type: actionTypes.GET_PROJECT_TEAMS_START
    }
}
export const getProjectTeamsSuccess = (projectTeams) => {
    return {
        type: actionTypes.GET_PROJECT_TEAMS_SUCCESS,
        projectTeams: projectTeams
    }
}
export const getProjectTeamsFail = (error) => {
    return {
        type: actionTypes.GET_PROJECT_TEAMS_FAIL,
        error: error
    }
}
export const getProjectTeams = (idProject) => {
    return (dispatch) => {
        dispatch(getProjectTeamsStart());
        axios({
            method: 'GET',
            url: '/teams?project=' + idProject
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getProjectTeamsFail(getMessageError(response.data.error)));
                else {
                    const options = response.data;
                    let optionsFormatted = [];
                    options.forEach(team => {
                        if (team.name !== '')
                            optionsFormatted.push({ value: team.id, label: team.name })
                    });
                    dispatch(getProjectTeamsSuccess(optionsFormatted));
                }
            })
            .catch(function (error) {
                dispatch(getProjectTeamsFail(getMessageError(error.response.status)));
            });
    }
}

export const getTeamUsersStart = () => {
    return {
        type: actionTypes.GET_TEAM_USERS_START
    }
}

export const getTeamUsersSuccess = (message, teamUsers) => {
    return {
        type: actionTypes.GET_TEAM_USERS_SUCCESS,
        message: message,
        teamUsers: teamUsers
    }
}

export const getTeamUsersFail = (error) => {
    return {
        type: actionTypes.GET_TEAM_USERS_FAIL,
        error: error
    }
}

export const getTeamUsers = (idTeam) => {
    return (dispatch) => {
        dispatch(getTeamUsersStart());
        axios({
            method: 'GET',
            url: '/team/' + idTeam
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getTeamUsersFail(getMessageError(response.data.error)));
                else {
                    const options = response.data.user;
                    let optionsFormatted = [];
                    options.forEach(user => {
                        if (user.display_name !== '')
                            optionsFormatted.push({ value: user.id, label: user.display_name })
                    });
                    dispatch(getTeamUsersSuccess('miembros', optionsFormatted));
                }
            })
            .catch(function (error) {
                dispatch(getTeamUsersFail(getMessageError(error.response.status)));
            });
    }
}

// ///////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////// Editar un equipo
// ///////////////////////////////////////////////////////////////////////////
export const updateTeamStart = () => {
    return {
        type: actionTypes.UPDATE_TEAM_START
    };
};

export const updateTeamSuccess = (message) => {
    return {
        type: actionTypes.UPDATE_TEAM_SUCCESS,
        message: message
    };
};

export const updateTeamFail = (error) => {
    return {
        type: actionTypes.UPDATE_TEAM_FAIL,
        error: error
    };
};

export const updateTeam = (teamName, teamId) => {
    return (dispatch) => {
        dispatch(getTeamUsersStart());
        axios({
            method: 'PUT',
            url: '/team',
            data: qs.stringify({
                name: teamName,
                team: teamId
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(updateTeamFail(getMessageError(response.data.error)));
                else
                    dispatch(updateTeamSuccess('Equipo actualizado correctamente.'))
            })
            .catch(function (error) {
                dispatch(updateTeamFail(getMessageError(error.response.status)));
            });
    }
}