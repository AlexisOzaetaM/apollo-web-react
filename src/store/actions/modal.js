import * as actionTypes from './actionTypes';
import * as modalTypes from '../../constants/modals';

// ///////////////////////////////////////////////////////////////////////////
// //////////////// Mostrar el modal y mandar el tipo que se tiene que mostrar
// ///////////////////////////////////////////////////////////////////////////
export const showModalStart = () => {
    return {
        type: actionTypes.SHOW_MODAL_START
    };
};

export const showModalSuccess = (modalType) => {
    return {
        type: actionTypes.SHOW_MODAL_SUCCESS,
        modalType: modalType
    }
}

export const hideModalSuccess = () => {
    return {
        type: actionTypes.HIDE_MODAL_SUCCESS
    }
}

export const showEditLevelModal = (modalType, modalData) => {
    return{
        type: actionTypes.SHOW_EDIT_LEVEL_MODAL,
        modalType: modalType,
        idLevel: modalData.idLevel,
        idProject: modalData.idProject
    }
}

const showModalWithIdProject = (modalType, modalData) => {
    return {
        type: actionTypes.SHOW_MODAL_WITH_ID_PROJECT_SUCCESS,
        modalType: modalType,
        idProject: modalData.idProject
    }
}

const showModalWithIdTeam = (modalType, modalData) => {
    return {
        type: actionTypes.SHOW_MODAL_WITH_ID_TEAM,
        modalType: modalType,
        idTeam: modalData.idTeam,
        idProject: modalData.idProject
    }
}

const showTaskModal = (modalType, modalData) => {
    return {
        type: actionTypes.SHOW_TASK_MODAL,
        modalType: modalType,
        task: modalData
    }
}

export const showModal = (modalType, modalData) => {
    return dispatch => {
        dispatch(showModalStart());
        if (modalType) {
            switch (modalType) {
                case modalTypes.NON_MODAL: return dispatch(hideModalSuccess())
                case modalTypes.TEAMS_MODAL:
                case modalTypes.NEW_TEAM_MODAL:
                case modalTypes.LEVELS_MODAL:
                case modalTypes.NEW_LEVEL_MODAL:
                case modalTypes.EDIT_PROJECT_MODAL: return dispatch(showModalWithIdProject(modalType, modalData))
                case modalTypes.EDIT_TEAM_MODAL: return dispatch(showModalWithIdTeam(modalType, modalData))
                case modalTypes.EDIT_LEVEL_MODAL: return dispatch(showEditLevelModal(modalType, modalData))
                case modalTypes.TASK_MODAL: return dispatch(showTaskModal(modalType, modalData))
                default: return dispatch(showModalSuccess(modalType === modalTypes.NON_MODAL ? null : modalType))
            }
        }
    }
}