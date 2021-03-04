import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { LOAD_NOTICE_REQUEST } from '../../reducers/notice';
import MyProfile from '../profiles/MyProfile';
import Notice from '../Notice';
import LinkContents from '../LinkContents';

const LeftContents = ({ me }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_NOTICE_REQUEST,
    });
  }, []);

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
