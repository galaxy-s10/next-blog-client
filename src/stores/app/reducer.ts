import { changeCurrentSong } from './constants';

const defaultState = {
  version: '1.0.0',
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case changeCurrentSong:
      return {};
    default:
      return state;
  }
}

export default reducer;
