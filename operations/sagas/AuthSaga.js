import { call, put } from 'redux-saga/effects'
import AuthOperations from '../AuthOperations';
import firebase from 'react-native-firebase';


// Watchers
export function* checkForAuth (api, action) {
    const response = yield call(() => {
        return fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            })
            .catch((error) => {
                console.error(error)
            })
    });

    if (response) {
        yield put(UserActions.loginSuccess(response))
    } else {
        yield put(UserActions.loginFailure())
    }
}