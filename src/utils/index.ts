/** 使用json进行深克隆 */
export const deepCloneByJson = (T) => JSON.parse(JSON.stringify(T));

/** 深拷贝，解决循环引用 */
export const deepClone = (obj) => {
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (obj[i] instanceof Object) {
        newobj[i] = clone(obj[i], hash);
      } else {
        newobj[i] = obj[i];
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 深拷贝，解决循环引用。但不克隆key字段。 */
export const deepCloneExclude = (obj, key) => {
  function clone(obj, hash) {
    const newobj = Array.isArray(obj) ? [] : {};
    hash = hash || new WeakMap();
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, newobj);

    Object.keys(obj).forEach((i) => {
      if (i !== key) {
        if (obj[i] instanceof Object) {
          newobj[i] = clone(obj[i], hash);
        } else {
          newobj[i] = obj[i];
        }
      }
    });
    return newobj;
  }
  return clone(obj, undefined);
};

/** 模拟ajax请求 */
export const mockAjax = async (time = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: {
          name: '张三',
          age: 18,
        },
      });
    }, time);
  });
};

/**
 * 删除对象中值为: null, undefined, NaN, ''的属性
 */
export const deleteUselessObjectKey = <T>(obj: T): T => {
  // @ts-ignore
  Object.keys(obj).forEach((key) => {
    if ([null, undefined, NaN, ''].includes(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
};

/** 判断是否浏览器运行 */
export const isBrowser = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';

/**
 * 获取地址栏参数
 */
export const getUrlQuery: any = () => {
  const url = decodeURI(decodeURI(window.location.href));
  const str = url.split('?')[1];
  const obj = {};
  if (str) {
    const keys = str.split('&');
    keys.forEach((item) => {
      const arr = item.split('=');
      obj[arr[0]] = arr[1];
    });
  }
  return obj;
};
