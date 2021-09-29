
import { authFetch } from '../../Common/store/token';
import { API_KEY } from '../../Common/store/config';


export const getGasstations = () => {
    return dispatch => {
        dispatch(authFetch('/gasstations?key=' + API_KEY + '&brand_id=14'))
            .catch(err => console.log(err))
            .then(res => {
                console.log(res);
            });
    };
};
