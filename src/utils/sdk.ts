import dayjs from 'dayjs';
import md5 from 'js-md5';

import { BAT_ID } from '@/constant';
import {
  CRYPTO_STATISTICS_AESKEY,
  CRYPTO_STATISTICS_IV,
  H5_APP_KEY,
} from '@/constant';

import { buriedPost } from '@/server';
import { encrypt, GetQuery } from '@/util/index';
import { getLocal, setLocal } from '@/util/storage';

/**
 * 判断设备
 */
export const os = () => {
  const ua = navigator.userAgent;
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua);
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc = ua !== ' ' && !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
    isChrome,
  };
};

/**
 * 埋点
 * @param {String} event_name 事件名
 * @param {Object} event_info 参数
 */
export const buried = async function (event_name, event_info) {
  // console.log('埋点名称:', event_name, '埋点参数:', event_info);

  try {
    const { gaid, channel } = GetQuery();
    const { isTablet, isAndroid, isPhone } = os();
    const isTest =
      window.location.href.indexOf('test') !== -1 ||
      process.env.NODE_ENV === 'development';
    if (isTest) {
      console.log('测试环境，只打印埋点信息，不上报！', event_name, event_info);
      return;
    }
    // 判断缓存有没有bat_id
    let bat_id = getLocal(BAT_ID);
    if (!bat_id) {
      setLocal(
        BAT_ID,
        md5(navigator.userAgent + '#' + new Date().getTime() * Math.random())
      );
    }
    const params = {
      log_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      create_date: dayjs().format('YYYY-MM-DD'),
      sdk_version_code: process.env.WINIT_APP_VERSION.split('.')[0],
      sdk_version_name: process.env.WINIT_APP_VERSION,
      product_version_code: null,
      product_version_name: null,
      service_version: 1,
      data_version: 1,
      google_id: gaid, // 地址栏的gaid是google_id
      bat_id: getLocal(BAT_ID),
      appkey: H5_APP_KEY, // TODOappkey（动态，看文档）
      language: navigator.language,
      brand: null,
      model: null,
      model_type: isTablet ? 2 : 1,
      network_type: null,
      resolution: null,
      operator: null,
      platform: isAndroid ? 1 : isPhone ? 2 : 3,
      os_version_code: null,
      os_version_name: null,
      request_id: md5(
        navigator.userAgent + '#' + new Date().getTime() * Math.random()
      ),
      agency: navigator.userAgent,
      sdk_name: 'h5-gameh5-interacmobi', // 项目名（不太重要）
      event_name: event_name, // 事件名
      event_info: event_info
        ? JSON.stringify({ channel, ...event_info })
        : JSON.stringify({ channel }), // 事件参数
    };
    let logData = '';
    for (let key in params) {
      if (key !== 'event_info') {
        logData += params[key] + '\u0001';
      } else {
        logData += params[key];
      }
    }
    const data = {
      dbName: 'ods_common_nm',
      tblName: 'ods_common_user_base_info_nm',
      tblVersion: '6',
      logData,
    };
    await buriedPost(
      encrypt(
        JSON.stringify(data),
        CRYPTO_STATISTICS_AESKEY,
        CRYPTO_STATISTICS_IV
      ) // 看文档
    );
    // console.log(event_name + '埋点上报成功buriedPost');
  } catch (error) {
    console.log('埋点报错', error);
  }
};
