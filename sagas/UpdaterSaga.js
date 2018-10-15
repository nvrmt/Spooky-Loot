import { take, fork, all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import UpdaterRedux from '../redux/UpdaterRedux';

import { UpdaterTypes } from "../redux/UpdaterRedux";
import { AuthTypes } from "../redux/AuthRedux";

// Mock updates to simulate flow
function* checkForUpdates() {
    yield sendUpdateStatus("Checking...");
    yield delay(1000);
    yield sendUpdateStatus("Updates found!");
    yield delay(1500);
    yield sendUpdateStatus("Updating was a success.");
    yield put({type: UpdaterTypes.GET_VERSION_SUCCESS, payload: '1'});
}

// the "updates" fetched from above
function* getUpdates(payload) {
    console.log("Got update " + payload);

    //Updated now lets do an auth check to cause an auto login to happen
    yield put({type: AuthTypes.AUTH_CHECK_QUICK});

    yield delay(1000);
    //yield put({type: "AUTH_CHECK"});
}

// Helper functions
function sendUpdateStatus(newStatus) {
    return put({type: UpdaterTypes.SEND_UPDATE_STATUS, payload: newStatus});
}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root () {
     yield takeLatest(UpdaterTypes.GET_VERSION, checkForUpdates);
     yield takeLatest(UpdaterTypes.GET_VERSION_SUCCESS, getUpdates);
 }