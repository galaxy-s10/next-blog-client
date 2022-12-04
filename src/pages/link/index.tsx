import { memo, useEffect } from 'react';

import { fetchLinkList } from '@/services/link';

import style from './style.module.scss';

export async function getServerSideProps(context) {
  let linkList: any = null;
  try {
    linkList = await fetchLinkList({});
  } catch (error) {
    console.log(error);
  }
  return { props: { linkList: linkList.data.rows } };
}
const LinkPage = (props) => {
  const { linkList } = props;

  // 生命周期
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <div className={style['link-wrap']}>
        <h1 className={style['title']}>友链</h1>
        <hr className={style['hr-class']} />
        <ul className={style['link-list-wrap']}>
          {linkList.length ? (
            <>
              {linkList.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={style['li-item-wrap']}
                  >
                    <a
                      className={style['li-item-link']}
                      target="_blank"
                    >
                      <img
                        src={item.avatar}
                        className={style['user-avatar']}
                      />
                      <div className={style['desc']}>
                        <span>{item.name}</span>
                        <span
                          className={style['txt']}
                          title="item.desc"
                        >
                          {item.desc}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </>
          ) : (
            <span>暂无友链~</span>
          )}
        </ul>

        <h2 className={style['title-desc']}>欢迎大家交换友链~</h2>
      </div>
    </div>
  );
};

export default memo(LinkPage);
