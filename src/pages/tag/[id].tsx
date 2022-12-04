import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';

import NoHeadImg from '@/components/NoHeadImg';
import { fetchTagArticleList, fetchTagList } from '@/services/tag';
import { convertDate } from '@/utils/format';

import style from './style.module.scss';
export async function getServerSideProps(ctx) {
  let tagList: any = null;
  let articleList: any = null;
  const tagListParams = {
    nowPage: 1,
    pageSize: 100,
  };
  const articleListParams = {
    tagId: +ctx.query.id,
    nowPage: 1,
    pageSize: 3,
  };
  try {
    tagList = await fetchTagList(tagListParams);
    articleList = await fetchTagArticleList(articleListParams);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      articleListParams: articleListParams,
      tagList: tagList.data.rows,
      articleList: articleList.data.rows,
    },
  };
}

const articleListCpt = (v) => {
  return v.map((item, index) => {
    return (
      <article
        key={index}
        className={style['article-item']}
      >
        <div className={style['article-left']}>
          {item['head_img'] ? (
            <Link href={`/article/${item.id}`}>
              <img
                src={item['head_img']}
                className={style['head-img']}
                alt=""
              />
            </Link>
          ) : (
            <Link
              href={`/article/${item.id}`}
              className={style['head-img']}
            >
              <div>
                <NoHeadImg />
              </div>
            </Link>
          )}
        </div>
        <div className={style['article-right']}>
          <Link href={`/article/${item.id}`}>
            <h2 className={style['singleEllipsis']}> {item.title}</h2>
          </Link>
          <hr />
          <div>
            {item.tags.map((item, index) => {
              return <span key={index}>{item.name}</span>;
            })}
          </div>
          <div className={style['summary']}>
            <img
              src={item.users[0]?.avatar}
              className={style['user-avatar']}
              alt=""
            />
            <span className={style['jgh']}></span>
            <span>{convertDate(item.created_at)}</span>
            <span className={style['jgh']}></span>
            <span>{item.click}浏览</span>
            <span className={style['jgh']}></span>
            <span>{item.comment_total}评论</span>
            <span className={style['jgh']}></span>
            <div>{item.star_total}star</div>
          </div>
        </div>
      </article>
    );
  });
};

const TagPage = (props) => {
  const { tagList, articleList, articleListParams } = props;
  const router = useRouter();
  // 生命周期
  useEffect(() => {
    console.log('TagPage生命周期');
  }, []);

  return (
    <div className={style['tag-wrap']}>
      {tagList?.length ? (
        <div>
          <div className={style['tag-info']}>
            {tagList.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    style['tag-item'] +
                    ' ' +
                    (articleListParams.tagId === item.id
                      ? style['active-tag']
                      : '')
                  }
                  onClick={() => router.push(`/tag/${item.id}`)}
                >
                  <span>{item.name}</span>
                  <span className={style['article-total']}>
                    {item.article_total}
                  </span>
                </div>
              );
            })}
          </div>
          {articleListCpt(articleList)}
        </div>
      ) : (
        <div className={style['no-data']}>暂无标签~</div>
      )}
    </div>
  );
};

export default memo(TagPage);
