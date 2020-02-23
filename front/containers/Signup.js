import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Checkbox, Button} from 'antd';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {SIGN_UP_REQUEST, SIGN_UP_RESET} from "../reducers/user";
import Paper from "@material-ui/core/Paper";

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

    const [id, onChangeId, setId] = useInput('');
    const [nick, onChangeNick, setNick] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const dispatch = useDispatch();
    const {isSigningUp,isSignedUp, me} = useSelector(state=>state.user);

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
        dispatch({
            type: SIGN_UP_REQUEST,
            data:{
                userId: id,
                password,
                nickname:nick,
            }
        });
        if(!isSignedUp){
            setId('');
            setNick('');
            setPassword('');
            setPasswordCheck('');
            setTerm(false);
        }
    },[id, nick, password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    },[password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    },[]);

    return(
        <Paper zDepth={1}>
        <div style={{background: '#effbf5', height:'700px', paddingBottom:'45%'}}>
            <h1 style={{textAlign:"center"}}>새 계정 만들기</h1>
            <h3 style={{textAlign:"center"}}>빠르고 쉽습니다.</h3>
            <Form onSubmit={onSubmit} style={{padding:10 }}>
                <div style={{width:'30%', margin:'0 auto'}}>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId}/>
                </div>
                <div style={{width:'30%', margin:'0 auto'}}>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                </div>
                <div style={{width:'30%', margin:'0 auto'}}>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                </div>
                <div style={{width:'30%', margin:'0 auto'}}>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br />
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div style={{width:'30%', margin:'0 auto'}}>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{marginTop: 10, width:'30%', margin:'0 auto'}}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
        </div>
        </Paper>
    )
};
export default Signup;