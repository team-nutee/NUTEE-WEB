import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'antd';
import { END } from 'redux-saga';
import axios from 'axios';
import { LOAD_SEARCH_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import PostCard from '../components/post/PostCard';
import LeftContents from '../components/contents/LeftContents';
import wrapper from '../store/configureStore';

const Search = ({ text }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePost) {
          dispatch({
            type: LOAD_SEARCH_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: text,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePost]);

  const colWrapper = useMemo(() => ({ minWidth: '550px' }), []);

  return (
    <>
      <LeftContents me={me} span={5} />
      <Col span={10} style={colWrapper}>
        {mainPosts.map((c) => <PostCard key={c.id} post={c} />)}
      </Col>
    </>
  );
};

Search.propTypes = {
  text: PropTypes.string.isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start_search_search');
  console.log(context.req.headers);
  const { text } = context.query;
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  console.log('search getInitialProps', text);
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: text,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Search;
