import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/objects';

const initialState = {
    isCollapsed: true
};

const collapseLateralMenuChange = (state, action) => {
    return updateObject(state, {
        isCollapsed: !state.isCollapsed
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.COLLAPSE_LATERAL_MENU_SUCCESS: return collapseLateralMenuChange(state, action);
        default: return state;
    }
};

export default reducer;