// src/components/Receipt.js
import React from 'react';
import Modal from 'react-modal';
import './Receipt.css'; // Create and style this CSS as needed

const Receipt = ({ isOpen, onClose, payment }) => {
    if (!payment) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Payment Receipt"
            className="receipt-modal"
            overlayClassName="overlay"
        >
            <div className="receipt-content">
                <h2>Payment Receipt</h2>
                <p><strong>Amount:</strong> ₦{payment.amount}</p>
                <p><strong>Reference:</strong> {payment.reference}</p>
                <p><strong>Status:</strong> {payment.status}</p>
                <p><strong>Paid At:</strong> {new Date(payment.paidAt).toLocaleString()}</p>
                <p><strong>Message:</strong> {payment.message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default Receipt;
