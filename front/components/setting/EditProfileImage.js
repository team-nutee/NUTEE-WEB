/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useRef, useMemo, useState } from 'react';
import { Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TARGET_URL } from '../../static';
import { EDIT_PROFILE_IMAGE_REQUEST, UPLOAD_PROFILE_IMAGE_REQUEST } from '../../reducers/user';

const EditProfileImage = () => {
  const { me, profileImagePath } = useSelector((state) => state.user);
  const imageInput = useRef();
  const [isImage, setIsImage] = useState(false);
  const dispatch = useDispatch();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const uploadProfileImage = useCallback((e) => {
    setIsImage(true);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('images', f);
    });
    dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  // eslint-disable-next-line consistent-return
  const onChangeImages = useCallback(() => {
    if (isImage === false) {
      alert('이미지를 선택해주세요.');
      return false;
    }
    dispatch({
      type: EDIT_PROFILE_IMAGE_REQUEST,
      data: {
        profileUrl: profileImagePath[0],
      },
    });
    alert('프로필이 변경되었습니다.');
  }, [profileImagePath]);

  const pageWrapper = useMemo(() => ({ marginTop: '70px' }), []);
  const inputWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center' }), []);
  const imgWrapper = useMemo(() => ({ width: '100px', height: '100px', borderRadius: '50px', border: '1px solid #e6e6e6' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '70px', marginTop: '10px' }), []);

  return (
    <div style={pageWrapper}>
      <div style={inputWrapper}>
        <Form encType="multipart/form-data" onClick={onClickImageUpload}>
          <input type="file" name="image" hidden ref={imageInput} onChange={uploadProfileImage} />
          {
                      me.image
                        ? isImage
                            ? (
                              <img
                                src={profileImagePath}
                                style={imgWrapper}
                                alt={profileImagePath}
                              />
                            )
                            : (
                              <img
                                src={me.image.src}
                                style={imgWrapper}
                                alt={me.image.src}
                              />
                            )
                        : isImage
                            ? (
                              <img
                                src={profileImagePath}
                                style={imgWrapper}
                                alt={profileImagePath}
                              />
                            )
                            : (
                              <img
                                src={`${TARGET_URL}/settings/nutee_profile.png`}
                                style={imgWrapper}
                                alt="nutee profile"
                              />
                            )
                  }
        </Form>
      </div>
      <div style={inputWrapper}>
        <Button onClick={onChangeImages} shape="round" style={buttonWrapper}>확인</Button>
      </div>
    </div>
  );
};
export default EditProfileImage;
