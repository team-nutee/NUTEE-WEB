import React, { useCallback, useMemo, useState } from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { EDIT_CATEGORY_REQUEST } from '../../reducers/user';
import { interestsData } from '../dummy'; // dummy

const EditCategory = () => {
  const [interests, setInterests] = useState([]);
  const dispatch = useDispatch();

  const onEditCategory = useCallback(() => {
    dispatch({
      type: EDIT_CATEGORY_REQUEST,
      data: interests,
    });
  }, [interests]);

  const pageWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginTop: '70px', height: 'auto' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '80px', marginLeft: '10px', height: '40px' }), []);
  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: '300px', border: '3px solid #005000' }) }), []);

  return (
    <>
      <div style={pageWrapper}>
        <Select
          isMulti
          autoFocus
          placeholder="선호하는 카테고리를 선택해주세요."
          styles={customStyles}
          name="user-interests"
          onChange={setInterests}
          options={interestsData}
        />
        <Button style={buttonWrapper} onClick={onEditCategory}>확인</Button>
      </div>
    </>
  );
};

export default EditCategory;
