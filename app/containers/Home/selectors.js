/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectStrings = () =>
  createSelector(
    selectHome,
    homeState => homeState.strings,
  );

export { selectHome, makeSelectStrings };
