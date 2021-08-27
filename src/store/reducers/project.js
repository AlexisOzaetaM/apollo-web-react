import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    success: null,
    error: null,
    loading: false,
    currentProject: null,
    deleted: false,
    userProjects: null,
    usersByProjectLoading: false,
    usersByProjectError: null,
    usersByProject: []
};

const cleanProject = (state) => {
    return updateObject(state, {
        success: null,
        error: null, 
        loading: false,
        deleted: false
    })
}

const projectStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        deleted: false
    });
}

const projectSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null
    });
}

const projectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false
    });
}

const getProjectStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        currentProject: null,
        deleted: false
    });
}

const getProjectSuccess = (state, action) => {
    return updateObject(state, {
        success: null,
        loading: false,
        error: null,
        currentProject: action.project,
        currentUserLevelId: action.userLevel
    });
}

const getProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        currentProject: null
    });
}

const getUserProjectsStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        userProjects: null
    });
}

const getUserProjectsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        userProjects: action.userProjects
    });
}

const getUserProjectsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        userProjects: null
    });
}

const deleteProjectStart = (state, action) => {
    return updateObject(state, {        
        success: null,
        error: null,
        loading: true,
        deleted: false
    });
}

const deleteProjectSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null,
        currentProject: null,
        deleted: true
    });
}

const deleteProjectFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        deleted: false
    });
}

const updateProjectStart = (state, action) => {
    return updateObject(state, { 
        success: null,
        error: null, 
        loading: true,
        deleted: false
    });
}

const updateProjectSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null,
        currentProject: action.project
    });
}

const updateProjectFail = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        success: false,
        loading: false 
    });
}

const getUsersByProjectStart = (state, action) => {
    return updateObject(state, {
        usersByProjectError: null, 
        usersByProjectLoading: true,
        usersByProject: []
    });
}

const getUsersByProjectSuccess = (state, action) => {
    return updateObject(state, {
        usersByProjectLoading: false,
        usersByProjectError: null,
        usersByProject: action.projectUsers
    });
}

const getUsersByProjectFail = (state, action) => {
    return updateObject(state, { 
        usersByProjectError: action.error,
        usersByProjectLoading: false,
        usersByProject: []
    });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAN_PROJECT_STATE: return cleanProject(state);
        case actionTypes.PROJECT_START: return projectStart(state, action);
        case actionTypes.PROJECT_SUCCESS: return projectSuccess(state, action);
        case actionTypes.PROJECT_FAIL: return projectFail(state, action);
        case actionTypes.GET_PROJECT_START: return getProjectStart(state, action);
        case actionTypes.GET_PROJECT_SUCCESS: return getProjectSuccess(state, action);
        case actionTypes.GET_PROJECT_FAIL: return getProjectFail(state, action);
        case actionTypes.GET_USER_PROJECTS_START: return getUserProjectsStart(state, action);
        case actionTypes.GET_USER_PROJECTS_SUCCESS: return getUserProjectsSuccess(state, action);
        case actionTypes.GET_USER_PROJECTS_FAIL: return getUserProjectsFail(state, action);
        case actionTypes.DELETE_PROJECT_START: return deleteProjectStart(state, action);
        case actionTypes.DELETE_PROJECT_SUCCESS: return deleteProjectSuccess(state, action);
        case actionTypes.DELETE_PROJECT_FAIL: return deleteProjectFail(state, action);
        case actionTypes.UPDATE_PROJECT_START: return updateProjectStart(state, action);
        case actionTypes.UPDATE_PROJECT_SUCCESS: return updateProjectSuccess(state, action);
        case actionTypes.UPDATE_PROJECT_FAIL: return updateProjectFail(state, action);
        case actionTypes.GET_USERS_BY_PROJECT_START: return getUsersByProjectStart(state, action);
        case actionTypes.GET_USERS_BY_PROJECT_SUCCESS: return getUsersByProjectSuccess(state, action);
        case actionTypes.GET_USERS_BY_PROJECT_FAIL: return getUsersByProjectFail(state, action);
        default: return state;
    }
};

export default reducer;
