import React, { useCallback, useMemo, useState } from "react";
import { Button } from "antd";
import { EDIT_MAJOR_REQUEST } from "../../reducers/user";
import { useDispatch, } from "react-redux";
import { majorsData } from '../../components/dummy'; //dummy
import Select from 'react-select';

const EditCategory = () => {
  const [major, setMajor] = useState([]);
  const dispatch = useDispatch();

  const onEditMajor = useCallback(() => {
    dispatch({
      type: EDIT_MAJOR_REQUEST,
      data: major,
    });
  }, [major]);

  const pageWrapper = useMemo(() => ({ display: "flex", justifyContent: "center", marginTop: '70px', height: 'auto' }), []);
  const buttonWrapper = useMemo(() => ({ background: "#13c276", color: "#fff", width: "80px", marginLeft: '10px', height: '40px' }), []);
  const customStyles = useMemo(() => ({ control: (css) => ({ ...css, width: "300px", border: '3px solid #005000', }), }), []);

  return (
    <>
      <div style={pageWrapper}>
        <Select
          isMulti
          autoFocus
          placeholder="자신의 전공을 선택해주세요."
          styles={customStyles}
          name="user-interests"
          onChange={setMajor}
          options={majorsData}
        />
        <Button style={buttonWrapper} onClick={onEditMajor}>확인</Button>
      </div>
    </>
  );
};

export default EditCategory; 