/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CloseOutlined } from '@ant-design/icons';
import { LOAD_CATEGORY_POSTS_REQUEST } from '../../reducers/post';

const SearchHistory = ({ keywords, onRemoveKeyword, onClearKeywords }) => {
  const dispatch = useDispatch();
  const keywordWrapper = useMemo(() => ({ display: 'inlineBlock', margin: '0', padding: '5px', height: '20px' }), []);
  const undefinedWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', margin: '50px 0' }), []);
  const textWrapper = useMemo(() => ({ float: 'left', cursor: 'pointer', marginBottom: '5px', padding: '0', width: '100%', height: '20px', background: '#f5f5f5', borderRadius: '5px' }), []);
  const rightWrapper = useMemo(() => ({ float: 'right', cursor: 'pointer' }), []);
  const deleteButtonWrapper = useMemo(() => ({ float: 'right', marginTop: '-30px' }), []);
  const leftWrapper = useMemo(() => ({ float: 'left' }), []);

  const onTag = useCallback((tag) => {
    console.log(tag);
    dispatch({
      type: LOAD_CATEGORY_POSTS_REQUEST,
      data: {
        inter: tag,
      },
    });
  }, []);

  const history = (
    <>
      {keywords.length === 0 || keywords === null || keywords === [] || keywords === '[]'
        ? (
          <div style={undefinedWrapper}>
            <p>최근 검색된 기록이 없습니다.</p>
          </div>
        )
        : (
          <>
            {keywords.map(({ id, text }) => (
              <div style={keywordWrapper} key={id}>
                <div style={textWrapper}>
                  <Link href={`/search/${text}`} prefetch={false} key={text}>
                    <a>
                      <pre key={id} onClick={() => onTag(text)}>{text}</pre>
                    </a>
                  </Link>
                  <p
                    style={rightWrapper}
                    key={id}
                    onClick={() => onRemoveKeyword(id)}
                  >
                    <CloseOutlined style={deleteButtonWrapper} />
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
    </>
  );

  return (
    <>
      <p style={leftWrapper}>최근 검색 기록</p>
      {keywords.length === 0 || keywords === null || keywords === [] || keywords === '[]' ? <></>
        : <p style={rightWrapper} key="Remove" onClick={onClearKeywords}>전체 삭제</p>}
      <br />
      <div>{history}</div>
    </>
  );
};

SearchHistory.propTypes = {
  keywords: PropTypes.object,
  onRemoveKeyword: PropTypes.func,
  onClearKeywords: PropTypes.func,
}.isRequired;

export default SearchHistory;
