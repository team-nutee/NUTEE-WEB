import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, Input, Button, message } from 'antd';
import { IdcardOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FIND_PASSWORD_REQUEST } from '../../reducers/user';

const FindPw = ({ setPwVisible }) => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const dispatch = useDispatch();
  const { findPwCheck } = useSelector((state) => state.user);
  const onChangeEmailCheck = useCallback((e) => {
    setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
    setEmail(e.target.value);
  }, [email]);
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, [id]);
  const onEmailFind = () => {
    dispatch({
      type: FIND_PASSWORD_REQUEST,
      data: {
        schoolEmail: email,
        userId: id,
      },
    });
  };
  useEffect(() => {
    if (findPwCheck) {
      setPwVisible(false);
      message.success('작성하신 이메일로 변경된 비밀번호를 전송하였습니다.');
    }
  }, [findPwCheck]);

  const formDivWrapper = useMemo(() => ({ width: '100%', margin: '0 auto' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
  const formDiv2Wrapper = useMemo(() => ({ width: '20%', margin: '0 auto' }), []);
  const buttonWrapper = useMemo(() => ({ width: '100%', background: '#13c276' }), []);
  const emailErrorWrapper = useMemo(() => ({ color: 'red' }), []);

  return (
    <Form>
      <div style={formDivWrapper}>
        <br />
        <Input
          prefix={<IdcardOutlined style={prefixWrapper} />}
          name="user-id"
          value={id}
          placeholder="아이디"
          required
          onChange={onChangeId}
        />
      </div>
      <div style={formDivWrapper}>
        <br />
        <Input
          prefix={<MailOutlined style={prefixWrapper} />}
          name="user-email"
          placeholder="학내 이메일 (@office.skhu.ac.kr)"
          value={email}
          required
          onChange={onChangeEmailCheck}
        />
        {emailError && <div style={emailErrorWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
        <br />
      </div>
      <div style={formDiv2Wrapper}>
        <br />
        <br />
        <Button type="primary" style={buttonWrapper} onClick={onEmailFind}>전송</Button>
      </div>
    </Form>
  );
};

FindPw.propTypes = {
  setPwVisible: PropTypes.bool,
}.isRequired;

export default FindPw;
