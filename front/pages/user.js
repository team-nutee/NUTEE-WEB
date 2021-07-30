import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { Col, Row } from 'antd';
import { END } from 'redux-saga';
import router from 'next/router';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST, LOAD_USER_INFO_SUCCESS } from '../reducers/post';
import AppLayout from '../components/AppLayout';
import MainContents from '../components/contents/MainContents';
import UserLeftContents from '../components/contents/UserLeftContents';
import wrapper from '../store/configureStore';

const User = () => {
  const dispatch = useDispatch();
  const { userPosts, hasMorePost } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);
  const { user } = router.query;
  const pageWrapper = useMemo(() => ({ outline: 'none', height: '100vh', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: user,
    });
    dispatch({
      type: LOAD_USER_INFO_SUCCESS,
      data: user,
    });
  }, []);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>{`${userInfo.nickname}님의 글`}</title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="../public/favicon.ico" />
          <meta property="og:url" content={`https://nutee.kr/user/${userInfo.id}`} />
        </Head>
      )}
      <Row gutter={10} style={pageWrapper}>
        {/* 프로필, 공지, 포스터 */}
        <Col span={7}>
          <UserLeftContents target={userInfo} />
        </Col>
        {/* 게시글 */}
        <Col span={17}>
          <MainContents target={userInfo} hasMorePost={hasMorePost} userPosts={userPosts} />
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // const { user } = context.query;
/*   context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: user,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: user,
  }); */
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;
