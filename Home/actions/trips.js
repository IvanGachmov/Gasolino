import * as actionTypes from './actionTypes';

import { authFetch } from '../../Common/store/token';
import { API_KEY } from '../../Common/store/config';


export const getNews = (fuel) => {
    return dispatch => {
        dispatch(authFetch('/news?key=' + API_KEY + '&count=50&fuel=' + fuel))
            .catch(err => console.log(err))
            .then(res => {
                dispatch(setNews(res.news));
            });
    };
};

export const setNews = (data) => {
    return {
        type: actionTypes.SET_NEWS,
        data,
    };
};
