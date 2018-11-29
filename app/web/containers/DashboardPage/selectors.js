/**
 * DashboardPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDashboardPage = state => state.get('dashboardPage', initialState);

const makeSelectDashboardState = () => createSelector(selectDashboardPage, dashboardPageState => dashboardPageState);

export { selectDashboardPage, makeSelectDashboardState };
