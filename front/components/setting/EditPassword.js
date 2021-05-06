import React, { useCallback, useMemo } from 'react';
import { Button, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { EDIT_PASSWORD_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';

const PwEditModal = () => {
  const [nowPassword, onNowPassword] = useInput('');
  const [changePassword, onchangePassword] = useInput('');
  const dispatch = useDispatch();

  const onEditPassword = useCallback(
    async (e) => {
      e.preventDefault();
      await dispatch({
        type: EDIT_PASSWORD_REQUEST,
        data: { nowPassword, changePassword },
      });
    }, [changePassword],
  );

  const pageWrapper = useMemo(() => ({ marginTop: '120px', padding: '10px'}), []);
  const divWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginBottom: '10px' }), []);
  const changeButtonWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginTop: '20px' }), []);
  const inputWrapper = useMemo(() => ({ width: '300px' }), []);
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
          value={nowPassword}
          style={inputWrapper}
          onChange={onNowPassword}
          required
        />
      </div>
      <div style={divWrapper}>
        <Input
          prefix={<LockOutlined style={prefixWrapper} />}
          type="password"
          placeholder="변경할 비밀번호"
          name="user-password2"
          value={changePassword}
          style={inputWrapper}
          onChange={onchangePassword}
          required
        />
      </div>
      <div style={changeButtonWrapper}>
        <Button type="round" onClick={onEditPassword} style={buttonWrapper}>
          변경
        </Button>
      </div>
    </div>
  );
};
export default PwEditModal;
