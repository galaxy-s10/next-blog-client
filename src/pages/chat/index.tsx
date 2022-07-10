import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';

const ChatPage = () => {
  // 生命周期
  useEffect(() => {}, []);

  return <div className={style['chat-wrap']}>ChatPage</div>;
};

export default memo(ChatPage);
