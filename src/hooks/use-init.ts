import { useRoute } from 'vue-router';

import { H5_APP_KEY, H5_APP_SERVICE_ID } from '@/constant';
import { decrypt, encrypt } from '@/utils/crypto';

import { getData } from '@/server';
import { useAppStore } from '@/store/app';

export const useGetJson = async () => {
  try {
    const route = useRoute();
    const {
      isTest,
      setIsLegalUser,
      setIsGlobalLoading,
      setJsonData,
      setPlanId,
    } = useAppStore();
    const { gaid, channel } = route.query;
    const params = {
      rnsqo: H5_APP_SERVICE_ID, // 业务id
      xnfvs: isTest ? 999 : 1, // 入口来源，测试环境999，正式环境1
      mevkoda: 'android', // 平台(写死)
      ydf: navigator.language, // 语言代码（写死）
      bpex: navigator.userAgent, // ua
      ubfwbd: gaid || '1', // TODOgaid/idfa(url拿)
      whbzcfl: H5_APP_KEY, // TODOappkey（动态，看文档）
      naqdu: channel || '1', // TODO渠道（url拿）
      tksh: 3, // TODOSDK版本名
      zocdn: '3', // TODOSDK版本名String
      xef: 'com.h5.nnm', // 客户端包名(写死)
      uixyy: 1, // 客户端版本名Int（写死）
      powbhc: '1', // 客户端版本名String（写死）
      addTimeslist: [],
    };
    setIsGlobalLoading(true);
    const data: any = await getData(encrypt(JSON.stringify(params)));
    const allData = decrypt(data);
    const kkhiuuc = JSON.parse(allData).nwdxen.kkhiuuc;

    // 如果是其他国家，kkhiuuc[0]会拿不到数据。
    if (kkhiuuc[0]) {
      const plan_id = JSON.parse(allData).nwdxen.dlbec;
      const originData = JSON.parse(JSON.parse(allData).nwdxen.kkhiuuc[0].c);
      if (isTest) {
        console.log('请求参数:', params, '服务器下发数据:', originData);
      }
      setPlanId(plan_id);
      setIsGlobalLoading(false);
      setJsonData(originData);
    } else {
      setIsLegalUser(false);
    }
  } catch (error) {
    console.error('获取配置错误', error);
  }
};
