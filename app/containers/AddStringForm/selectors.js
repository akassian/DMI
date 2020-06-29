/**
 * AddStringForm selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectString = state => state.addStringForm || initialState;

const makeSelectString = () =>
  createSelector(
    selectString,
    stringState => stringState.string,
  );

const makeSelectLoading = () =>
  createSelector(
    selectString,
    stringState => stringState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectString,
    stringState => stringState.error,
  );

export { selectString, makeSelectString, makeSelectLoading, makeSelectError };
