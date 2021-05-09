/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

const SearchHistory = ({ keywords, onRemoveKeyword, onClearKeywords }) => {
  console.log('SearchHistory___keywords 검색 기록', keywords);

  const keywordWrapper = useMemo(() => ({ display: 'inlineBlock', margin: '0', padding: '5px', height: '20px' }), []);
  const textWrapper = useMemo(() => ({ float: 'left', marginBottom: '5px', padding: '0', width: '100%', background: '#f5f5f5', borderRadius: '5px' }), []);
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
              <div style={keywordWrapper} key={id}>
                <div style={textWrapper}>
                  {text}
                  <p
                    style={rightWrapper}
                    key={id}
                    onClick={() => onRemoveKeyword(id)}
                  >
                    <CloseOutlined />
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
