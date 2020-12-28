import React, { useCallback, useRef, useState, useMemo } from 'react';
import { Avatar, Button, Col, Form, Icon, Input, Modal, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { TARGET_URL } from "../../static";
import {
    EDIT_NICKNAME_REQUEST,
    UPLOAD_PROIMG_REQUEST,
    UPLOAD_IMAGES_REQUEST
} from "../../reducers/user";
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';

const ProfileEditModal = () => {
    const [visible, setVisible] = useState(false);
    const [editedName, setEditedName] = useState('');
    const { me, profileImagePath } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const imageInput = useRef();

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

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

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_PROIMG_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onEditNickname = useCallback(async (e) => {
        e.preventDefault();
        await dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
        await dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: me.id,
        });
    }, [editedName]);

    const buttonWrapper = useMemo(() => ({ width: '220px', marginTop: '10px', float: 'right' }), []);
    const divWrapper = useMemo(() => ({ width: '25%', margin: '0 auto' }), []);
    const imgWrapper = useMemo(() => ({ width: '100px', height: '100px', borderRadius: '50px', border: '1px solid #e6e6e6', }), []);
    const div2Wrapper = useMemo(() => ({ width: '52%', margin: '0 auto' }), []);
    const prefixWrapper = useMemo(() => ({ color: 'rgba(0,0,0,.25)' }), []);

    return (
        <div>
            <Button style={buttonWrapper} onClick={showModal}>
                프로필 변경
            </Button>
            <Modal
                title="프로필 변경"
                visible={visible}
                onOk={onEditNickname}
                onCancel={handleCancel}
                footer={null}
            >
                <div style={divWrapper}>
                    <input type="file" hidden ref={imageInput} onChange={onChangeImages} />
                    {
                        me.Image
                            ?
                            <img
                                src={`${TARGET_URL}/${me.Image.src}`}
                                style={imgWrapper}
                                onClick={onClickImageUpload}
                            />
                            :
                            <img
                                src={`${TARGET_URL}/settings/nutee_profile.png`}
                                style={imgWrapper}
                                onClick={onClickImageUpload}
                            />
                    }
                </div>
                <div style={div2Wrapper}>
                    <br />
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                prefix={<Icon type="user" style={prefixWrapper} />}
                                name="user-name" placeholder='닉네임' value={editedName} required onChange={onChangeNickname}
                            />
                        </Col>
                        <Col span={6}>
                            <Button onClick={onEditNickname} >변경</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
};
export default ProfileEditModal;