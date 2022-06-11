import '@/styles/globals.scss';

import { Provider, useDispatch } from 'react-redux';

import Layout from '@/layout';
import { fetchTypeList } from '@/services/type';
import store, { wrapper } from '@/stores';
import { changeTypeListAction } from '@/stores/type/actionCreators';

import type { AppProps } from 'next/app';

// console.log('pages/_app.tsx', store.getState().app);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
