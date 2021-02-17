import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Col, Row } from "antd";
import {
  LOAD_POSTS_REQUEST,
  LOAD_FAVORITE_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_REQUEST,
} from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, REFRESH_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import LeftContents from '../components/contents/LeftContents';
import wrapper from "../store/configureStore";
import MainContents from "../components/contents/MainContents";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, favoritePosts, categoryPosts } = useSelector((state) => state.post);
  const pageWrapper = useMemo(() => ({ outline: 'none', width: "70vw", minWidth: "750px", maxWidth: "1000px", paddingTop: "55px" }), []);
  const dispatch = useDispatch();

  return (
    <AppLayout>
      <Row gutter={10} style={pageWrapper}>
        {/* 프로필, 공지, 포스터 */}
        <Col span={7}>
          <LeftContents me={me} />
        </Col>
        {/* 게시글 */}
        <Col span={17}>
          <MainContents
            me={me}
            hasMorePost={hasMorePost}
            mainPosts={mainPosts}/* 
            favoritePosts={favoritePosts}
            categoryPosts={categoryPosts} */
          />
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
   /*  const authorization = context.req ? context.req.headers.authorization : ""; */
    axios.defaults.headers.Cookie = "";
   /*  axios.defaults.headers.Authorization = ""; */
    console.log('index', cookie);
    console.log('index', context);
    console.log("getServerSideProps start_index");
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    /* if (context.req && authorization) {
      axios.defaults.headers.Authorization = authorization;
    } */
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
/*     context.store.dispatch({
      type: LOAD_FAVORITE_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_CATEGORY_POSTS_REQUEST,
    }); */
    context.store.dispatch(END);
    console.log("getServerSideProps start_index");
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
