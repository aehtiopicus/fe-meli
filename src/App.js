import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './reducers';
import getRoutes from './routes';

import './app.scss';

const App = () => {
  const store = configureStore({});
  const syncHistory = syncHistoryWithStore(browserHistory, store);

  return (
    <Provider store={store}>
      <Router history={syncHistory} routes={getRoutes()} />
    </Provider>
  );
};

export default App;
