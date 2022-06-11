import { type } from 'os';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';
import { changeTypeListAction } from '@/stores/type/actionCreators';

import type { NextPage } from 'next';

console.log('pages/index.tsx');

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (result) => {
    let typeList: any = null;
    try {
      typeList = await fetchTypeList({});
    } catch (error) {
      console.log(error);
    }
    store.dispatch(changeTypeListAction(typeList.data.rows));
    return { props: {} };
  }
);

// 这个页面访问不到window
// export async function getServerSideProps(context) {
//   console.log('===getServerSideProps===');
//   let typeList = null;
//   try {
//     typeList = await fetchTypeList({});
//     console.log(store.dispatch(changeTypeListAction(typeList)));

//     console.log(typeList);
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: { typeList }, // will be passed to the page component as props
//   };
// }

const Index: NextPage = (props) => {
  // setTimeout(async () => {
  //   try {
  //     let typeList = await fetchTypeList({});
  //     console.log(typeList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, 1000);

  console.log('Index重新渲染');
  // const dispatch = useDispatch();
  useEffect(() => {
    console.log('pages/index.tsx生命周琦', store.getState().app);
  }, []);
  // console.log(props, '9999');
  return <div>123</div>;
};
export default Index;
