import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_CATEGORY_POSTS_REQUEST } from '../../reducers/post';
import SearchHistory from './SearchHistory';
import SearchBar from './SearchBar';

const Search = ({ onCloseSearch }) => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.post);
  const getKetwords = localStorage.getItem('keywords');
  const [keywords, setKeywords] = useState(getKetwords || []);

  console.log('keywords 비교', keywords, getKetwords);

  useEffect(() => {
    localStorage.setItem('keywords', keywords);
  }, [keywords]);

  const onTag = useCallback((tag) => {
    console.log(tag);
    dispatch({
      type: LOAD_CATEGORY_POSTS_REQUEST,
      data: {
        inter: tag,
      },
    });
  }, []);

  const onAddKeyword = useCallback((text) => {
    console.log('onAddKeyword___text', text);
    const newKeyword = {
      id: Date.now(),
      text,
    };
    setKeywords([newKeyword, ...keywords]);
  }, []);

  const onRemoveKeyword = useCallback((id) => {
    const nextKeyword = keywords.filter((thisKeyword) => thisKeyword.id !== id);
    setKeywords(nextKeyword);
  }, []);

  const onClearKeywords = useCallback(() => {
    setKeywords([]);
  }, []);

  const pageWrapper = useMemo(() => ({ height: '65vh', width: '100vw', background: '#fbfbfb', zIndex: '1010', padding: '0', marginTop: '-15px', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)' }), []);
  const closeWrapper = useMemo(() => ({ fontSize: '30px', float: 'right', marginRight: '30px' }), []);
  const divWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', margin: '50px 0' }), []);
  const categoryWrapper = useMemo(() => ({ width: '80vw', maxWidth: '1000px' }), []);
  const tagWrapper = useMemo(() => ({ background: '#eef', width: 'auto', height: '30px', margin: '10px', borderRadius: '20px' }), []);
  const searchHistoryWrapper = useMemo(() => ({ marginTop: '20px' }), []);

  return (
    <div style={pageWrapper}>
      <CloseOutlined style={closeWrapper} onClick={onCloseSearch} />
      <SearchBar
        onAddKeyword={onAddKeyword}
        onCloseSearch={onCloseSearch}
      />
      <div style={divWrapper}>
        <div style={categoryWrapper}>
          <p>카테고리 목록</p>
          {categoryData.map((tag) => (
            <Button
              style={tagWrapper}
              key={tag}
              onClick={() => onTag(tag)}
            >
              {tag}
            </Button>
          ))}
          <div style={searchHistoryWrapper}>
            <SearchHistory
              keywords={keywords}
              onClearKeywords={onClearKeywords}
              onRemoveKeyword={onRemoveKeyword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
};

export default Search;
