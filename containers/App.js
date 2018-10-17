import React from 'react';
import {Provider, connect} from 'react-redux';

import createStore from '../redux';

import ReduxNavigation from '../navigation/ReduxNavigation'

//Sets up sagas and redux
const store = createStore();


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ReduxNavigation />
            </Provider>
        )
    }
}

// Dev settings
console.disableYellowBox = true;