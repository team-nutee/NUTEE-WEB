/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState, useCallback } from 'react';
import { Col, Row, Modal, List } from 'antd';
import PropTypes from 'prop-types';
import MyProfile from '../profiles/MyProfile';
import Notice from '../Notice';
import LinkContents from './LinkContents';
import DevInfo from '../DeveloperInformation';

const LeftContents = ({ me }) => {
  const [visible, setVisible] = useState(false);

  const wrapper = useMemo(() => ({ marginTop: '15px', padding: '15px' }), []);
  const devInfoWrapper = useMemo(() => ({ fontWeight: 'bold', marginLeft: '10px', color: '#050', textDecoration: 'underline' }), []);

  const showModal = useCallback(() => {
    setVisible(true);
  });
  const devInfoOk = useCallback(() => {
    setVisible(false);
  });
  const devInfoCancel = useCallback(() => {
    setVisible(false);
  });
  return (
    <>
      <Col gutter={10} style={wrapper}>
        <Row gutter={10}>{me ? <MyProfile target={me} /> : <></>}</Row>
        <Row gutter={10}><Notice /></Row>
        <Row gutter={10}><LinkContents /></Row>
        <Row gutter={10}>
          <List
            style={wrapper}
            bordered
          >
            <a style={devInfoWrapper} onClick={showModal}>개발자 정보</a>
          </List>
        </Row>
      </Col>

      <Modal
        visible={visible}
        onOk={devInfoOk}
        onCancel={devInfoCancel}
        footer={null}
        closable={false}
        title="개발자 정보"
      >
        <DevInfo setVisible={setVisible} />
      </Modal>
    </>
  );
};

LeftContents.propTypes = {
  me: PropTypes.object,
}.isRequired;

export default LeftContents;
