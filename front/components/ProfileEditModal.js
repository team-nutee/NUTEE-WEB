import React, {useCallback, useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {EDIT_NICKNAME_REQUEST} from "../reducers/user";
import {useDispatch, useSelector} from "react-redux";

const ProfileEditModal = () => {
    const [visible,setVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const { me, isEditingNickname } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = (e) => {
        console.log(e);
        setVisible(false);
    };

    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
        setVisible(false);
    }, [editedName]);

    return(
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={onEditNickname}
                onCancel={handleCancel}
            >
                <Form style={{ marginTop:'10px',marginBottom: '20px',width:'220px'}} onSubmit={onEditNickname}>
                    <Input addonBefore="닉네임" value={editedName || (me && me.nickname)} onChange={onChangeNickname} />
                </Form>
            </Modal>
        </div>
    )
};
export default ProfileEditModal;