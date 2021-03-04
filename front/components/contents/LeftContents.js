import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { GithubOutlined } from '@ant-design/icons';
import { LOAD_NOTICE_REQUEST } from '../../reducers/notice';
import MyProfile from '../profiles/MyProfile';
import Notice from '../Notice';

const LeftContents = ({ me }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_NOTICE_REQUEST,
    });
  }, []);

  const wrapper = useMemo(() => ({ marginTop: '15px' }), []);
  const IconWrapper = useMemo(() => ({ marginRight: '5px' }), []);

  return (
    <Col gutter={10} style={wrapper}>
      <Row gutter={10}>{me ? <MyProfile target={me} /> : <></>}</Row>
      <Row gutter={10}><Notice /></Row>
      <br />
      <Row gutter={10}>
        <Link href="https://github.com/team-nutee/NUTEE-WEB">
          <a target="_blank" rel="noreferrer">
            <GithubOutlined style={IconWrapper} />
            Made by S.OWL__TEAM-NUTEE
          </a>
        </Link>
      </Row>
    </Col>
  );
};

LeftContents.propTypes = {
  me: PropTypes.object,
}.isRequired;

export default LeftContents;
