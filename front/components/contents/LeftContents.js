import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import MyProfile from '../profiles/MyProfile';
import Notice from '../Notice';
import LinkContents from '../LinkContents';

const LeftContents = ({ me }) => {
  const wrapper = useMemo(() => ({ marginTop: '15px' }), []);

  return (
    <Col gutter={10} style={wrapper}>
      <Row gutter={10}>{me ? <MyProfile target={me} /> : <></>}</Row>
      <Row gutter={10}><Notice /></Row>
      <Row gutter={10}><LinkContents /></Row>
    </Col>
  );
};

LeftContents.propTypes = {
  me: PropTypes.object,
}.isRequired;

export default LeftContents;
