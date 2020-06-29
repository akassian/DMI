import {
  FETCH_STRINGS,
  FETCH_STRINGS_SUCCESS,
  FETCH_STRINGS_ERROR,
} from './constants';

/**
 * Load the strings, THIS ACTION STARTS THE REQUEST SAGA
 *
 * @return {object} An action object with a type of FETCH_STRINGS
 */
export function fetchStrings() {
  return {
    type: FETCH_STRINGS,
  };
}

/**
 * Dispatched when strings are fetched from backend - DISPATCHED BY SAGA
 *
 * @param  {array} strings The strings array from backend
 *
 * @return {object}        An action object with a type of FETCH_STRINGS passing the strings array
 */
export function stringsFetched(strings) {
  return {
    type: FETCH_STRINGS_SUCCESS,
    strings,
  };
}

/**
 * Dispatched when fetching strings from backend fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of FETCH_STRINGS_ERROR, passing the error
 */
export function stringsFetchError(error) {
  return {
    type: FETCH_STRINGS_ERROR,
    error,
  };
}
