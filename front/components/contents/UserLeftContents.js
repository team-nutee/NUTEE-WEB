import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UserProfile from '../profiles/UserProfile';
import UserFolloList from '../profiles/UserFolloList';

const UserLeftContents = (target) => {
  const { me } = useSelector((state) => state.user);

  const wrapper = useMemo(() => ({ marginTop: '15px' }), []);
  const imgWrapper = useMemo(() => ({ marginTop: '10px', width: '100%' }), []);

  return (
    <Col style={wrapper}>
      <Row gutter={10}><UserProfile target={target} /></Row>
      <Row gutter={10}>
        {!target || me.id === target.id ? <UserFolloList /> : <></>}
      </Row>
      <Row gutter={10}>
        <img style={imgWrapper} src="/poster.png" alt="sowl" />
      </Row>
    </Col>
  );
};
export default UserLeftContents;
