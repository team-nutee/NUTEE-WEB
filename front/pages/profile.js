import React, { useMemo, useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_MY_POSTS_REQUEST, LOAD_MY_COMMENTS_REQUEST, LOAD_MY_LIKE_REQUEST } from '../reducers/post';
import AppLayout from '../components/AppLayout';
import UserLeftContents from '../components/contents/UserLeftContents';
import UserContents from '../components/contents/UserContents';
import UserProfileContents from '../components/modile/contents/UserProfileContents';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const [mobileScreen, setMobileScreen] = useState(false);

  const pageWrapper = useMemo(() => ({ outline: 'none', height: '100vh', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '55px' }), []);
  const mobilePageWrapper = useMemo(() => ({ outline: 'none', width: '100vw', minWidth: '100px', maxWidth: '700px', paddingTop: '55px' }), []);

  useEffect(
    function onMobileWidth() {
      if ((window.innerWidth || document.body.clientWidth) > 750) {
        setMobileScreen(false);
      } else {
        setMobileScreen(true);
      }
      window.addEventListener('resize', onMobileWidth);
      return () => {
        window.removeEventListener('resize', onMobileWidth);
      };
    },
  );

  return (
    <>
      <AppLayout>
        {mobileScreen ?
          <Row style={mobilePageWrapper}>
            <Col span={24}>
              <UserProfileContents target={me}/>
            </Col>
            <Col span={24}>
              <UserContents me={me} hasMorePost={hasMorePost} mainPosts={mainPosts} />
            </Col>
          </Row>
        :
        <Row gutter={10} style={pageWrapper}>
          {/* 프로필, 공지, 포스터 */}
          <Col span={7}>
            <UserLeftContents target={me} />
          </Col>
          {/* 게시글 */}
          <Col span={17}>
            <UserContents me={me} hasMorePost={hasMorePost} mainPosts={mainPosts} />
          </Col>
        </Row>
        }
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start_profile');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MY_POSTS_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MY_COMMENTS_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MY_LIKE_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Profile;
