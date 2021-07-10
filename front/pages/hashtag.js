import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import { LOAD_HAKSA_NOTICE_REQUEST, LOAD_SOOUP_NOTICE_REQUEST, LOAD_HAKJUM_NOTICE_REQUEST, LOAD_JANGHAK_NOTICE_REQUEST, LOAD_ILBAN_NOTICE_REQUEST, LOAD_HANGSA_NOTICE_REQUEST } from '../reducers/notice';
import LeftContents from '../components/contents/LeftContents';
import HashTagContents from '../components/contents/HashTagContents';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';

const Hashtag = () => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { tag } = router.query;

  const pageWrapper = useMemo(() => ({ outline: 'none', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '55px' }), []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <>
      { me
        ? (
          <AppLayout>
            <Row gutter={10} style={pageWrapper}>
              {/* 프로필, 공지, 포스터 */}
              <Col span={7}>
                <LeftContents me={me} />
              </Col>
              {/* 게시글 */}
              <Col span={17}>
                <HashTagContents
                  hasMorePost={hasMorePost}
                  mainPosts={mainPosts}
                  tag={tag}
                />
              </Col>
            </Row>
          </AppLayout>
        ) : <></> }
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
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

export default Hashtag;
