import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import { reducer as appReducer } from './app';
import { reducer as typeReducer } from './type';

const combinedReducer = combineReducers({
  app: appReducer,
  type: typeReducer,
});

// https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/store/store.js
const Reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    // return nextState;
    return combinedReducer(nextState, action);
  } else {
    return combinedReducer(state, action);
  }
};

export default Reducer;
