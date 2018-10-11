import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    loginRequest: [],
    loginSuccess: ['user'],
    loginFailure: ['error'],
    logout: null
});

export const UserTypes = Types;
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    error: null,
    fetching: false
});

/* ------------- Reducers ------------- */

export const request = (state: Object) => state.merge({fetching: true});
export const success = (state: Object, {username}: Object) =>
    state.merge({fetching: false, error: null, username});

export const failure = (state: Object, {error}: Object) =>
    state.merge({fetching: false, error});

export const logout = (state: Object) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGOUT]: logout
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.user !== null;