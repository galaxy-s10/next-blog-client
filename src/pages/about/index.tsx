import { NextPage } from 'next';
import { memo, useState, useEffect } from 'react';

import { wrapper } from '@/stores';
import store from '@/stores';
const About: NextPage = () => {
  // 生命周期
  useEffect(() => {
    console.log('anout生命', store.getState().type.typeList);
  }, []);

  return <div>About</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => (result) => {
    console.log('+++++++++', result);
    store.dispatch({ type: 'TICK', payload: 'was set in other page' });
  }
);
export default memo(About);
