import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authCheck: [''],
  authCheckSuccess: [],
  authCheckFailure: []
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authorized: false,
    user: null,
  error: null,
});

/* ------------- Reducers ------------- */

export const check = (state: Object) => state.merge({ authorized: true });

export const success = (state: Object, { user }: Object) =>
  state.merge({  authorized: true, error: null });

export const failure = (state: Object, { error }: Object) =>
  state.merge({ authorized: false, error });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_CHECK]: check,
  [Types.AUTH_CHECK_SUCCESS]: success,
  [Types.AUTH_CHECK_FAILURE]: failure
});

/* ------------- API ------------- */


/* ------------- Selectors ------------- */

// check if authorized isn't false to confirm we're authorized
export const isAuthed = (authState: Object) => authState.user !== null;