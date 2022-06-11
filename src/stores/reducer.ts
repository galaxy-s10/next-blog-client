import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import { reducer as appReducer } from './app';
import { reducer as articleReducer } from './article';
import { reducer as typeReducer } from './type';

const combinedReducer = combineReducers({
  app: appReducer,
  article: articleReducer,
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
    console.log('nextState', nextState);
    // return nextState;
    return combinedReducer(nextState, action);
  } else {
    console.log('combinedReducer111', state, action);
    return combinedReducer(state, action);
  }
};

export default Reducer;
