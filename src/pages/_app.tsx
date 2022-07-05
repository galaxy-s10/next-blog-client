import { Provider } from 'react-redux';

import store, { wrapper } from '@/stores';

import type { AppProps } from 'next/app';
import '@/styles/normalize.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default wrapper.withRedux(MyApp);
