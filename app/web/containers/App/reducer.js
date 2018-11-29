/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import * as constants from './constants';

// The initial state of the App
export const initialState = fromJS({
  currentUser: {
    state: '',
    error: false,
    provider: '',
    info: {},
  },
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_STATE_LOGGING_IN:
      return state.setIn(['currentUser', 'state'], action.type).setIn(['currentUser', 'provider'], action.provider);
    default:
      return state;
  }
};

export default appReducer;
