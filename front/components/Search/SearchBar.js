import React, { useCallback, useMemo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Router from 'next/router';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

const SearchBar = ({ onAddKeyword, onCloseSearch }) => {
  const [keyword, onChangeKeyword] = useInput('');

  const onSearch = useCallback(() => {
    if (keyword.length <= 0 || keyword.trim() === '') {
      return alert('검색어를 입력하십시오.');
    }
    Router.push(`/search/${keyword}`);
    onAddKeyword(keyword);
    return true;
  }, [keyword]);

  const onEnter = useCallback((e) => {
    console.log('Enter', e.keyCode);
    if (e.keyCode === 13) {
      if (keyword.length <= 0 || keyword.trim() === '') {
        return alert('검색어를 입력하십시오.');
      }
      Router.push(`/search/${keyword}`);
      onAddKeyword(keyword);
    }
    return true;
  }, []);

  const searchWrapper = useMemo(() => ({ float: 'left', margin: '2px 10px 0 20px', width: '40vw' }), []);
  const SearchIconWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '17px' }), []);

  return (
    <>
      <Input
        placeholder="검색어를 입력하세요."
        allowClear
        style={searchWrapper}
        value={keyword}
        onChange={onChangeKeyword}
      />
      <SearchOutlined style={SearchIconWrapper} onKeyDown={onEnter} onClick={onSearch} />
    </>
  );
};

SearchBar.propTypes = {
  onAddKeyword: PropTypes.func,
  onCloseSearch: PropTypes.func,
}.isRequired;

export default SearchBar;
