/* eslint-disable no-unused-vars */ /* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FileImageOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_REQUEST, ADD_POST_SUCCESS } from '../../reducers/post';
import useInput from '../../hooks/useInput';

const PostForm = ({ me }) => {
  const dispatch = useDispatch();
  const [title, onChangeTitle, setTitle] = useInput('');
  const [text, onChangeText, setText] = useInput('');
  const [category, setCategory] = useState();
  const { categoryData, imagePaths, addPostLoading, addPostDone,
  } = useSelector((state) => state.post);
  const imageInput = useRef();

  const postCategoryList = (m, i) => {
    const categoryList = [];
    m.map((data) => (categoryList.push({ value: data, label: data })));
    i.map((data) => (categoryList.push({ value: data, label: data })));
    return categoryList;
  };

  const onSelectCategory = (s) => { setCategory(s.value); };

  useEffect(() => {
    if (addPostDone) {
      dispatch({
        type: ADD_POST_SUCCESS,
      });
      setTitle(''); setText(''); setCategory(null);
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    if (!category) return alert('카테고리를 선택해주세요.');
    if (!title || !title.trim()) return alert('제목을 작성해주세요.');
    if (!text || !text.trim()) return alert('게시글을 작성해주세요.');
    return (
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title,
          content: text,
          images: imagePaths,
          category,
        },
        major: me.majors,
      })
    );
  }, [title, text, imagePaths, category]);

  const onChangeImages = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('images', f);
    });
    dispatch({
      type: UPLOAD_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback((i) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      index: i,
    });
  }, []);

  const formWrapper = useMemo(() => ({ height: 'auto', overflow: 'hidden', background: '#f0faf5', borderRadius: '5px', border: '3px solid #c8e6d7', margin: '7px 0 15px 0', minWidth: '500px', maxWidth: '700px', width: '50wv' }), []);
  const imageAndWriteWrapper = useMemo(() => ({ marginBottom: '10px' }), []);
  const inputWrapper = useMemo(() => ({ background: 'white', margin: '0px 10px 10px 10px', width: '47vw', minWidth: '500px', maxWidth: '672px', borderColor: '#c8e6d7' }), []);
  /* 작성, 이미지 업로드 버튼 */
  const uploadButtonWrapper = useMemo(() => ({ float: 'left', margin: '9px 0 5px 15px' }), []);
  const writeButtonWrapper = useMemo(() => ({ float: 'right', margin: '5px 15px', borderRadius: '3px', background: '#13c276', borderColor: '#fff', color: 'white' }), []);
  const iconWrapper = useMemo(() => ({ fontSize: '20px', color: '#13c276' }), []);
  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: '230px', height: '32px', zIndex: '999', minHeight: '32px' }) }), []);
  const categoryButtonWrapper = useMemo(() => ({ width: '230px', margin: '10px' }), []);
  /* 이미지 업로드 및 제거 관련 */
  const imagesWrapper = useMemo(() => ({ height: 'auto' }), []);
  const imagePathsWrapper = useMemo(() => ({ display: 'center', margin: '10px', width: '20%', float: 'left', height: '60px', background: '#c8e6d7' }), []);
  const removeImageIconWrapper = useMemo(() => ({ float: 'right', margin: '-60px 15px 0px 0', background: 'red' }), []);
  const closeOutIconWrapper = useMemo(() => ({ color: 'black', position: 'absolute', background: 'white', borderRadius: '40px' }), []);
  const imagePathsImgWrapper = useMemo(() => ({ width: '100%', height: '100%' }), []);

  return (
    <Form
      style={formWrapper}
      onFinish={onSubmitForm}
    >
      <div style={categoryButtonWrapper}>
        <Select
          placeholder="카테고리"
          name="categoty"
          onChange={onSelectCategory}
          options={postCategoryList(me.majors, categoryData)}
          styles={customStyles}
          menuPlacement="auto"
          maxMenuHeight={150}
        />
      </div>
      <Input.TextArea
        style={inputWrapper}
        value={title}
        onChange={onChangeTitle}
        autoSize={{ minRows: 1, maxRows: 2 }}
        placeholder="제목"
      />
      <Input.TextArea
        value={text}
        style={inputWrapper}
        onChange={onChangeText}
        autoSize={{ minRows: 4 }}
        placeholder="내용을 입력해주세요."
      />
      <div style={imageAndWriteWrapper}>
        <Button
          type="primary"
          style={writeButtonWrapper}
          htmlType="submit"
          loading={addPostLoading}
        >
          <b>작성</b>
        </Button>
        <Form encType="multipart/form-data" onClick={onClickImageUpload} style={uploadButtonWrapper}>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <FileImageOutlined style={iconWrapper} />
        </Form>
      </div>
      <br />
      <br />
      <div style={imagesWrapper}>
        {imagePaths.map((v, i) => (
          <div key={v} style={imagePathsWrapper}>
            <img src={v} style={imagePathsImgWrapper} alt={v} />
            <div onClick={onRemoveImage(i)} style={removeImageIconWrapper}>
              <CloseCircleOutlined style={closeOutIconWrapper} />
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

PostForm.propTypes = {
  me: PropTypes.shape({
    majors: PropTypes.array,
  }).isRequired,
};

export default PostForm;
