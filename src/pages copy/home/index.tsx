import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';
const HomePage = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div className={style.a}>HomePage</div>;
};

export default memo(HomePage);
