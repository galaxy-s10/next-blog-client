import { useRouter } from 'next/router';

import { H5_APP_KEY, H5_APP_SERVICE_ID } from '@/constant';
import { getData } from '@/services/index';
import { decrypt, encrypt } from '@/utils/crypto';

import * as actionTypes from './constants';

export const getJsonDataAction = (gaid, channel) => {
  return async (dispatch, getState) => {
    const isTest = getState().app.get('isTest');
    console.log(isTest, '22222isTestisTest');
    const params = {
      rnsqo: H5_APP_SERVICE_ID, // 业务id
      xnfvs: isTest ? 999 : 1, // 入口来源，测试环境999，正式环境1
      mevkoda: 'android', // 平台(写死)
      ydf: navigator.language, // 语言代码（写死）
      bpex: navigator.userAgent, // ua
      ubfwbd: gaid || '1', // TODOgaid/idfa(url拿)
      whbzcfl: H5_APP_KEY, // TODOappkey（动态，看文档）
      naqdu: channel || '1', // TODO渠道（url拿）
      tksh: 3, // TODOSDK版本名
      zocdn: '3', // TODOSDK版本名String
      xef: 'com.h5.nnm', // 客户端包名(写死)
      uixyy: 1, // 客户端版本名Int（写死）
      powbhc: '1', // 客户端版本名String（写死）
      addTimeslist: [],
    };
    const data: any = await getData(encrypt(JSON.stringify(params)));
    const allData = decrypt(data);
    const kkhiuuc = JSON.parse(allData).nwdxen.kkhiuuc;

    // 如果是其他国家，kkhiuuc[0]会拿不到数据。
    if (kkhiuuc[0]) {
      const plan_id = JSON.parse(allData).nwdxen.dlbec;
      const originData = JSON.parse(JSON.parse(allData).nwdxen.kkhiuuc[0].c);
      if (isTest) {
        console.log('请求参数:', params, '服务器下发数据:', originData);
      }
      dispatch(changePlanIdAction(plan_id));
      dispatch(changeIsGlobalLoadingAction(false));
      dispatch(changeJsonDataAction(originData));
    } else {
      dispatch(changeIsLegalUserAction(false));
    }
  };
};

export const changeIsTestAction = (data) => ({
  type: actionTypes.CHANGE_IS_TEST,
  data,
});

export const changeJsonDataAction = (data) => ({
  type: actionTypes.CHANGE_JSON_DATA,
  data,
});

export const changeIsLegalUserAction = (data) => ({
  type: actionTypes.CHANGE_IS_LEGAL_USER,
  data,
});

export const changePlanIdAction = (data) => ({
  type: actionTypes.CHANGE_PLAN_ID,
  data,
});

export const changeIsGlobalLoadingAction = (data) => ({
  type: actionTypes.CHANGE_IS_GLOBAL_LOADING,
  data,
});
