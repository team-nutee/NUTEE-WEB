import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { EDIT_MAJOR_REQUEST } from '../../reducers/user';
import { LOAD_MAJOR_DATA_REQUEST } from '../../reducers/post';

const EditCategory = () => {
  const [major, setMajor] = useState([]);
  const dispatch = useDispatch();
  const { majorsData } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MAJOR_DATA_REQUEST,
    });
  }, []);

  const onEditMajor = useCallback(() => {
    dispatch({
      type: EDIT_MAJOR_REQUEST,
      data: { majors: major },
    });
  }, [major]);

  const selectOptions = (v) => {
    const objectData = v.map((data) => ({ value: data, label: data }));
    return objectData;
  };

  const onSelectMajors = (selected) => {
    const select = selected.map(({ value }) => value);
    setMajor(select);
  };

  const pageWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', marginTop: '70px', height: 'auto' }), []);
  const buttonWrapper = useMemo(() => ({ background: '#13c276', color: '#fff', width: '80px', marginLeft: '10px', height: '40px' }), []);
  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: '300px', border: '3px solid #005000' }) }), []);

  return (
    <div style={pageWrapper}>
      <Select
        isMulti
        placeholder="학부 또는 전공을 선택해주세요."
        styles={customStyles}
        name="user-interests"
        onChange={onSelectMajors}
        options={selectOptions(majorsData)}
      />
      <Button style={buttonWrapper} onClick={onEditMajor}>확인</Button>
    </div>
  );
};

export default EditCategory;
