import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    success: null,
    error: null,
    loading: false,
    getTeamsByProjectLoading: false,
    teamsList: [],
    teamSelected: {},
    projectTeams: [],
    teamUsers: null
}

const cleanTeam = (state) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: false
    })
}

const saveNewTeamStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
}

const saveNewTeamSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false
    });
}

const saveNewTeamFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false
    });
}

const addTeamMemberStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
}

const addTeamMemberSuccess = (state, action) => {
    const { teamSelected } = state
    let usersListUpdated = teamSelected.users
    usersListUpdated.push(action.userAdded)
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false,
        teamSelected: {
            users: usersListUpdated
        }
    });
}

const addTeamMemberFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false
    });
}

const deleteTeamMemberStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
}

const deleteTeamMemberSuccess = (state, action) => {
    const { teamSelected } = state
    let usersListUpdated = teamSelected.users.filter((team) => {
        return team.value !== action.idUserDeleted
    })

    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false,
        teamSelected: {
            users: usersListUpdated
        }
    });
}

const deleteTeamMemberFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false
    });
}

const deleteTeamStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
}

const deleteTeamSuccess = (state, action) => {
    const { teamsList } = state
    let teamsListUpdated = teamsList.filter((team) => {
        return team.value !== action.idTeamDeleted
    })

    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false,
        teamsList: teamsListUpdated
    });
}

const deleteTeamFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false
    });
}

const getTeamsStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        teamsList: []
    });
};

const getTeamsSuccess = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: false,
        teamsList: action.teamsList
    });
};

const getTeamsFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false,
        teamsList: []
    });
};

const getTeamStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        teamSelected: {}
    });
};

const getTeamSuccess = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: false,
        teamSelected: action.teamSelected
    });
};

const getTeamFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false,
        teamSelected: {}
    });
};

const updateTeamStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true
    });
};

const updateTeamSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        error: null,
        loading: false
    });
};

const updateTeamFail = (state, action) => {
    return updateObject(state, {
        success: null,
        error: action.error,
        loading: false
    });
};

const getProjectTeamsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        getProjectTeamsLoading: true,
        projectTeams: []
    });
}

const getProjectTeamsSuccess = (state, action) => {
    return updateObject(state, {
        getProjectTeamsLoading: false,
        error: null,
        projectTeams: action.projectTeams
    });
}

const getProjectTeamsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        getProjectTeamsLoading: false,
        projectTeams: []
    });
}

const getTeamUsersStart = (state, action) => {
    return updateObject(state, {
        success: null,
        error: null,
        loading: true,
        teamUsers: null
    });
}

const getTeamUsersSuccess = (state, action) => {
    return updateObject(state, {
        success: action.message,
        loading: false,
        error: null,
        teamUsers: action.teamUsers
    });
}
const getTeamUsersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        success: false,
        loading: false,
        teamUsers: null
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLEAN_TEAM_STATE: return cleanTeam(state);
        case actionTypes.SAVE_NEW_TEAM_START: return saveNewTeamStart(state, action);
        case actionTypes.SAVE_NEW_TEAM_SUCCESS: return saveNewTeamSuccess(state, action);
        case actionTypes.SAVE_NEW_TEAM_FAIL: return saveNewTeamFail(state, action);
        case actionTypes.ADD_TEAM_MEMBER_START: return addTeamMemberStart(state, action);
        case actionTypes.ADD_TEAM_MEMBER_SUCCESS: return addTeamMemberSuccess(state, action);
        case actionTypes.ADD_TEAM_MEMBER_FAIL: return addTeamMemberFail(state, action);
        case actionTypes.DELETE_TEAM_MEMBER_START: return deleteTeamMemberStart(state, action);
        case actionTypes.DELETE_TEAM_MEMBER_SUCCESS: return deleteTeamMemberSuccess(state, action);
        case actionTypes.DELETE_TEAM_MEMBER_FAIL: return deleteTeamMemberFail(state, action);
        case actionTypes.DELETE_TEAM_START: return deleteTeamStart(state, action);
        case actionTypes.DELETE_TEAM_SUCCESS: return deleteTeamSuccess(state, action);
        case actionTypes.DELETE_TEAM_FAIL: return deleteTeamFail(state, action);
        case actionTypes.GET_TEAMS_START: return getTeamsStart(state, action);
        case actionTypes.GET_TEAMS_SUCCESS: return getTeamsSuccess(state, action);
        case actionTypes.GET_TEAMS_FAIL: return getTeamsFail(state, action);
        case actionTypes.GET_TEAM_START: return getTeamStart(state, action);
        case actionTypes.GET_TEAM_SUCCESS: return getTeamSuccess(state, action);
        case actionTypes.GET_TEAM_FAIL: return getTeamFail(state, action);
        case actionTypes.UPDATE_TEAM_START: return updateTeamStart(state, action);
        case actionTypes.UPDATE_TEAM_SUCCESS: return updateTeamSuccess(state, action);
        case actionTypes.UPDATE_TEAM_FAIL: return updateTeamFail(state, action);
        case actionTypes.GET_PROJECT_TEAMS_START: return getProjectTeamsStart(state, action);
        case actionTypes.GET_PROJECT_TEAMS_FAIL: return getProjectTeamsFail(state, action);
        case actionTypes.GET_PROJECT_TEAMS_SUCCESS: return getProjectTeamsSuccess(state, action);
        case actionTypes.GET_TEAM_USERS_START: return getTeamUsersStart(state, action);
        case actionTypes.GET_TEAM_USERS_FAIL: return getTeamUsersFail(state, action);
        case actionTypes.GET_TEAM_USERS_SUCCESS: return getTeamUsersSuccess(state, action);
        default: return state;
    }
};

export default reducer;