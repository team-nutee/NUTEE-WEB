import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { TARGET_URL } from '../static';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/post/PostCard';

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

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
          <meta property="og:url" content={`http://localhost/post/${id}`} />
        </Head>
        <div itemScope="title">{singlePost.title}</div>
        <div itemScope="content">{singlePost.content}</div>
        <div itemScope="author">{singlePost.User.nickname}</div>
        <div>
          {singlePost.Images[0]
          && <img src={singlePost.Images[0].src} alt={singlePost.Images[0].src} />}
        </div>
        <PostCard post={singlePost} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { id } = context.query;
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
