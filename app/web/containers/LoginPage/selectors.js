/**
 * Login Page selectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginPage = state => state.get('loginPage', initialState);

export { selectLoginPage };
