/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { Form, Button, Input } from 'antd';
import { FileImageOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  EDIT_POST_REQUEST,
  REMOVE_EDIT_IMAGE,
  UPLOAD_EDIT_IMAGES_REQUEST,
} from '../../reducers/post';
import useInput from '../../hooks/useInput';

const EditForm = ({ me, onCancelEdit, postDataTotal }) => {
  const dispatch = useDispatch();
  const { majors } = me;
  const { id, category, content, images, title } = postDataTotal;
  const { categoryData, editImagePaths, editPostLoading, editPostDone,
  } = useSelector((state) => state.post);

  const [editTitle, onChangeTitle, setEditTitle] = useInput(title);
  const [editText, onChangeText, setEditText] = useInput(content);
  const [editCategory, setEditCategory] = useState(category);
  const imageInput = useRef();

  useEffect(() => {
    if (editPostDone) {
      onCancelEdit();
    }
  }, [editPostDone]);

  const onEditForm = useCallback(() => {
    if (!editCategory) return alert('카테고리를 선택해주세요.');
    if (!editTitle || !editTitle.trim()) return alert('제목을 작성해주세요.');
    if (!editText || !editText.trim()) return alert('게시글을 작성해주세요.');

    const formData = {};
    formData.src = [];
    editImagePaths.forEach((i) => {
      formData.src.push(i);
    });

    dispatch({
      type: EDIT_POST_REQUEST,
      data: {
        title: editTitle,
        content: editText,
        images: formData.image,
      },
      postId: id,
    });
    return true;
  },
  [editTitle, editText, editImagePaths, id]);

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
  const postCategoryList = useCallback((m, i) => {
    const categoryList = [];
    m.map((data) => (categoryList.push({ value: data, label: data })));
    i.map((data) => (categoryList.push({ value: data, label: data })));
    return categoryList;
  }, []);

  const onSelectCategory = useCallback((s) => { setEditCategory(s.value); }, []);

  const imageAndWriteWrapper = useMemo(() => ({ marginBottom: '10px' }), []);
  const inputWrapper = useMemo(() => ({ background: 'white', margin: '0px 10px 10px 10px', borderColor: '#c8e6d7' }), []);

  /* 작성, 이미지 업로드 버튼 */
  const uploadButtonWrapper = useMemo(() => ({ float: 'left', margin: '9px 0 5px 15px' }), []);
  const buttonWrapper = useMemo(() => ({ float: 'right', margin: '5px 0px 5px 10px', borderRadius: '5px', background: '#13c276', borderColor: '#fff', color: 'white' }), []);
  const iconWrapper = useMemo(() => ({ fontSize: '20px', color: '#13c276' }), []);

  /* 이미지 업로드 및 제거 관련 */
  const imagesWrapper = useMemo(() => ({ height: 'auto' }), []);
  const imagePathsWrapper = useMemo(() => ({ display: 'center', margin: '10px', width: '20%', float: 'left', height: '60px', background: '#c8e6d7' }), []);
  const removeImageIconWrapper = useMemo(() => ({ float: 'right', marginRight: '15px' }), []);
  const closeOutIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute', background: 'white', borderRadius: '40px' }), []);
  const imagePathsImgWrapper = useMemo(() => ({ width: '100%', height: '100%' }), []);

  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: '230px', height: '32px', zIndex: '999', minHeight: '32px' }) }), []);
  const categoryButtonWrapper = useMemo(() => ({ width: '230px', margin: '10px' }), []);

  return (
    <Form onFinish={onEditForm}>
      <div style={categoryButtonWrapper}>
        <Select
          placeholder="카테고리"
          name="categoty"
          defaultValue={{ label: category }}
          onChange={onSelectCategory}
          options={postCategoryList(majors, categoryData)}
          styles={customStyles}
          menuPlacement="auto"
          maxMenuHeight={150}
        />
      </div>
      <Input.TextArea
        style={inputWrapper}
        value={editTitle}
        onChange={onChangeTitle}
        autoSize={{ minRows: 1, maxRows: 2 }}
        placeholder="제목"
      />
      <Input.TextArea
        style={inputWrapper}
        value={editText}
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
        <Button type="danger" onClick={onCancelEdit} style={buttonWrapper}>
          <b>취소</b>
        </Button>
        <Button type="primary" style={buttonWrapper} htmlType="submit" loading={editPostLoading}>
          <b>수정</b>
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
              src={v}
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
