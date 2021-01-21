import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { Form, Input, Checkbox, Select, Button, Row, Col, Modal } from 'antd';
import { IdcardOutlined, LockOutlined, UserOutlined, MailOutlined, SafetyOutlined, BookOutlined } from '@ant-design/icons';

import {
    LOAD_USER_REQUEST,
    LOAD_MY_INFO_REQUEST,
    CHECK_ID_REQUEST,
    CHECK_NICKNAME_REQUEST,
    CHECK_EMAIL_REQUEST,
    CHECK_DUPLICATE_EMAIL_REQUEST,
    CHECK_OTP_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_RESET
} from "../reducers/user";
import useInput from '../hooks/useInput';
import Terms from '../components/Terms';
import wrapper from '../store/configureStore';

import { interestsData } from "../components/dummy"; //dummy + a
import { majorsData } from "../components/dummy"; //dummy + a

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
    const [idError, setIdError] = useState(false);

    const [nickname, onChangeNickname, setNickname] = useInput('');
    const [nicknameError, setNicknameError] = useState(false);

    const [otp, onChangeOtp, setOtp] = useInput('');

    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    const [password, onChangePassword, setPassword] = useInput('');
    const [checkPassword, setCheckPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [major1, onChangeMajor1, setMajor1] = useState('');
    const [major2, onChangeMajor2, setMajor2] = useState(null);
    const [inter, onChangeInter, setInter] = useState([]);
    const [termsVisible, setTermsVisible] = useState(false);
    
    const dispatch = useDispatch();
    const { isSignUpLoading, isSignUpDone, me, checkEmail, checkOtp, checkId, checkNickname } = useSelector(state => state.user);

    const paperWrapper = useMemo(() => ({ padding: '65px 0', background: '#f0faf5' }), []);
    const paperdivWrapper = useMemo(() => ({ padding: '5vh 0', background: '#f0faf5' }), []);
    const h1Wrapper = useMemo(() => ({ textAlign: "center" }), []);
    const divFormWrapper = useMemo(() => ({ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', }), []);
    const formWrapper = useMemo(() => ({ background: '#f0faf5', width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', padding: '10', }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, .25)' }), []);
    const signupErrorWrapper = useMemo(() => ({ color: 'red' }), []);
    const signupWrapper = useMemo(() => ({ color: 'green' }), []);
    const buttonWrapper = useMemo(() => ({ color: 'white', background: '#13c276', width: '100%' }), []);
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
        if (me && me.id) {
          Router.replace('/');
        }
      }, [me && me.id]);

    useEffect(() => {
        if (isSignUpDone) {
            alert('회원가입 성공');
            dispatch({
                type: SIGN_UP_RESET
            });
        }
    }, [isSignUpLoading]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (!id) {
            return setIdError(true);
        }
        if (!nickname) {
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
        if (!checkEmail) {
            alert('이메일이 인증되지 않았습니다.');
            return;
        }
        if (!checkOtp) {
            alert('otp 인증이 완료되지 않았습니다.');
            return;
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nickname,
                schoolEmail: email,
                majors: [major1, major2],
                interests: [...inter],
            }
        });
        if (!isSignUpDone) {
            setId('');
            setNickname('');
            setPassword('');
            setPasswordCheck('');
            setEmail('');
            setInter('');
            setMajor1('');
            setOtp('');
            setTerm(false);
        }
    }, [id, nickname, password, checkPassword, term]);

    const onCheckEmail = () => {
        if (!email.includes('@office.skhu.ac.kr')) {
            alert('이메일을 잘못 입력하셨습니다.');
            return;
        }
        alert('이메일 인증 절차를 진행해주세요.');
        dispatch({
            type: CHECK_DUPLICATE_EMAIL_REQUEST, //중복된 이메일 확인
            data: {
                schoolEmail: email,
            }
        });
        dispatch({
            type: CHECK_EMAIL_REQUEST, //이메일 인증 -> OTP 전송
            data: {
                schoolEmail: email,
            }
        });
    };

    const onCheckOtp = () => {
        dispatch({
            type: CHECK_OTP_REQUEST,
            data: {
                otp: otp,
            }
        });
    };

    const onCheckId = () => {
        dispatch({
            type: CHECK_ID_REQUEST,
            data: {
                userId: id,
            }
        });
    };
    const onCheckNickname = () => {
        dispatch({
            type: CHECK_NICKNAME_REQUEST,
            data: {
                nickname: nickname,
            }
        });
    };
    const onChangeCheckPassword = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const onChangeCheckEmail = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    }, [email]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [term]);

    return (
        <>
            <div style={paperWrapper}>
                <div style={paperdivWrapper}>
                    <h1 style={h1Wrapper}>회원가입</h1>
                    <h3 style={h1Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
                    <br />
                    <div style={divFormWrapper}>
                        <Form onFinish={onSubmit} style={formWrapper}>
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input
                                        prefix={<IdcardOutlined style={prefixWrapper} />}
                                        name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                                    />
                                    {idError && <div style={signupErrorWrapper}>중복된 아이디입니다.</div>}
                                    {checkId
                                        ? <div style={signupWrapper}>사용 가능한 아이디입니다.</div>
                                        : <></>
                                    }
                                </Col>
                                <Col span={7}>
                                    {checkId
                                        ? <Button disabled style={buttonWrapper} onClick={onCheckId}>ID 확인</Button>
                                        : <Button style={buttonWrapper} onClick={onCheckId}>ID 확인</Button>
                                    }
                                </Col>
                            </Row>
                            <br />
                            <Row gutter={8}>
                                <Col span={15}>
                                    <Input
                                        prefix={<UserOutlined style={prefixWrapper} />}
                                        name="user-nick" value={nickname} placeholder='닉네임' required onChange={onChangeNickname}
                                    />
                                    {nicknameError && <div style={signupErrorWrapper}>중복된 닉네임입니다.</div>}
                                    {checkNickname
                                        ? <div style={signupWrapper}>사용 가능한 닉네임입니다.</div>
                                        : <></>
                                    }
                                </Col>
                                <Col span={9}>
                                    {checkNickname
                                        ? <Button disabled style={buttonWrapper} onClick={onCheckNickname}>닉네임 확인</Button>
                                        : <Button style={buttonWrapper} onClick={onCheckNickname}>닉네임 확인</Button>
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
                                    name="user-check-password" type="password" placeholder='비밀번호 확인'
                                    value={checkPassword} required onChange={onChangeCheckPassword}
                                />
                                {passwordError && <div style={signupErrorWrapper}>비밀번호가 일치하지 않습니다.</div>}
                            </div>
                            <br />
                            <div>
                                <Row gutter={8}>
                                    <Col span={15}>
                                        <Input
                                            prefix={<MailOutlined style={prefixWrapper} />}
                                            name="user-email" placeholder='이메일(@office.skhu.ac.kr)' value={email} required onChange={onChangeCheckEmail}
                                        />
                                        {emailError && <div style={signupErrorWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
                                        {checkEmail
                                            ? <div style={signupWrapper}>사용 가능한 이메일입니다.</div>
                                            : <></>
                                        }
                                    </Col>
                                    <Col span={9}>
                                        {checkEmail
                                            ? <Button disabled style={buttonWrapper} onClick={onCheckEmail} >이메일 인증</Button>
                                            : <Button style={buttonWrapper} onClick={onCheckEmail} >이메일 인증</Button>
                                        }
                                    </Col>
                                </Row>
                            </div>
                            <br />
                            <div>
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <Input
                                            prefix={<SafetyOutlined style={prefixWrapper} />}
                                            name="user-otp" value={otp} placeholder='otp' required onChange={onChangeOtp}
                                        />
                                        {checkOtp
                                            ? <div style={signupWrapper}>otp가 인증되었습니다.</div>
                                            : <></>
                                        }
                                    </Col>
                                    <Col span={7}>
                                        {checkOtp
                                            ? <Button disabled style={buttonWrapper} onClick={onCheckOtp}>otp 확인</Button>
                                            : <Button style={buttonWrapper} onClick={onCheckOtp}>otp 확인</Button>
                                        }
                                    </Col>
                                </Row>
                            </div>
                                {checkOtp ? <></> : <br />}
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
                                <Checkbox style={checkboxWrapper} name="user-term" value={term} onChange={onChangeTerm} />
                                <a style={termsWrapper} onClick={setTermsVisible}><b>NUTEE 회원 약관</b></a>에 동의합니다.
                                {termError && <div style={signupErrorWrapper}>약관에 동의하셔야 합니다.</div>}
                            </div>
                            <br />
                            <div style={divWrapper}>
                                <Button style={button2Wrapper}
                                    type="primary" htmlType="submit" loading={isSignUpLoading}>가입하기</Button>
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
        </>
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
        type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Signup;