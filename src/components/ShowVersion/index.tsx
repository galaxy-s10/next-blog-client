import { memo, useState, useEffect } from 'react';

import style from './style.module.scss';
const ShowVersion = () => {
  const [total, setTotal] = useState(0);
  // 生命周期
  useEffect(() => {}, []);

  const handleClick = () => {
    const name = process.env.PROJECT_NAME;
    const version = process.env.PROJECT_VERSION;
    const lastBuildTime = process.env.PROJECT_LASTBUNDLE_TIME;
    if (total === 5) {
      console.log(
        `项目名：${name}\n版本：${version}\n最后构建时间：${lastBuildTime}`
      );
      alert(
        `项目名：${name}\n版本：${version}\n最后构建时间：${lastBuildTime}`
      );
      setTotal(0);
    }
    setTotal(total + 1);
  };

  return (
    <div className={style['show-version-wrap']} onClick={handleClick}></div>
  );
};

export default memo(ShowVersion);
