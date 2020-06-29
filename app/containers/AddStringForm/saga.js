/**
 * POSTs the string from the form to the backend db
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { ADD_STRING } from './constants';
import { stringAdded, stringAddError } from './actions';
import { makeSelectString } from './selectors';

/**
 * Backend request / response handler to POST string to backend db array
 */
export function* addString() {
  const requestURL = `http://localhost:3000/api/strings`;

  try {
    const string = yield select(makeSelectString());
    const body = JSON.stringify({ string });

    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    /* Dispatch to signal that string was added successfully */
    yield put(stringAdded());
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
