import { useRouter } from 'next/router';
import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

const LayoutMain = (props: any) => {
  const router = useRouter();
  // 生命周期
  useEffect(() => {
    console.log('LayoutMain', router.pathname);
  }, []);

  return (
    <div className={router.pathname === '/' ? style.padding : ''}>
      {props.view}
    </div>
  );
};

export default memo(LayoutMain);
