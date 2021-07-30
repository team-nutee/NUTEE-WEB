import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { Col, Row } from 'antd';
import { LOAD_POSTS_REQUEST, LOAD_FAVORITE_POSTS_REQUEST, LOAD_CATEGORY_DATA_REQUEST, LOAD_MAJOR_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_HAKSA_NOTICE_REQUEST, LOAD_SOOUP_NOTICE_REQUEST, LOAD_HAKJUM_NOTICE_REQUEST, LOAD_JANGHAK_NOTICE_REQUEST, LOAD_ILBAN_NOTICE_REQUEST, LOAD_HANGSA_NOTICE_REQUEST } from '../reducers/notice';
import LeftContents from '../components/contents/LeftContents';
import wrapper from '../store/configureStore';
import MainContents from '../components/contents/MainContents';
import AppLayout from '../components/AppLayout';

const Home = () => {
  const { me, isLogInDone } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, favoritePosts, majorPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [mobileScreen, setMobileScreen] = useState(false);

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

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_FAVORITE_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_MAJOR_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (isLogInDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      dispatch({
        type: LOAD_POSTS_REQUEST,
      });
      dispatch({
        type: LOAD_FAVORITE_POSTS_REQUEST,
      });
      dispatch({
        type: LOAD_MAJOR_POSTS_REQUEST,
      });
    }
  }, [isLogInDone]);

  const pageWrapper = useMemo(() => ({ outline: 'none', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);
  const mobilePageWrapper = useMemo(() => ({ outline: 'none', width: '100vw', minWidth: '100px', maxWidth: '700px', paddingTop: '55px' }), []);

  return (
    <AppLayout>
      {mobileScreen
        ? (
          <Row style={mobilePageWrapper}>
            <Col span={24}>
              <MainContents
                target={me}
                hasMorePost={hasMorePost}
                mainPosts={mainPosts}
                favoritePosts={favoritePosts}
                majorPosts={majorPosts}
              />
            </Col>
          </Row>
        )
        : (
          <Row gutter={10} style={pageWrapper}>
            {/* 프로필, 공지, 포스터 */}
            <Col span={7}>
              <LeftContents me={me} />
            </Col>
            {/* 게시글 */}
            <Col span={17}>
              <MainContents
                target={me}
                hasMorePost={hasMorePost}
                mainPosts={mainPosts}
                favoritePosts={favoritePosts}
                majorPosts={majorPosts}
              />
            </Col>
          </Row>
        )}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_CATEGORY_DATA_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HAKSA_NOTICE_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_SOOUP_NOTICE_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HAKJUM_NOTICE_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_JANGHAK_NOTICE_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_ILBAN_NOTICE_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HANGSA_NOTICE_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
