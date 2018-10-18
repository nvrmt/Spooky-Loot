import {put, takeLatest, take, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga';
import { MapTypes } from "../redux/MapRedux";
import { NavigationActions } from "react-navigation";

// Load's map resources from our firebase database

function* onLoadMap_Request(action) {

}

function* onLoadMap_Success(action) {
}

function* onLoadMap_Failure(action) {

}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root() {
     yield takeEvery(MapTypes.LOAD_MAP_REQUEST, onLoadMap_Request);
     yield takeEvery(MapTypes.LOAD_MAP_SUCCESS, onLoadMap_Success);
     yield takeEvery(MapTypes.LOAD_MAP_FAILURE, onLoadMap_Failure);
 }