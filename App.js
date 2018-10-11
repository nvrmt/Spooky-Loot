import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';

import createSagaMiddleware from 'redux-saga';

import {createStackNavigator} from 'react-navigation';

import InitialContainer from './containers/InitialContainer';
import HubContainer from "./containers/HubContainer";

//Reducers
import {reducer as UserReducer} from "./operations/UserOperations";
import {reducer as AuthReducer} from "./operations/AuthOperations";

//Sagas
import rootSagas from "./operations/sagas/AuthSaga";

import loggerMiddleware from 'redux-logger';


/* ------------- Assemble The Reducers ------------- */

const rootReducer = combineReducers({
    //user: UserReducer,
    authorization: AuthReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, loggerMiddleware));

sagaMiddleware.run(rootSagas);

const RootStack = createStackNavigator(
    {
        Initial: {
            screen: InitialContainer,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Hub: {
            screen: HubContainer,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
    },
    {
        initialRouteName: 'Initial',
    }
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
        )
    }
}