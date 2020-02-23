import React, { useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../containers/Signup'; // TODO: util 폴더로 옮기기
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const { isLoggingIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId: id,
                password,
            },
        });
    }, [id, password]);

    return (
        <Form style={{marginTop:'4px', minWidth:'450px'}} onSubmit={onSubmitForm} >
            <div style={{float:"left", marginRight: '5px', marginLeft: '0px'}}>
                <Input placeholder={'Id'} size={"small"} name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div style={{float:"left", marginRight: '5px'}}>
                <Input placeholder={'Password'} size={"small"} name="user-password" value={password} onChange={onChangePassword} type="password" required />
            </div>
            <div style={{float:"left"}}>
                <Button size={"small"} style={{marginRight: '5px'}} type="primary" htmlType="submit" shape={"round"} loading={isLoggingIn}>로그인</Button>
            </div>
        </Form>
    );
};

export default LoginForm;