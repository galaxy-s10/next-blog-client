import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import { H5_APP_KEY, H5_APP_SERVICE_ID } from '@/constant';
import { getJsonData } from '@/services';
import { decrypt, encrypt } from '@/utils/crypto';

interface IError {
  code: number;
  msg: string;
}

export const fetchJsonData = createAsyncThunk<
  // 返回值类型
  any,
  // 传参时的参数类型
  { gaid; channel },
  // ThunkAPI类型
  {
    extra: any;
    rejectWithValue: IError;
  }
>('app/fetchJsonData', async (param, thunkApi) => {
  try {
    let params = {
      rnsqo: H5_APP_SERVICE_ID, // 业务id
      xnfvs: 999, // 入口来源，测试环境999，正式环境1
      mevkoda: 'android', // 平台(写死)
      ydf: navigator.language, // 语言代码（写死）
      bpex: navigator.userAgent, // ua
      ubfwbd: param.gaid || '1', // TODOgaid/idfa(url拿)
      whbzcfl: H5_APP_KEY, // TODOappkey（动态，看文档）
      naqdu: param.channel || '1', // TODO渠道（url拿）
      tksh: 3, // TODOSDK版本名
      zocdn: '3', // TODOSDK版本名String
      xef: 'com.h5.nnm', // 客户端包名(写死)
      uixyy: 1, // 客户端版本名Int（写死）
      powbhc: '1', // 客户端版本名String（写死）
      addTimeslist: [],
    };
    const data: any = await getJsonData(encrypt(JSON.stringify(params)));
    const allData = decrypt(data);
    const kkhiuuc = JSON.parse(allData).nwdxen.kkhiuuc;
    // 如果是其他国家，会拿不到数据，直接return。
    if (kkhiuuc[0]) {
      const plan_id = JSON.parse(allData).nwdxen.dlbec;
      const originData = JSON.parse(JSON.parse(allData).nwdxen.kkhiuuc[0].c);
      console.log('请求参数:', params, '服务器下发数据:', originData);
      return originData;
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  isGlobalLoading: false, // 全局loading
  jsonData: null as any, // 服务器下发的json配置
  plan_id: null, // 埋点用
  isTest: false, // 是否是测试或者本地开发模式
  isLegalUser: true, // 是否是合法用户（对应地区），是的话true，不是就false
};

// 创建store
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeIsTestAction: (state, { payload }) => {
      console.log('changeIsTestAction', payload);
      state.isTest = payload;
    },
    changeJsonDataAction: (state, { payload }) => {
      console.log('changeJsonDataAction', payload);
      state.jsonData = payload;
    },
    changePlanIdAction: (state, { payload }) => {
      console.log('changePlanIdAction', payload);
      state.plan_id = payload;
    },
    changeIsLegalUserAction: (state, { payload }) => {
      console.log('changeIsLegalUserAction', payload);
      state.isLegalUser = payload;
    },
    changeIsGlobalLoadingAction: (state, { payload }) => {
      console.log('changeIsGlobalLoadingAction', payload);
      state.isGlobalLoading = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJsonData.pending, (state, action) => {
        console.log('fetchJsonData.pending', state, action);
      })
      .addCase(fetchJsonData.fulfilled, (state, { payload }) => {
        console.log('fetchJsonData.fulfilled', state, payload);
        state.jsonData = payload; // 不能重新赋值，不是响应式
      })
      .addCase(fetchJsonData.rejected, (state, { payload }) => {
        console.log('fetchJsonData.rejected', state, payload);
      });
  },
});

// 返回actions
export const {
  changeJsonDataAction,
  changeIsTestAction,
  changeIsGlobalLoadingAction,
  changeIsLegalUserAction,
  changePlanIdAction,
} = appSlice.actions;
// 返回reducer
export const { reducer } = appSlice;
// 返回slice
export default appSlice;
