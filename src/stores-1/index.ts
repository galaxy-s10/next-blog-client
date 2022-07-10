import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import Reducer from './reducer';

export const store = configureStore({
  reducer: Reducer,
});

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
