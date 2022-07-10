import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';

import { store, wrapper } from '@/stores';

import '@/styles/normalize.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
