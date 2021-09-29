import {
    SET_NEARBY,
    SET_GASSTATION,
} from '../actions/actionTypes';

const initialState = {
    nearbyGasstations: [],
    gasstation: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NEARBY: {
            console.log(action);
            return {
                ...state,
                nearbyGasstations: action.data,
            };
        }
        case SET_GASSTATION: {
            console.log(action);
            return {
                ...state,
                gasstation: action.data,
            };
        }
        default:
            return state;
    }
};
