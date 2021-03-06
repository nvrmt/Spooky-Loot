import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { middleware as navMiddleware } from '../navigation/AppNavigation';

// creates the store
export default (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = [];
    const enhancers = [];

    /* ------------- navigation Middleware ------------ */

    middleware.push(navMiddleware);

    /* ------------- Saga Middleware ------------- */

    const sagaMonitor = (__DEV__) ? console.tron.createSagaMonitor() : null;
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    middleware.push(sagaMiddleware);

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware));

    const createAppropriateStore = (__DEV__) ? console.tron.createStore : createStore;
    const store = createAppropriateStore(rootReducer, compose(...enhancers));


    let sagasManager = sagaMiddleware.run(rootSaga);

    return {
        store,
        sagasManager,
        sagaMiddleware
    }
}

