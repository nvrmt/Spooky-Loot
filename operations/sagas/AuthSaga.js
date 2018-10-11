import { take, fork, all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AuthOperations from '../AuthOperations';
import firebase from 'react-native-firebase';

import { AuthTypes } from "../AuthOperations";

//TODO: first saga, refactor as needed
//So we auto login via firebase
function* watchForAuth() {
    const user = firebase.auth().currentUser;
    if(user != null) {
        console.log("Authorized");
        let jsonData = JSON.stringify(user.toJSON());
        let info = JSON.parse(jsonData);
        console.log(info);
        yield put({type: AuthTypes.AUTH_CHECK_SUCCESS, payload: info});
    } else {
        console.log("Not authorized");
        yield put({type: AuthTypes.AUTH_CHECK_FAILURE});
    }
}

function* watchForSuccess(action) {
    console.log("Checked auth success");
}

function* watchForAuthFailure(action) {
    console.log("Failed to auth");
}


/* ------------- Hookup Sagas To Types ------------- */

 export default function* root () {
     yield takeLatest(AuthTypes.AUTH_CHECK, watchForAuth);
     yield takeLatest(AuthTypes.AUTH_CHECK_SUCCESS, watchForSuccess);
     yield takeLatest(AuthTypes.AUTH_CHECK_FAILURE, watchForAuthFailure);
 }