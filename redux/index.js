import { combineReducers } from 'redux';
import { createNavigationReducer } from "react-navigation-redux-helpers";
import configureStore from '../store/SetupStore';
import rootSaga from '../sagas';
import { RootNavigator } from '../navigation/AppNavigation';

//Reducers
import {reducer as UpdaterReducer} from "../redux/UpdaterRedux";
import {reducer as AuthReducer} from "../redux/AuthRedux";
import {reducer as InitReducer} from "./StartupRedux";


const navReducer = createNavigationReducer(RootNavigator);

/* ------------- Assemble The Reducers ------------- */

export const reducers = combineReducers({
    nav: navReducer,
    updater: UpdaterReducer,
    authorization: AuthReducer,
    init: InitReducer,
});

export default () => {
    let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);
    return store;
}
