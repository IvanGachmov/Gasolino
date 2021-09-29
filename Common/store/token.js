import { BASE_URL } from './config';


export const authFetch = (url, method, body) => {
    console.log('No TOken    ' + url);
    return dispatch => {
        const promise = new Promise((resolve, reject) => {
            method = method || 'GET';
            body = body ? JSON.stringify(body) : null;
            return fetch(BASE_URL + url, {
                method,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body,
            })
                .catch(err => reject(err))
                .then(res => { console.log(res); return res.json(); })
                .catch(err => reject(err))
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
        return promise;
    };
};

