import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    success: null,
    error: null,
    loading: false,
    deleteError: null,
    deleteLoading: false,
    taskDeleted: false,
    editSuccess: null,
    editError: null,
    editLoading: false,
    taskEdited: false,
    originalTasks: [],
    tasks: [],
    getTasksByProjectError: null,
    getTasksByProjectLoading: false,
    task: {},
    getTaskError: null,
    getTaskLoading: false
};

// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////// Para crear una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const saveNewTaskStart = (state, action) => {
    return updateObject(state, {
        success: null,
        loading: true,
        error: null
    });
}

const saveNewTaskSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false
    });
}

const saveNewTaskFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false
    });
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////// Para obtener todas las tareas
// ////////////////////////////////////////////////////////////////////////////////////////
const getTasksByProjectStart = (state, action) => {
    return updateObject(state, {
        originalTasks: [],
        tasks: [],
        getTasksByProjectError: null,
        getTasksByProjectLoading: true,
        deleteError: null,
        editSuccess: null,
        editError: null,
        taskDeleted: false,
        taskEdited: false
    })
}

const getTasksByProjectSuccess = (state, action) => {
    return updateObject(state, {
        originalTasks: action.tasks,
        tasks: action.tasks,
        getTasksByProjectError: null,
        getTasksByProjectLoading: false
    })
}

const getTasksByProjectFail = (state, action) => {
    return updateObject(state, {
        taskoriginalTasks: [],
        tasks: [],
        getTasksByProjectError: action.error,
        getTasksByProjectLoading: false
    })
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////// Para obtener una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const getTaskStart = (state, action) => {
    return updateObject(state, {
        task: {},
        getTaskError: null,
        getTaskLoading: true
    })
}

const getTaskSuccess = (state, action) => {
    return updateObject(state, {
        task: action.task,
        getTaskError: null,
        getTaskLoading: false
    })
}

const getTaskFail = (state, action) => {
    return updateObject(state, {
        task: {},
        getTaskError: action.error,
        getTaskLoading: false
    })
}

const applyFiltersSuccess = (state, action) => {
    let tasksFiltered = []

    state.originalTasks.forEach(task => {
        if (action.filters.user !== null) {
            if (action.filters.state !== null) {
                if (action.filters.team !== null) {
                    if (task.UserId === action.filters.user.value && task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                        tasksFiltered.push(task)
                } else {
                    if (task.UserId === action.filters.user.value && task.state === action.filters.state.value)
                        tasksFiltered.push(task)
                }
            } else {
                if (task.UserId === action.filters.user.value)
                    tasksFiltered.push(task)
            }
        } else if (action.filters.state !== null) {
            if (action.filters.team !== null) {
                if (task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                    tasksFiltered.push(task)
            } else {
                if (task.state === action.filters.state.value)
                    tasksFiltered.push(task)
            }
        } else if (action.filters.team !== null) {
            if (task.TeamId === action.filters.team.value)
                tasksFiltered.push(task)
        } else
            tasksFiltered.push(task)
    });

    return updateObject(state, {
        tasks: tasksFiltered
    })
}

const applySearchFilterSuccess = (state, action) => {
    let tasksFiltered = []

    if (!(!action.search)) {
        state.tasks.forEach(task => {
            if (task.title.toLowerCase().includes(action.search.toLowerCase())) {
                if (action.filters.user !== null) {
                    if (action.filters.state !== null) {
                        if (action.filters.team !== null) {
                            if (task.UserId === action.filters.user.value && task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                                tasksFiltered.push(task)
                        } else {
                            if (task.UserId === action.filters.user.value && task.state === action.filters.state.value)
                                tasksFiltered.push(task)
                        }
                    } else {
                        if (task.UserId === action.filters.user.value)
                            tasksFiltered.push(task)
                    }
                } else if (action.filters.state !== null) {
                    if (action.filters.team !== null) {
                        if (task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                            tasksFiltered.push(task)
                    } else {
                        if (task.state === action.filters.state.value)
                            tasksFiltered.push(task)
                    }
                } else if (action.filters.team !== null) {
                    if (task.TeamId === action.filters.team.value)
                        tasksFiltered.push(task)
                } else 
                    tasksFiltered.push(task)
            }
        })
    } else {
        state.originalTasks.forEach(task => {
            if (action.filters.user !== null) {
                if (action.filters.state !== null) {
                    if (action.filters.team !== null) {
                        if (task.UserId === action.filters.user.value && task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                            tasksFiltered.push(task)
                    } else {
                        if (task.UserId === action.filters.user.value && task.state === action.filters.state.value)
                            tasksFiltered.push(task)
                    }
                } else {
                    if (task.UserId === action.filters.user.value)
                        tasksFiltered.push(task)
                }
            } else if (action.filters.state !== null) {
                if (action.filters.team !== null) {
                    if (task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                        tasksFiltered.push(task)
                } else {
                    if (task.state === action.filters.state.value)
                        tasksFiltered.push(task)
                }
            } else if (action.filters.team !== null) {
                if (task.TeamId === action.filters.team.value)
                    tasksFiltered.push(task)
            } else
                tasksFiltered.push(task)
        });
    }

    if (tasksFiltered.length === 0) {
        state.originalTasks.forEach(task => {
            if (action.filters.user !== null) {
                if (action.filters.state !== null) {
                    if (action.filters.team !== null) {
                        if (task.UserId === action.filters.user.value && task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                            tasksFiltered.push(task)
                    } else {
                        if (task.UserId === action.filters.user.value && task.state === action.filters.state.value)
                            tasksFiltered.push(task)
                    }
                } else {
                    if (task.UserId === action.filters.user.value)
                        tasksFiltered.push(task)
                }
            } else if (action.filters.state !== null) {
                if (action.filters.team !== null) {
                    if (task.state === action.filters.state.value && task.TeamId === action.filters.team.value)
                        tasksFiltered.push(task)
                } else {
                    if (task.state === action.filters.state.value)
                        tasksFiltered.push(task)
                }
            } else if (action.filters.team !== null) {
                if (task.TeamId === action.filters.team.value)
                    tasksFiltered.push(task)
            } else
                tasksFiltered.push(task)
        });
    }

    return updateObject(state, {
        tasks: tasksFiltered
    })
}

// ////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////// Para eliminar una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const deleteTaskStart = (state, action) => {
    return updateObject(state, {
        success: null,
        deleteError: null,
        deleteLoading: true,
        taskDeleted: false
    })
}

const deleteTaskSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        deleteError: null,
        deleteLoading: false,
        taskDeleted: true
    })
}

const deleteTaskFail = (state, action) => {
    return updateObject(state, {
        success: null,
        deleteError: action.error,
        deleteLoading: false,
        taskDeleted: false
    })
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////// Para editar una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const editTaskStart = (state, action) => {
    return updateObject(state, {
        editSuccess: null,
        editError: null,
        editLoading: true,
        taskEdited: false
    })
}

const editTaskSuccess = (state, action) => {
    return updateObject(state, {
        editSuccess: action.message,
        editError: null,
        editLoading: false,
        taskEdited: true
    })
}

const editTaskFail = (state, action) => {
    return updateObject(state, {
        editSuccess: null,
        editError: action.error,
        editLoading: false,
        taskEdited: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_NEW_TASK_START: return saveNewTaskStart(state, action);
        case actionTypes.SAVE_NEW_TASK_FAIL: return saveNewTaskFail(state, action);
        case actionTypes.SAVE_NEW_TASK_SUCCESS: return saveNewTaskSuccess(state, action);
        case actionTypes.GET_TASKS_START: return getTasksByProjectStart(state, action);
        case actionTypes.GET_TASKS_SUCCESS: return getTasksByProjectSuccess(state, action);
        case actionTypes.GET_TASKS_FAIL: return getTasksByProjectFail(state, action);
        case actionTypes.GET_TASK_START: return getTaskStart(state, action);
        case actionTypes.GET_TASK_SUCCESS: return getTaskSuccess(state, action);
        case actionTypes.GET_TASK_FAIL: return getTaskFail(state, action);
        case actionTypes.DELETE_TASK_START: return deleteTaskStart(state, action);
        case actionTypes.DELETE_TASK_SUCCESS: return deleteTaskSuccess(state, action);
        case actionTypes.DELETE_TASK_FAIL: return deleteTaskFail(state, action);
        case actionTypes.EDIT_TASK_START: return editTaskStart(state, action);
        case actionTypes.EDIT_TASK_SUCCESS: return editTaskSuccess(state, action);
        case actionTypes.EDIT_TASK_FAIL: return editTaskFail(state, action);
        case actionTypes.APPLY_TASK_FILTERS: return applyFiltersSuccess(state, action);
        case actionTypes.APPLY_TASK_SEARCH_FILTER: return applySearchFilterSuccess(state, action);
        default: return state;
    }
};

export default reducer;