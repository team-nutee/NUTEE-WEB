import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { TARGET_URL } from '../static';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/post/PostCard';

const Post = ({ id }) => {
  const { singlePost } = useSelector((state) => state.post);
  return (
    <>
      <AppLayout>
        <Head>
          <title>
            {singlePost.user.nickname}
            님의 글
          </title>
          <meta name="description" content={singlePost.content} />
          <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
          <meta property="og:description" content={singlePost.content} />
          <meta property="og:image" content={singlePost.Images[0] && `${TARGET_URL}/${singlePost.Images[0].src}`} />
          <meta property="og:url" content={`http://localhost:3000/post/${id}`} />
        </Head>
        <div itemScope="title">{singlePost.title}</div>
        <div itemScope="content">{singlePost.content}</div>
        <div itemScope="author">{singlePost.User.nickname}</div>
        <PostCard post={singlePost} />

        <div>{singlePost.Images[0] && <img src={`http://localhost:3000/${singlePost.Images[0].src}`} alt={singlePost.Images[0].src} />}</div>
      </AppLayout>
    </>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(context);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
