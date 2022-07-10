import { memo, useState, useEffect, CSSProperties } from 'react';

import style from './style.module.scss';
const Loading = ({ loading = false, color = 'pink' }) => {
  // 生命周期
  useEffect(() => {}, []);

  const handleClick = (e) => {
    console.log(e, '----');
  };

  const customStyle: CSSProperties = {
    // --color: props.color,
  };

  return loading ? (
    <div className={style['loading-wrap']} onClick={() => handleClick}>
      <div className={style.loading} style={{ '--color': color }}></div>
    </div>
  ) : null;
};

export default memo(Loading);
