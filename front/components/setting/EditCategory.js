import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { EDIT_CATEGORY_REQUEST } from '../../reducers/user';
import { LOAD_CATEGORY_DATA_REQUEST } from '../../reducers/post';

const EditCategory = () => {
  const [interests, setInterests] = useState([]);
  const { categoryData } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_CATEGORY_DATA_REQUEST,
    });
  }, []);

  const onEditCategory = useCallback(() => {
    dispatch({
      type: EDIT_CATEGORY_REQUEST,
      data: { interests },
    });
  }, [interests]);

  const selectOptions = (v) => {
    const objectData = v.map((data) => ({ value: data, label: data }));
    return objectData;
  };

  const onSelectInterests = (selected) => {
    const select = selected.map(({ value }) => value);
    setInterests(select);
  };

  const pageWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginTop: '70px', height: 'auto' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '80px', marginLeft: '10px', height: '40px' }), []);
  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: '300px', border: '3px solid #005000' }) }), []);

  return (
    <>
      <div style={pageWrapper}>
        <Select
          isMulti
          placeholder="선호하는 카테고리를 선택해주세요."
          name="user-interests"
          onChange={onSelectInterests}
          options={selectOptions(categoryData)}
          styles={customStyles}
        />
        <Button style={buttonWrapper} onClick={onEditCategory}>확인</Button>
      </div>
    </>
  );
};

export default EditCategory;
