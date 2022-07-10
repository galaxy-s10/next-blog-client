import { type } from 'os';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { fetchArticleList } from '@/services/article';
import store, { wrapper } from '@/stores';

import style from './style.module.scss';

import type { NextPage } from 'next';

export async function getServerSideProps(context) {
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
  console.log('Index重新渲染');
  return (
    <div className={style['index-wrap']}>
      {articleList.map((item, index) => {
        return (
          <article className={style['item']} key={index}>
            <img src={item['head_img']} className={style['left']}></img>
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
