import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import { reducer as appReducer } from './app';
import { reducer as articleReducer } from './article';
import { reducer as typeReducer } from './type';

const Reducer = combineReducers({
  app: appReducer,
  article: articleReducer,
  type: typeReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    // if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return Reducer(state, action);
  }
};

export default Reducer;
