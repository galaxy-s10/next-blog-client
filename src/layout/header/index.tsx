import Link from 'next/link';
import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

const LayoutHeader = () => {
  const navList = [
    {
      title: '首页',
      path: '/',
    },
    {
      title: '归档',
      path: '/history',
    },
    {
      title: '标签',
      path: '/tag/1',
    },
    {
      title: '作品',
      path: '/works',
    },
    {
      title: '友链',
      path: '/link',
    },
    {
      title: '留言',
      path: '/msg',
    },
    {
      title: '聊天',
      path: '/chat',
    },
    {
      title: '关于',
      path: '/about',
    },
  ];
  // 生命周期
  useEffect(() => {}, []);

  return (
    <>
      <div className={style['fix-header-wrapper']}>
        <div className={style['header-wrapper']}>
          <div className={style['logo']}>
            Natural
            <sup>Blog</sup>
          </div>
          <div className={style['nav']}>
            <ul className={style['nav-menu']}>
              {navList.map((item, index) => {
                return (
                  <li key={index} className={style['item']}>
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
            <div className={style['nav-menu-mini']}>
              <div className={style['el-dropdown-link']}>
                <i className={style['el-icon-arrow-down el-icon--right']}></i>
              </div>
            </div>
          </div>
          <div className={style['search']}>searchCpt</div>
          <div>loginCpt</div>
        </div>
      </div>
    </>
  );
};

export default memo(LayoutHeader);
