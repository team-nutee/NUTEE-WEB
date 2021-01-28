import react, { useMemo } from "react";
import { LOAD_USER_REQUEST } from "../reducers/user";
import { Row, Tabs } from "antd";
import {
  SmileOutlined,
  SettingOutlined,
  BookOutlined,
  UnlockOutlined,
  UserOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";
import AppLayout from "../components/AppLayout";
import EditPassword from '../components/setting/EditPassword';

const { TabPane } = Tabs;

const setting = () => {
  const tabsWrapper = useMemo(() => ({ height: '100vh', color: "#005000", marginTop: "10px", fontWeight: "bold", lineHeight: "15px", paddingBotton: "10px", }), []);
  const tabPaneWrapper = useMemo(() => ({ color: "black", fontWeight: "normal" }), []);
  const pageWrapper = useMemo(() => ({ outline: "none", width: "70vw", minWidth: "750px", maxWidth: "1000px", paddingTop: "70px", }), []);
  const setIconWrapper = useMemo(() => ({ marginRight: "5px" }), []);

  return (
    <AppLayout>
      <Row style={pageWrapper}>
        <h1><SettingOutlined style={setIconWrapper} />설정</h1>
        <Tabs tabPosition="left" type="card" style={tabsWrapper}>
          <TabPane tab={<span><SmileOutlined />프로필 이미지 변경</span>} key="1" style={tabPaneWrapper}>
            Content of Tab 1
          </TabPane>
          <TabPane tab={<span><UserOutlined />닉네임 변경</span>} key="2" style={tabPaneWrapper}>
            Content of Tab 2
          </TabPane>
          <TabPane tab={<span><UnlockOutlined />비밀번호 변경</span>} key="3" style={tabPaneWrapper}>
            <EditPassword />
          </TabPane>
          <TabPane tab={<span><TagsOutlined />카테고리 변경</span>} key="4" style={tabPaneWrapper}>
            Content of Tab 3
          </TabPane>
          <TabPane tab={<span><BookOutlined />전공 변경</span>} key="5" style={tabPaneWrapper}>
            Content of Tab 3
          </TabPane>
        </Tabs>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  console.log("getServerSideProps start_setting");
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps start_setting");
  await context.store.sagaTask.toPromise();
});

export default setting;
