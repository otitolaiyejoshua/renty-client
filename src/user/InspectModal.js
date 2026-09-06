import React, { useState } from 'react';
import './InspectModal.css';

const API_URL = process.env.REACT_APP_API_URL || '';
const InspectModal = ({ property, onClose }) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!property) return null;
    const propertyImages = [
        property.mainImage,
        property.interiorImage1,
        property.interiorImage2,
        property.interiorImage3
    ].filter(Boolean);


    const getImageUrl = (image) => {
        const filename =
            typeof image === 'string'
                ? image
                : image?.filename || image?.image || image?.path || image?.url;

        if (!filename) return '/images/blank.jpg';

        if (filename.startsWith('http')) {
            return filename;
        }

        return `${API_URL}/uploads/${filename}`;
    };

    const price = Number(property.price || 0).toLocaleString();

    return (
        <div className="renty-inspect-overlay" onClick={onClose}>
            <div
                className="renty-inspect-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    type="button"
                    className="renty-inspect-close"
                    onClick={onClose}
                    aria-label="Close property inspection"
                >
                    ×
                </button>

                <div className="renty-inspect-gallery">

                    <div className="renty-inspect-main-image">

                        <img
                            src={getImageUrl(propertyImages[activeImage])}
                            alt={`${property.title} ${activeImage + 1}`}
                        />

                        {propertyImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="renty-gallery-arrow renty-gallery-prev"
                                    onClick={() =>
                                        setActiveImage(
                                            activeImage === 0
                                                ? propertyImages.length - 1
                                                : activeImage - 1
                                        )
                                    }
                                    aria-label="Previous property image"
                                >
                                    ‹
                                </button>

                                <button
                                    type="button"
                                    className="renty-gallery-arrow renty-gallery-next"
                                    onClick={() =>
                                        setActiveImage(
                                            activeImage === propertyImages.length - 1
                                                ? 0
                                                : activeImage + 1
                                        )
                                    }
                                    aria-label="Next property image"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        <div className="renty-gallery-counter">
                            {activeImage + 1} / {propertyImages.length}
                        </div>

                        <div className="renty-inspect-price">
                            ₦{Number(property.price || 0).toLocaleString()}
                            <span>/ month</span>
                        </div>

                    </div>

                    {propertyImages.length > 1 && (
                        <div className="renty-inspect-thumbnails">

                            {propertyImages.map((image, index) => (
                                <button
                                    type="button"
                                    key={`${image}-${index}`}
                                    className={`renty-gallery-thumb ${index === activeImage ? 'active' : ''
                                        }`}
                                    onClick={() => setActiveImage(index)}
                                >
                                    <img
                                        src={getImageUrl(image)}
                                        alt={`${property.title} thumbnail ${index + 1}`}
                                    />
                                </button>
                            ))}

                        </div>
                    )}

                </div>
                {propertyImages.length > 1 && (
                    <div className="renty-inspect-thumbnails">
                        {propertyImages.map((image, index) => (
                            <button
                                type="button"
                                key={`${image}-${index}`}
                                className={`renty-gallery-thumb ${index === activeImage ? 'active' : ''
                                    }`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={getImageUrl(image)}
                                    alt={`Property ${index + 1}`}
                                />
                            </button>
                        ))}
                    </div>
                )}

            </div>
            <div className="renty-inspect-price">
                ₦{price}
                <span>/ month</span>
            </div>
        </div>
    );
};

export default InspectModal;