import react, { useMemo, useState } from "react";
import { Col, Row, Menu } from "antd";
import {
  SmileOutlined,
  SettingOutlined,
  BookOutlined,
  UnlockOutlined,
  UserOutlined,
  TagsOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useInput from '../hooks/useInput';

const { SubMenu } = Menu;
const edit = setVisible => {
  const [profileImage, setProfileImage] = useState("");
  const [nickname, setnickname] = useInput("");
  const [password, setPassword] = useInput("");
  const [category, setCategory] = useState("");
  const [major, setMajor] = useState("");
  const dispatch = useDispatch();

  const setIconWrapper = useMemo(() => ({ marginRight: '5px' }), []);
  const setPageWrapper = useMemo(() => ({ height: '500px' }), []);

  return (
    <Row style={setPageWrapper}>
      <h1><SettingOutlined style={setIconWrapper} />설정</h1>
    <Col span={10}>

      <Menu style={{ width: 256 }} defaultSelectedKeys={["1"]} mode="inline">
        <SubMenu
          key="sub1"
          icon={<SmileOutlined />}
          title="프로필 이미지 변경"
          ></SubMenu>

        <SubMenu
          key="sub2"
          icon={<UserOutlined />}
          title="닉네임 변경"
          ></SubMenu>

        <SubMenu
          key="sub3"
          icon={<UnlockOutlined />}
          title="비밀번호 변경"
          ></SubMenu>

        <SubMenu
          key="sub4"
          icon={<TagsOutlined />}
          title="카테고리 변경"
          ></SubMenu>

        <SubMenu key="sub5" icon={<BookOutlined />} title="전공 변경"></SubMenu>
      </Menu>
        </Col>
        <Col span={14}>
        옆 메뉴 버튼을 누르면 그에 해당하는 것 로드할 곳
        </Col>
    </Row>
  );
};

export default edit;
