import {put, call, takeLatest, take, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga';
import { MapTypes } from "../redux/MapRedux";
import { NavigationActions } from "react-navigation";

import { getPlacesByName, getPlaceByID } from '../api/GooglePlacesAPI';

// Load's map resources from our firebase database

function* onLoadMap_Request(action) {
    const {data} = yield call(getPlacesByName, "1979 Marine Drive");
    console.tron.logImportant(data);

     const places = yield getPlaceByID(data.candidates[0].place_id);
     console.tron.logImportant(places);
}

function* onLoadMap_Success(action) {
}

function* onLoadMap_Failure(action) {

}

/* ------------- Hookup Sagas To Types ------------- */

 export default function* root() {
     yield takeLatest(MapTypes.LOAD_MAP_REQUEST, onLoadMap_Request);
     yield takeLatest(MapTypes.LOAD_MAP_SUCCESS, onLoadMap_Success);
     yield takeLatest(MapTypes.LOAD_MAP_FAILURE, onLoadMap_Failure);
 }