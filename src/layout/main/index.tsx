import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import style from './style.module.scss';

const LayoutMain = (props: any) => {
  const router = useRouter();
  // 生命周期
  useEffect(() => {}, []);

  return (
    <div className={router.pathname !== '/' ? style.index : ''}>
      {props.view}
    </div>
  );
};

export default memo(LayoutMain);
