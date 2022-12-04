// import '@/styles/global.scss';
import '@/styles/normalize.css';

import Layout from '@/layout';
// import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';
import { useAppSelector } from '@/stores/hooks';
import { fetchJsonData, changeTypeListAction } from '@/stores/type';

// import { changeTypeListAction } from '@/stores/type/actionCreators';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const typeStore = useAppSelector((state) => state.type);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// https://nextjs.org/docs/advanced-features/custom-app
export async function getServerSideProps() {
  console.log(
    'App目前不支持 Next.js数据获取方法，如getStaticProps或getServerSideProps。'
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (ctx) => {
  const typelist = store.getState().type;
  if (typelist.list.length) return;
  console.log('MyApp.getInitialProps', store.getState().type);
  let typeList: any = null;
  try {
    // typeList = await fetchTypeList({});
    const data = await store.dispatch(fetchJsonData({}));
    typeList = data.payload.data;
    // console.log(data.payload.data, '222221');
  } catch (error) {
    console.log(error);
  }
  return { pageProps: { typeList: typeList } };
});

// export default MyApp;
export default wrapper.withRedux(MyApp);
