import {put, call, takeLatest, take, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga';
import { MapTypes } from "../redux/MapRedux";
import { NavigationActions } from "react-navigation";

import { getPlacesByName, getPlaceByID } from '../api/GoogleAPI';

// Load's map resources from our firebase database

function* onLoadMap_Request(action) {
    console.log(action);

    const coords = {
        latitude: 49.323,
        longitude: -123.116
    };

    yield put({type: MapTypes.LOAD_MAP_SUCCESS, payload: [
        {latlng: coords, title: "BIRDS", description: "Desc"},
        {latlng: coords, title: "Test", description: "Desc"}
        ]});
}

function* onLoadMap_Success(action) {
    console.log(action.payload);
}

function* onLoadMap_Failure(action) {

}

function* onFindPlace_Request(action) {
    console.log(action);
}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root() {
     yield takeLatest(MapTypes.LOAD_MAP_REQUEST, onLoadMap_Request);
     yield takeLatest(MapTypes.LOAD_MAP_SUCCESS, onLoadMap_Success);
     yield takeLatest(MapTypes.LOAD_MAP_FAILURE, onLoadMap_Failure);


     yield takeLatest(MapTypes.FIND_PLACE_REQUEST, onFindPlace_Request);
 }