import React, { useCallback, useRef, useMemo } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { TARGET_URL } from "../../static";
import { UPLOAD_PROFILE_IMAGE_REQUEST } from "../../reducers/user";
import useInput from "../../hooks/useInput";

const EditProfileImage = () => {
    const [editImage, onChangeEditImage, setEditImage] = useInput("");
    const { me, profileImagePath } = useSelector(state => state.user);
    const imageInput = useRef();
    const dispatch = useDispatch();

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        if (e.target.files === undefined) {
            alert('이미지를 선택해주세요.');
            return false;
        }
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_PROFILE_IMAGE_REQUEST,
            data: imageFormData,
        });
    }, []);

    const pageWrapper = useMemo(() => ({ marginTop: '70px' }), []);
    const inputWrapper = useMemo(() => ({ display: "flex", justifyContent: "center" }), []);
    const imgWrapper = useMemo(() => ({ width: '100px', height: '100px', borderRadius: '50px', border: '1px solid #e6e6e6', }), []);
    const buttonWrapper = useMemo(() => ({ background: "#13c276", color: "#fff", width: "70px", marginTop: '10px' }), []);

    return (
        <div style={pageWrapper}>
            <div style={inputWrapper}>
                <input type="file" hidden ref={imageInput} />
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
            <div style={inputWrapper}>
                <Button onClick={onChangeImages} shape='round' style={buttonWrapper}>확인</Button>
            </div>
        </div>
    )
};
export default EditProfileImage;