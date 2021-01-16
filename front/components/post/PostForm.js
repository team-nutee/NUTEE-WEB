import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Form, Button, Dropdown, Space, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import TextareaAutosize from "react-textarea-autosize";
import { TARGET_URL } from "../../static";
import { FileImageOutlined, FileImageTwoTone, CloseOutlined } from '@ant-design/icons';
import useInput from '../../hooks/useInput';

const PostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle, onChangeTitle] = useInput('');
    const [text, setText, onChangeText] = useInput('');

    const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        if (postAdded) {
            setTitle('');
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
        formData.append('title', title);
        formData.append('content', text);
        formData.append('id', '1');
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    /*     const onChangeText = useCallback((e) => {
            setText(e.target.value);
        }, []);
         */

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

    const formWrapper = useMemo(() => ({ marginTop: '15px', marginBottom: '15px', minWidth: '500px', maxWidth: '700px', width: '50wv', background: 'yellowgreen' }), []);
    const formDivWrapper = useMemo(() => ({ height: "auto", overflow: "hidden", background: 'white', border: '1px solid #e6e6e6' }), []);
    const formDivDivWrapper = useMemo(() => ({ overflow: 'hidden', height: 'auto', background: 'blue' }), []);
    const textareaAutosizeWrapper = useMemo(() => ({ margin: '5px', resize: 'none', outline: 'none', lineHeight: '30px', overflowY: 'hidden', border: 'none', width: '100%', minHeight: '65px', height: 'auto' }), []);
    const formDivDivDiv1Wrapper = useMemo(() => ({ overflow: 'hidden', height: "auto" }), []);
    const imagePathsDivWrapper = useMemo(() => ({ margin: '5px', width: '48.2%', float: "left", height: '180px', background: '#F2F2F2', textAlign: 'center' }), []);
    const imagePathsDivDivWrapper = useMemo(() => ({ textAlign: 'right', marginRight: '15px' }), []);
    const imagePathsIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute' }), []);
    const imagePathsImgWrapper = useMemo(() => ({ maxWidth: '100%', height: '100%' }), []);
    const formDivDivDiv2Wrapper = useMemo(() => ({ marginBottom: '5px', marginTop: '5px' }), []);
    const uploadButtonWrapper = useMemo(() => ({ float: 'right', margin: '0 0 10px 7px' }), []);
    const writeButtonWrapper = useMemo(() => ({ float: 'right', margin: ' 0 5px 10px 0', borderRadius: '1', background: '#13c276', borderColor: '#fff', color: 'white' }), []);
    const iconWrapper = useMemo(() => ({ fontSize: '20px', color: '#13c276' }), []);
    const buttonWrapper = useMemo(() => ({ background: '#13c276', borderColor: "white", width: '100px' }), []);

    const major = (
        <Menu>
            <Menu.Item>
                소프트웨어공학전공
          </Menu.Item>
            <Menu.Item>
                디지털컨텐츠전공
          </Menu.Item>
        </Menu>
    );
    const inter = (
        <Menu>
            <Menu.Item>
                공부
          </Menu.Item>
            <Menu.Item>
                취미
          </Menu.Item>
            <Menu.Item>
                장터
          </Menu.Item>
        </Menu>
    );

    return (
        <Form style={formWrapper} encType="multipart/form-data" onSubmit={onSubmitForm}>
            <div style={formDivWrapper}>
                <div style={formDivDivWrapper}>

                    <Dropdown overlay={inter} placement="bottomCenter">
                        <Button style={buttonWrapper}>카테고리</Button>
                    </Dropdown>
                    <Dropdown overlay={major} placement="bottomCenter">
                        <Button style={buttonWrapper}>내 전공</Button>
                    </Dropdown>

                    <TextareaAutosize
                        style={textareaAutosizeWrapper}
                        placeholder="제목"
                        value={title}
                        onChange={onChangeTitle}
                        autoFocus={true} />
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
                                    <div onClick={onRemoveImage(i)}>
                                        <CloseOutlined style={imagePathsIconWrapper} />
                                    </div>

                                </div>
                                <img src={`${TARGET_URL}/${v}`} style={imagePathsImgWrapper} alt={v} />
                            </div>
                        ))}
                    </div>
                    <div style={formDivDivDiv2Wrapper}>
                        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <div onClick={onClickImageUpload} style={uploadButtonWrapper}><FileImageOutlined style={iconWrapper} /></div>
                        <Button type="primary" style={writeButtonWrapper} htmlType="submit" loading={isAddingPost}>작성</Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default PostForm;