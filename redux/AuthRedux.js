import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from "immer";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    authCheck: [],
    authCheckSuccess: ['user'],
    authCheckFailure: [],


    authCheckQuick: [],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    error: null,
    authorized: false,
    checking: false
});

/* ------------- Reducers ------------- */

export const request = (state, action) =>
    produce(state, draft => {draft.checking = true});

export const success = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.authorized = true;
        draft.error = action.error;
        draft.user = action.payload;
});

export const failure = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.authorized = false;
        draft.error = action.error;
        draft.user = null;
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.AUTH_CHECK]: request,
    [Types.AUTH_CHECK_SUCCESS]: success,
    [Types.AUTH_CHECK_FAILURE]: failure,

    [Types.AUTH_CHECK_QUICK]: success,
});


/* ------------- Selectors ------------- */

// check if authorized isn't false to confirm we're authorized
export const isUserAuthenticated = (authState: Object) => {
    return (authState.user != null);
};