/**
 * LoginPage Saga
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as appConstants from '../App/constants';

/**
 * Login User Action handler
 */
export function* loginUser(action) {
  switch (action.provider) {
    case 'github':
      return (window.location.href = '/passport/github');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* primary() {
  // Watches for appConstants.USER_STATE_LOGGING_IN actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(appConstants.USER_STATE_LOGGING_IN, loginUser);
}
