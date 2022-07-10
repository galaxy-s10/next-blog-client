// import '@/styles/global.scss';
import '@/styles/normalize.css';

import Layout from '@/layout';
// import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';
import { useAppSelector } from '@/stores/hooks';
import { fetchJsonData, changeTypeListAction } from '@/stores/type';
// import { changeTypeListAction } from '@/stores/type/actionCreators';

import type { AppProps } from 'next/app';

console.log('pages/_app.tsx', store.getState().app);

function MyApp({ Component, pageProps }: AppProps) {
  const typeInfo = useAppSelector((state) => {
    return state.type;
  });
  // console.log('pagePropspageProps22', typeInfo, pageProps);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (ctx) => {
  let typeList: any = null;
  try {
    // typeList = await fetchTypeList({});
    const data = await store.dispatch(fetchJsonData({}));
    typeList = data.payload.data;
    // console.log(data.payload.data, '222221');
  } catch (error) {
    console.log(error);
  }
  console.log('llllllllllllll', typeList);
  // store.dispatch(changeTypeListAction(typeList.rows));
  return { pageProps: { typeList: typeList.rows } };
});
// export default MyApp;
export default wrapper.withRedux(MyApp);
