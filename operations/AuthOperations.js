import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    authCheck: [],
    authCheckSuccess: ['user'],
    authCheckFailure: []
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: {},
    error: null,
    authorized: false,
    checking: false
});

/* ------------- Reducers ------------- */

export const request = (state: Object) =>
    state.merge({checking: true});

export const success = (state: Object, { user }: Object) =>
    state.merge({checking: false, authorized: true, error: null, user: user});

export const failure = (state: Object, { error }: Object) =>
    state.merge({checking: false, authorized: false, error});


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.AUTH_CHECK]: request,
    [Types.AUTH_CHECK_SUCCESS]: success,
    [Types.AUTH_CHECK_FAILURE]: failure
});


/* ------------- Selectors ------------- */

// check if authorized isn't false to confirm we're authorized
export const isAuthed = (authState: Object) => authState.user !== null;