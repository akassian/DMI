/*
 * AddStringForm Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { ADD_STRING, ADD_STRING_ERROR, CHANGE_STRING } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} string The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_STRING
 */
export function changeString(string) {
  return {
    type: CHANGE_STRING,
    string,
  };
}

/**
 * Add the string, this action starts the request saga
 *
 * @return {object} An action object with a type of ADD_STRING
 */
export function addString() {
  console.log('inside addString');
  return {
    type: ADD_STRING,
  };
}

/**
 * Dispatched when strings are added to backend
 *
 * @param  {array} strings The strings array from backend
 *
 * @return {object}       An action object with a type of FETCH_STRINGS passing the strings array
 */
// export function stringsFetched(strings) {
//   console.log('inside stringsFetched');
//   return {
//     type: FETCH_STRINGS_SUCCESS,
//     strings,
//   };
// }

/**
 * Dispatched when adding string to backend fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADD_STRING_ERROR passing the error
 */
export function stringAddError(error) {
  return {
    type: ADD_STRING_ERROR,
    error,
  };
}
