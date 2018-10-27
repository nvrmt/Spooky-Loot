import React from 'react';
import {Provider, connect} from 'react-redux';

import createStore from '../redux';

import RootContainer from './RootContainer';

//Sets up sagas and redux
const store = createStore();


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}

// Dev settings
if(__DEV__) {
    console.tron.overlay(App);
    console.disableYellowBox = true;
}