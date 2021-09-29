import * as actionTypes from './actionTypes';

import { authFetch } from '../../Common/store/token';
import { API_KEY } from '../../Common/store/config';


export const getNearby = (lat, lon) => {
    return dispatch => {
        dispatch(authFetch(`/near?key=${API_KEY}&lat=${lat}&lon=${lon}`))
            .catch(err => console.log(err))
            .then(res => {
                dispatch(setNearby(res.gasstations));
            });
    };
};

export const setNearby = (data) => {
    return {
        type: actionTypes.SET_NEARBY,
        data
    }
}

export const getGasstation = (id) => {
    return dispatch => {
        dispatch(authFetch(`/gasstation?key=${API_KEY}&id=${id}`))
            .catch(err => console.log(err))
            .then(res => {
                dispatch(setGasstation(res));
            });
    };
};

export const setGasstation = (data) => {
    return {
        type: actionTypes.SET_GASSTATION,
        data
    }
}