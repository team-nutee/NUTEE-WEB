import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { Col, Row, Tabs } from "antd";

import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/post/PostForm";
import PostCard from "../components/post/PostCard";
import LeftContents from "../components/contents/LeftContents";
import wrapper from "../store/configureStore";

const { TabPane } = Tabs;

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);
  
  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_MAIN_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, mainPosts.length]);

  const pageWrapper = useMemo(() => ({  borderColor: 'white', outline: 'none', width: "70vw", minWidth: "750px", maxWidth: "1000px", paddingTop: "55px" }), []);
  const tabsWrapper = useMemo(() => ({ color:  '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '15px', paddingBotton: '10px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal'}), []);

  return (
    <AppLayout>
      <Row gutter={10} style={pageWrapper}>
        {/* 프로필, 공지, 포스터 */}
        <Col span={7}>
          <LeftContents me={me} />
        </Col>
        {/* 게시글 */}
        <Col span={17}>
          <Tabs defaultActiveKey="1" type="card" style={tabsWrapper}>
            <TabPane tab="전체 게시글" key="1" style={tabPaneWrapper}>
              {me && <PostForm />}
              {mainPosts.map((c) => (
                <PostCard key={c.id} post={c} />
              ))}
            </TabPane>
            <TabPane tab="내 전공" key="2" style={tabPaneWrapper}>
              {me && <PostForm />}내 전공 게시글
            </TabPane>
            <TabPane tab="즐겨찾기" key="3" style={tabPaneWrapper}>
              {me && <PostForm />}
              즐겨찾기 게시글
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    console.log("getServerSideProps start_index");
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MAIN_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps start_index");
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
