/*
 * AddStringFormConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_STRING = 'boilerplate/AddStringForm/CHANGE_STRING';
export const ADD_STRING = 'boilerplate/AddStringForm/ADD_STRING';
export const ADD_STRING_ERROR = 'boilerplate/AddStringForm/ADD_STRING_ERROR';
