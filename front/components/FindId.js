import React, {useCallback, useEffect, useState} from "react";
import {Form, Input, Button, Icon, Row, Col,message} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {EMAIL_FIND_REQUEST} from "../reducers/user";

export const useInput = (initValue = null) =>{
    const [value,setValue] = useState(initValue);
    const handler = useCallback((e) =>{//useCallback-> 함수 내부에서 쓰는 state를 deps 배열에 넣는다.
        setValue(e.target.value);
    },[]);
    return [value,handler,setValue];
};

const FindId = ({setIdVisible}) => {
    const [email,setEmail] = useState('');
    const [emailError,setEmailError] = useState(false);
    const dispatch = useDispatch();
    const {findEmailCheck} = useSelector(state=>state.user);
    const onChangeEmailCheck = useCallback((e) => {
        setEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
        setEmail(e.target.value);
    },[email]);
    const onEmailFind = () => {
        dispatch({
            type: EMAIL_FIND_REQUEST,
            data: {
                schoolEmail:email
            }
        });
    };
    useEffect(()=>{
        if(findEmailCheck) {
            setIdVisible(false);
            message.success('작성하신 이메일로 아이디를 전송하였습니다.');
        }
    },[findEmailCheck]);

    return (
        <Form style={{marginBottom:'40px'}}>
            <div style={{width:'100%', margin:'0 auto'}}>
                <br/>
                <Row gutter={8}>
                    <Col span={18}>
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                            name="user-email" placeholder='학내 이메일 (@office.skhu.ac.kr)' value={email} required onChange={onChangeEmailCheck}
                        />
                        {emailError && <div style={{color:'red'}}>올바른 이메일의 형태가 아닙니다.</div>}
                    </Col>
                    <Col span={6}>
                        <Button type={"primary"} style={{width:'100%'}} onClick={onEmailFind} >전송</Button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
};

export default FindId;