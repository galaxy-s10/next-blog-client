import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import store, { wrapper } from '@/stores';
import { useAppSelector } from '@/stores/hooks';

import style from './style.module.scss';
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (result) => {
//     return { props: {} };
//   }
// );
const LayoutTypeList = (props) => {
  const typeInfo = useAppSelector((state) => {
    // console.log(state, 'useSelector');
    return state.type;
  });
  // 生命周期
  useEffect(() => {
    console.log(store.getState().type, '000');
  }, []);

  return (
    <div className={style['fix-type-wrapper']}>
      <ul className={style['type-wrapper']}>
        <li>全部</li>
        {typeInfo.list?.map((item, index) => {
          return (
            <li key={index} className={style['item']}>
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(LayoutTypeList);
