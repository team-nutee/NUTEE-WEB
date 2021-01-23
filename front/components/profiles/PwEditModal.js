import React, { useCallback, useState, useMemo } from 'react';
import { Avatar, Button, Col, Form, Input, Modal, Row } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { EDIT_NICKNAME_REQUEST, EDIT_PASSWORD_REQUEST, EDIT_PWCK_REQUEST } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_POSTS_REQUEST } from "../../reducers/post";

const PwEditModal = () => {
    const [visible, setVisible] = useState(false);
    const [editPWCK, setEditPWCK] = useState('');
    const [editPW, setEditPW] = useState('');
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = (e) => {
        setVisible(false);
    };

    const onChangePWCK = useCallback((e) => {
        setEditPWCK(e.target.value);
    }, []);

    const onEditPWCK = useCallback(async (e) => {
        e.preventDefault();
        await dispatch({
            type: EDIT_PWCK_REQUEST,
            data: editPWCK,
        });
    }, [editPWCK]);

    const onChangePW = useCallback((e) => {
        setEditPW(e.target.value);
    }, []);

    const onEditPW = useCallback(async (e) => {
        e.preventDefault();
        await dispatch({
            type: EDIT_PASSWORD_REQUEST,
            data: editPW,
        });
    }, [editPW]);

    const buttonWrapper = useMemo(() => ({ width: '220px', marginTop: '10px', float: 'right' }), []);
    const divWrapper = useMemo(() => ({ width: '52%', margin: '0 auto' }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);

    return (
        <div>
            <Button style={buttonWrapper} onClick={showModal}>
                비밀번호 변경
            </Button>
            <Modal
                title="비밀번호 변경"
                visible={visible}
                onOk={onEditPWCK}
                onCancel={handleCancel}
                footer={null}
            >
                <div style={divWrapper}>
                    <br />
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                prefix={<LockOutlined style={prefixWrapper} />}
                                type='password' placeholder='현재 비밀번호' name="user-password"
                                value={editPWCK} required onChange={onChangePWCK}
                            />
                        </Col>
                        <Col span={6}>
                            <Button onClick={onEditPWCK} >확인</Button>
                        </Col>
                    </Row>
                </div>
                <div style={divWrapper}>
                    <br />
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                prefix={<LockOutlined style={prefixWrapper} />}
                                type='password' placeholder='변경할 비밀번호' name="user-password2"
                                value={editPW} required onChange={onChangePW}
                            />
                        </Col>
                        <Col span={6}>
                            <Button onClick={onEditPW} >변경</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
};
export default PwEditModal;