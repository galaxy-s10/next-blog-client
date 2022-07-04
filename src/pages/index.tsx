import style from './style.module.scss';

const Index = (props) => {
  console.log('Index重新渲染');
  return <div className={style['index-wrap']}>132221</div>;
};

export default Index;
