import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import Reducer from './reducer';

const store = configureStore({
  reducer: Reducer,
  devTools: true,
});

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
