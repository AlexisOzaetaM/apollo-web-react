import * as actionTypes from './actionTypes';

export const collapseLateralMenuChange = () => {
    return {
        type: actionTypes.COLLAPSE_LATERAL_MENU_SUCCESS
    };
};

export const collapseLateralMenu = () => {
    return dispatch => {
        dispatch(collapseLateralMenuChange())
    };
};