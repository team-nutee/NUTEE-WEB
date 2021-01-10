import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, ModalContent, CloseBtn, SlickWrapper, ImgWrapper } from './style';
import { TARGET_URL } from "../../static";

const ImagesZoom = ({ images, onClose, onBackDrop }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Modal>
            <ModalContent>
                <SlickWrapper>
                    <CloseBtn>
                        <div>
                            <CloseOutlined onClick={onClose} />
                        </div>
                    </ CloseBtn>
                    <div>
                        <Slider
                            dots
                            infinite={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            {images.map((v) => {
                                return (
                                    <ImgWrapper>
                                        <img src={`${TARGET_URL}/${v.src}`} />
                                    </ImgWrapper>
                                );
                            })}
                        </Slider>
                    </div>
                </SlickWrapper>
            </ModalContent>
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