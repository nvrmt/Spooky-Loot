import {createReducer, createActions, createTypes} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions({
    startupRequest: null,
});

export const StartupTypes = createTypes(`
    STARTUP_REQUEST
    STARTUP_SUCCESS
    STARTUP_FAILURE
`, {});

export default Creators;

const Types = StartupTypes;


/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    checkedForUpdates: false,
    initialAuthCheck: false,
});

/* ------------- Reducers ------------- */

// the flow
export const startup_Request = (state, action) =>
    produce(state, draft => {

    });

export const startup_Success = (state, action) =>
    produce(state, draft => {

    });

export const startup_Failure = (state, action) =>
    produce(state, draft => {

    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.STARTUP_REQUEST]: startup_Request,
    [Types.STARTUP_SUCCESS]: startup_Success,
    [Types.STARTUP_FAILURE]: startup_Failure
});


/* ------------- Selectors ------------- */

export const isUpdated = (initState: Object) => initState.checkedForUpdates === true;