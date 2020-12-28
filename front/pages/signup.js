import React, { useState, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Paper from "@material-ui/core/Paper";
import { Form, Input, Checkbox, Button, Row, Col, Icon, Modal, Select } from 'antd';
import {
    ID_CHECK_REQUEST,
    NICKNAME_CHECK_REQUEST,
    EMAIL_CHECK_REQUEST,
    OTP_CHECK_REQUEST,
    SIGN_UP_REQUEST, 
    SIGN_UP_RESET
} from "../reducers/user";
import useInput from '../hooks/useInput';
import FindId from "../components/find/FindId";
import FindPw from "../components/find/FindPw";
import { interestsData } from "../components/dummy/interests"; //dummy 
import { majorsData } from "../components/dummy/majors"; //dummy 

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
    
    const dispatch = useDispatch();
    const { isSigningUp, isSignedUp, me, emailCheck, otpCheck } = useSelector(state => state.user);
    const [idVisible, setIdVisible] = useState(false);
    const [pwVisible, setPwVisible] = useState(false);

    const paperWrapper = useMemo(() => ({ padding: '65px 0', background: '#f0faf5' }), []);
    const paperdivWrapper = useMemo(() => ({ padding: '5vh 0', background: '#f0faf5' }), []);
    const h1Wrapper = useMemo(() => ({ textAlign: "center" }), []);
    const divFormWrapper = useMemo(() => ({ width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', }), []);
    const formWrapper = useMemo(() => ({ background: '#f0faf5', width: '35vw', minWidth: '310px', maxWidth: '450px', margin: '0 auto', padding: '10', }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, .25)' }), []);
    const signupErrorWrapper = useMemo(() => ({ color: 'red' }), []);
    const signupWrapper = useMemo(() => ({ color: 'green' }), []);
    const buttonWrapper = useMemo(() => ({ width: '100%' }), []);
    const rightWrapper = useMemo(() => ({ float: 'right', margin: '0 3vw 0 auto', color: '#005000' }), []);
    const leftWrapper = useMemo(() => ({ float: 'left', margin: '0 auto 0 3vw', color: '#005000' }), []);
    const button2Wrapper = useMemo(() => ({ background: '#13c276', borderColor: "white" }), []);
    const divWrapper = useMemo(() => ({ width: '100px', margin: '0 auto', }), []);
    const checkboxWrapper = useMemo(() => ({ margin: '0px 5px 5px 0px' }), []);

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

    const { Option } = Select;

    useEffect(() => {
        if (me) {
            //alert('메인페이지로 이동합니다.')
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
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
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
                    <h1 style={h1Wrapper}>새 계정 만들기</h1>
                    <h3 style={h1Wrapper}>NUTEE에 오신것을 환영합니다!</h3>
                    <br />
                    <div style={divFormWrapper}>
                        <Form onSubmit={onSubmit} style={formWrapper}>
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input
                                        prefix={<Icon type="idcard" style={prefixWrapper} />}
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
                                        prefix={<Icon type="user" style={prefixWrapper} />}
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
                                    prefix={<Icon type="lock" style={prefixWrapper} />}
                                    name="user-password" type="password" placeholder='비밀번호'
                                    value={password} required onChange={onChangePassword}
                                />
                            </div>
                            <br />
                            <div>
                                <Input
                                    prefix={<Icon type="lock" style={prefixWrapper} />}
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
                                            prefix={<Icon type="mail" style={prefixWrapper} />}
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
                                            prefix={<Icon type="safety-certificate" style={prefixWrapper} />}
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
                            <div>

                                {otpCheck ? <></> : <br />}
                                <Checkbox style={checkboxWrapper} name="user-term" value={term} onChange={onChangeTerm} /><a>NUTEE 회원 약관</a>에 동의합니다.
                    {termError && <div style={signupWrapper}>약관에 동의하셔야 합니다.</div>}
                            </div>
                            <br />
                            <div style={divWrapper}>
                                <Button style={button2Wrapper}
                                    type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                            </div>
                            <br />
                            <Row>
                                <div>
                                    <a style={leftWrapper} onClick={setIdVisible} >아이디 찾기</a>
                                    <a style={rightWrapper} onClick={setPwVisible}>비밀번호 찾기</a>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
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
    )
};

export default Signup;