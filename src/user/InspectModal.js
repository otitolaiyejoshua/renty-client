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
    const userEmail = userData ? userData.email : null;
    // Retrieve agent data from property
    const agentId = property.agentId; // Ensure 'agentId' is part of the property object

    // State to manage inspection payment reference and receipt
    const [inspectionReference, setinspectionReference] = useState(null);
    // Initialize Paystack Payment
    const inspectionPrice = 3500; // Convert price to kobo for inspection
    console.log(inspectionPrice);
    const initializePayment = usePaystackPayment({
        email: userEmail,
        amount: inspectionPrice, // Amount in kobo
        reference: inspectionReference,
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: {
            propertyId: property.id,
            userId: userId,
            paymentType: 'inspection',
            agentId: agentId,
        },
    });

    // Handle successful inspection payment
    const handleinspectionSuccess = (reference) => {
        console.log('inspection Payment Successful!', reference);
        // Send reference to backend for verification and recording
        verifyPayment(reference.reference);
    };

    // Handle payment dialog close without completing inspection payment
    const handleinspectionClose = () => {
        console.log('inspection Payment dialog closed.');
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
                    userEmail,
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
            console.error('Error verifying inspection payment:', error);
            alert(`An error occurred during inspection payment verification: ${error.message}`);
        }
    };
    // Initiate inspection payment
    const initiateInspectionPayment = () => {
        // Send request to backend to initiate payment and get a reference
        fetch('http://localhost:5000/api/payments/payments/initiate', { // Corrected endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail, // Use actual user email
                amount: inspectionPrice, // Amount in kobo
                propertyId: property.id,
                userId: userId,
                paymentType: 'inspection',
                agentId: agentId,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Failed to initiate inspection payment.');
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.reference) {
                    setinspectionReference(data.reference); // Set the reference for Paystack
                    initializePayment(handleinspectionSuccess, handleinspectionClose);
                } else {
                    alert('Failed to initiate inspection payment.');
                }
            })
            .catch((error) => {
                console.error('Error initiating inspection payment:', error);
                alert(`An error occurred while initiating inspection payment: ${error.message}`);
            });
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
