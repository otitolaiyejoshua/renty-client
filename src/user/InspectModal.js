// src/components/InspectModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { usePaystackPayment } from 'react-paystack';
import { PAYSTACK_PUBLIC_KEY } from './paystackConfig';
import { getUserData } from '../getUserData'; // Adjust the path as necessary
import Receipt from './Receipt'; // Import the Receipt component

const InspectModal = ({ property, onClose }) => {
    const [expandedImage, setExpandedImage] = useState(null);
    const [paymentReference, setPaymentReference] = useState(null);
    const [receipt, setReceipt] = useState(null); // State for receipt

    // Retrieve user data
    const userData = getUserData();
    const userId = userData ? userData.userId : null;
    const userPhone = userData ? userData.phone : null;
    const userName = userData ? userData.name : null; // Ensure 'name' exists
    const userEmail = userData ? userData.email : null; // Ensure 'email' exists

    // Retrieve agent data from property
    const agentId = property.agentId; // Ensure 'agentId' is part of the property object

    // Define payment configuration object
    const paymentConfig = {
        reference: paymentReference,
        email: userEmail,
        amount: property.inspectionFee * 100, // Convert to kobo
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: {
            propertyId: property.id,
            userId: userId,
            paymentType: 'inspection',
            userPhone: userPhone,
            agentId: agentId,
        },
    };

    // Initialize Paystack payment hook at the top level
    const initializePayment = usePaystackPayment(paymentConfig);

    // Handle successful payment
    const handlePaymentSuccess = (reference) => {
        console.log('Payment Successful!', reference);
        // Handle successful payment, e.g., verify on backend
        verifyPayment(reference.reference);
    };

    // Handle payment dialog close
    const handlePaymentClose = () => {
        console.log('Payment dialog closed.');
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
                    paymentType: 'inspection',
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
            console.error('Error verifying payment:', error);
            alert(`An error occurred during payment verification: ${error.message}`);
        }
    };

    // Function to initiate payment request
    const initiateInspectionPayment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/payments/payments/initiate', { // Corrected endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    amount: 3000, // Amount in kobo
                    propertyId: property.id,
                    userId: userId,
                    paymentType: 'inspection',
                    userPhone: userPhone,
                    agentId: agentId,
                }),
            });

            if (!response.ok) {
                const errorText = await response.json();
                console.error('Server Error:', errorText);
                throw new Error(errorText.message || 'Failed to initiate payment.');
            }

            const data = await response.json();

            if (data.reference) {
                setPaymentReference(data.reference); // Set reference in state
                initializePayment(handlePaymentSuccess, handlePaymentClose); // Trigger payment
            } else {
                alert('Failed to initiate payment.');
            }
        } catch (error) {
            console.error('Error initiating inspection payment:', error);
            alert(`An error occurred while initiating payment: ${error.message}`);
        }
    };

    // Handle image click to expand
    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    const handleCloseExpanded = () => {
        setExpandedImage(null);
    };

    const interiorImages = [property.interiorImage1, property.interiorImage2, property.interiorImage3].filter(image => image);

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={onClose}
                contentLabel="Inspect Property"
                className="inspect-modal"
                overlayClassName="overlay"
            >
                <div id="inspection-content">
                    <h2>Inspection for {property.title}</h2>
                    <div className='image-grid'>
                        {interiorImages.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/uploads/${image}`}
                                alt={`Interior ${index + 1}`}
                                onClick={() => handleImageClick(`http://localhost:5000/uploads/${image}`)}
                            />
                        ))}
                    </div>
                    <div className='inspection-actions'>
                        <button className='inspection-buttons' onClick={onClose}>Satisfied with Online Inspection</button>
                        <button className='inspection-buttons' onClick={initiateInspectionPayment}>
                            Pay For Physical Inspection
                        </button>
                    </div>
                </div>
                {expandedImage && (
                    <div className='expanded-image'>
                        <img src={expandedImage} alt='expanded' onClick={handleCloseExpanded} />
                    </div>
                )}
            </Modal>
            
            {/* Receipt Modal */}
            <Receipt
                isOpen={!!receipt}
                onClose={() => setReceipt(null)}
                payment={receipt}
            />
        </>
    );
};

export default InspectModal;
