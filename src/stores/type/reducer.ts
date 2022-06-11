import { changeTypeList } from './constants';

const defaultState = {
  typeList: null,
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case changeTypeList:
      let res = { ...state, typeList: action.TypeList };
      console.log(res, state, 33333);
      return { ...state, typeList: action.typeList };
    default:
      return state;
  }
}

export default reducer;
