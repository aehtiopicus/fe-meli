import React from 'react';
import {
  Route,
  browserHistory,
  createMemoryHistory,
  IndexRoute
} from 'react-router';
import isEmpty from 'lodash/isEmpty';

import Layout from '../components/layout/Layout';
import ItemsPage from '../containers/connectItemsPage';
import ItemPage from '../containers/connectItemPage';

import { BASE_URL, ITEM_PATH } from './constants';

export const getHistory = () => (
  isEmpty(browserHistory) ? createMemoryHistory() : browserHistory
);

const getRoutes = () => {
  const goToBaseUrl = (nextRouterState, replace) => {
    replace(BASE_URL);
  };

  return (
    <Route path={BASE_URL} component={Layout}>
      <Route path={ITEM_PATH}>
        <IndexRoute component={ItemsPage} />
        <Route path=":id" component={ItemPage} />
      </Route>
      <Route path="*" onEnter={goToBaseUrl} />
    </Route>
  );
};

export default getRoutes;
