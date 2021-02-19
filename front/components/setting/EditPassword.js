import React, { useCallback, useMemo } from 'react';
import { Button, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { EDIT_PASSWORD_REQUEST, EDIT_PWCK_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';

const PwEditModal = () => {
  const [existingPassword, onChangeExistingPassword] = useInput('');
  const [editPassword, onChangeEditPassword] = useInput('');
  const dispatch = useDispatch();

  const onExistingPassword = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch({
        type: EDIT_PWCK_REQUEST,
        data: existingPassword,
      });
    }, [existingPassword],
  );

  const onEditPassword = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch({
        type: EDIT_PASSWORD_REQUEST,
        data: { password: editPassword },
      });
    }, [editPassword],
  );

  const pageWrapper = useMemo(() => ({ marginTop: '70px' }), []);
  const divWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginBottom: '10px' }), []);
  const inputWrapper = useMemo(() => ({ width: '300px', marginRight: '8px' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '100px' }), []);

  return (
    <div style={pageWrapper}>
      <div style={divWrapper}>
        <Input
          prefix={<LockOutlined style={prefixWrapper} />}
          type="password"
          placeholder="현재 비밀번호"
          name="user-password"
          value={existingPassword}
          style={inputWrapper}
          onChange={onChangeExistingPassword}
          required
        />
        <Button onClick={onExistingPassword} style={buttonWrapper}>
          확인
        </Button>
      </div>
      <div style={divWrapper}>
        <Input
          prefix={<LockOutlined style={prefixWrapper} />}
          type="password"
          placeholder="변경할 비밀번호"
          name="user-password2"
          value={editPassword}
          style={inputWrapper}
          onChange={onChangeEditPassword}
          required
        />
        <Button onClick={onEditPassword} style={buttonWrapper}>
          변경
        </Button>
      </div>
    </div>
  );
};
export default PwEditModal;
