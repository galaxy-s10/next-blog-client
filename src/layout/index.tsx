import { memo, useState, useEffect, Children } from 'react';

import { getServerSideProps } from '@/pages/index';

import LyAside from './aside';
import LyFooter from './footer';
import LyHeader from './header';
import style from './layout.module.scss';
import LyMain from './main';
import LyTypeList from './typelist';
const Layout = ({ children }) => {
  // 生命周期
  useEffect(() => {
    console.log('layout生命周期');
  }, []);

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
