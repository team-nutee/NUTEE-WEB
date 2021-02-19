import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const [editedName, setEditedName] = useState('');
  const dispatch = useDispatch();
  const { me, isEditingNickname } = useSelector((state) => state.user);

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

  const formWrapper = useMemo(() => ({ marginTop: '10px', marginBottom: '20px', width: '220px' }), []);

  return (
    <Form style={formWrapper} onSubmit={onEditNickname}>
      <Input addonBefore="닉네임" value={editedName || (me && me.nickname)} onChange={onChangeNickname} />
      <Button type="primary" htmlType="submit" loading={isEditingNickname}>수정</Button>
    </Form>
  );
};

export default NicknameEditForm;
