import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, ImagesContent, CloseBtn, ImgWrapper, Indicator } from './style';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Modal>
      <ImagesContent>
        <CloseBtn>
          <CloseOutlined onClick={onClose} />
        </CloseBtn>
        <div>
          <Slider
            initialSlide={0}
            infinite
            beforeChange={(slide) => setCurrentSlide(slide)}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper>
                <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>{`${currentSlide + 1} / ${images.length}`}</div>
          </Indicator>
        </div>
      </ImagesContent>
    </Modal>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
