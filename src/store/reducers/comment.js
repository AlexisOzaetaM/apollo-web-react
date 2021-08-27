import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    newCommentSuccess: null,
    newCommentError: null,
    newCommentLoading: false,
    getCommentsError: null,
    getCommentsLoading: false,
    comments: [],
    deleteCommentSuccess: null,
    deleteCommentError: null,
    deleteCommentLoading: false
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////// Para crear un nuevo comentario
// ////////////////////////////////////////////////////////////////////////////////////////
const newCommentStart = (state, action) => {
    return updateObject(state, {
        newCommentSuccess: null,
        newCommentError: null,
        newCommentLoading: true
    });
}

const newCommentSuccess = (state, action) => {
    return updateObject(state, {
        newCommentSuccess: action.message,
        newCommentError: null,
        newCommentLoading: false
    });
}

const newCommentFail = (state, action) => {
    return updateObject(state, {
        newCommentSuccess: null,
        newCommentError: action.error,
        newCommentLoading: false
    });
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////// Para obtener los comentarios de una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const getCommentsStart = (state, action) => {
    return updateObject(state, {
        getCommentsError: null,
        getCommentsLoading: true,
        comments: []
    });
}

const getCommentsSuccess = (state, action) => {
    return updateObject(state, {
        getCommentsError: null,
        getCommentsLoading: false,
        comments: action.comments
    });
}

const getCommentsFail = (state, action) => {
    return updateObject(state, {
        getCommentsError: action.error,
        getCommentsLoading: false,
        comments: []
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMMENTS_START: return getCommentsStart(state, action);
        case actionTypes.GET_COMMENTS_SUCCESS: return getCommentsSuccess(state, action);
        case actionTypes.GET_COMMENTS_FAIL: return getCommentsFail(state, action);
        case actionTypes.SAVE_NEW_COMMENT_START: return newCommentStart(state, action);
        case actionTypes.SAVE_NEW_COMMENT_SUCCESS: return newCommentSuccess(state, action);
        case actionTypes.SAVE_NEW_COMMENT_FAIL: return newCommentFail(state, action);
        default: return state;
    }
};

export default reducer;