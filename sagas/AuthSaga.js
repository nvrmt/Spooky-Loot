import {put, takeLatest, take, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { AuthTypes } from "../redux/AuthRedux";
import { NavigationActions } from "react-navigation";

// Login
function* onLogin_Request(action) {
    const result = yield LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
        console.tron.log("Cancelled login.");
        yield delay(1000); // after 1 second re-send login request aka, making the modal launch again
        yield put({type: AuthTypes.LOGIN_REQUEST});
        return;
    }

    // get the access token
    const data = yield AccessToken.getCurrentAccessToken();

    if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
    }

    // link between our fb and the firebase database
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    const user = yield firebase.auth().signInAndRetrieveDataWithCredential(credential);

    if(user != null) {
        yield put({type: AuthTypes.LOGIN_SUCCESS, user})
    } else {
        yield put({type: AuthTypes.LOGIN_FAILURE});
    }
}

function* onLogin_Success(action) {
    const { isNewUser, profile } = action.user.additionalUserInfo;
    if(isNewUser) {
        let userCol = yield firebase.firestore().collection('users');
        yield userCol.add({email: profile.email});
    }

    yield put(NavigationActions.navigate({ routeName: 'Home' }));
}

function* onLogin_Failure(action) {

}

// Verify Auth
function* onVerifyAuth_Request(action) {
    const user = firebase.auth().currentUser;

    if(user) {
        yield put({type: AuthTypes.VERIFY_AUTH_SUCCESS, action: user});
    } else         {
        yield put({type: AuthTypes.VERIFY_AUTH_FAILURE});
    }
}

function* onVerifyAuth_Success(action) {
}

function* onVerifyAuth_Failure(action) {

}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root() {
     yield takeEvery(AuthTypes.LOGIN_REQUEST, onLogin_Request);
     yield takeEvery(AuthTypes.LOGIN_SUCCESS, onLogin_Success);
     yield takeEvery(AuthTypes.LOGIN_FAILURE, onLogin_Failure);

     yield takeEvery(AuthTypes.VERIFY_AUTH_REQUEST, onVerifyAuth_Request);
     yield takeEvery(AuthTypes.VERIFY_AUTH_SUCCESS, onVerifyAuth_Success);
     yield takeEvery(AuthTypes.VERIFY_AUTH_FAILURE, onVerifyAuth_Failure);
 }