import * as actionTypes from './actionTypes';
import axios from '../axios-api';
import qs from 'qs';
import { getMessageError } from '../../utils/errors';

// ////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////// Para crear un nuevo comentario
// ////////////////////////////////////////////////////////////////////////////////////////
const newCommentStart = () => {
    return {
        type: actionTypes.SAVE_NEW_COMMENT_START
    };
};
/*
const newCommentSuccess = (comments) => {
    return {
        type: actionTypes.SAVE_NEW_COMMENT_SUCCESS,
        comments: comments
    };
};
*/
const newCommentFail = (error) => {
    return {
        type: actionTypes.SAVE_NEW_COMMENT_FAIL,
        error: error
    };
};

export const newComment = (idTask, description) => {
    return (dispatch) => {
        dispatch(newCommentStart());
        axios({
            method: 'POST',
            url: '/comment',
            data: qs.stringify({
                task: idTask,
                description: description
            })
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(newCommentFail(getMessageError(response.data.error)));
                else {
                    dispatch(getCommentsStart());
                    axios({
                        method: 'GET',
                        url: '/comments?task=' + idTask
                    })
                        .then(function (response) {
                            if (response.data.error)
                                dispatch(getCommentsFail(getMessageError(response.data.error)));
                            else {
                                const rowComments = response.data
                                let comments = []
                                rowComments.forEach(comment => {
                                    comments.push({
                                        id: comment.id,
                                        idUser: comment.UserId,
                                        user: comment.User.display_name,
                                        date: comment.updatedAt,
                                        comment: comment.description
                                    })
                                })
                                dispatch(getCommentsSuccess(comments));
                            }
                        })
                        .catch(function (error) {
                            dispatch(getCommentsFail(getMessageError(error.response.status)));
                        });
                }
            })
            .catch(function (error) {
                dispatch(newCommentFail(getMessageError(error.response.status)));
            });
    }
}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////// Para obtener los comentarios de una tarea
// ////////////////////////////////////////////////////////////////////////////////////////
const getCommentsStart = () => {
    return {
        type: actionTypes.GET_COMMENTS_START
    };
};

const getCommentsSuccess = (comments) => {
    return {
        type: actionTypes.GET_COMMENTS_SUCCESS,
        comments: comments
    };
};

const getCommentsFail = (error) => {
    return {
        type: actionTypes.GET_COMMENTS_FAIL,
        error: error
    };
};

export const getComments = (idTask) => {
    return (dispatch) => {
        dispatch(getCommentsStart());
        axios({
            method: 'GET',
            url: '/comments?task=' + idTask
        })
            .then(function (response) {
                if (response.data.error)
                    dispatch(getCommentsFail(getMessageError(response.data.error)));
                else {
                    const rowComments = response.data
                    let comments = []
                    rowComments.forEach(comment => {
                        comments.push({
                            id: comment.id,
                            idUser: comment.UserId,
                            user: comment.User.display_name,
                            date: comment.updatedAt,
                            comment: comment.description
                        })
                    })
                    dispatch(getCommentsSuccess(comments));
                }
            })
            .catch(function (error) {

                dispatch(getCommentsFail(getMessageError(error.response.status)));
            });
    }
}