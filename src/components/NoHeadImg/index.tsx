import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

const NoHeadImg = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div className={style['no-head-img']}>此处无图胜有图</div>;
};

export default memo(NoHeadImg);
