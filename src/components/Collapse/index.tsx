import { memo, useState, useEffect, ReactElement } from 'react';

import style from './style.module.scss';

const CollapseCpt = (props: {
  isOpen: any;
  ico: ReactElement;
  title: string;
  children: ReactElement;
}) => {
  const [open, setOpen] = useState(props.isOpen);
  // 生命周期
  useEffect(() => {
    // console.log(props, 'CollapseCptCollapseCpt');
  }, []);

  return (
    <div>
      <div className={style['collapse-wrap']}>
        <div className={style['header']}>
          <div className={style['title']}>
            <span>{props.ico}</span>
            <b>{props.title}</b>
          </div>
          <div className={style['ico-wrap']} onClick={() => setOpen(!open)}>
            <span>》</span>
          </div>
        </div>
        <div className={style['content']}>
          {open && <div>{props.children}</div>}
        </div>
      </div>
    </div>
  );
};

export default memo(CollapseCpt);
