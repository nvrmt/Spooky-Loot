import { take, fork, all, call, put, takeLatest, takeEvery, select  } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import UpdaterRedux from '../redux/UpdaterRedux';

import { UpdaterTypes } from "../redux/UpdaterRedux";
import { AuthTypes } from "../redux/AuthRedux";

// Mock updates to simulate flow
function* checkForUpdates() {
    yield sendUpdateStatus("Checking...");
    yield delay(750);
    yield sendUpdateStatus("Updates found!");
    yield delay(750);
    yield sendUpdateStatus("Updating was a success.");
    yield put({type: UpdaterTypes.GET_UPDATE_SUCCESS, payload: '1'});
}

// the "updates" fetched from above
function* getUpdates(payload) {

}

// Helper functions
function sendUpdateStatus(newStatus) {
    return put({type: UpdaterTypes.SEND_UPDATE_STATUS, payload: newStatus});
}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root () {
     yield takeEvery(UpdaterTypes.GET_UPDATE, checkForUpdates);
     yield takeEvery(UpdaterTypes.GET_UPDATE_SUCCESS, getUpdates);
 }