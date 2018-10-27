import { combineReducers } from 'redux';
import { createNavigationReducer } from "react-navigation-redux-helpers";
import configureStore from '../store/SetupStore';
import rootSaga from '../sagas';
import { RootNavigator } from '../navigation/AppNavigation';

const navReducer = createNavigationReducer(RootNavigator);

/* ------------- Assemble The Reducers ------------- */

export const reducers = combineReducers({
    nav: navReducer,
    updater: require('../redux/UpdaterRedux').reducer,
    auth: require('../redux/AuthRedux').reducer,
    startup: require('../redux/StartupRedux').reducer,
    map: require('../redux/MapRedux').reducer,
    user: require('../redux/UserRedux').reducer
});


export default () => {
    let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga);

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('./').reducers;
            store.replaceReducer(nextRootReducer);

            const newYieldedSagas = require('../sagas').default;
            sagasManager.cancel();
            sagasManager.done.then(() => {
                sagasManager = sagaMiddleware.run(newYieldedSagas);
            })
        })
    }

    return store;
}
