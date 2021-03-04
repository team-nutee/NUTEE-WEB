import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Head from 'next/head';
import { Col, Row } from 'antd';
import { END } from 'redux-saga';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import AppLayout from '../components/AppLayout';
import MainContents from '../components/contents/MainContents';
import UserLeftContents from '../components/contents/UserLeftContents';
import wrapper from '../store/configureStore';

const User = () => {
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  const pageWrapper = useMemo(() => ({ outline: 'none', height: '100vh', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{`${userInfo.nickname}님의 글`}</title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="localhost:80/favicon.ico" />
          <meta property="og:url" content={`https://localhost:80/user/${userInfo.id}`} />
        </Head>
      )}
      <Row gutter={10} style={pageWrapper}>
        {/* 프로필, 공지, 포스터 */}
        <Col span={7}>
          <UserLeftContents target={userInfo} />
        </Col>
        {/* 게시글 */}
        <Col span={17}>
          <MainContents target={userInfo} hasMorePost={hasMorePost} mainPosts={mainPosts} />
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
