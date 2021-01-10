import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
    ADD_POST_REQUEST, EDIT_POST_IMAGES,
    EDIT_POST_REQUEST, REMOVE_EDIT_IMAGE,
    REMOVE_IMAGE,
    UPLOAD_EDIT_IMAGES_REQUEST,
    UPLOAD_IMAGES_REQUEST
} from '../../reducers/post';
import TextareaAutosize from "react-textarea-autosize";

const EditForm = ({ postId, postContent, postImages, visible, setVisible }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState(postContent);
    const { editImagePaths, isEditingPost, postEdited } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        if (visible) {
            setText(postContent);
            const images = postImages.map(v => v.src);
            dispatch({
                type: EDIT_POST_IMAGES,
                data: images
            });
        }
    }, [postEdited, visible, postContent, dispatch, postImages]);

    const onEditForm = useCallback((e) => {
        e.preventDefault();
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        const formData = {};
        formData.image = [];
        editImagePaths.forEach((i) => {
            formData.image.push(i);
        });
        formData.content = text;
        formData.postId = postId;
        dispatch({
            type: EDIT_POST_REQUEST,
            data: formData,
        });
        setVisible(false);
    }, [text, editImagePaths, postId]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_EDIT_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_EDIT_IMAGE,
            index,
        });
    }, []);

    const formWrapper = useMemo(() => ({ margin: '0px 0 10px' }), []);
    const formDivWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", background: 'white', paddingBottom: '5px', border: '1px solid #e6e6e6' }), []);
    const formDivDivWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto' }), []);
    const textareaAutosizeWrapper = useMemo(() => ({ margin: '5px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', border: 'none', width: '98.5%', minHeight: '65px', height: 'auto' }), []);
    const formDivDivDiv1Wrapper = useMemo(() => ({ overflow: 'hidden', height: "auto" }), []);
    const editImagePathsDivWrapper = useMemo(() => ({ margin: '5px', width: '47.6%', float: "left", height: '180px', background: '#F2F2F2', textAlign: 'center' }), []);
    const editImagePathsDivDivWrapper = useMemo(() => ({ textAlign: 'right', marginRight: '15px' }), []);
    const editImagePathsIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute' }), []);
    const formDivDivDiv2Wrapper = useMemo(() => ({ marginBottom: '5px', marginTop: '5px' }), []);
    const button1Wrapper = useMemo(() => ({ marginLeft: '5px', borderRadius: '0' }), []);
    const button2Wrapper = useMemo(() => ({ float: 'right', marginRight: '5px', borderRadius: '0' }), []);

    return (
        <Form style={formWrapper} encType="multipart/form-data" onSubmit={onEditForm}>
            <div style={formDivWrapper}>
                <div style={formDivDivWrapper}>
                    <TextareaAutosize
                        style={textareaAutosizeWrapper}
                        placeholder="내용을 입력해주세요."
                        value={text}
                        onChange={onChangeText}
                        autoFocus={true} />
                    <div style={formDivDivDiv1Wrapper}>
                        {editImagePaths.map((v, i) => (
                            <div key={v} style={editImagePathsDivWrapper}>
                                <div style={editImagePathsDivDivWrapper}>
                                    <div onClick={onRemoveImage(i)}>
                                <CloseOutlined style={editImagePathsIconWrapper} />
                                      </div>
                                </div>
                                <img src={`http://localhost:9425/${v}`} style={{
                                    maxWidth: '100%',
                                    height: '100%'
                                }} alt={v} />
                            </div>
                        ))}
                    </div>
                    <div style={formDivDivDiv2Wrapper}>
                        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <Button onClick={onClickImageUpload} style={ button1Wrapper }>이미지 업로드</Button>
                        <Button type="primary" style={ button2Wrapper } htmlType="submit" loading={isEditingPost}>작성</Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default EditForm;