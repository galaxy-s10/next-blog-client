import '@/styles/globals.scss';
import '@/styles/normalize.css';

import store, { wrapper } from '@/stores';
import { useAppSelector } from '@/stores/hooks';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
// export default wrapper.withRedux(MyApp);
