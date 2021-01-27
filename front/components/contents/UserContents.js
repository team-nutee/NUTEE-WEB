import React, { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Tabs, Badge } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import { LOAD_MAIN_POSTS_REQUEST } from "../../reducers/post";
import PostForm from "../post/PostForm";
import PostCard from "../post/PostCard";

const { TabPane } = Tabs;

const UserContents = ({ me, mainPosts, hasMorePost }) => {
  const dispatch = useDispatch();

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

  const tabsWrapper = useMemo(
    () => ({
      color: "#005000",
      marginTop: "10px",
      fontWeight: "bold",
      lineHeight: "15px",
      paddingBotton: "10px",
    }),
    []
  );
  const tabPaneWrapper = useMemo(
    () => ({ color: "black", fontWeight: "normal" }),
    []
  );
  const badge1Wrapper = useMemo(
    () => ({ background: "#f50", size: "small", zIndex: "0" }),
    []
  );

  return (
    <>
      <Tabs defaultActiveKey="1" type="card" style={tabsWrapper}>
        <TabPane tab={'내가 쓴 글'} key="1" style={tabPaneWrapper}>
        <Badge count={250} />
          {me && <PostForm />}
          {mainPosts.map(c => (
            <PostCard key={c.id} post={c} />
          ))}
        </TabPane>
        <TabPane tab="내가 쓴 댓글" key="2" style={tabPaneWrapper}>
          {me && <PostForm />}
        </TabPane>
        <TabPane tab="내가 추천한 글" key="3" style={tabPaneWrapper}>
          {me && <PostForm />}
        </TabPane>
      </Tabs>
      페이지
    </>
  );
};

export default UserContents;
