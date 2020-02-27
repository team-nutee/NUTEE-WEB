import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {Modal, ModalContent, CloseBtn, SlickWrapper, ImgWrapper } from './style';
import TARGET_URL from "../../static";

const ImagesZoom = ({ images, onClose, onBackDrop }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Modal>
            <ModalContent>
                <SlickWrapper>
                    <CloseBtn type="close" onClick={onClose}/>
                    <div>
                        <Slider
                            customPaging={function(i) {
                                return (
                                    <a>
                                        <img style={{width:'10px', height:'8px', borderRadius:'0px'}} src={`${TARGET_URL}/${images[i].src}`}/>
                                    </a>
                                );
                            }}
                            arrows={true}
                            dots
                            dotsClass={'slick-dots slick-thumb'}
                            infinite={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            {images.map((v) => {
                                return (
                                    <ImgWrapper>
                                        <img src={`${TARGET_URL}/${v.src}`}/>
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