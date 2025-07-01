// src/components/PropertyCard.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faBed, faBathtub, faToilet } from '@fortawesome/free-solid-svg-icons';
import { usePaystackPayment } from 'react-paystack';
import './UserPropertyCard.css';
import { PAYSTACK_PUBLIC_KEY } from './paystackConfig';
import { getUserData } from '../getUserData';
import Receipt from './Receipt';

const PropertyCard = ({ property, onInspect }) => {
    // Retrieve user data from localStorage
    const userData = getUserData();
    const userId = userData ? userData.userId : null;
    const userEmail = userData ? userData.email : null;

    const [bookingReference, setBookingReference] = useState(null);
    const [receipt, setReceipt] = useState(null);

    // Initialize Paystack Payment with required fields
    const initializePayment = usePaystackPayment({
        email: userEmail,
        amount: property.price * 100,
        reference: bookingReference,
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: {
            propertyId: property.id,
            userId,
            paymentType: 'booking',
        },
    });

    const handleBookingSuccess = (reference) => {
        console.log('Booking Payment Successful!', reference);
        verifyPayment(reference.reference);
    };

    const handleBookingClose = () => {
        console.log('Booking Payment dialog closed.');
    };

    // Function to verify payment on backend
    const verifyPayment = async (reference) => {
        try {
            const response = await fetch('https://renty-server.onrender.com/api/payments/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reference,
                    propertyId: property.id,
                    userId,
                    userEmail,
                    paymentType: 'booking',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment Verification Failed.');
            }

            const data = await response.json();

            if (data.success) {
                setReceipt(data.payment);
            } else {
                alert('Payment Verification Failed.');
            }
        } catch (error) {
            console.error('Error verifying booking payment:', error);
            alert(`An error occurred during booking payment verification: ${error.message}`);
        }
    };

    const initiateBookingPayment = () => {
        fetch('https://renty-server.onrender.com/api/payments/payments/initiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                amount: property.price * 100,
                propertyId: property.id,
                userId,
                paymentType: 'booking',
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Failed to initiate booking payment.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.reference) {
                    setBookingReference(data.reference);
                    initializePayment(handleBookingSuccess, handleBookingClose);
                } else {
                    alert('Failed to initiate booking payment.');
                }
            })
            .catch((error) => {
                console.error('Error initiating booking payment:', error);
                alert(`An error occurred while initiating booking payment: ${error.message}`);
            });
    };

    return (
        <>
            <div className="user-propertycard-container">
                <div className="user-propertycard-image-container">
                    <img src={`https://renty-server.onrender.com/uploads/${property.mainImage}`} alt={property.title} />
                </div>
                <div className="user-propertycard-details-container">
                    <h3 className="user-propertycard-title">{property.title}</h3>
                    <p className="user-propertycard-address">{property.address}</p>
                    <p className="user-propertycard-description">{property.description}</p>
                    <div className="user-propertycard-features">
                        <div className="feature">
                            <FontAwesomeIcon icon={faBed} className="feature-icon" /> {property.rooms}
                        </div>
                        <div className="feature">
                            <FontAwesomeIcon icon={faKitchenSet} className="feature-icon" /> {property.kitchens}
                        </div>
                        <div className="feature">
                            <FontAwesomeIcon icon={faBathtub} className="feature-icon" /> {property.bathrooms}
                        </div>
                        <div className="feature">
                            <FontAwesomeIcon icon={faToilet} className="feature-icon" /> {property.toilets}
                        </div>
                    </div>
                    <div className="user-propertycard-actions">
                        <p className="user-propertycard-price">₦{property.price}</p>
                        <div className="buttonaction">
                            <button className="user-propertycard-button" onClick={() => onInspect(property)}>
                                Inspect
                            </button>
                            <button className="user-propertycard-button" onClick={initiateBookingPayment}>
                                Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            <Receipt
                isOpen={!!receipt}
                onClose={() => setReceipt(null)}
                payment={receipt}
            />
        </>
    );
};

export default PropertyCard;
