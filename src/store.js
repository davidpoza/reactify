import { createStore, applyMiddleware, combineReducers } from "redux";
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import user from './reducers/user';

export default createStore(
  combineReducers({ user }),
  composeWithDevTools(applyMiddleware(promise))
);