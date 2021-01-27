import react, { useMemo } from "react";
import { Col, Row, Menu, Tabs, Modal } from "antd";
import {
  SmileOutlined,
  BookOutlined,
  UnlockOutlined,
  UserOutlined,
  TagsOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;

const setMenu = () => {
  const setWrapper = useMemo(() => ({ }), []);

  return (
    <div style={setWrapper}>
    <Menu defaultSelectedKeys="sub1" mode="inline">
      <Menu.Item key="sub1" icon={<SmileOutlined />}>
        프로필 이미지 변경
      </Menu.Item>
      <Menu.Item key="sub2" icon={<UserOutlined />}>
        닉네임 변경
      </Menu.Item>
      <Menu.Item key="sub3" icon={<UnlockOutlined />}>
        비밀번호 변경
      </Menu.Item>
      <Menu.Item key="sub4" icon={<TagsOutlined />}>
        카테고리 변경
      </Menu.Item>
      <Menu.Item key="sub5" icon={<BookOutlined />}>
        전공 변경
      </Menu.Item>
    </Menu>
    </div>
  );
};

export default setMenu;
