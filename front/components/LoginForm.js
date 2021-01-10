import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import { IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import Link from "next/link";
import Router from 'next/router';
import useInput from '../hooks/useInput';
import Paper from "@material-ui/core/Paper";
import FindId from "./find/FindId";

import FindPw from "./find/FindPw";

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { isLoggingIn, loginError } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [idVisible, setIdVisible] = useState(false);
    const [pwVisible, setPwVisible] = useState(false);

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
  
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            },
        });
    }, [id, password]);

    const paperWrapper = useMemo(() => ({ background: '#f0faf5', padding: '30vh 0' }), []); //'#f0faf5'
    const h1Wrapper = useMemo(() => ({ textAlign: 'center', padding: '5vh auto' }), []);
    const h3Wrapper = useMemo(() => ({ textAlign: 'center' }), []);
    const formWrapper = useMemo(() => ({ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
    const loginWrapper = useMemo(() => ({ width: '100px', margin: '0 auto', }), []);
    const loginButtonWrapper = useMemo(() => ({ background: '#13c276', borderColor: "white", width: '100px' }), []);
    const idpwWrapper = useMemo(() => ({ width: '320px', margin: '10px auto', }), []); 
    const leftWrapper = useMemo(() => ({ fontSize: '15px', width: '30%', float: 'left', color: '#005000', }), []);
    const signupButtonWrapper = useMemo(() => ({  fontSize: '15px', width: '40%',  float: 'left', textAlign: 'center', color: '#005000',}), []);
    const rightWrapper = useMemo(() => ({ fontSize: '15px', width: '30%',  float: 'right', textAlign: 'right', color: '#005000',}), []);

    return (
        <Paper zDepth={1}>
            <div style={paperWrapper}>
                <h1 style={h1Wrapper}>로그인</h1>
                <h3 style={h3Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
                <Form onSubmit={onSubmitForm}>
                    <Col>
                        <Row gutter={8}>
                            <div style={formWrapper}>
                                <Input
                                    prefix={<IdcardOutlined style={prefixWrapper} />}
                                    name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                                />
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8}>
                            <div style={formWrapper}>
                                <Input
                                    prefix={<LockOutlined style={prefixWrapper} />}
                                    name="user-password" type="password" placeholder='비밀번호'
                                    value={password} required onChange={onChangePassword}
                                />
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8}>
                            <div style={loginWrapper}>
                                <Button style={loginButtonWrapper}
                                    type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8} style={idpwWrapper}>
                            <div>
                                <a style={leftWrapper} onClick={setIdVisible} >아이디 찾기</a>
                            </div>
                            <div >
                                <Link href="/signup">
                                    <a style={signupButtonWrapper}><b>회원가입</b></a>
                                </Link>
                            </div>
                            <div>
                                <a style={rightWrapper} onClick={setPwVisible}>비밀번호 찾기</a>
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
                title='아이디 찾기'
            >
                <FindId setIdVisible={setIdVisible} />
            </Modal>
            <Modal
                visible={pwVisible}
                onOk={pwOk}
                onCancel={pwCancel}
                footer={null}
                closable={false}
                title='비밀번호 찾기'
            >
                <FindPw setPwVisible={setPwVisible} />
            </Modal>
        </Paper>
    );
};

export default LoginForm;