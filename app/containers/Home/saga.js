/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FETCH_STRINGS } from './constants';
import { stringsFetched, stringsFetchError } from './actions';

/**
 * Backend request/response handler to get strings array
 */
export function* getStrings() {
  const requestURL = `http://localhost:3000/api/strings`;

  try {
    // Call our request helper (see 'utils/request')
    const { strings } = yield call(request, requestURL);
    console.log('Strings in saga.js of home', strings);
    yield put(stringsFetched(strings));
  } catch (err) {
    yield put(stringsFetchError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* stringsData() {
  // Watches for FETCH_STRINGS actions and calls getStrings when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_STRINGS, getStrings);
}
