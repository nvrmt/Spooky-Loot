import {put, call, takeLatest, take, takeEvery, fork, select, cancel} from 'redux-saga/effects'
import {delay} from 'redux-saga';
import firebase from 'react-native-firebase';

import {NavigationActions} from 'react-navigation';

import {getPlacesByName, getPlaceByID, getAddressFromCoord, getPlaceImage, GOOGLE_API_KEY} from '../api/GoogleAPI';
import {updatePlace} from "../api/FirebaseAPI";

import { fetchedPlaceID, fetchedPlaceAddr, mapMarkers, MapTypes } from "../redux/MapRedux";

// Load's map resources from our firebase database

function* onLoadMap_Request(action) {
    let places = yield loadPlaces();
    yield put({type: MapTypes.LOAD_MAP_SUCCESS, places: places});
}

function* onLoadMap_Success(action) {

}

function* onLoadMap_Failure(action) {

}

function* onFindPlace_Request(action) {
    let placeId = null;
    let address = null;

    yield getAddressFromCoord(action.coords.latitude, action.coords.longitude)
    .then((res) => {
        placeId = res.data.results[0].place_id;
        address = res.data.results[0].formatted_address;
    })
    .catch((error) => {
        console.log(error);
    }).then(() => {});


    yield put({type: MapTypes.FIND_PLACE_SUCCESS, payload: {
            placeId: placeId,
            address: address
    }});

    //yield addPlaceToCollection(address);
}

function* onFindPlace_Success(action) {
    const exists = yield doesPlaceExist(action.payload.placeId);

    if(!exists) {
       yield addPlace(action.payload.address);
       yield put({type: MapTypes.LOAD_MAP_REQUEST});
    }
}

function* onSetPlaceVotes_Request(action) {
    const {votes} = action;
    const placeId = yield select(fetchedPlaceID);

    yield updateVotes(placeId, votes);
}

function* onSetPlaceVotes_Success(action) {

}

function* onSelectPlace_Request(action) {
    yield put({type: MapTypes.FIND_PLACE_REQUEST, coords: action.coords});

    yield take(MapTypes.FIND_PLACE_SUCCESS);

    const address = yield select(fetchedPlaceAddr);
    const placeId = yield select(fetchedPlaceID);

    const shortAddr = address.substr(0, address.indexOf(','));
    yield put(NavigationActions.navigate({
        routeName: 'Modal', params: {
            name: shortAddr,
            loot: "Insert clever flavor text",
            picture: "https://maps.googleapis.com/maps/api/streetview?&key=" + GOOGLE_API_KEY + "&location=" + address + "&size=800x600",
            placeId: placeId
        }
    }));
}


/* ------------- Other functions ------------- */

function* doesPlaceExist(placeId) {
    const places = yield select(mapMarkers);
    let exists = false;
    places.map(place => {
        if(place.placeId === placeId) {
            exists = true;
        }
    });

    return exists;
}

function* addPlace(address) {
    let placeId = null;

    yield getPlacesByName(address).then((res) => {
        placeId = res.data.candidates[0].place_id;
    })
        .catch((error) => {
            console.log(error);
        }).then(() => {
        });

    yield fork(addPlaceByID, placeId);
}

function* addPlaceByID(placeId: String, extra: ? Object) {

    let placeObj = null;

    yield getPlaceByID(placeId).then((res) => {
        placeObj = {
            placeId: placeId,
            title: res.data.result.name,
            description: "A house with low vote score.",
            latlng: {
                latitude: res.data.result.geometry.location.lat,
                longitude: res.data.result.geometry.location.lng
            },
            votes: 0
        };

        // add our extra info
        if (extra) {
            placeObj = {...placeObj, ...extra};
        }

        return placeObj;
    })
        .catch((error) => {
            console.log(error);
            return error;
        }).then(() => {});

    yield updatePlace(placeObj);
}

function* loadPlaces() {
    const ref = firebase.firestore().collection('places');

    const places = [];

    yield ref.get().then((query) => {
        query.forEach((doc) => {
            let placeObj = {
                placeId: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                latlng: doc.data().latlng,
                votes: doc.data().votes
            };

            places.push(placeObj);
        });
    });

    return places;
}

function* updateVotes(placeId: String, votes: Number) {
    const ref = firebase.firestore().collection('places').doc(placeId);

    yield firebase
        .firestore()
        .runTransaction(async transaction => {
            const doc = await transaction.get(ref);

            if (!doc.exists) {
                return Promise.reject(new Error('Place Document does not exist.'));
            }

            transaction.update(ref, {
                votes: doc.data().votes + votes
            });
        })
        .then(() => console.log('Transaction successful votes updated'))
        .catch(error => console.log('Transaction failed: ' + error));
}

/* ------------- Hookup Sagas To Types ------------- */

export default function* root() {
    yield takeLatest(MapTypes.LOAD_MAP_REQUEST, onLoadMap_Request);
    yield takeLatest(MapTypes.LOAD_MAP_SUCCESS, onLoadMap_Success);
    yield takeLatest(MapTypes.LOAD_MAP_FAILURE, onLoadMap_Failure);

    yield takeLatest(MapTypes.FIND_PLACE_REQUEST, onFindPlace_Request);
    yield takeLatest(MapTypes.FIND_PLACE_SUCCESS, onFindPlace_Success);

    yield takeLatest(MapTypes.SELECT_PLACE_REQUEST, onSelectPlace_Request);

    yield takeLatest(MapTypes.SET_PLACE_VOTES, onSetPlaceVotes_Request);
    yield takeLatest(MapTypes.SET_PLACE_VOTES_SUCCESS, onSetPlaceVotes_Success);
}