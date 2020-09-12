import React, {useState, useCallback, useEffect} from 'react';
import {Divider, Form, Input, Checkbox, Button, Row ,Col, Icon, Modal} from 'antd';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {EMAIL_CHECK_REQUEST, OTP_CHECK_REQUEST, SIGN_UP_REQUEST, SIGN_UP_RESET} from "../reducers/user";
import Paper from "@material-ui/core/Paper";
import FindId from "../components/FindId";
import FindPw from "../components/FindPw";

const TextInput = ({value})=>{
    return(
        <div>{value}</div>
    )
};

TextInput.propTypes = {
    value:PropTypes.string
};

export const useInput = (initValue = null) =>{
    const [value,setValue] = useState(initValue);
    const handler = useCallback((e) =>{//useCallback-> 함수 내부에서 쓰는 state를 deps 배열에 넣는다.
        setValue(e.target.value);
    },[]);
    return [value,handler,setValue];
};

const Signup = () =>{
    const [term,setTerm] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [termError,setTermError] = useState(false);
    const [emailError,setEmailError] = useState(false);

    const [id, onChangeId, setId] = useInput('');
    const [nick, onChangeNick, setNick] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [email,setEmail] = useState('');
    const [otp,onChangeOtp,setOtp] = useInput('');
    const dispatch = useDispatch();
    const {isSigningUp,isSignedUp, me,emailCheck, otpCheck} = useSelector(state=>state.user);

    const [idVisible,setIdVisible] = useState(false);
    const [pwVisible,setPwVisible] = useState(false);

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
    useEffect(() => {
        if (me) {
            alert('로그인 했으니 메인 페이지로 이동합니다.');
            Router.push('/');//해당 페이지로 이동
        }
    },[me && me.id]);   //웬만하면 객체와 객체를 비교하지 않는게 좋다. 연산이 어려워진다.
                        //me라는 객체를 비교하는 것보다, 그 안의 고유 데이터를 사용해서 비교하자.

    useEffect(() => {
        if (isSignedUp) {
            alert('회원가입 성공');
            dispatch({
                type: SIGN_UP_RESET
            });
        }
    },[isSignedUp]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(password!==passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        if(!email){
            return setEmailError(true);
        }
        if(!emailCheck){
            alert('이메일이 인증되지 않았습니다.');
            return;
        }
        if(!otpCheck){
            alert('otp 인증이 완료되지 않았습니다.');
            return;
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data:{
                userId: id,
                password,
                nickname:nick,
                schoolEmail:email,
            }
        });
        if(!isSignedUp){
            setId('');
            setNick('');
            setPassword('');
            setPasswordCheck('');
            setEmail('');
            setOtp('');
            setTerm(false);
        }
    },[id, nick, password, passwordCheck, term]);

    const onEmailCheck = () => {
        if(!email.includes('@office.skhu.ac.kr')){
            alert('이메일을 잘못 입력하셨습니다.');
            return;
        }
        alert('작성해주신 이메일을 확인하여 인증 절차를 진행해주세요.');
        dispatch({
            type: EMAIL_CHECK_REQUEST,
            data:{
                schoolEmail:email,
            }
        });
    };

    const onOtpCheck = () => {
        dispatch({
            type: OTP_CHECK_REQUEST,
            data:{
                otp:otp,
            }
        });
    };

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    },[password]);

    const onChangeEmailCheck = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    },[email]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    },[term]);

    return(
        <Paper zDepth={1}>
        <div style={{background: '#f0faf5', height:'100%', paddingTop:'18vh', paddingBottom:'20vh'  }}>
            <h1 style={{textAlign:"center"}}>새 계정 만들기</h1>
            <h3 style={{textAlign:"center"}}>NUTEE에 오신것을 환영합니다!</h3>
            <Form onSubmit={onSubmit} style={{ padding: '10' }}>
                <div style={{width: '35vw', margin:'0 auto'}}>
                    <br />
                    <Input
                        prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                    />
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    <br />
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        name="user-nick" value={nick} placeholder='닉네임' required onChange={onChangeNick}
                    />
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    <br />
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        name="user-password" type="password" placeholder='비밀번호'
                        value={password} required onChange={onChangePassword}
                    />
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    <br />
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        name="user-password-check" type="password" placeholder='비밀번호 확인'
                        value={passwordCheck} required onChange={onChangePasswordCheck}
                    />
                    {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    <br/>
                    <Row gutter={8}> 
                        <Col span={16}>
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                name="user-email" placeholder='이메일 (@office.skhu.ac.kr)' value={email} required onChange={onChangeEmailCheck}
                            />
                            {emailError && <div style={{color:'red'}}>올바른 이메일의 형태가 아닙니다.</div>}
                            {emailCheck
                                ?<div style={{color:'blue'}}>사용 가능한 이메일입니다.</div>
                                :<></>
                            }
                        </Col>
                        <Col span={8}>
                            {emailCheck
                                ?<Button disabled style={{width:'100%'}} onClick={onEmailCheck} >이메일 인증</Button>
                                :<Button style={{width:'100%'}} onClick={onEmailCheck} >이메일 인증</Button>
                            }
                        </Col>
                    </Row>
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    {emailCheck?<></>:<br/>}
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                name="user-otp" value={otp} placeholder='otp' required onChange={onChangeOtp}
                            />
                            {otpCheck
                                ?<div style={{color:'green'}}>otp가 인증되었습니다.</div>
                                :<></>
                            }
                        </Col>
                        <Col span={6}>
                            {otpCheck
                                ?<Button disabled style={{width:'100%',  }} onClick={onOtpCheck}>otp 확인</Button>
                                :<Button style={{width:'100%', }} onClick={onOtpCheck}>otp 확인</Button>
                            }
                        </Col>
                    </Row>
                </div>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    {otpCheck?<></>:<br/>}
                    <Checkbox style={{margin:'0px 5px 5px 0px'}} name="user-term" value={term} onChange={onChangeTerm}/><a>NUTEE 회원 약관</a>에 동의합니다.
                    {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{width:'85px', margin:'0 auto', }}>
                   
                    <Button style={{marginTop:'15px',  background: '#13c276', borderColor : "white" }} type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
              
                </div>
                <br/>
                <div style={{width:'35vw', margin:'0 auto'}}>
                    <Row>
                        <Col>
                    <a style={{float:'left', marginLeft: '5vw'}} onClick={setIdVisible} >아이디 찾기</a>
                    </Col>
                    <Col >
                    <a style={{float:'right', marginRight: '5vw' }} onClick={setPwVisible}>비밀번호 찾기</a>
                    </Col></Row>
                    
                </div>
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
                <FindId setIdVisible={setIdVisible}/>
            </Modal>
            <Modal
                visible={pwVisible}
                onOk={pwOk}
                onCancel={pwCancel}
                footer={null}
                closable={false}
                title='비밀번호 찾기'
            >
                <FindPw setPwVisible={setPwVisible}/>
            </Modal>
        </Paper>
    )
};
export default Signup;