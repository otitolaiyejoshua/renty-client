import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKitchenSet, faBed, faBathtub, faToilet } from '@fortawesome/free-solid-svg-icons';
import { usePaystackPayment } from 'react-paystack';
import './UserPropertyCard.css';
import { PAYSTACK_PUBLIC_KEY } from './paystackConfig';
import { getUserData } from '../getUserData';
import Receipt from './Receipt';

const API_URL = process.env.REACT_APP_API_URL || '';

const PropertyCard = ({ property, onInspect }) => {
    const userData = getUserData();
    const userId = userData?.userId || null;
    const userEmail = userData?.email || null;
    const [bookingReference, setBookingReference] = useState(null);
    const [receipt, setReceipt] = useState(null);

    const initializePayment = usePaystackPayment({
        email: userEmail,
        amount: Number(property.price) * 100,
        reference: bookingReference,
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: { propertyId: property.id, userId, paymentType: 'booking' },
    });

    const verifyPayment = async (reference) => {
        try {
            const response = await fetch(`${API_URL}/api/payments/payments/verify`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference, propertyId: property.id, userId, userEmail, paymentType: 'booking' })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Payment verification failed.');
            if (data.success) setReceipt(data.payment); else alert('Payment Verification Failed.');
        } catch (error) {
            console.error('Error verifying booking payment:', error);
            alert(`An error occurred during booking payment verification: ${error.message}`);
        }
    };

    const handleBookingSuccess = (reference) => verifyPayment(reference.reference);
    const initiateBookingPayment = async () => {
        try {
            const response = await fetch(`${API_URL}/api/payments/payments/initiate`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, amount: Number(property.price) * 100, propertyId: property.id, userId, paymentType: 'booking' })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to initiate booking payment.');
            if (!data.reference) throw new Error('Payment reference was not returned.');
            setBookingReference(data.reference);
            // Give React one render to update the Paystack configuration with the new reference.
            setTimeout(() => initializePayment(handleBookingSuccess, () => {}), 0);
        } catch (error) {
            console.error('Error initiating booking payment:', error);
            alert(`An error occurred while initiating booking payment: ${error.message}`);
        }
    };

    const image = property.mainImage ? `${API_URL}/uploads/${property.mainImage}` : '/images/blank.jpg';
    return <>
        <article className="user-propertycard-container">
            <div className="user-propertycard-image-container"><img src={image} alt={property.title || 'Property'} /></div>
            <div className="user-propertycard-details-container">
                <h3 className="user-propertycard-title">{property.title}</h3>
                <p className="user-propertycard-address">{property.address}</p>
                <p className="user-propertycard-description">{property.description || 'Comfortable accommodation available through Renty.'}</p>
                <div className="user-propertycard-features">
                    <div className="feature"><FontAwesomeIcon icon={faBed} className="feature-icon" /> {property.rooms}</div>
                    <div className="feature"><FontAwesomeIcon icon={faKitchenSet} className="feature-icon" /> {property.kitchens}</div>
                    <div className="feature"><FontAwesomeIcon icon={faBathtub} className="feature-icon" /> {property.bathrooms}</div>
                    <div className="feature"><FontAwesomeIcon icon={faToilet} className="feature-icon" /> {property.toilets}</div>
                </div>
                <div className="user-propertycard-actions"><p className="user-propertycard-price">₦{Number(property.price).toLocaleString()}</p><div className="buttonaction"><button className="user-propertycard-button" onClick={() => onInspect(property)}>Inspect</button><button className="user-propertycard-button" onClick={initiateBookingPayment}>Book</button></div></div>
            </div>
        </article>
        <Receipt isOpen={!!receipt} onClose={() => setReceipt(null)} payment={receipt} />
    </>;
};
export default PropertyCard;
