import { Map } from 'immutable';

import * as actionTypes from './constants';

const defaultState = Map({
  isGlobalLoading: false, // 全局loading
  jsonData: {}, // 服务器下发的json配置
  plan_id: null, // 埋点用
  isTest:
    window.location.href.indexOf('test') !== -1 ||
    process.env.NODE_ENV === 'development', // 是否是测试或者本地开发模式
  isLegalUser: true, // 是否是合法用户（对应地区），是的话true，不是就false
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_GLOBAL_LOADING:
      return state.set('isGlobalLoading', action.data);
    case actionTypes.CHANGE_IS_LEGAL_USER:
      return state.set('isLegalUser', action.data);
    case actionTypes.CHANGE_JSON_DATA:
      return state.set('jsonData', action.data);
    case actionTypes.CHANGE_PLAN_ID:
      return state.set('plan_id', action.data);
    default:
      return state;
  }
}

export default reducer;
