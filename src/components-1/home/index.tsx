import { useRouter } from 'next/router';
import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';
const HomePage = () => {
  const { query, isReady } = useRouter();

  useEffect(() => {}, []);

  return (
    <div className={style['home-wrap']}>
      <div className={style.bg1}>
        <div className={style.banner}></div>
      </div>
      <div className={style.bg2}>
        <div className={style.rivers}></div>
        <div className={style.trunk}>
          <div className={style.fire}>
            <div ref1="bombWrapRef" className={style['bomb-wrap']}>
              <div ref1="bombRef" className={style.bomb}>
                <i ref1="iRef"></i>
              </div>
            </div>
            <div ref1="fireTxtRef" className={style['fire-ico']}></div>
          </div>
        </div>
      </div>
      <div className={style.grass}></div>

      <div className={style.pool}></div>
    </div>
  );
};

export default memo(HomePage);
