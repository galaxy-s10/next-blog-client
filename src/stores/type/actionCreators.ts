import { changeTypeList } from './constants';

export const changeTypeListAction = (typeList) => ({
  type: changeTypeList,
  typeList,
});
