import React, { useCallback, useMemo } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Router from 'next/router';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

const SearchBar = ({ onAddKeyword }) => {
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
    if (e.key === 'Enter') {
      const key = e.target.value;
      if (key.length <= 0 || key.trim() === '') {
        return alert('검색어를 입력하십시오.');
      }
      Router.push(`/search/${key}`);
      onAddKeyword(key);
    }
    return true;
  }, []);

  const searchWrapper = useMemo(() => ({ float: 'left', margin: '2px 10px 0 20px', width: '40vw' }), []);
  const SearchIconWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '17px' }), []);

  return (
    <div>
      <Input
        placeholder="검색어를 입력하세요."
        allowClear
        style={searchWrapper}
        value={keyword}
        onChange={onChangeKeyword}
        onKeyPress={onEnter}
      />
      <SearchOutlined style={SearchIconWrapper} onClick={onSearch} />
    </div>
  );
};

SearchBar.propTypes = {
  onAddKeyword: PropTypes.func,
}.isRequired;

export default SearchBar;
