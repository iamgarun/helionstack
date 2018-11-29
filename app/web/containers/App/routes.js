import React from 'react';
import { Route } from 'react-router-dom';

import LoginPage from '../LoginPage';
import DashboardPage from '../DashboardPage';

const NotFound = () => {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            <h1>404 : Not Found</h1>
          </div>
        );
      }}
    />
  );
};

const routes = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
