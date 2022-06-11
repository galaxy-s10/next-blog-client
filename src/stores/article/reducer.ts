import { changeCurrentSong } from './constants';

const defaultState = {};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case changeCurrentSong:
      return {};
    default:
      return state;
  }
}

export default reducer;
