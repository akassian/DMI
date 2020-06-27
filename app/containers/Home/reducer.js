/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  FETCH_STRINGS,
  FETCH_STRINGS_SUCCESS,
  FETCH_STRINGS_ERROR,
} from './constants';

// The initial state of the strings
export const initialState = {
  loading: false,
  error: false,
  strings: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_STRINGS:
        draft.loading = true;
        draft.error = false;
        draft.strings = false;
        break;

      case FETCH_STRINGS_SUCCESS:
        draft.loading = false;
        draft.strings = action.strings;
        break;

      case FETCH_STRINGS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
