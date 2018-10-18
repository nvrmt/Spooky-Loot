import {createReducer, createActions, createTypes} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions({
    loadMapRequest: null,
});

export const MapTypes = createTypes(`
  LOAD_MAP_REQUEST
  LOAD_MAP_SUCCESS
  LOAD_MAP_FAILURE
`, {});

export default Creators;

const Types = MapTypes;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    syncedWithServer: false,
    error: null,
    loadingMap: false
});

/* ------------- Reducers ------------- */

// Login
export const loadMap_Request = (state, action) =>
    produce(state, draft => {draft.loadingMap = true});

export const loadMap_Success = (state, action) =>
    produce(state, draft => {
        draft.loadingMap = false;
        draft.user = action.user;
});

export const loadMap_Failure = (state, action) =>
    produce(state, draft => {
        draft.loadingMap = false;
        draft.error = action.error;
});



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_MAP_REQUEST]: loadMap_Request,
    [Types.LOAD_MAP_SUCCESS]: loadMap_Success,
    [Types.LOAD_MAP_FAILURE]: loadMap_Failure,
});


/* ------------- Selectors ------------- */

// check if authorized isn't false to confirm we're authorized
export const isMapLoaded = (mapState: Object) => mapState.syncedWithServer !== false;