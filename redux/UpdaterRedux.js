import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from 'immer';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getUpdate: ['version'],
    getUpdateSuccess: ['version'],
    getUpdateFailure: null,

    // Updating
    sendUpdateStatus: ['status'],
});

export const UpdaterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    checking: false,
    updating: false,
    latestVersion: null,
    version: 0,
    updateStatus: "Checking",
    error: null
});

/* ------------- Reducers ------------- */

export const request = (state, action) =>
    produce(state, draft => {
        draft.checking = true;
        draft.updateStatus = action.payload;
    });

export const success = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.updating = false;
        draft.latestVersion = action.payload;
        draft.error = action.error;
        draft.version = action.payload;
    });

export const failure = (state, action) =>
    produce(state, draft => {
        draft.updating = false;
        draft.checking = false;
        draft.latestVersion = 0;
        draft.updateStatus = "Failed to update";
        draft.error = action.error;
    });

// Update
export const sendUpdateStatus = (state, action) =>
    produce(state, draft => {
        draft.updateStatus = action.payload;
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_UPDATE]: request,
    [Types.GET_UPDATE_SUCCESS]: success,
    [Types.GET_UPDATE_FAILURE]: failure,
    [Types.SEND_UPDATE_STATUS]: sendUpdateStatus,
});

/* ------------- Selectors ------------- */

export const isLatestVersion = (updateState: Object) => updateState.updater.latestVersion > 0;
export const getUpdateStatus = (updateState : Object) => updateState.updater.updateStatus;