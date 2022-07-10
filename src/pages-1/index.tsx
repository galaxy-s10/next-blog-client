import { useRouter } from 'next/router';
import { useEffect, memo } from 'react';

import style from './style.module.scss';

import HomePage from '@/components/home';
import LoadingCpt from '@/components/Loading';
import ShowVersionCpt from '@/components/ShowVersion';
import { wrapper } from '@/stores';
import {
  changeJsonDataAction,
  changeIsTestAction,
  changeIsGlobalLoadingAction,
  fetchJsonData,
} from '@/stores/app';
// import {
//   changeIsTestAction,
//   getJsonDataAction,
// } from '@/stores/app/actionCreators';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

const Index = (props) => {
  console.log('Index重新渲染', props);
  const dispatch = useAppDispatch();
  // 使用useRouter会触发两次组件渲染（不可避免），可判断isReady
  const { query, isReady } = useRouter();
  const appStore = useAppSelector((state) => state.app);
  // const { isTest, isLegalUser } = useAppSelector((state) => ({
  //   isTest: state.get('isTest'),
  //   isLegalUser: state.get('isLegalUser'),
  // }));
  // console.log('isTest, isLegalUser ', isTest, isLegalUser);
  useEffect(() => {
    console.log('pages-index生命周期');
    dispatch(
      changeIsTestAction(
        window.location.href.indexOf('test') !== -1 ||
          process.env.NODE_ENV === 'development'
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (!isReady) {
      console.log('没准备');
      return;
    } else {
      console.log('准备好了');
    }

    const { gaid, channel } = query;
    dispatch(changeIsGlobalLoadingAction(true));
    dispatch(fetchJsonData({ gaid, channel })).then((res) => {
      console.log(res, 333333);
    });
  }, [dispatch, isReady, query]);

  return (
    <div className={style['index-wrap']}>
      <LoadingCpt loading={appStore.isGlobalLoading} color="red"></LoadingCpt>
      {/* <ShowVersionCpt></ShowVersionCpt> */}
      <HomePage></HomePage>
    </div>
  );
};

export default memo(Index);
