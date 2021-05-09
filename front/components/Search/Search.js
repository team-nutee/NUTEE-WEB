import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import { LOAD_CATEGORY_POSTS_REQUEST } from '../../reducers/post';
import SearchHistory from './SearchHistory';
import SearchBar from './SearchBar';

const Search = ({ onCloseSearch }) => {
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.post);
  const getKetwords = JSON.parse(localStorage.getItem('keywords'));
  const [keywords, setKeywords] = useState(getKetwords || []);

  console.log('keywords 비교keywords VS getKetwords  Search.js  ::: ', keywords, getKetwords);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
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
    console.log('onAddKeyword___text  검색한 키워드  Search.js', text);
    const newKeyword = {
      id: Date.now(),
      text,
    };
    console.log('onAddKeyword___text  새로운 키워드 추가 Search.js', newKeyword);
    setKeywords([newKeyword, ...keywords]);
    console.log('onAddKeyword___text  새로운 키워드 추가 setKeywords 이후', keywords);
  }, []);

  const onRemoveKeyword = useCallback((id) => {
    console.log('onRemoveKeyword___text 삭제한 키워드   Search.js ::: ', id);
    const nextKeyword = keywords.filter((thisKeyword) => thisKeyword.id !== id);
    setKeywords(nextKeyword);
  }, []);

  const onClearKeywords = useCallback(() => {
    setKeywords([]);
    localStorage.removeItem('keywords');
  }, []);

  const pageWrapper = useMemo(() => ({ background: '#fbfbfb', zIndex: '1010', padding: '0', marginTop: '-15px', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)' }), []);
  const closeWrapper = useMemo(() => ({ fontSize: '30px', float: 'right', marginRight: '30px', display: 'fixed' }), []);
  const divWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', margin: '30px 0 30px 0' }), []);
  const categoryWrapper = useMemo(() => ({ width: '90vw', maxWidth: '1000px' }), []);
  const tagWrapper = useMemo(() => ({ background: '#eef', width: 'auto', height: '30px', margin: '10px', borderRadius: '20px' }), []);
  const searchHistoryWrapper = useMemo(() => ({ marginTop: '20px' }), []);

  const Box = styled.div`
  height: 55vh; 
  max-height: 500px;
  width: 100vw;
  overflow:auto;
    ::-webkit-scrollbar {
       display: none;
    }
`;

  return (
  /* 검색 아이콘을 눌렀을 때 보이는 페이지 */
    <div style={pageWrapper}>
      <CloseOutlined style={closeWrapper} onClick={onCloseSearch} />
      <SearchBar
        onAddKeyword={onAddKeyword}
        onCloseSearch={onCloseSearch}
      />
      <Box>
        <div style={divWrapper}>
          <div style={categoryWrapper}>
            <p>카테고리 목록</p>
            {categoryData.map((tag) => (
              <Link href={`/search/${tag}`} prefetch={false} key={tag}>
                <a>
                  <Button
                    style={tagWrapper}
                    key={tag}
                    onClick={() => onTag(tag)}
                  >
                    {tag}
                  </Button>
                </a>
              </Link>
            ))}
            {/* 검색 기록 */}
            <div style={searchHistoryWrapper}>
              <SearchHistory
                keywords={keywords}
                onClearKeywords={onClearKeywords}
                onRemoveKeyword={onRemoveKeyword}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

Search.propTypes = {
  onCloseSearch: PropTypes.func.isRequired,
};

export default Search;
