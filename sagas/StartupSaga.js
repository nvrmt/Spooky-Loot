import { call, take, takeEvery, put, takeLatest, select, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { StartupTypes } from '../redux/StartupRedux';
import { UpdaterTypes } from '../redux/UpdaterRedux';
import { AuthTypes } from '../redux/AuthRedux';
import { MapTypes } from '../redux/MapRedux';
import { NavigationActions } from 'react-navigation';

// Mock flow -- auth check is GOD AWFUL.
function* onStartup_Request() {
	yield put({ type: UpdaterTypes.GET_UPDATE });
	yield delay(2000);

    yield put({ type: MapTypes.LOAD_MAP_REQUEST });

	yield put({ type: AuthTypes.VERIFY_AUTH_REQUEST });

	const { success, failure } = yield race({
		success: take(AuthTypes.VERIFY_AUTH_SUCCESS),
		failure: take(AuthTypes.VERIFY_AUTH_FAILURE)
	});

	yield put({type: StartupTypes.STARTUP_SUCCESS, route: (success) ? "Home" : "Auth"});
}

function* onStartup_Failure(action) {}

function* onStartup_Success(action) {
	yield put(NavigationActions.navigate({ routeName: action.route }));
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
