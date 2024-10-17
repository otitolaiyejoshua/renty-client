// src/components/PropertyCard.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faBed, faBathtub, faToilet } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import { usePaystackPayment } from 'react-paystack';
import './UserPropertyCard.css';
import { PAYSTACK_PUBLIC_KEY } from './paystackConfig';
import { getUserData } from '../getUserData';
import Receipt from './Receipt'; // Import the Receipt component

const PropertyCard = ({ property, onInspect }) => {
    // Retrieve user data from localStorage
    const userData = getUserData();
    const userId = userData ? userData.userId : null;
    const userPhone = userData ? userData.phone : null;
    const userName = userData ? userData.name : null; // Ensure 'name' exists
    const userEmail = userData && userData.email 
        ? userData.email 
        : `user${userData.phone}@yourapp.com`; // Ensure 'email' exists

    // Retrieve agent data from property
    const agentId = property.agentId; // Ensure 'agentId' is part of the property object

    // State to manage booking payment reference and receipt
    const [bookingReference, setBookingReference] = useState(null);
    const [receipt, setReceipt] = useState(null); // State for receipt

    // Initialize Paystack Payment
    const initializePayment = usePaystackPayment({
        email: userEmail,
        amount: property.price * 100, // Amount in kobo
        reference: bookingReference,
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: {
            propertyId: property.id,
            userId: userId,
            paymentType: 'booking',
            userPhone: userPhone,
            agentId: agentId,
        },
    });

    // Handle successful booking payment
    const handleBookingSuccess = (reference) => {
        console.log('Booking Payment Successful!', reference);
        // Send reference to backend for verification and recording
        verifyPayment(reference.reference);
    };

    // Handle payment dialog close without completing booking payment
    const handleBookingClose = () => {
        console.log('Booking Payment dialog closed.');
    };

    // Function to verify payment on backend
    const verifyPayment = async (reference) => {
        try {
            const response = await fetch('http://localhost:5000/api/payments/payments/verify', { // Corrected endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reference: reference,
                    propertyId: property.id,
                    userId: userId,
                    paymentType: 'booking',
                    userPhone: userPhone,
                    agentId: agentId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Payment Verification Failed.');
            }

            const data = await response.json();

            if (data.success) {
                // Set the receipt data
                setReceipt(data.payment);
            } else {
                alert('Payment Verification Failed.');
            }
        } catch (error) {
            console.error('Error verifying booking payment:', error);
            alert(`An error occurred during booking payment verification: ${error.message}`);
        }
    };

    // Initiate booking payment
    const initiateBookingPayment = () => {
        // Send request to backend to initiate payment and get a reference
        fetch('http://localhost:5000/api/payments/payments/initiate', { // Corrected endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail, // Use actual user email
                amount: property.price * 100, // Amount in kobo
                propertyId: property.id,
                userId: userId,
                paymentType: 'booking',
                userPhone: userPhone,
                agentId: agentId,
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
                    setBookingReference(data.reference); // Set the reference for Paystack
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
                    <img src={`http://localhost:5000/uploads/${property.mainImage}`} alt={property.title} />
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
