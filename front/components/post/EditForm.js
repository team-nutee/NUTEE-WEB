/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Form, Button, Dropdown, Input } from 'antd';
import { FileImageOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  EDIT_POST_IMAGES,
  EDIT_POST_REQUEST,
  REMOVE_EDIT_IMAGE,
  UPLOAD_EDIT_IMAGES_REQUEST,
} from '../../reducers/post';
import { major, inter } from '../dummy';

const EditForm = ({ postId, postContent, postImages, visible, setVisible }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(postContent);
  const [text, setText] = useState(postContent);
  const { editImagePaths, editPostLoading, editPostDone } = useSelector((state) => state.post);
  const imageInput = useRef();

  useEffect(() => {
    if (visible) {
      setTitle(postContent);
      setText(postContent);
      const images = postImages.map((v) => v.src);
      dispatch({
        type: EDIT_POST_IMAGES,
        data: images,
      });
    }
  }, [editPostDone, visible, postContent, postImages]);

  const onEditForm = useCallback((e) => {
    e.preventDefault();
    if (!title || !title.trim()) alert('제목을 작성하세요.');
    if (!text || !text.trim()) return alert('게시글을 작성하세요.');
    const formData = {};
    formData.image = [];
    editImagePaths.forEach((i) => {
      formData.image.push(i);
    });
    dispatch({
      type: EDIT_POST_REQUEST,
      data: {
        title,
        content: text,
        images: formData.image,
      },
    });
    setVisible(false);
    return true;
  },
  [text, editImagePaths, postId]);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

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

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_EDIT_IMAGE,
        index,
      });
    },
    [],
  );

  const formWrapper = useMemo(() => ({ height: 'auto', overflow: 'hidden', background: '#f0faf5', borderRadius: '5px', border: '3px solid #c8e6d7', marginBottom: '15px', minWidth: '500px', maxWidth: '700px', width: '50wv' }), []);
  const imageAndWriteWrapper = useMemo(() => ({ background: 'purple', marginBottom: '10px' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', borderColor: 'white', width: '100px', margin: '10px 0px 10px 10px', color: 'white' }), []);
  const inputWrapper = useMemo(() => ({ background: 'white', margin: '0px 10px 10px 10px', width: '47vw', minWidth: '500px', maxWidth: '672px', borderColor: '#c8e6d7' }), []);

  /* 작성, 이미지 업로드 버튼 */
  const uploadButtonWrapper = useMemo(() => ({ float: 'left', margin: '9px 0 5px 15px' }), []);
  const writeButtonWrapper = useMemo(() => ({ float: 'right', margin: '5px 15px', borderRadius: '3px', background: '#13c276', borderColor: '#fff', color: 'white' }), []);
  const iconWrapper = useMemo(() => ({ fontSize: '20px', color: '#13c276' }), []);

  /* 이미지 업로드 및 제거 관련 */
  const imagesWrapper = useMemo(() => ({ height: 'auto' }), []);
  const imagePathsWrapper = useMemo(() => ({ display: 'center', margin: '10px', width: '20%', float: 'left', height: '60px', background: '#c8e6d7' }), []);
  const removeImageIconWrapper = useMemo(() => ({ float: 'right', marginRight: '15px' }), []);
  const closeOutIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute', background: 'white', borderRadius: '40px' }), []);
  const imagePathsImgWrapper = useMemo(() => ({ width: '100%', height: '100%' }), []);

  return (
    <Form
      style={formWrapper}
      encType="multipart/form-data"
      onFinish={onEditForm}
    >
      {/* 임시 */}
      <Dropdown overlay={inter} placement="bottomCenter">
        <Button style={buttonWrapper} shape="round">
          <b>카테고리</b>
        </Button>
      </Dropdown>
      <Dropdown overlay={major} placement="bottomCenter">
        <Button style={buttonWrapper} shape="round">
          <b>내 전공</b>
        </Button>
      </Dropdown>

      <Input.TextArea
        style={inputWrapper}
        value={title}
        onChange={onChangeTitle}
        autoSize={{ minRows: 1, maxRows: 2 }}
        placeholder="제목"
      />
      <Input.TextArea
        style={inputWrapper}
        value={text}
        onChange={onChangeText}
        autoSize={{ minRows: 4 }}
        placeholder="내용을 입력해주세요."
      />

      <div style={imageAndWriteWrapper}>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <div onClick={onClickImageUpload} style={uploadButtonWrapper}>
          <FileImageOutlined style={iconWrapper} />
        </div>
        <Button
          type="primary"
          style={writeButtonWrapper}
          htmlType="submit"
          loading={editPostLoading}
        >
          <b>작성</b>
        </Button>
      </div>
      <br />
      <br />
      <div style={imagesWrapper}>
        {editImagePaths.map((v, i) => (
          <div key={v} style={imagePathsWrapper}>
            <div onClick={onRemoveImage(i)} style={removeImageIconWrapper}>
              <CloseCircleOutlined style={closeOutIconWrapper} />
            </div>
            <img
              src={`http://localhost:9425/${v}`}
              style={imagePathsImgWrapper}
              alt={v}
            />
          </div>
        ))}
      </div>
    </Form>
  );
};

EditForm.propTypes = {
  postId: PropTypes.number,
  postContent: PropTypes.string,
  postImages: PropTypes.string,
  visible: PropTypes.bool,
  setVisible: PropTypes.bool,
}.isRequired;

export default EditForm;
