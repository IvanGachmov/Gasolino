import * as actionTypes from './actionTypes';

import { authFetch } from '../../Common/store/token';
import { API_KEY } from '../../Common/store/config';


export const getPrices = (fuel) => {
    return dispatch => {
        dispatch(authFetch('/price?key=' + API_KEY + '&fuel=' + fuel))
            .catch(err => console.log(err))
            .then(res => {
                dispatch(setPrices(res));
            });
    };
};

export const setPrices = (data) => {
    return {
        type: actionTypes.SET_PRICES,
        data,
    };
};