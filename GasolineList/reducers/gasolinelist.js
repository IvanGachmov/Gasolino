import {
    SET_PRICES,
} from '../actions/actionTypes';

const initialState = {
    gasolinePrices: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRICES: {
            const gasoline = [...state.gasolinePrices];
            gasoline.push(action.data);
            return {
                ...state,
                gasolinePrices: gasoline,
            };
        }
        default:
            return state;
    }
};
