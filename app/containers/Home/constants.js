/*
 * Home constants - Custom actionTypes for fetching strings from backend db
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const FETCH_STRINGS = 'boilerplate/Home/FETCH_STRINGS';
export const FETCH_STRINGS_SUCCESS = 'boilerplate/Home/FETCH_STRINGS_SUCCESS';
export const FETCH_STRINGS_ERROR = 'boilerplate/Home/FETCH_STRINGS_ERROR';
