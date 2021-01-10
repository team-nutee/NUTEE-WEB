import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Paper from "@material-ui/core/Paper";
import axios from 'axios';
import { END } from 'redux-saga';
import { Form, Input, Checkbox, Button, Row, Col, Modal, Select } from 'antd';
import { IdcardOutlined, LockOutlined, UserOutlined, MailOutlined, SafetyOutlined, BookOutlined } from '@ant-design/icons';

import {
    LOAD_USER_REQUEST,
    ID_CHECK_REQUEST,
    NICKNAME_CHECK_REQUEST,
    EMAIL_CHECK_REQUEST,
    OTP_CHECK_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_RESET
} from "../reducers/user";
import useInput from '../hooks/useInput';
import Terms from '../components/Terms';
import wrapper from '../store/configureStore';

import { interestsData } from "../components/dummy/interests"; //dummy + a
import { majorsData } from "../components/dummy/majors"; //dummy + a

const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value: PropTypes.string
};

const Signup = () => {
    const [id, onChangeId, setId] = useInput('');
    const [idCheck, setIdCheck] = useState('');
    const [idError, setIdError] = useState(false);

    const [nick, onChangeNick, setNick] = useInput('');
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [nicknameError, setNicknameError] = useState(false);

    const [otp, onChangeOtp, setOtp] = useInput('');

    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    const [password, onChangePassword, setPassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    /* 현재 추가한 것 */
    const [major1, onChangeMajor1, setMajor1] = useState('');
    const [major2, onChangeMajor2, setMajor2] = useState(null);
    const [interests, onChangeInterests, setInterests] = useState([]);
    const [inter, onChangeInter, setInter] = useState([]);
    //const { category } = useSelector(state => state.post.category);
    const [termsVisible, setTermsVisible] = useState(false);

    const dispatch = useDispatch();
    const { isSigningUp, isSignedUp, me, emailCheck, otpCheck } = useSelector(state => state.user);


    const paperWrapper = useMemo(() => ({ padding: '65px 0', background: '#f0faf5' }), []);
    const paperdivWrapper = useMemo(() => ({ padding: '5vh 0', background: '#f0faf5' }), []);
    const h1Wrapper = useMemo(() => ({ textAlign: "center" }), []);
    const divFormWrapper = useMemo(() => ({ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', }), []);
    const formWrapper = useMemo(() => ({ background: '#f0faf5', width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', padding: '10', }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, .25)' }), []);
    const signupErrorWrapper = useMemo(() => ({ color: 'red' }), []);
    const signupWrapper = useMemo(() => ({ color: 'green' }), []);
    const buttonWrapper = useMemo(() => ({ width: '100%' }), []);
    const button2Wrapper = useMemo(() => ({ background: '#13c276', borderColor: "white" }), []);
    const divWrapper = useMemo(() => ({ width: '100px', margin: '0 auto', }), []);
    const checkboxWrapper = useMemo(() => ({ margin: '0px 5px 5px 0px' }), []);
    const termsWrapper = useMemo(() => ({ color: '#005000', }), []);


    const termsOk = () => {
        setTermsVisible(false);
    };
    const termsCancel = () => {
        setTermsVisible(false);
    };

    const { Option } = Select;

    useEffect(() => {
        if (me) {
            Router.push('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if (isSignedUp) {
            alert('회원가입 성공');
            dispatch({
                type: SIGN_UP_RESET
            });
        }
    }, [isSignedUp]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!id) {
            return setIdError(true);
        }
        if (!nick) {
            return setNicknameError(true);
        }
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        if (!email) {
            return setEmailError(true);
        }
        if (!emailCheck) {
            alert('이메일이 인증되지 않았습니다.');
            return;
        }
        if (!otpCheck) {
            alert('otp 인증이 완료되지 않았습니다.');
            return;
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nick,
                schoolEmail: email,
                majors: [major1, major2],
                interests: [...inter],
            }
        });
        if (!isSignedUp) {
            setId('');
            setNick('');
            setPassword('');
            setPasswordCheck('');
            setEmail('');
            setInter('');
            setMajor1('');
            setOtp('');
            setTerm(false);
        }
    }, [id, nick, password, interestsData, passwordCheck, term]);

    const onEmailCheck = () => {
        if (!email.includes('@office.skhu.ac.kr')) {
            alert('이메일을 잘못 입력하셨습니다.');
            return;
        }
        alert('이메일 인증 절차를 진행해주세요.');
        dispatch({
            type: EMAIL_CHECK_REQUEST,
            data: {
                schoolEmail: email,
            }
        });
    };

    const onOtpCheck = () => {
        dispatch({
            type: OTP_CHECK_REQUEST,
            data: {
                otp: otp,
            }
        });
    };

    const onIdCheck = () => {
        dispatch({
            type: ID_CHECK_REQUEST,
            data: {
                userId: id,
            }
        });
    };
    const onNicknameCheck = () => {
        dispatch({
            type: NICKNAME_CHECK_REQUEST,
            data: {
                nickname: nick,
            }
        });
    };
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const onChangeEmailCheck = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    }, [email]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [term]);

    return (
        <Paper zDepth={1}>
            <div style={paperWrapper}>
                <div style={paperdivWrapper}>
                    <h1 style={h1Wrapper}>회원가입</h1>
                    <h3 style={h1Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
                    <br />
                    <div style={divFormWrapper}>
                        <Form onSubmit={onSubmit} style={formWrapper}>
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input
                                        prefix={<IdcardOutlined style={prefixWrapper} />}
                                        name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                                    />
                                    {idError && <div style={signupErrorWrapper}>중복된 아이디입니다.</div>}
                                    {idCheck
                                        ? <div style={signupWrapper}>사용 가능한 아이디입니다.</div>
                                        : <></>
                                    }
                                </Col>
                                <Col span={7}>
                                    {idCheck
                                        ? <Button disabled style={buttonWrapper} onClick={onIdCheck}>ID 확인</Button>
                                        : <Button style={buttonWrapper} onClick={onIdCheck}>ID 확인</Button>
                                    }
                                </Col>
                            </Row>

                            <br />
                            <Row gutter={8}>

                                <Col span={15}>
                                    <Input
                                        prefix={<UserOutlined style={prefixWrapper} />}
                                        name="user-nick" value={nick} placeholder='닉네임' required onChange={onChangeNick}
                                    />
                                    {nicknameError && <div style={signupErrorWrapper}>중복된 닉네임입니다.</div>}
                                    {nicknameCheck
                                        ? <div style={signupWrapper}>사용 가능한 닉네임입니다.</div>
                                        : <></>
                                    }
                                </Col>
                                <Col span={9}>
                                    {nicknameCheck
                                        ? <Button disabled style={buttonWrapper} onClick={onNicknameCheck}>닉네임 확인</Button>
                                        : <Button style={buttonWrapper} onClick={onNicknameCheck}>닉네임 확인</Button>
                                    }
                                </Col>
                            </Row>
                            <div>

                            </div>
                            <br />
                            <div>
                                <Input
                                    prefix={<LockOutlined style={prefixWrapper} />}
                                    name="user-password" type="password" placeholder='비밀번호'
                                    value={password} required onChange={onChangePassword}
                                />
                            </div>
                            <br />
                            <div>
                                <Input
                                    prefix={<LockOutlined style={prefixWrapper} />}
                                    name="user-password-check" type="password" placeholder='비밀번호 확인'
                                    value={passwordCheck} required onChange={onChangePasswordCheck}
                                />
                                {passwordError && <div style={signupErrorWrapper}>비밀번호가 일치하지 않습니다.</div>}
                            </div>
                            <br />
                            <div>
                                <Row gutter={8}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<MailOutlined style={prefixWrapper} />}
                                            name="user-email" placeholder='이메일(@office.skhu.ac.kr)' value={email} required onChange={onChangeEmailCheck}
                                        />
                                        {emailError && <div style={signupErrorWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
                                        {emailCheck
                                            ? <div style={signupWrapper}>사용 가능한 이메일입니다.</div>
                                            : <></>
                                        }
                                    </Col>
                                    <Col span={9}>
                                        {emailCheck
                                            ? <Button disabled style={buttonWrapper} onClick={onEmailCheck} >이메일 인증</Button>
                                            : <Button style={buttonWrapper} onClick={onEmailCheck} >이메일 인증</Button>
                                        }
                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <>
                                <div>
                                    <Row>
                                        <Select
                                            prefix={ <BookOutlined style={prefixWrapper} />}
                                            placeholder="전공1 or 학부를 선택해주세요." name="user-major1"
                                            value={major1} onChange={onChangeMajor1}
                                        >
                                            {majorsData.map(majorsData => (
                                                <Option value={majorsData.value}>{majorsData.label}</Option>
                                            ))}
                                        </Select>
                                    </Row>
                                </div >
                                <br />
                                <div>
                                    <Row>
                                        <Select
                                            prefix={ <BookOutlined style={prefixWrapper} />}
                                            placeholder="전공2을 선택해주세요." name="user-major2"
                                            value={major2} onChange={onChangeMajor2}
                                        >
                                            {majorsData.map((majorsData) => (
                                                <Option value={majorsData.value}>{majorsData.label}</Option>
                                            ))}
                                        </Select>
                                    </Row>
                                </div>
                            </>
                            <br />
                            <div>
                                <Row>
                                    <Select
                                        mode="multiple" allowClear placeholder="선호하는 카테고리를 설정해주세요."
                                        name="user-interests" value={inter} onChange={onChangeInter}
                                    >
                                        {interestsData.map(inter => (
                                            <Option value={inter.value}>{inter.label}</Option>
                                        ))}
                                    </Select>
                                </Row>
                            </div>
                            <div>
                                {emailCheck ? <></> : <br />}
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <Input
                                            prefix={<SafetyOutlined style={prefixWrapper} />}
                                            name="user-otp" value={otp} placeholder='otp' required onChange={onChangeOtp}
                                        />
                                        {otpCheck
                                            ? <div style={signupWrapper}>otp가 인증되었습니다.</div>
                                            : <></>
                                        }
                                    </Col>
                                    <Col span={7}>
                                        {otpCheck
                                            ? <Button disabled style={buttonWrapper} onClick={onOtpCheck}>otp 확인</Button>
                                            : <Button style={buttonWrapper} onClick={onOtpCheck}>otp 확인</Button>
                                        }
                                    </Col>
                                </Row>
                            </div>
                                {otpCheck ? <></> : <br />}
                            <div>
                                <Checkbox style={checkboxWrapper} name="user-term" value={term} onChange={onChangeTerm} />
                                <a style={termsWrapper} onClick={setTermsVisible}><b>NUTEE 회원 약관</b></a>에 동의합니다.
                                {termError && <div style={signupWrapper}>약관에 동의하셔야 합니다.</div>}
                            </div>
                            <br />
                            <div style={divWrapper}>
                                <Button style={button2Wrapper}
                                    type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                            </div>
                            <br />
                        </Form>
                    </div>
                </div>
            </div>
            <Modal
                visible={termsVisible}
                onOk={termsOk}
                onCancel={termsCancel}
                footer={null}
                closable={false}
                title='NUTEE 회원 약관'
                width={470}
            >
            <Terms setTermsVisible={setTermsVisible} />
            </Modal>
        </Paper>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start_signup');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Signup;