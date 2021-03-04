import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UserProfile from '../profiles/UserProfile';
import UserFolloList from '../profiles/UserFolloList';
import MyProfile from '../profiles/MyProfile';
import LinkContents from '../LinkContents';

const UserLeftContents = (target) => {
  const { me } = useSelector((state) => state.user);
  const user = target.target;
  const wrapper = useMemo(() => ({ marginTop: '15px' }), []);

  return (
    <Col style={wrapper}>
      <Row gutter={10}>
        {!user || user.id === me.id ? <MyProfile target={user} /> : <UserProfile target={user} /> }
      </Row>
      <Row gutter={10}>
        {!user || me.id === user.id ? <UserFolloList /> : <></>}
      </Row>
      <Row gutter={10}><LinkContents /></Row>
    </Col>
  );
};

export default UserLeftContents;
