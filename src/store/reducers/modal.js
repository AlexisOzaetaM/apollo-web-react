import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    modal: {
        show: false,
        type: null,
        idLevel: null,
        idProject: null,
        idTeam: null,
        task: null
    }
}

const showModalStart = (state, action) => {
    return updateObject(state, {
        modal: {
            show: false,
            type: null,
            idProject: null
        }
    });
}

const showModalSuccess = (state, action) => {
    return updateObject(state, {
        modal: {
            show: true,
            type: action.modalType,
            idProject: null
        }
    });
}

const hideModalSuccess = (state, action) => {
    return updateObject(state, {
        modal: {
            show: false,
            type: null,
            idProject: null
        }
    });
}

const showModalWithIdProject = (state, action) => {
    return updateObject(state, {
        modal: {
            show: true,
            type: action.modalType,
            idProject: action.idProject
        }
    });
}

const showEditLevelModal = (state, action) => {
    return updateObject(state, {
        modal: {
            show: true,
            type: action.modalType,
            idLevel :action.idLevel,
            idProject: action.idProject
        }
    });
}

const showModalWithIdTeam = (state, action) => {
    return updateObject(state, {
        modal: {
            show: true,
            type: action.modalType,
            idTeam :action.idTeam,
            idProject: action.idProject
        }
    });
}

const showTaskModal = (state, action) => {
    return updateObject(state, {
        modal: {
            show: true,
            type: action.modalType,
            task :action.task
        }
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL_START: return showModalStart(state, action);
        case actionTypes.SHOW_MODAL_SUCCESS: return showModalSuccess(state, action);
        case actionTypes.HIDE_MODAL_SUCCESS: return hideModalSuccess(state, action);
        case actionTypes.SHOW_EDIT_LEVEL_MODAL: return showEditLevelModal(state,action);
        case actionTypes.SHOW_MODAL_WITH_ID_PROJECT_SUCCESS: return showModalWithIdProject(state, action);
        case actionTypes.SHOW_MODAL_WITH_ID_TEAM: return showModalWithIdTeam(state, action);
        case actionTypes.SHOW_TASK_MODAL: return showTaskModal(state, action);
        default: return state;
    }
}

export default reducer;