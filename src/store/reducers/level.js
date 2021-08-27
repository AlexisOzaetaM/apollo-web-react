import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    success: null,
    error: null,
    loading: false,
    levelsList: [],
    delete: false,
    levelList:[],
    levelName:null
};

const cleanLevel = (state) => {
    return updateObject(state, {
        success: null,
        error: null, 
        loading: false,
    })
}

const levelStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
    });
}

const levelSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null
    });
}

const levelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false
    });
}

const getLevelsStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        levelsList: [],
        delete: false
    });
}

const getLevelsSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        levelsList: action.levelsList,
        delete: false
    });
}

const getLevelsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        levelsList: [],
        delete: false
    });
}

const deleteLevelStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        delete: false
    });
}

const deleteLevelSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null,
        delete: true
    });
}

const deleteLevelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        delete: false
    });
}

const getLevelStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        levelList: [],
        levelName:null,
        delete: false
    });
}

const getLevelSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        levelName:action.levelName,
        levelList: action.levelList,
        delete: false
    });
}

const getLevelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        levelList: [],
        levelName:null,
        delete: false
    });
}

const updateLevelStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        delete: false
    });
}

const updateLevelSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        success: action.message,
        delete: false
    });
}

const updateLevelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false,
        delete: false
    });
}

const updateUserLevelStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        delete: false
    });
}

const updateUserLevelSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        delete: false
    });
}

const updateUserLevelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false,
        delete: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAN_LEVEL_STATE: return cleanLevel(state);
        case actionTypes.LEVEL_START: return levelStart(state, action);
        case actionTypes.LEVEL_SUCCESS: return levelSuccess(state, action);
        case actionTypes.LEVEL_FAIL: return levelFail(state, action);

        case actionTypes.GET_LEVELS_START: return getLevelsStart(state, action);
        case actionTypes.GET_LEVELS_SUCCESS: return getLevelsSuccess(state, action);
        case actionTypes.GET_LEVELS_FAIL: return getLevelsFail(state, action);

        case actionTypes.DELETE_LEVEL_START: return deleteLevelStart(state, action);
        case actionTypes.DELETE_LEVEL_SUCCESS: return deleteLevelSuccess(state, action);
        case actionTypes.DELETE_LEVEL_FAIL: return deleteLevelFail(state, action);

        case actionTypes.GET_LEVEL_START: return getLevelStart(state, action);
        case actionTypes.GET_LEVEL_SUCCESS: return getLevelSuccess(state, action);
        case actionTypes.GET_LEVEL_FAIL: return getLevelFail(state, action);

        case actionTypes.UPDATE_LEVEL_START: return updateLevelStart(state, action);
        case actionTypes.UPDATE_LEVEL_SUCCESS: return updateLevelSuccess(state, action);
        case actionTypes.UPDATE_LEVEL_FAIL: return updateLevelFail(state, action);

        case actionTypes.UPDATE_USER_LEVEL_START: return updateUserLevelStart(state, action);
        case actionTypes.UPDATE_USER_LEVEL_SUCCESS: return updateUserLevelSuccess(state, action);
        case actionTypes.UPDATE_USER_LEVEL_FAIL: return updateUserLevelFail(state, action);

        default: return state;
    }
};

export default reducer;