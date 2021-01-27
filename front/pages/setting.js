import react, { useMemo, useState } from "react";
import { Col, Row, Menu, Tabs, Modal } from "antd";
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
import { LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import SetMenu from "../components/setting/setMenu";

const edit = setVisible => {
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setnickname] = useInput("");
  const [password, setPassword] = useInput("");
  const [category, setCategory] = useState("");
  const [major, setMajor] = useState("");
  const dispatch = useDispatch();

  const pageWrapper = useMemo(
    () => ({
      height: "100vh",
      outline: "none",
      width: "70vw",
      minWidth: "750px",
      maxWidth: "1000px",
      paddingTop: "70px",
    }),
    []
  );
  const setIconWrapper = useMemo(() => ({ marginRight: "5px" }), []);

  return (
    <AppLayout>
      <Row gutter={10} style={pageWrapper}>
        <h1>
          <SettingOutlined style={setIconWrapper} />
          설정
        </h1>
        <Col span={7}>
          <SetMenu />
        </Col>
        <Col span={17}></Col>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const cookie = context.req ? context.req.headers.cookie : "";
  axios.defaults.headers.Cookie = "";
  console.log("getServerSideProps start_index");
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch(END);
  console.log("getServerSideProps start_index");
  await context.store.sagaTask.toPromise();
});

export default edit;
