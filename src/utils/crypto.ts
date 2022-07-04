import CryptoJS from 'crypto-js';

import { CRYPTO_STRATEGY_AESKEY, CRYPTO_STRATEGY_IV } from '@/constant';

// AES加密
export const encrypt = (
  message,
  aesKey = CRYPTO_STRATEGY_AESKEY, // 默认使用策略域名的加密key，具体看文档https://doc.weixin.qq.com/sheet/e3_AU4APAY0APQr2BU1t1SQmGSkzeyew?scode=ACwAEwc6ABEl3lZ22FARMAcwY7ACM
  iv = CRYPTO_STRATEGY_IV // 默认使用策略域名的加密偏移量，具体看文档https://doc.weixin.qq.com/sheet/e3_AU4APAY0APQr2BU1t1SQmGSkzeyew?scode=ACwAEwc6ABEl3lZ22FARMAcwY7ACM
) => {
  return CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(aesKey), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
    .ciphertext.toString()
    .toUpperCase();
};

// AES解密
export const decrypt = (
  value,
  aesKey = CRYPTO_STRATEGY_AESKEY, // ase的key
  iv = CRYPTO_STRATEGY_IV // ase的offset
) => {
  value = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(value));
  return CryptoJS.AES.decrypt(value, CryptoJS.enc.Utf8.parse(aesKey), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};
