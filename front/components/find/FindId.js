import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Form, Input, Button, Row, Col, message } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { EMAIL_FIND_REQUEST } from "../../reducers/user";

const FindId = ({ setIdVisible }) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const dispatch = useDispatch();
    const { findEmailCheck } = useSelector(state => state.user);
    const onChangeEmailCheck = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    }, [email]);

    const onEmailFind = () => {
        dispatch({
            type: EMAIL_FIND_REQUEST,
            data: {
                schoolEmail: email
            }
        });
    };

    useEffect(() => {
        if (findEmailCheck) {
            setIdVisible(false);
            message.success('작성하신 이메일로 아이디를 전송하였습니다.');
        }
    }, [findEmailCheck]);

    const formWrapper = useMemo(() => ({ marginBottom: '40px' }), []);
    const formDivWrapper = useMemo(() => ({ width: '100%', margin: '0 auto' }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
    const buttonWrapper = useMemo(() => ({ width: '100%', background: '#13c276', }), []);
    const emailErrorWrapper = useMemo(() => ({ color: 'red' }), []);

    return (
        <Form style={formWrapper}>
            <div style={formDivWrapper}>
                <br />
                <Row gutter={8}>
                    <Col span={18}>
                        <Input
                            prefix={<MailOutlined style={prefixWrapper} />}
                            name="user-email" placeholder='학내 이메일 (@office.skhu.ac.kr)' value={email} required onChange={onChangeEmailCheck}
                        />
                        {emailError && <div style={emailErrorWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={buttonWrapper} onClick={onEmailFind} >전송</Button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
};

export default FindId;