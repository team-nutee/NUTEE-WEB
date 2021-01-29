import React, { useCallback, useMemo } from "react";
import { Button, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { EDIT_NICKNAME_REQUEST } from "../../reducers/user";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";

const EditNickname = () => {
  const [editNickname, onChangeEditNickname] = useInput("");
  const dispatch = useDispatch();

  const onEditNickname = useCallback(async (e) => {
    e.preventDefault();
    await dispatch({
      type: EDIT_NICKNAME_REQUEST,
      data: editNickname,
    });
  }, [editNickname]);

  const pageWrapper = useMemo(() => ({ display: "flex", justifyContent: "center", marginTop: '70px' }), []);
  const prefixWrapper = useMemo(() => ({ color: "rgba(0,0,0,.25)" }), []);
  const buttonWrapper = useMemo(() => ({ background: "#13c276", color: "#fff", width: "100px" }), []);
  const inputWrapper = useMemo(() => ({ width: "300px", marginRight: "8px" }), []);

  return (
    <>
      <div style={pageWrapper}>
        <Input
          prefix={<UserOutlined style={prefixWrapper} />}
          name="user-name"
          placeholder='변경할 닉네임을 입력해주세요.'
          value={editNickname}
          style={inputWrapper}
          onChange={onChangeEditNickname}
          required
        />
        <Button onClick={onEditNickname} style={buttonWrapper}>확인</Button>
      </div>
    </>
  );
};
export default EditNickname;
