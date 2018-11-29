/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

import * as constants from './constants';

const selectGlobal = state => state.get('global');

const makeSelectCurrentUser = () => createSelector(selectGlobal, globalState => globalState.get('currentUser'));
const makeSelectLoginProcessActive = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(['currentUser', 'state']) === constants.USER_STATE_LOGGING_IN,
  );

export { selectGlobal, makeSelectCurrentUser, makeSelectLoginProcessActive };
