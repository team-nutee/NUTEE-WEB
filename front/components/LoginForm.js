/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Divider, Form, Input, Button, Row, Col, Modal } from 'antd';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';
import FindId from './find/FindId';
import FindPw from './find/FindPassword';

const LoginForm = () => {
  const [userId, onChangeUserId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLogInLoading, isLogInError } = useSelector((state) => state.user);
  const [idVisible, setIdVisible] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogInError) alert(isLogInError);
  }, [isLogInError]);

  const onSubmitForm = useCallback(() => {
    console.log(userId, password);
    dispatch(loginRequestAction({ userId, password }));
  }, [userId, password]);

  const idOk = () => {
    setIdVisible(false);
  };
  const idCancel = () => {
    setIdVisible(false);
  };
  const pwOk = () => {
    setPwVisible(false);
  };
  const pwCancel = () => {
    setPwVisible(false);
  };

  const paperWrapper = useMemo(() => ({ padding: '30vh 0 20vh 0' }), []);
  const h1Wrapper = useMemo(() => ({ textAlign: 'center', padding: '5vh auto' }), []);
  const h3Wrapper = useMemo(() => ({ textAlign: 'center' }), []);
  const formWrapper = useMemo(() => ({ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', border: '3px solid #c8e6d7', background: '#c8e6d7', borderRadius: '5px' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
  const loginWrapper = useMemo(() => ({ width: '100px', margin: '0 auto', background: '#f0faf5' }), []);
  const loginButtonWrapper = useMemo(() => ({ background: '#13c276', borderColor: 'white', width: '100px' }), []);
  const idpwWrapper = useMemo(() => ({ width: '320px', margin: '10px auto' }), []);
  const leftWrapper = useMemo(() => ({ fontWeight: 'bold', fontSize: '15px', width: '30%', float: 'left', color: '#005000' }), []);
  const signupButtonWrapper = useMemo(() => ({ fontWeight: 'bold', fontSize: '15px', width: '40%', float: 'left', textAlign: 'center', color: '#005000' }), []);
  const rightWrapper = useMemo(() => ({ fontWeight: 'bold', fontSize: '15px', width: '30%', float: 'right', textAlign: 'right', color: '#005000' }), []);
  const errorWrapper = useMemo(() => ({ textAlign: 'center', color: 'red' }), []);

  return (
    <>
      <div style={paperWrapper}>
        <Divider><h1 style={h1Wrapper}>로그인</h1></Divider>
        <h3 style={h3Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
        <Form onFinish={onSubmitForm}>
          <Col>
            <Row gutter={8}>
              <div style={formWrapper}>
                <Input
                  prefix={<IdcardOutlined style={prefixWrapper} />}
                  name="user-id"
                  value={userId}
                  placeholder="아이디"
                  required
                  onChange={onChangeUserId}
                />
              </div>
            </Row>
            <br />
            <Row gutter={8}>
              <div style={formWrapper}>
                <Input
                  prefix={<LockOutlined style={prefixWrapper} />}
                  name="user-password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  required
                  onChange={onChangePassword}
                />
              </div>
            </Row>
            {isLogInError && (
            <div style={errorWrapper}>
              아이디 또는 비밀번호가 잘못된 정보입니다.
            </div>
            )}
            <br />
            <Row gutter={8}>
              <div style={loginWrapper}>
                <Button
                  style={loginButtonWrapper}
                  type="primary"
                  htmlType="submit"
                  loading={isLogInLoading}
                >
                  로그인
                </Button>
              </div>
            </Row>
            <br />
            <Row gutter={8} style={idpwWrapper}>
              <div>
                <a style={leftWrapper} onClick={setIdVisible}>아이디 찾기</a>
              </div>
              <div>
                <Link href="/signup">
                  <a style={signupButtonWrapper}>회원가입</a>
                </Link>
              </div>
              <div>
                <a style={rightWrapper} onClick={setPwVisible}>
                  비밀번호 찾기
                </a>
              </div>
            </Row>
          </Col>
        </Form>
      </div>

      <Modal
        visible={idVisible}
        onOk={idOk}
        onCancel={idCancel}
        footer={null}
        closable={false}
        title="아이디 찾기"
      >
        <FindId setIdVisible={setIdVisible} />
      </Modal>
      <Modal
        visible={pwVisible}
        onOk={pwOk}
        onCancel={pwCancel}
        footer={null}
        closable={false}
        title="비밀번호 찾기"
      >
        <FindPw setPwVisible={setPwVisible} />
      </Modal>
    </>
  );
};

export default LoginForm;
