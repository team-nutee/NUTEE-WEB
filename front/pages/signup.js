import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input, Checkbox, Button, Row, Col, Modal } from 'antd';
import axios from 'axios';
import { END } from 'redux-saga';
import Select from 'react-select';
import { IdcardOutlined, LockOutlined, UserOutlined, MailOutlined, SafetyOutlined, BookOutlined } from '@ant-design/icons';
import {
    LOAD_MY_INFO_REQUEST,
    CHECK_ID_REQUEST,
    CHECK_NICKNAME_REQUEST,
    SEND_OPT_REQUEST,
    CHECK_DUPLICATE_EMAIL_REQUEST,
    CHECK_OTP_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_RESET
} from "../reducers/user";
import useInput from '../hooks/useInput';
import Terms from '../components/Terms';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import { interestsData, majorsData } from '../components/dummy'; //dummy 

const TextInput = ({ value }) => { return (<div>{value}</div>) };
TextInput.propTypes = { value: PropTypes.string };

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
    const [interests, setInterests] = useState([]);
    const [major, setMajor] = useState([]);
    const [majorError, setMajorError] = useState(false);
    const [termsVisible, setTermsVisible] = useState(false);
    const dispatch = useDispatch();
    const { isSignUpLoading, isSignUpDone, isSignUpError, me, checkEmail, checkOtp, checkId, checkNickname } = useSelector(state => state.user);

    const termsOk = () => setTermsVisible(false);
    const termsCancel = () => setTermsVisible(false);

    useEffect(() => {
        if (me && me.id) 
            Router.replace('/');
    }, [me && me.id]);

    useEffect(() => {
        if (isSignUpDone) {
            alert('회원가입 성공');
            dispatch({
                type: SIGN_UP_RESET
            });
            Router.replace('/');
        }
    }, [isSignUpDone]);

    useEffect(() => {
        if (isSignUpError)
          alert(isSignUpError);
      }, [isSignUpError]);

    const onSubmit = useCallback(() => {
        if (!id)
            return setIdError(true);
        if (!nickname)
            return setNicknameError(true);
        if (password !== checkPassword)
            return setPasswordError(true);
        if (!term)
            return setTermError(true);
        if (!email)
            return setEmailError(true);
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
                majors: major,
                interests: interests,
            }
        });
        if (isSignUpDone) {
            setId('');
            setNickname('');
            setPassword('');
            setCheckPassword('');
            setEmail('');
            setInterests([]);
            setMajor([]);
            setOtp('');
            setTerm(false);
        }
    }, [id, nickname, password, checkPassword, term, major, interests]);

    const onCheckEmail = () => {
        if (!email.includes('@office.skhu.ac.kr')) {
            alert('이메일을 잘못 입력하셨습니다.');
            return;
        }
        dispatch({
            type: SEND_OPT_REQUEST, //이메일 인증 -> OTP 전송
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
        if (nickname.length > 12) {
            alert('닉네임은 최대 12자까지 가능합니다.');
            return;
        }
        dispatch({
            type: CHECK_NICKNAME_REQUEST,
            data: {
                nickname: nickname,
            }
        });
    };
    const onChangeCheckPassword = useCallback((e) => {
        setCheckPassword(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const onChangeEmail = useCallback((e) => {
        dispatch({
            type: CHECK_DUPLICATE_EMAIL_REQUEST, //중복된 이메일 확인
            data: {
                schoolEmail: email,
            }
        });
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    }, [email]);

    const onChangeMajor = useCallback(() => {
        if (major.length > 2) {
            alert('전공을 다시 선택해주세요. 전공은 3개 이상 불가합니다.');
            setMajorError(true);
            return;
        }
    }, [major]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, [term]);

    const paperWrapper = useMemo(() => ({ width: '35vw', minWidth: '340px', maxWidth: '450px', margin: '85px 0 auto 0' }), []);
    const h1Wrapper = useMemo(() => ({ textAlign: "center" }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, .25)' }), []);
    const failureWrapper = useMemo(() => ({ color: 'red' }), []);
    const successWrapper = useMemo(() => ({ color: 'green' }), []);
    const buttonWrapper = useMemo(() => ({ color: 'white', background: '#13c276', width: '100%', border: '1px solid white' }), []);
    const majorButtonWrapper = useMemo(() => ({ color: 'white', background: '#13c276', width: '100%', border: '1px solid white', height: '39px' }), []);
    const signupWrapper = useMemo(() => ({ width: '100px', margin: '0 auto' }), []);
    const checkboxWrapper = useMemo(() => ({ margin: '0px 5px 5px 0px' }), []);
    const termsWrapper = useMemo(() => ({ color: '#005000' }), []);
    const selectStyles = useMemo(() => ({ menu: (css) => ({ ...css, zIndex: 999 }) }), []);

    return (
        <AppLayout>
            <div style={paperWrapper}>
                <h1 style={h1Wrapper}>회원가입</h1>
                <h3 style={h1Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
                <Form onFinish={onSubmit}>
                    {/* 아이디 */}
                    <Row gutter={8}>
                        <Col span={17}>
                            <Input
                                prefix={<IdcardOutlined style={prefixWrapper} />}
                                name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                            />
                            {idError && <div style={failureWrapper}>중복된 아이디입니다.</div>}
                            {checkId ? <div style={failureWrapper}>사용 가능한 아이디입니다.</div> : <></>}
                        </Col>
                        <Col span={7}>
                            {checkId
                                ? <Button disabled style={buttonWrapper} onClick={onCheckId}>ID 확인</Button>
                                : <Button style={buttonWrapper} onClick={onCheckId}>ID 확인</Button>}
                        </Col>
                    </Row>
                    <br />
                    {/* 닉네임 */}
                    <Row gutter={8}>
                        <Col span={15}>
                            <Input
                                prefix={<UserOutlined style={prefixWrapper} />}
                                name="user-nick" value={nickname} placeholder='닉네임' required onChange={onChangeNickname}
                            />
                            {nicknameError && <div style={failureWrapper}>중복된 닉네임입니다.</div>}
                            {checkNickname ? <div style={successWrapper}>사용 가능한 닉네임입니다.</div> : <></>}
                        </Col>
                        <Col span={9}>
                            {checkNickname
                                ? <Button disabled style={buttonWrapper} onClick={onCheckNickname}>닉네임 확인</Button>
                                : <Button style={buttonWrapper} onClick={onCheckNickname}>닉네임 확인</Button>}
                        </Col>
                    </Row>
                    <br />
                    {/* 비밀번호 */}
                    <Row>
                        <Input
                            prefix={<LockOutlined style={prefixWrapper} />}
                            name="user-password" type="password" placeholder='비밀번호'
                            value={password} required onChange={onChangePassword}
                        />
                    </Row>
                    <br />
                    <Row>
                        <Input
                            prefix={<LockOutlined style={prefixWrapper} />}
                            name="user-check-password" type="password" placeholder='비밀번호 확인'
                            value={checkPassword} required onChange={onChangeCheckPassword}
                        />
                        {passwordError && <div style={failureWrapper}>비밀번호가 일치하지 않습니다.</div>}
                    </Row>
                    <br />
                    {/* 이메일 */}
                    <Row gutter={8}>
                        <Col span={15}>
                            <Input
                                prefix={<MailOutlined style={prefixWrapper} />}
                                name="user-email" placeholder='이메일(@office.skhu.ac.kr)' value={email} required onChange={onChangeEmail}
                            />
                            {emailError && <div style={failureWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
                            {checkEmail ? <div style={successWrapper}>사용 가능한 이메일입니다.</div> : <></>}
                        </Col>
                        <Col span={9}>
                            {checkEmail
                                ? <Button disabled style={buttonWrapper} onClick={onCheckEmail} >이메일 인증</Button>
                                : <Button style={buttonWrapper} onClick={onCheckEmail} >이메일 인증</Button>}
                        </Col>
                    </Row>
                    <br />
                    {/* OTP */}
                    <Row gutter={8}>
                        <Col span={17}>
                            <Input
                                prefix={<SafetyOutlined style={prefixWrapper} />}
                                name="user-otp" value={otp} placeholder='otp' required onChange={onChangeOtp}
                            />
                            {checkOtp ? <div style={successWrapper}>otp가 인증되었습니다.</div> : <></>}
                        </Col>
                        <Col span={7}>
                            {checkOtp
                                ? <Button disabled style={buttonWrapper} onClick={onCheckOtp}>otp 확인</Button>
                                : <Button style={buttonWrapper} onClick={onCheckOtp}>otp 확인</Button>}
                        </Col>
                    </Row>
                    <br />
                    {/* 전공 */}
                    <Row gutter={8}>
                        <Col span={18}>
                            <Select
                                isMulti
                                autoFocus
                                placeholder="학부 또는 전공을 선택해주세요."
                                name="user-majors"
                                menuPlacement="top"
                                onChange={setMajor}
                                options={majorsData}
                                styles={selectStyles}
                            />
                        </Col>
                        <Col span={6}>
                            {majorError
                                ? <Button disabled style={majorButtonWrapper} onClick={onChangeMajor}>확인</Button>
                                : <Button style={majorButtonWrapper} onClick={onChangeMajor}>확인</Button>}
                        </Col>
                    </Row>
                    <br />
                    {/* 카테고리 */}
                    <Row>
                        <Select
                            isMulti
                            autoFocus
                            placeholder="선호하는 카테고리를 선택해주세요."
                            styles={selectStyles}
                            name="user-interests"
                            menuPlacement="top"
                            onChange={setInterests}
                            options={interestsData}
                        />
                    </Row>
                    <br />
                    {/* 약관 */}
                    <Checkbox style={checkboxWrapper} name="user-term" value={term} onChange={onChangeTerm} />
                    <a style={termsWrapper} onClick={setTermsVisible}><b>NUTEE 회원 약관</b></a>에 동의합니다.
                                {termError && <div style={failureWrapper}>약관에 동의하셔야 합니다.</div>}
                    <br />
                    <br />
                    {/* 회원가입 버튼 */}
                    <div style={signupWrapper}>
                        <Button style={buttonWrapper} type="primary" htmlType="submit" loading={isSignUpLoading}>회원가입</Button>
                    </div>
                    <br />
                </Form>
            </div>
            <Modal
                visible={termsVisible}
                onOk={termsOk}
                onCancel={termsCancel}
                footer={null}
                closable={false}
                title='NUTEE 회원 약관'
                width={470}
            ><Terms setTermsVisible={setTermsVisible} />
            </Modal>
        </AppLayout>
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