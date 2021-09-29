import {
    SET_NEWS,
} from '../actions/actionTypes';

const initialState = {
    news: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS: {
            const newNews = state.news.concat(action.data);
            return {
                ...state,
                news: newNews,
            };
        }
        default:
            return state;
    }
};
