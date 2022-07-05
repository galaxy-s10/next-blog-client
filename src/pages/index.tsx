import { useRouter } from 'next/router';
import { useEffect, memo } from 'react';

import HomePage from '@/components/home';
import store, { wrapper } from '@/stores';
import {
  changeIsTestAction,
  getJsonDataAction,
} from '@/stores/app/actionCreators';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

import style from './style.module.scss';

const Index = (props) => {
  console.log('Index重新渲染', props);
  const dispatch = useAppDispatch();
  // 使用useRouter会触发两次组件渲染（不可避免），可判断isReady
  const { query, isReady } = useRouter();
  const { isTest, isLegalUser } = useAppSelector((state) => ({
    isTest: state.app.get('isTest'),
    isLegalUser: state.app.get('isLegalUser'),
  }));
  console.log('isTest, isLegalUser ', isTest, isLegalUser);
  useEffect(() => {
    console.log('pages-index生命周期');
    dispatch(
      changeIsTestAction(
        window.location.href.indexOf('test') !== -1 ||
          process.env.NODE_ENV === 'development'
      )
    );
  }, []);
  useEffect(() => {
    if (!isReady) {
      console.log('没准备');
      return;
    } else {
      console.log('准备好了');
    }

    const { gaid, channel } = query;
    dispatch(getJsonDataAction(gaid, channel));
  }, [isReady]);

  return (
    <div className={style['index-wrap']}>
      <HomePage></HomePage>
    </div>
  );
};

export default memo(Index);
