import { FETCH_STRINGS } from './constants';

/**
 * Dispatched when strings are fetched from backend
 *
 * @param  {array} strings The strings array from backend
 *
 * @return {object}       An action object with a type of FETCH_STRINGS passing the strings array
 */
export function fetchStrings(strings) {
  console.log('inside fetchStrings');
  return {
    type: FETCH_STRINGS,
    strings,
  };
}
