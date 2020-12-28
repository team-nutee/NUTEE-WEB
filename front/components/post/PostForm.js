import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Form, Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import TextareaAutosize from "react-textarea-autosize";
import { TARGET_URL } from "../../static";

const PostForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        if (postAdded) {
            setText('');
        }
    }, [postAdded]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        formData.append('image', imagePaths);
        formData.append('content', text);
        formData.append('id', '1');
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

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
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback(index => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        });
    }, []);

    const formWrapper = useMemo(() => ({ margin: '0px 0 10px' }), []);
    const formDivWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", background: 'white', marginTop: '15px', paddingBottom: '5px', border: '1px solid #e6e6e6' }), []);
    const formDivDivWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto' }), []);
    const textareaAutosizeWrapper = useMemo(() => ({ margin: '5px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', border: 'none', width: '100%', minHeight: '65px', height: 'auto' }), []);
    const formDivDivDiv1Wrapper = useMemo(() => ({ overflow: 'hidden', height: "auto" }), []);
    const imagePathsDivWrapper = useMemo(() => ({ margin: '5px', width: '48.2%', float: "left", height: '180px', background: '#F2F2F2', textAlign: 'center' }), []);
    const imagePathsDivDivWrapper = useMemo(() => ({ textAlign: 'right', marginRight: '15px' }), []);
    const imagePathsIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute' }), []);
    const imagePathsImgWrapper = useMemo(() => ({ maxWidth: '100%', height: '100%' }), []);
    const formDivDivDiv2Wrapper = useMemo(() => ({ marginBottom: '5px', marginTop: '5px' }), []);
    const uploadButtonWrapper = useMemo(() => ({ marginLeft: '7px', borderRadius: '1' }), []);
    const writeButtonWrapper = useMemo(() => ({ float: 'right', marginRight: '5px', borderRadius: '1', background: '#13c276', marginRight: '10px', borderColor: '#fff', color: 'white'  }), []);

    return (
        <Form style={formWrapper} encType="multipart/form-data" onSubmit={onSubmitForm}>
            <div style={formDivWrapper}>
                <div style={formDivDivWrapper}>
                    <TextareaAutosize
                        style={textareaAutosizeWrapper}
                        placeholder="내용을 입력해주세요."
                        value={text}
                        onChange={onChangeText}
                        autoFocus={true} />
                    <div style={formDivDivDiv1Wrapper}>
                        {imagePaths.map((v, i) => (
                            <div key={v} style={imagePathsDivWrapper}>
                                <div style={imagePathsDivDivWrapper}>
                                    <Icon style={imagePathsIconWrapper}
                                        type="close"
                                        onClick={onRemoveImage(i)}
                                    />
                                </div>
                                <img src={`${TARGET_URL}/${v}`} style={imagePathsImgWrapper} alt={v} />
                            </div>
                        ))}
                    </div>
                    <div style={formDivDivDiv2Wrapper}>
                        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <Button onClick={onClickImageUpload} style={uploadButtonWrapper}>이미지 업로드</Button>
                        <Button type="primary" style={writeButtonWrapper} htmlType="submit" loading={isAddingPost}>작성</Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default PostForm;