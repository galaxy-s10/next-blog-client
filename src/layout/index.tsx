import { memo, useState, useEffect, Children } from 'react';

import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';

import LyAside from './aside';
import LyFooter from './footer';
import LyHeader from './header';
import style from './layout.module.scss';
import LyMain from './main';
import LyTypeList from './typelist';

import { changeTypeListAction } from '@/stores/type/actionCreators';

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (result) => {
//     let typeList: any = null;
//     try {
//       typeList = await fetchTypeList({});
//     } catch (error) {
//       console.log(error);
//     }
//     store.dispatch(changeTypeListAction(typeList.data.rows));
//     return { props: {} };
//   }
// );

// export async function getServerSideProps(context) {
//   let typeList: any = null;
//   try {
//     typeList = await fetchTypeList({});
//   } catch (error) {
//     console.log(error);
//   }
//   console.log('>>>>>');
//   store.dispatch(changeTypeListAction(typeList.data.rows));
//   return { props: {} };
// }

const Layout = (props) => {
  const { children } = props;

  // 生命周期
  useEffect(() => {
    console.log('layout生命周期', props);
  }, []);

  return (
    <div>
      <div>
        <LyHeader />
        <LyTypeList />
        <div className={style['main-wrapper']}>
          <div className={style['left']}>
            <LyMain view={children} />
          </div>
          <div className={style['right']}>
            <LyAside />
          </div>
        </div>
        <LyFooter />
      </div>
    </div>
  );
};

export default memo(Layout);
