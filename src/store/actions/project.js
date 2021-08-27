import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { getMessageError } from '../../utils/errors';

// //////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////// Limpiar el state
// //////////////////////////////////////////////////////////////////////////////////
export const cleanProject = () => {
    return {
        type: actionTypes.CLEAN_PROJECT_STATE
    }
}

export const cleanProjectState = () => {
    return dispatch => {
        dispatch(cleanProject())
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////// Crear un proyecto
// //////////////////////////////////////////////////////////////////////////////////
export const projectStart = () => {
    return {
        type: actionTypes.PROJECT_START
    }
}

export const projectSuccess = (message) => {
    return {
        type: actionTypes.PROJECT_SUCCESS,
        message: message
    }
}

export const projectFail = (error) => {
    return {
        type: actionTypes.PROJECT_FAIL,
        error: error
    }
}

export const saveProject = (projectName, description, dueDate, startDate, teamName) => {
    return (dispatch) => {
        dispatch(projectStart());
        let startDateObject = new Date(startDate)
        let dueDateObject = new Date(dueDate)
        if (dueDateObject > startDateObject) {
            axios({
                method: 'POST',
                url: '/project',
                data: qs.stringify({
                    name: projectName,
                    description: description,
                    due_date: dueDate,
                    start_date: startDate,
                    team_name: teamName
                })
            })
                .then(function (response) {
                    if (response.data.error)
                        dispatch(projectFail(getMessageError(response.data.error)))
                    else
                        dispatch(projectSuccess('El proyecto ' + projectName + ' se guardó correctamente.'));
                })
                .catch(function (error) {
                    dispatch(projectFail(error.response.status));
                });
        } else
            dispatch(projectFail(getMessageError(1251)));
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////// Actualizar un proyecto
// //////////////////////////////////////////////////////////////////////////////////
export const updateProjectStart = () => {
    return {
        type: actionTypes.PROJECT_START
    }
}

export const updateProjectSuccess = (message, projectData) => {
    return {
        type: actionTypes.PROJECT_SUCCESS,
        message: message,
        project: projectData
    }
}

export const updateProjectFail = (error) => {
    return {
        type: actionTypes.PROJECT_FAIL,
        error: error
    }
}

export const updateProject = (idProject, projectName, description, dueDate, startDate, teamName) => {
    return (dispatch) => {
        dispatch(updateProjectStart());
        axios({
            method: 'PUT',
            url: '/project',
            data: qs.stringify({
                project: idProject,
                name: projectName,
                description: description,
                due_date: dueDate,
                start_date: startDate
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(updateProjectFail(getMessageError(response.data.error)))
                else
                    dispatch(updateProjectSuccess('El proyecto ' + projectName + ' se actualizó correctamente.', response.data));
            })
            .catch(function (error) {
                dispatch(updateProjectFail(error.response.status));
            });
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////// Obtener un proyecto
// //////////////////////////////////////////////////////////////////////////////////
export const getProjectStart = () => {
    return {
        type: actionTypes.GET_PROJECT_START
    }
}

export const getProjectSuccess = (projectData, userLevelId) => {
    return {
        type: actionTypes.GET_PROJECT_SUCCESS,
        project: projectData,
        userLevel: userLevelId
    }
}

export const getProjectFail = (error) => {
    return {
        type: actionTypes.GET_PROJECT_FAIL,
        error: error
    }
}
export const getProject = (idProject) => {
    return (dispatch) => {
        dispatch(getProjectStart());
        axios({
            method: 'GET',
            url: '/project/' + idProject
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getProjectFail(getMessageError(response.data.error)));
                else
                    dispatch(getProjectSuccess(response.data.Project, response.data.UserLevelId));
            })
            .catch(function (error) {
                dispatch(getProjectFail(getMessageError(error.response.status)));
            });
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////// Obtener los proyectos en los que esta un usuario
// //////////////////////////////////////////////////////////////////////////////////
export const getUserProjectsStart = () => {
    return {
        type: actionTypes.GET_USER_PROJECTS_START
    }
}

export const getUserProjectsSuccess = (userProjects) => {
    return {
        type: actionTypes.GET_USER_PROJECTS_SUCCESS,
        userProjects: userProjects
    }
}

export const getUserProjectsFail = (error) => {
    return {
        type: actionTypes.GET_USER_PROJECTS_FAIL,
        error: error
    }
}

export const getUserProjects = () => {
    return (dispatch) => {
        dispatch(getUserProjectsStart());
        axios({
            method: 'GET',
            url: '/projects/'
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getUserProjectsFail(getMessageError(response.data.error)));
                else {
                    const options = response.data;
                    let optionsFormatted = [];
                    options.forEach(project => {
                        if (project.name !== '')
                            optionsFormatted.push({
                                value: project.id,
                                label: project.name,
                                description: project.description,
                                teams: project.teams.length,
                                owner: project.owner
                            })
                    });
                    dispatch(getUserProjectsSuccess(optionsFormatted));
                }
            })
            .catch(function (error) {
                dispatch(getUserProjectsFail(getMessageError(error.response.status)));
            });
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////// Eliminar un proyecto
// //////////////////////////////////////////////////////////////////////////////////
export const deleteProjectStart = () => {
    return {
        type: actionTypes.DELETE_PROJECT_START
    }
}

export const deleteProjectSuccess = (message) => {
    return {
        type: actionTypes.DELETE_PROJECT_SUCCESS,
        message: message
    }
}

export const deleteProjectFail = (error) => {
    return {
        type: actionTypes.DELETE_PROJECT_FAIL,
        error: error
    }
}

export const deleteProject = (idProject) => {
    return (dispatch) => {
        dispatch(deleteProjectStart());
        axios({
            method: 'DELETE',
            url: '/project',
            data: {
                project: idProject
            }
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(deleteProjectFail(getMessageError(response.data.error)));
                else
                    dispatch(deleteProjectSuccess('Proyecto eliminado correctamente'));
            })
            .catch(function (error) {
                dispatch(deleteProjectFail(getMessageError(error.response.status)));
            });
    }
}

// //////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////// Obtener los miembros dentro de un proyecto
// //////////////////////////////////////////////////////////////////////////////////
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

export const getUsersByProject = (idProject) => {
    return (dispatch) => {
        dispatch(getUsersByProjectStart());
        axios({
            method: 'GET',
            url: '/projectusers/' + idProject
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
}