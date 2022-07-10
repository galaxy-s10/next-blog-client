import { NextPage } from 'next';
import { memo, useState, useEffect } from 'react';

import store, { wrapper } from '@/stores';

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => (ctx) => {
//     console.log('+++++++++', ctx);
//     store.dispatch({ type: 'TICK', payload: 'was set in other page' });
//     return { props: {} };
//   }
// );

const AboutPage: NextPage = () => {
  // 生命周期
  useEffect(() => {
    console.log('anout生命', store.getState().type.typeList);
  }, []);

  return <div>AboutPage</div>;
};

export default memo(AboutPage);
