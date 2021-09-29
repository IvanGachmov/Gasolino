import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from '../../Login/reducer/auth';
import news from '../../Home/reducers/trips';
import gasstations from '../../Map/reducers/gasstations';
import gasolinelist from '../../GasolineList/reducers/gasolinelist';

const rootReducer = combineReducers({
    auth: auth,
    news: news,
    gasstations: gasstations,
    gasolinelist: gasolinelist,
});

let composeEnhancers = compose;

if (window.__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
