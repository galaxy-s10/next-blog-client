import Image from 'next/image';
import { memo, useState, useEffect } from 'react';

import CollapseCpt from '../../../components/Collapse';
import style from './style.module.scss';

const LayoutAside = () => {
  // 生命周期
  useEffect(() => {}, []);

  const tagIco = <span>tagIco</span>;
  const visitorIco = <span>visitorIco</span>;
  const logIco = <span>logIco</span>;
  const settingIco = <span>settingIco</span>;

  return (
    <div>
      <div className={style['user-info']}>
        <div className={style['bgc']}></div>
        <div className={style['user-avatar']}>
          <Image
            src={require('/public/assets/img/default_avatar.webp')}
            alt=""
          ></Image>
        </div>
        <div className={style['info']}>
          <div className={style['name']}>222</div>
          <p className={style['title']}>333</p>
        </div>
      </div>
      <CollapseCpt title="设置" isOpen={false} ico={settingIco}>
        <div>设置设置</div>
      </CollapseCpt>
      <div className={style['article-info']}>
        <div className={style['title']}>
          <div>
            <i className={style['el-icon-medal']}></i>
            <b>xxxx</b>
          </div>
          <span className={style['switch-btn']}>切换</span>
        </div>
        <div>
          <div>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div key={index} className={style['item']}>
                  <div className={style['head-img']}>
                    <Image
                      src={require('/public/assets/img/default_avatar.webp')}
                      alt=""
                    ></Image>
                  </div>
                  <div className={style['desc']}>
                    <b>#ds</b>
                    <div className={style['info']}>
                      <span className={style['view']}>
                        <i className={style['el-icon-view']}></i>
                        ddd
                      </span>
                      <div>ddd</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CollapseCpt title="访客信息" isOpen={false} ico={visitorIco}>
        <div>访客信息访客信息</div>
      </CollapseCpt>
      <CollapseCpt title="流量信息" isOpen={false} ico={logIco}>
        <div>流量信息流量信息</div>
      </CollapseCpt>
      <CollapseCpt title="标签云" isOpen={true} ico={tagIco}>
        <div>标签云标签云</div>
      </CollapseCpt>
    </div>
  );
};

export default memo(LayoutAside);
