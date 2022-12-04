import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

export async function getStaticProps(context) {
  return {
    props: {
      a: new Date().toLocaleString(),
    }, // will be passed to the page component as props
  };
}

const ChatPage = (props) => {
  // 生命周期
  useEffect(() => {}, []);

  return <div className={style['chat-wrap']}>ChatPage{props.a}</div>;
};

export default memo(ChatPage);
