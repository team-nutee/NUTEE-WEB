import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from '../ImagesZoom';
import { TARGET_URL } from "../../static";

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
                <img src={`${TARGET_URL}/${images[0].src}`} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} onBackDrop={onBackDrop} />}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <div>
                    <img src={`${TARGET_URL}/${images[0].src}`} width="50%" onClick={onZoom} />
                    <img src={`${TARGET_URL}/${images[1].src}`} width="50%" onClick={onZoom} />
                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} onBackDrop={onBackDrop} />}
            </>
        );
    }

    const divWrapper = useMemo(() => ({ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }), []);

    return (
        <>
            <div>
                <img src={`${TARGET_URL}/${images[0].src}`} width="50%" onClick={onZoom} />
                <div style={divWrapper} onClick={onZoom}>
                    <PlusOutlined />
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