import { H5_APP_STATISTICS_URL, H5_APP_STRATEGY_URL } from '@/constant';

import request from './request';

export const getJsonData = (data) => {
  return request({
    method: 'post',
    url: H5_APP_STRATEGY_URL,
    data,
  });
};

export const buriedPost = (data) => {
  return request({
    method: 'post',
    url: H5_APP_STATISTICS_URL,
    data,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
};
