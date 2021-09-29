import {
    TRY_AUTH,
} from '../actions/actionTypes';

const initialState = {
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRY_AUTH:
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default reducer;
