import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {Icon, Modal} from 'antd';
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    }, []);

    const onBackDrop = useCallback(() => {
        setShowImagesZoom(false);
    }, []);

    if (images.length === 1) {
        return (
            <>
                <img src={`http://localhost:9425/${images[0].src}`} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} onBackDrop={onBackDrop} />}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <div>
                    <img src={`http://localhost:9425/${images[0].src}`} width="50%" onClick={onZoom} />
                    <img src={`http://localhost:9425/${images[1].src}`} width="50%" onClick={onZoom} />
                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} onBackDrop={onBackDrop} />}
            </>
        );
    }
    return (
        <>
            <div>
                <img src={`http://localhost:9425/${images[0].src}`} width="50%" onClick={onZoom} />
                <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }} onClick={onZoom}>
                    <Icon type="plus" />
                    <br />
                    {images.length - 1}
                    개의 사진 더보기
                </div>
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose} onBackDrop={onBackDrop} />}
        </>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
};

export default PostImages;