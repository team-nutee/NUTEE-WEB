import React, { useMemo, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_POSTS_REQUEST, LOAD_MY_COMMENTS_REQUEST, LOAD_MY_LIKE_REQUEST, LOAD_CATEGORY_DATA_REQUEST } from '../reducers/post';
import { LOAD_HAKSA_NOTICE_REQUEST, LOAD_SOOUP_NOTICE_REQUEST, LOAD_HAKJUM_NOTICE_REQUEST, LOAD_JANGHAK_NOTICE_REQUEST, LOAD_ILBAN_NOTICE_REQUEST, LOAD_HANGSA_NOTICE_REQUEST } from '../reducers/notice';
import AppLayout from '../components/AppLayout';
import UserLeftContents from '../components/contents/UserLeftContents';
import UserContents from '../components/contents/UserContents';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const { myPosts, myCommentPosts, myLikePosts, hasMorePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const pageWrapper = useMemo(() => ({ outline: 'none', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    dispatch({
      type: LOAD_MY_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_MY_COMMENTS_REQUEST,
    });
    dispatch({
      type: LOAD_MY_LIKE_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      { me
        ? (
          <Row gutter={10} style={pageWrapper}>
            {/* 프로필, 공지, 포스터 */}
            <Col span={7}>
              <UserLeftContents target={me} />
            </Col>
            {/* 게시글 */}
            <Col span={17}>
              <UserContents
                me={me}
                hasMorePost={hasMorePost}
                myPosts={myPosts}
                myCommentPosts={myCommentPosts}
                myLikePosts={myLikePosts}
              />
            </Col>
          </Row>
        )
        : <></> }
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

export default Profile;
