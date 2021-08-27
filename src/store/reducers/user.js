import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    userData: null,
    firstConfigurationCompleted: false,
    success: null,
    error: null,
    loading: false,
    searchOptions: []
};

const cleanUser = (state) => {
    return updateObject(state, {
        userData: null,
        firstConfigurationCompleted: false,
        success: null,
        error: null,
        loading: false,
        searchOptions: []
    })
}

const getUserDataStart = (state, action) => {
    return updateObject(state, {
        userData: null,
        success: null,
        error: null,
        loading: true
    });
}

const getUserDataSuccess = (state, action) => {
    return updateObject(state, {
        userData: action.userData,
        success: action.message,
        error: null,
        loading: false
    });
}

const getUserDataFail = (state, action) => {
    return updateObject(state, {
        userData: null,
        success: null,
        error: action.error,
        loading: false
    });
}

const firstConfigurationStart = (state, action) => {
    return updateObject(state, {
        success: null,
        firstConfigurationCompleted: false,
        error: null,
        loading: true
    });
}

const firstConfigurationCompletedSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        firstConfigurationCompleted: true,
        error: null,
        loading: false
    });
}

const firstConfigurationFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        firstConfigurationCompleted: false,
        success: null,
        loading: false
    });
}

const profileDetailsStart = (state, action) => {
    return updateObject(state, {
        success: null,
        loading: true,
        error: null
    });
}

const profileDetailsSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false
    });
}

const profileDetailsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false
    });
}

const SyncGitStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
}

const SyncGitSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false
    });
}

const SyncGitFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false
    });
}

const getUsernamesLikeStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        searchOptions: []
    });
}

const getUsernamesLikeSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false,
        searchOptions: action.searchOptions
    });
}

const getUsernamesLikeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: null,
        loading: false,
        searchOptions: []
    });
}

const updateUserDataStart = (state, action) => {
    return updateObject(state, {
        success: null,
        loading: true,
        error: null
    });
}

const updateUserDataSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        userData: action.userData,
        error: null,
        loading: false
    });
}

const updateUserDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAN_USER_STATE: return cleanUser(state);
        case actionTypes.USER_GET_DATA_START: return getUserDataStart(state, action);
        case actionTypes.USER_GET_DATA_SUCCESS: return getUserDataSuccess(state, action);
        case actionTypes.USER_GET_DATA_FAIL: return getUserDataFail(state, action);
        case actionTypes.FIRST_CONFIGURATION_START: return firstConfigurationStart(state, action);
        case actionTypes.FIRST_CONFIGURATION_COMPLETED_SUCCESS: return firstConfigurationCompletedSuccess(state, action);
        case actionTypes.FIRST_CONFIGURATION_FAIL: return firstConfigurationFail(state, action);
        case actionTypes.PROFILE_DETAILS_START: return profileDetailsStart(state, action);
        case actionTypes.PROFILE_DETAILS_SUCCESS: return profileDetailsSuccess(state, action);
        case actionTypes.PROFILE_DETAILS_FAIL: return profileDetailsFail(state, action);
        case actionTypes.SYNC_GITLAB_GITHUB_START: return SyncGitStart(state, action);
        case actionTypes.SYNC_GITLAB_GITHUB_SUCCESS: return SyncGitSuccess(state, action);
        case actionTypes.SYNC_GITLAB_GITHUB_FAIL: return SyncGitFail(state, action);
        case actionTypes.USER_GET_USERNAMES_LIKE_START: return getUsernamesLikeStart(state, action);
        case actionTypes.USER_GET_USERNAMES_LIKE_SUCCESS: return getUsernamesLikeSuccess(state, action);
        case actionTypes.USER_GET_USERNAMES_LIKE_FAIL: return getUsernamesLikeFail(state, action);
        case actionTypes.USER_UPDATE_DATA_START: return updateUserDataStart(state, action);
        case actionTypes.USER_UPDATE_DATA_FAIL: return updateUserDataFail(state, action);
        case actionTypes.USER_UPDATE_DATA_SUCCESS: return updateUserDataSuccess(state, action);
        default: return state;
    }
};

export default reducer;