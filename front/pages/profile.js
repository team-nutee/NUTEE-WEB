import React, { useMemo } from "react";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
} from "../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import AppLayout from "../components/AppLayout";
import LeftProfile from "../components/profiles/LeftProfile";
import UserContents from '../components/contents/UserContents';
import { LOAD_USER_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";


const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost } = useSelector((state) => state.post);

  const pageWrapper = useMemo(() => ({ outline: 'none', width: "70vw", minWidth: "750px", maxWidth: "1000px", paddingTop: "55px" }), []);

  return (
    <>
      <AppLayout>
        <Row gutter={10} style={pageWrapper}>
          {/* 프로필, 공지, 포스터 */}
          <Col span={7}>
            <LeftProfile />
          </Col>
          {/* 게시글 */}
          <Col span={17}>
            {/* 사용자의 게시물만 있는 페이지 */}
            <UserContents me={me} hasMorePost={hasMorePost} mainPosts={mainPosts} />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  console.log("getServerSideProps start_profile");
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    // data: state.user.me && state.user.me.id,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps end");
  await context.store.sagaTask.toPromise();
});

export default Profile;
