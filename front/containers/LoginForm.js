import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Row, Col, Icon, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';
import Paper from "@material-ui/core/Paper";
import FindId from "../components/FindId";
import FindPw from "../components/FindPw";
import Link from "next/link";

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { isLoggingIn, loginError } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [idVisible, setIdVisible] = useState(false);
    const [pwVisible, setPwVisible] = useState(false);

    /*  id&password 찾기  */
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

    return (
        <Paper zDepth={1} style={{ height: '100vh', minWidth: '320px', background: '#f0faf5' }} >
            <div style={{ background: '#f0faf5', padding: '30vh 0' }}>
                <h1 style={{ textAlign: "center", padding: '5vh auto' }}>로그인</h1>
                <h3 style={{ textAlign: "center" }}>NUTEE에 오신것을 환영합니다!</h3>
                <Form onSubmit={onSubmitForm}>
                    <Col>
                        <Row gutter={8}>
                            <div style={{ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', }}>
                                <Input
                                    prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                                />
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8}>
                            <div style={{ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto' }}>
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    name="user-password" type="password" placeholder='비밀번호'
                                    value={password} required onChange={onChangePassword}
                                />
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8}>
                            <div style={{ width: '100px', margin: '0 auto', }}>
                                <Button style={{ background: '#13c276', borderColor: "white", width: '100px' }}
                                    type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                            </div>
                        </Row>
                        <br />
                        <Row gutter={8}>
                            <div style={{ fontSize: '12px', width: '35vw', minWidth: '150px', maxWidth: '200px', margin: '0 auto' }}>
                                <a style={{ float: 'left', margin: '0 auto' }} onClick={setIdVisible} >아이디 찾기</a>
                                <a style={{ float: 'right', margin: '0 auto' }} onClick={setPwVisible}>비밀번호 찾기</a>
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