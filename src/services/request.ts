import axios from 'axios';

import { H5_APP_STRATEGY_URL } from '@/constant';

const config = {
  baseURL: H5_APP_STRATEGY_URL,
  timeout: 5000,
};

const service: any = axios.create(config);

// 请求拦截
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  // eslint-disable-next-line consistent-return
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
