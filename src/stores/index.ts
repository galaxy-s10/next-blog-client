import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';

import { isBrowser } from '@/utils';

import Reducer from './reducer';

let composeEnhancers = compose;

if (isBrowser()) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)));
// const store = configureStore({ reducer: Reducer });

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
