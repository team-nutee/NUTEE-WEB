import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FIND_ID_REQUEST } from '../../reducers/user';

const FindId = ({ setIdVisible }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const dispatch = useDispatch();
  const { findIdDone, findId } = useSelector((state) => state.user);

  const onChangeEmailCheck = useCallback((e) => {
    setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
    setEmail(e.target.value);
  }, [email]);

  const onFindId = () => {
    if (!email || email.length === 0) {
      return alert('이메일을 작성해주세요.');
    }
    return (
      dispatch({
        type: FIND_ID_REQUEST,
        data: {
          schoolEmail: email,
        },
      })
    );
  };

  useEffect(() => {
    if (findIdDone) {
      setIdVisible(false);
      alert(`아이디 : ${findId}`);
      setEmail('');
    }
  }, [findIdDone]);

  const formWrapper = useMemo(() => ({ marginBottom: '40px' }), []);
  const formDivWrapper = useMemo(() => ({ width: '100%', margin: '0 auto' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
  const buttonWrapper = useMemo(() => ({ width: '100%', background: '#13c276' }), []);
  const emailErrorWrapper = useMemo(() => ({ color: 'red' }), []);

  return (
    <Form style={formWrapper}>
      <div style={formDivWrapper}>
        <br />
        <Row gutter={8}>
          <Col span={18}>
            <Input
              prefix={<MailOutlined style={prefixWrapper} />}
              name="user-email"
              placeholder="학내 이메일 (@office.skhu.ac.kr)"
              value={email}
              required
              onChange={onChangeEmailCheck}
            />
            {emailError && <div style={emailErrorWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
          </Col>
          <Col span={6}>
            <Button type="primary" style={buttonWrapper} onClick={onFindId}>전송</Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

FindId.propTypes = {
  setIdVisible: PropTypes.bool,
}.isRequired;

export default FindId;
