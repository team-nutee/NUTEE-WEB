import React, { useCallback, useMemo } from "react";
import { Button, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { EDIT_PASSWORD_REQUEST, EDIT_PWCK_REQUEST } from "../../reducers/user";
import { useDispatch, } from "react-redux";
import useInput from "../../hooks/useInput";

const PwEditModal = () => {
  const [editPWCK, onChangePWCK, setEditPWCK] = useInput("");
  const [editPassword, onChangePassword, setEditPassword] = useInput("");
  const dispatch = useDispatch();

  const onEditPWCK = useCallback(
    async e => {
      e.preventDefault();
      await dispatch({
        type: EDIT_PWCK_REQUEST,
        data: editPWCK,
      });
    }, [editPWCK]);

  const onEditPassword = useCallback(
    async e => {
      e.preventDefault();
      await dispatch({
        type: EDIT_PASSWORD_REQUEST,
        data: editPassword,
      });
    }, [editPassword]);

  const pageWrapper = useMemo(() => ({ display: "flex", justifyContent: "center", margin: "20px 0", }), []);
  const inputWrapper = useMemo(() => ({ width: "300px", marginRight: "8px" }), []);
  const prefixWrapper = useMemo(() => ({ color: "rgba(0,0,0,.25)" }), []);
  const buttonWrapper = useMemo(() => ({ background: "#13c276", color: "#fff", width: "100px" }), []);

  return (
    <>
      <div style={pageWrapper}>
        <Input
          prefix={<LockOutlined style={prefixWrapper} />}
          type="password"
          placeholder="현재 비밀번호"
          name="user-password"
          value={editPWCK}
          style={inputWrapper}
          onChange={onChangePWCK}
          required
        />
        <Button onClick={onEditPWCK} style={buttonWrapper}>
          확인
        </Button>
      </div>
      <div style={pageWrapper}>
        <Input
          prefix={<LockOutlined style={prefixWrapper} />}
          type="password"
          placeholder="변경할 비밀번호"
          name="user-password2"
          value={editPassword}
          style={inputWrapper}
          onChange={onChangePassword}
          required
        />
        <Button onClick={onEditPassword} style={buttonWrapper}>
          변경
        </Button>
      </div>
    </>
  );
};
export default PwEditModal;
