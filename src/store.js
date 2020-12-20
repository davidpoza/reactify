import { createStore, applyMiddleware, combineReducers } from "redux";
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

import StateLoader from './utils/state-loader';

// Reducers
import ui from './reducers/ui';
import user from './reducers/user';
import player from './reducers/player';
import albums from './reducers/albums';
import history from './reducers/history';
import downloader from './reducers/downloader';

const stateLoader = new StateLoader();

const enhancer = composeWithDevTools(
  applyMiddleware(promise, thunk)
);

const store = createStore(
  combineReducers({ ui, user, player, albums, history, downloader }),
  stateLoader.loadState(),
  enhancer
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

export default store;