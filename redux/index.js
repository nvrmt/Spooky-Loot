import { combineReducers } from 'redux';
import { createNavigationReducer } from "react-navigation-redux-helpers";
import configureStore from '../store/SetupStore';
import rootSaga from '../sagas';
import { RootNavigator } from '../navigation/AppNavigation';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'


//Reducers
import {reducer as UpdaterReducer} from "../redux/UpdaterRedux";
import {reducer as AuthReducer} from "../redux/AuthRedux";
import {reducer as StartupReducer} from "./StartupRedux";
import {reducer as MapReducer} from "./MapRedux";

const navReducer = createNavigationReducer(RootNavigator);

const persistConfig  = {
    key: 'root',
    storage,
    whitelist: ['auth']
};



/* ------------- Assemble The Reducers ------------- */

export const reducers = combineReducers({
    nav: navReducer,
    updater: UpdaterReducer,
    auth: AuthReducer,
    startup: StartupReducer,
    map: MapReducer

});

const persistedReducers = persistReducer(persistConfig, reducers);


export default () => {
    let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);
    let persistor = persistStore(store);
    return { store, persistor };
}
