import { memo, useState, useEffect, Children } from 'react';

import style from './layout.module.scss';
import LyAside from './layout/aside';
import LyFooter from './layout/footer';
import LyHeader from './layout/header';
import LyMain from './layout/main';
import LyTypeList from './layout/typelist';

const Layout = ({ children }) => {
  // 生命周期
  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <LyHeader />
        <LyTypeList />
        <div className={style['main-wrapper']}>
          <div className={style['left']}>
            <LyMain view={children} />
          </div>
          <div className={style['right']}>
            <LyAside />
          </div>
        </div>
        <LyFooter />
      </div>
    </div>
  );
};

export default memo(Layout);
