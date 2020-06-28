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

export { selectString, makeSelectString };
