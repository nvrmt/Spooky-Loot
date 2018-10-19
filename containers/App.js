import React from 'react';
import {Provider, connect} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import createStore from '../redux';

import RootContainer from './RootContainer';

//Sets up sagas and redux
const rootStore = createStore();


export default class App extends React.Component {
    render() {
        return (
            <Provider store={rootStore.store}>
                <RootContainer />
            </Provider>
        )
    }
}

// Dev settings
console.disableYellowBox = true;
//
// <PersistGate loading={<Text>Loading...</Text>} persistor={rootStore.persistor}>
//     <RootContainer />
// </PersistGate>