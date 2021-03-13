/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

const SearchHistory = ({ keywords, onRemoveKeyword, onClearKeywords }) => {
  console.log('SearchHistory___keywordssss', keywords);

  const keywordWrapper = useMemo(() => ({ background: 'green', margin: '0', padding: '5px', height: '20px' }), []);
  const textWrapper = useMemo(() => ({ float: 'left', margin: '0', padding: '0', width: '80%', background: 'pink' }), []);
  const undefinedWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', margin: '50px 0' }), []);
  const rightWrapper = useMemo(() => ({ float: 'right', cursor: 'pointer' }), []);
  const leftWrapper = useMemo(() => ({ float: 'left' }), []);

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
              <p style={keywordWrapper} key={id}>
                <p style={textWrapper}>{text}</p>
                <p style={rightWrapper} key={id} onClick={onRemoveKeyword(id)}><CloseOutlined /></p>
              </p>
            ))}
          </>
        )}
    </>
  );

  return (
    <>
      <p style={leftWrapper}>최근 검색 기록</p>
      <p style={rightWrapper} key="Remove" onClick={onClearKeywords}>전체 삭제</p>
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
