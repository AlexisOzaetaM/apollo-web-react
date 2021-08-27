import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { getMessageError } from '../../utils/errors';

const saveNewTaskStart = () => {
    return {
        type: actionTypes.SAVE_NEW_TASK_START
    };
};

const saveNewTaskSuccess = (message) => {
    return {
        type: actionTypes.SAVE_NEW_TASK_SUCCESS,
        message: message
    };
};

const saveNewTaskFail = (error) => {
    return {
        type: actionTypes.SAVE_NEW_TASK_FAIL,
        error: error
    };
};

export const saveNewTask = (idProject, idTeam, idUser, title, description, date, state) => {
    return (dispatch) => {
        dispatch(saveNewTaskStart());
        axios({
            method: 'POST',
            url: '/task',
            data: qs.stringify({
                team: idTeam,
                user: idUser,
                title: title,
                description: description,
                delivery_date: date,
                state: state
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(saveNewTaskFail(getMessageError(response.data.error)));
                else
                    dispatch(saveNewTaskSuccess('Tarea guardada correctamente'));
            })
            .catch(function (error) {

                dispatch(saveNewTaskFail(getMessageError(error.response.status)));
            });
    }
};

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////// Para obtener todas las tareas
// ////////////////////////////////////////////////////////////////////////////////////////
const getTasksByProjectStart = () => {
    return {
        type: actionTypes.GET_TASKS_START
    };
};

const getTasksByProjectSuccess = (tasks) => {
    return {
        type: actionTypes.GET_TASKS_SUCCESS,
        tasks: tasks
    };
};

const getTasksByProjectFail = (error) => {
    return {
        type: actionTypes.GET_TASKS_FAIL,
        error: error
    };
};

export const getTasksByProject = (idProject) => {
    return (dispatch) => {
        dispatch(getTasksByProjectStart());
        axios({
            method: 'GET',
            url: '/tasks?project=' + idProject
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getTasksByProjectFail(getMessageError(response.data.error)));
                else
                    dispatch(getTasksByProjectSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(getTasksByProjectFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////// Para obtener una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const getTaskStart = () => {
    return {
        type: actionTypes.GET_TASK_START
    };
};

const getTaskSuccess = (task) => {
    return {
        type: actionTypes.GET_TASK_SUCCESS,
        task: task
    };
};

const getTaskFail = (error) => {
    return {
        type: actionTypes.GET_TASK_FAIL,
        error: error
    };
};

export const getTask = (idTask) => {
    return (dispatch) => {
        dispatch(getTaskStart());
        axios({
            method: 'GET',
            url: '/task/' + idTask
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getTaskFail(getMessageError(response.data.error)));
                else
                    dispatch(getTaskSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(getTaskFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////// Aplicar los filtros de usuario, estado y equipo
// ////////////////////////////////////////////////////////////////////////////////////////
const applyFiltersSuccess = (filters) => {
    return {
        type: actionTypes.APPLY_TASK_FILTERS,
        filters: filters
    }
}

export const applyFilters = filters => {
    return dispatch => {
        dispatch(applyFiltersSuccess(filters))
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////// Aplicar el filtro de busqueda
// ////////////////////////////////////////////////////////////////////////////////////////
const applySearchFilterSuccess = (search, filters) => {
    return {
        type: actionTypes.APPLY_TASK_SEARCH_FILTER,
        search: search,
        filters: filters
    }
}

export const applySeacrhFilter = (search, filters) => {
    return dispatch => {
        dispatch(applySearchFilterSuccess(search, filters))
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////// Para eliminar una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const editTaskStart = () => {
    return {
        type: actionTypes.EDIT_TASK_START
    };
};

const editTaskSuccess = (message) => {
    return {
        type: actionTypes.EDIT_TASK_SUCCESS,
        message: message
    };
};

const editTaskFail = (error) => {
    return {
        type: actionTypes.EDIT_TASK_FAIL,
        error: error
    };
};

export const editTask = (task) => {
    return (dispatch) => {
        dispatch(editTaskStart());
        axios({
            method: 'PATCH',
            url: '/task',
            data: qs.stringify({
                task: task.id,
                title: task.title,
                description: task.description,
                delivery_date: task.delivery_date,
                state: task.state,
                TeamId: task.TeamId,
                UserId: task.UserId
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(editTaskFail(getMessageError(response.data.error)));
                else
                    dispatch(editTaskSuccess('Tarea editada correctamente.'));
            })
            .catch(function (error) {
                dispatch(editTaskFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////// Para eliminar una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const deleteTaskStart = () => {
    return {
        type: actionTypes.DELETE_TASK_START
    };
};

const deleteTaskSuccess = (message) => {
    return {
        type: actionTypes.DELETE_TASK_SUCCESS,
        message: message
    };
};

const deleteTaskFail = (error) => {
    return {
        type: actionTypes.DELETE_TASK_FAIL,
        error: error
    };
};

export const deleteTask = (idTask) => {
    return (dispatch) => {
        dispatch(deleteTaskStart());
        axios({
            method: 'DELETE',
            url: '/task',
            data: {
                task: idTask
            }
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(deleteTaskFail(getMessageError(response.data.error)));
                else
                    dispatch(deleteTaskSuccess('Tarea eliminada correctamente.'));
            })
            .catch(function (error) {
                dispatch(deleteTaskFail(getMessageError(error.response.status)));
            });
    }
}