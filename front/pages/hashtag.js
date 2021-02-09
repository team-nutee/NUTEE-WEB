import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/post/PostCard';
import LeftContents from "../components/LeftContents";
import RightContents from "../components/RightContents";
import { Col } from "antd";
import { END } from 'redux-saga';
import axios from 'axios';
import wrapper from '../store/configureStore';

const Hashtag = ({tag}) => {
    const dispatch = useDispatch();

    const {mainPosts, hasMorePost} = useSelector(state => state.post);
    const {me} = useSelector(state => state.user);

    useEffect(() => {
        const onScroll = () => {
          if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
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
      }, [mainPosts.length, hasMorePost]);
    
    const colWrapper = useMemo(() => ({ minWidth:'550px' }), []);

    return (
        <>
            <LeftContents me={me} span={5} />
            <Col span={10} style={colWrapper}>
                {mainPosts.map((c) => {
                    return (
                        <PostCard key={c.id} post={c} />
                    );
                })}
            </Col>
            <RightContents />
        </>
    );
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
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: context.params.tag,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });
  
export default Hashtag;