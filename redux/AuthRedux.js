import {createReducer, createActions, createTypes} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from "immer";
import {StartupTypes} from "./StartupRedux";

/* ------------- Types and Action Creators ------------- */

const { Creators } = createActions({
    loginRequest: null,
});

export const AuthTypes = createTypes(`
  LOGIN_REQUEST
  LOGIN_SUCCESS
  LOGIN_FAILURE
  
  VERIFY_AUTH_REQUEST
  VERIFY_AUTH_SUCCESS
  VERIFY_AUTH_FAILURE
`, {});

export default Creators;

const Types = AuthTypes;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    user: null,
    error: null,
    checking: false
});

/* ------------- Reducers ------------- */

// Login
export const login_Request = (state, action) =>
    produce(state, draft => {draft.checking = true});

export const login_Success = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.user = action.user;
});

export const login_Failure = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.error = action.error;
});

// Verify Auth
export const verifyAuth_Request = (state, action) =>
    produce(state, draft => {draft.checking = true});

export const verifyAuth_Success = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.user = action.user;
    });

export const verifyAuth_Failure = (state, action) =>
    produce(state, draft => {
        draft.checking = false;
        draft.error = action.error;
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: login_Request,
    [Types.LOGIN_SUCCESS]: login_Success,
    [Types.LOGIN_FAILURE]: login_Failure,

    [Types.VERIFY_AUTH_REQUEST]: verifyAuth_Request,
    [Types.VERIFY_AUTH_SUCCESS]: verifyAuth_Success,
    [Types.VERIFY_AUTH_FAILURE]: verifyAuth_Failure,
});


/* ------------- Selectors ------------- */