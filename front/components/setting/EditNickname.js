/* eslint-disable no-alert */
import React, { useCallback, useMemo } from 'react';
import { Button, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { EDIT_NICKNAME_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';

const EditNickname = () => {
  const [editNickname, onChangeEditNickname] = useInput('');
  const dispatch = useDispatch();

  const onEditNickname = useCallback(async (e) => {
    e.preventDefault();
    if (editNickname.length > 12) alert('최대 12자까지 가능합니다.');
    await dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: { password: editNickname },
    });
  }, [editNickname]);

  const pageWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginTop: '70px' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '100px' }), []);
  const inputWrapper = useMemo(() => ({ width: '250px', marginRight: '8px' }), []);
  const textWrapper = useMemo(() => ({ marginTop: '10px', fontSize: '13px', color: '#005000' }), []);

  return (
    <div style={pageWrapper}>
      <Row>
        <Input
          prefix={<UserOutlined style={prefixWrapper} />}
          name="user-nickname"
          placeholder="변경할 닉네임을 입력해주세요."
          value={editNickname}
          style={inputWrapper}
          onChange={onChangeEditNickname}
          required
        />
        <Button onClick={onEditNickname} style={buttonWrapper}>확인</Button>
        <p style={textWrapper}>
          닉네임은
          {' '}
          <b>최대 12자</b>
          까지 가능합니다.
        </p>
      </Row>
    </div>
  );
};
export default EditNickname;
