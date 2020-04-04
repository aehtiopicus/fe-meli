import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { currency } from './currency';

const loadDefaultReducers = () => combineReducers({
  routing: routerReducer,
  currency
});

const configureStore = ({
  reducer = loadDefaultReducers(),
  initialState = {},
  middleware = [
    thunk,
    createLogger({ collapsed: true }),
    routerMiddleware(browserHistory)
  ]
}) => (
  createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        ...middleware,
      )
    )
  )
);

export default configureStore;
