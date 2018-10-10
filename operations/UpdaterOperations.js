import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetchVersion: ['version'],
    verifyVersion: ['verified'],
    updateVersion: null,
});

export const VersionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    updating: false,
    verified: false,
    error: null
});

/* ------------- Reducers ------------- */

// we're attempting to get the version
export const request = (state: Object) => state.merge({ fetching: true });

// we've the version
export const success = (state: Object, { username }: Object) =>
  state.merge({ fetching: false, error: null, username });

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_VERSION]: request,
  [Types.VERIFY_VERSION]: success,
  [Types.UPDATE_VERSION]: failure
});