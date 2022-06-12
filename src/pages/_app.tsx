import '@/styles/globals.scss';
import '@/styles/normalize.css';

import Layout from '@/layout';
import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';
import { useAppSelector } from '@/stores/hooks';
import { changeTypeListAction } from '@/stores/type/actionCreators';

import type { AppProps } from 'next/app';

console.log('pages/_app.tsx', store.getState().app);

function MyApp({ Component, pageProps }: AppProps) {
  const typeInfo = useAppSelector((state) => {
    return state.type;
  });
  console.log('pagePropspageProps22', typeInfo, pageProps);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (ctx) => {
  let typeList: any = null;
  try {
    typeList = await fetchTypeList({});
  } catch (error) {
    console.log(error);
  }
  console.log('llllllllllllll', typeList.data.rows.length);
  store.dispatch(changeTypeListAction(typeList.data.rows));
  return { pageProps: { typeList: typeList.data.rows } };
});
// export default MyApp;
export default wrapper.withRedux(MyApp);
