/*
 * AddStringFormReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_STRING,
  ADD_STRING,
  ADD_STRING_SUCCESS,
  ADD_STRING_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  string: '',
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const addStringFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_STRING:
        draft.string = action.string;
        break;

      case ADD_STRING:
        draft.loading = true;
        draft.error = false;
        break;

      case ADD_STRING_SUCCESS:
        draft.loading = false;
        draft.error = false;
        break;

      case ADD_STRING_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  });

export default addStringFormReducer;
