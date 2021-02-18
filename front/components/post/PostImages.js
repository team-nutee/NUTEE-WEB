import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from '../ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  /*
  const onBackDrop = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  */

  const imgWrapper = useMemo(() => ({ width: '50%', display: 'inline-block' }), []);
  const img2Wrapper = useMemo(() => ({ width: '50%' }), []);
  const img3Wrapper = useMemo(() => ({ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }), []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`http://localhost:80/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={imgWrapper} src={`http://localhost:80/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={imgWrapper} src={`http://localhost:80/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" style={img2Wrapper} src={`http://localhost:80/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <div
          role="presentation"
          style={img3Wrapper}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
