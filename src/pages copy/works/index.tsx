import { memo, useEffect } from 'react';

import { fetchWorksList } from '@/services/works';

import style from './style.module.scss';

export async function getServerSideProps(context) {
  let worksList: any = null;
  try {
    worksList = await fetchWorksList({});
  } catch (error) {
    console.log(error);
  }
  return { props: { worksList: worksList.data.rows } };
}

const WorksPage = (props) => {
  const { worksList } = props;
  // 生命周期
  useEffect(() => {
    console.log(props, 'llll;;;');
  }, []);

  return (
    <div>
      <div className={style['works-wrap']}>
        <h1 className={style['title']}>作品集</h1>
        <hr className={style['hr-class']} />
        <h2 className={style['title-desc']}>{'"Less is more"'}</h2>
        <div className={style['list-wrap']}>
          {worksList.map((item, index) => {
            return (
              <div key={index} className={style['item-wrap']}>
                <div
                  className={style['bg-url']}
                  style={{ backgroundImage: `url(${item.bg_url})` }}
                ></div>
                <div className={style['item']}>
                  <h2 className={style['name']}>{item.name}</h2>
                  <div className={style['other']}>
                    <p className={style['desc']}>{item.desc}</p>
                    <a
                      className={style['btn']}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      预览
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {worksList && !worksList.length && <div>暂无作品~</div>}
      </div>
    </div>
  );
};

export default memo(WorksPage);
