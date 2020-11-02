import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Button, message, Row, Col, Icon} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {EMAIL_FIND_REQUEST, PW_FIND_REQUEST} from "../reducers/user";

export const useInput = (initValue = null) =>{
    const [value,setValue] = useState(initValue);
    const handler = useCallback((e) =>{//useCallback-> 함수 내부에서 쓰는 state를 deps 배열에 넣는다.
        setValue(e.target.value);
    },[]);
    return [value,handler,setValue];
};

const FindPw = ({setPwVisible}) => {
    const [id,setId] = useState('');
    const [email,setEmail] = useState('');
    const [emailError,setEmailError] = useState(false);
    const dispatch = useDispatch();
    const {findPwCheck} = useSelector(state=>state.user);
    const onChangeEmailCheck = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    },[email]);
    const onChangeId= useCallback((e) => {
        setId(e.target.value);
    },[id]);
    const onEmailFind = () => {
        dispatch({
            type: PW_FIND_REQUEST,
            data: {
                schoolEmail:email,
                userId:id,
            }
        });
    };
    useEffect(()=>{
        if(findPwCheck) {
            setPwVisible(false);
            message.success('작성하신 이메일로 변경된 비밀번호를 전송하였습니다.');
        }
    },[findPwCheck]);
    return (
        <Form>
            <div style={{width:'100%', margin:'0 auto'}}>
                <br />
                <Input
                    prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    name="user-id" value={id} placeholder='아이디' required onChange={onChangeId}
                />
            </div>
            <div style={{width: '100%', margin: '0 auto'}}>
                <br/>
                <Input
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="user-email" placeholder='학내 이메일 (@office.skhu.ac.kr)' value={email} required
                    onChange={onChangeEmailCheck}
                />
                {emailError && <div style={{color: 'red'}}>올바른 이메일의 형태가 아닙니다.</div>}
                <br/>
            </div>
            <div style={{width: '20%', margin: '0 auto'}}>
                <br/>
                <br/>
                <Button type={"primary"} style={{width: '100%', background: '#13c276',}} onClick={onEmailFind}>전송</Button>
            </div>
        </Form>
    )
};

export default FindPw;