import { memo, useState, useEffect } from 'react';

import store from '@/stores';

import style from './style.module.scss';
const LayoutTypeList = () => {
  // 生命周期
  useEffect(() => {
    console.log(store.getState().type, '000');
  }, []);

  return (
    <div className={style['fix-type-wrapper']}>
      <ul className={style['type-wrapper']}>
        <li>全部</li>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <li key={index} className={style['item']}>
              <span>type</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(LayoutTypeList);
