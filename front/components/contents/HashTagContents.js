import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import PostCard from '../post/PostCard';
import wrapper from '../../store/configureStore';

const HashTagContents = ({ mainPosts, hasMorePost, tag }) => {
  const { loadPostsLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost, tag, loadPostsLoading]);

  const pageWrapper = useMemo(() => ({ marginTop: '30px' }), []);

  return (
    <Col style={pageWrapper}>
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Col>
  );
};

HashTagContents.propTypes = {
  mainPosts: PropTypes.array,
  hasMorePost: PropTypes.bool,
  tag: PropTypes.string,
}.isRequired;

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.params.tag,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default HashTagContents;
