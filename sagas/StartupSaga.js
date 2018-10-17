import { call, take, takeEvery, put, takeLatest, select  } from 'redux-saga/effects'
import { delay } from 'redux-saga';


import { StartupTypes } from "../redux/StartupRedux";
import { UpdaterTypes } from "../redux/UpdaterRedux";
import { AuthTypes } from "../redux/AuthRedux";
import { NavigationActions } from "react-navigation";

// Mock flow -- auth check is GOD AWFUL.
function* onStartup_Request() {
    yield put({type: UpdaterTypes.GET_UPDATE});
    yield delay(2000);

    let res = null;

    yield put({type: AuthTypes.VERIFY_AUTH_REQUEST});
    while(res == null) {
        yield res = takeLatest(AuthTypes.VERIFY_AUTH_SUCCESS, onStartup_AuthSuccess);
        yield res = takeLatest(AuthTypes.VERIFY_AUTH_FAILURE, onStartup_AuthFailure);
    }

    yield put({type: StartupTypes.STARTUP_SUCCESS, action: (res.FORK.args.indexOf("FAILURE")) ?
    "Auth" : "Home"});

    yield put(NavigationActions.navigate({ routeName: 'Home' }));
}

function* onStartup_Failure(action) {

}

function* onStartup_Success(action) {
    yield put(NavigationActions.navigate({ routeName: action.action }));
}

function* onStartup_AuthSuccess(action) {
    return action;
}

function* onStartup_AuthFailure() {
    return null;
}


/* ------------- Hookup Sagas To Types ------------- */

export default function* root() {
    yield takeLatest(StartupTypes.STARTUP_REQUEST, onStartup_Request);
    yield takeLatest(StartupTypes.STARTUP_SUCCESS, onStartup_Success);
    yield takeLatest(StartupTypes.STARTUP_FAILURE, onStartup_Failure);
}