import {createReducer, createActions, createTypes} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import produce from "immer";

import {DISPLAY_PICTURES} from "../constants";

/* ------------- Types and Action Creators ------------- */

const {Creators} = createActions({
    setDisplayPicture: ['picture'],
    setDisplayName: ['name']
});

export const UserTypes = createTypes(`
  SET_DISPLAY_PICTURE
  SET_DISPLAY_NAME
`, {});

export default Creators;

const Types = UserTypes;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    displayPicture: 1,
    displayName: '',
    votesLeft: 5
});

/* ------------- Reducers ------------- */


export const setDisplayPicture = (state, action) =>
    produce(state, draft => {
        draft.displayPicture = action.picture;
    });

export const setDisplayName = (state, action) =>
    produce(state, draft => {
        draft.displayName = action.displayName;
    });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_DISPLAY_PICTURE]: setDisplayPicture,
    [Types.SET_DISPLAY_NAME]: setDisplayName
});


/* ------------- Selectors ------------- */
export const getDisplayPicture = (userState) => userState.user.displayPicture;
export const getDisplayName = (userState) => userState.user.displayName;
export const getVotesLeft = (userState) => userState.user.votesLeft;