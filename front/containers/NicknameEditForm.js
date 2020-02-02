import { Button, Form, Input } from 'antd';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
    const [editedName, setEditedName] = useState('');
    const dispatch = useDispatch();
    const { me, isEditingNickname } = useSelector(state => state.user);

    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
    }, [editedName]);

    return (
        <Form style={{ marginTop:'10px',marginBottom: '20px',width:'220px'}} onSubmit={onEditNickname}>
            <Input addonBefore="닉네임" value={editedName || (me && me.nickname)} onChange={onChangeNickname} />
            <Button type="primary" htmlType="submit" loading={isEditingNickname}>수정</Button>
        </Form>
    );
};

export default NicknameEditForm;