import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';
const MsgPage = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div className={style.a}>MsgPage</div>;
};

export default memo(MsgPage);
