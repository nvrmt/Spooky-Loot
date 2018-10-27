import {createReducer, createActions, createTypes} from 'reduxsauce';
import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import Immutable from 'seamless-immutable';
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions({
    loadMapRequest: null,
    findPlaceRequest: ['coords'],
    selectPlaceRequest: ['coords'],

    setPlaceVotes: ['placeId', 'votes'],
});

export const MapTypes = createTypes(`
  LOAD_MAP_REQUEST
  LOAD_MAP_SUCCESS
  LOAD_MAP_FAILURE
  
  FIND_PLACE_REQUEST
  FIND_PLACE_SUCCESS
  
  SELECT_PLACE_REQUEST
  
  SET_PLACE_VOTES
  SET_PLACE_VOTES_SUCCESS
  SET_PLACE_VOTES_FAILURE
`, {});

export default Creators;

const Types = MapTypes;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    loadingMap: false,
    mapMarkers: null,
    fetchedPlaceID: null,
    fetchedPlaceAddr: null
});

/* ------------- Reducers ------------- */

// Login
export const loadMap_Request = (state, action) =>
    produce(state, draft => {
        draft.loadingMap = true;
        draft.error = action.error;
});

export const loadMap_Success = (state, action) =>
    produce(state, draft => {
        draft.loadingMap = false;
        draft.error = action.error;
        draft.mapMarkers = action.places;
});

export const loadMap_Failure = (state, action) =>
    produce(state, draft => {
        draft.loadingMap = false;
        draft.error = action.error;
});


export const findPlace_Request = (state, action) =>
    produce(state, draft => {

});

export const findPlace_Success = (state, action) =>
    produce(state, draft => {
        draft.fetchedPlaceID = action.payload.placeId;
        draft.fetchedPlaceAddr = action.payload.address;
});

export const setPlaceVotes_Request = (state, action) =>
    produce(state, draft => {

});

export const setPlaceVotes_Success = (state, action) =>
    produce(state, draft => {

});

export const selectPlace_Request = (state, action) =>
    produce(state, draft => {

});


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_MAP_REQUEST]: loadMap_Request,
    [Types.LOAD_MAP_SUCCESS]: loadMap_Success,
    [Types.LOAD_MAP_FAILURE]: loadMap_Failure,

    [Types.FIND_PLACE_REQUEST]: findPlace_Request,
    [Types.FIND_PLACE_SUCCESS]: findPlace_Success,

    [Types.SELECT_PLACE_REQUEST]: selectPlace_Request,

    [Types.SET_PLACE_VOTES]: setPlaceVotes_Request,
    [Types.SET_PLACE_VOTES_SUCCESS]: setPlaceVotes_Success,
});


/* ------------- Selectors ------------- */

// check if authorized isn't false to confirm we're authorized

export const mapMarkers = (state) => state.map.mapMarkers;

export const fetchedPlaceID = (state) => state.map.fetchedPlaceID;

export const fetchedPlaceAddr = (state) => state.map.fetchedPlaceAddr;

export const getMarkerByPlaceID = createSelector(
    state => state.map.mapMarkers,
    places => memoize(
        placeId => places.filter(place => place.placeId === placeId)
    )
);