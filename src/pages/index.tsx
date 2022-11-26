import { type } from 'os';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import style from './style.module.scss';

import type { NextPage } from 'next';

import NoHeadImg from '@/components/NoHeadImg';
import { fetchArticleList } from '@/services/article';
import store, { wrapper } from '@/stores';

export async function getServerSideProps(context) {
  console.log(
    'pages/index.tsx-getServerSideProps'
    // store.getState().type.list[0]
  );
  let articleList: any = null;
  const params = {
    orderName: 'created_at',
    orderBy: 'desc',
    types: 1,
    nowPage: 1,
    pageSize: 10,
  };
  try {
    articleList = await fetchArticleList(params);
  } catch (error) {
    console.log(error);
  }
  return { props: { articleList: articleList.data.rows } };
}

// 这个页面访问不到window

const Index = (props) => {
  const { articleList } = props;
  console.log('pages/index.tsx重新渲染');
  useEffect(() => {
    console.log('pages/index.tsx生命周期');
  });
  return (
    <div className={style['index-wrap']}>
      {articleList.map((item, index) => {
        return (
          <article className={style['item']} key={index}>
            <div className={style['left']}>
              {item['head_img'] ? (
                <div
                  className={style['head_img']}
                  style={{ backgroundImage: `url(${item['head_img']})` }}
                ></div>
              ) : (
                <div className={style['head_img']}>
                  <NoHeadImg className={style['head_img']}></NoHeadImg>
                </div>
              )}
            </div>

            <div className={style['right']}>
              <h3 className={style['title']}>{item.title}</h3>
              <div className={style['tag-list']}>
                {item.tags.map((tag, index) => {
                  return (
                    <span className={style['tag']} key={index}>
                      {tag.name}
                    </span>
                  );
                })}
              </div>
              <div className={style['desc']}>{item.desc}</div>
              <div className={style['summary']}>{item.title}</div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Index;
