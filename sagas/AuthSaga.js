import { take, fork, all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import firebase from 'react-native-firebase';

import { AuthTypes } from "../redux/AuthRedux";

//TODO: first saga, refactor as needed
//So we auto login via firebase
function* watchForAuth() {
    let user = null;
    while (user == null) {
        user = firebase.auth().currentUser;
        yield delay(100);
        //let jsonData = JSON.stringify(user.toJSON());
    }

    if(user) {
        yield put({type: AuthTypes.AUTH_CHECK_SUCCESS, payload: user});
    } else         {
        yield put({type: AuthTypes.AUTH_CHECK_FAILURE});
    }
}

// Quick check rather than waiting for the auth
function* checkForAuth() {
    const user = firebase.auth().currentUser;

    if(user) {
        yield put({type: AuthTypes.AUTH_CHECK_SUCCESS, payload: user});
    } else         {
        yield put({type: AuthTypes.AUTH_CHECK_FAILURE});
    }
}

function* watchForSuccess(action) {
    console.tron.log("Checked auth success");

}

function* watchForAuthFailure(action) {
    console.tron.log("Failed to auth");
}


/* ------------- Hookup Sagas To Types ------------- */

 export default function* root() {
     yield takeLatest(AuthTypes.AUTH_CHECK, checkForAuth);
     yield takeLatest(AuthTypes.AUTH_CHECK_SUCCESS, watchForSuccess);
     yield takeLatest(AuthTypes.AUTH_CHECK_FAILURE, watchForAuthFailure);

     yield takeLatest(AuthTypes.AUTH_CHECK_QUICK, checkForAuth);
 }