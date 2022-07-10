import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';

import { fetchTypeList } from '@/services/type';

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
>('type/fetchTypeList', async (param, thunkApi) => {
  try {
    const data = await fetchTypeList({});
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  list: [],
};

// 创建store
const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    changeTypeListAction: (state, { payload }) => {
      console.log('changeTypeListAction', payload);
      state.list = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchJsonData.pending, (state, action) => {
        console.log('fetchJsonData.pending', state, action);
      })
      .addCase(fetchJsonData.fulfilled, (state, { payload }) => {
        console.log('fetchJsonData.fulfilled', state, payload);
        state.list = payload; // 不能重新赋值，不是响应式
      })
      .addCase(fetchJsonData.rejected, (state, { payload }) => {
        console.log('fetchJsonData.rejected', state, payload);
      });
  },
});

// 返回actions
export const { changeTypeListAction } = typeSlice.actions;
// 返回reducer
export const { reducer } = typeSlice;
// 返回slice
export default typeSlice;
