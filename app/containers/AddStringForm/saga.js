/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_STRING } from './constants';
import { stringAddError } from './actions';
import { makeSelectString } from './selectors';

/**
 * Backend request/response handler to get strings array
 */
export function* addString() {
  const requestURL = `http://localhost:3000/api/strings`;

  try {
    const string = yield select(makeSelectString());
    const body = JSON.stringify({ string });
    console.log('body', body);
    // Call our request helper (see 'utils/request')
    let res = yield call(request, requestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    console.log('res', res);
    // console.log('Strings in saga.js of home', strings);
    // yield put(stringAdded(strings));
  } catch (err) {
    yield put(stringAddError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* stringsData() {
  // Watches for ADD_STRING actions and calls addString when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADD_STRING, addString);
}
