import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';
dayjs.extend(duration);

const LayoutFooter = () => {
  // 生命周期
  useEffect(() => {}, []);

  return (
    <div>
      <div className={style['footer']}>
        <p>
          博客已运行xxx
          <span className={style['ani']}>(=◡=)☆</span>
        </p>
        <a
          href="http://beian.miit.gov.cn"
          target="__blank"
          className={style['beianhao']}
        >
          粤ICP备19114467号-2
        </a>
      </div>
    </div>
  );
};

export default memo(LayoutFooter);
