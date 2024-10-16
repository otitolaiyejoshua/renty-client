// src/components/PopupForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Intro.css'; // Ensure this CSS file contains styles for the modal and form

Modal.setAppElement('#root'); // This should ideally be set once in a higher-level component

const PopupForm = ({ isOpen, onClose, initialIsLogin }) => {
  // Existing state variables
  const [currentIsLogin, setCurrentIsLogin] = useState(initialIsLogin);
  const [userType, setUserType] = useState('user');
  const [pnumber, setPnumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  // New state variables for OTP verification
  const [isOTPVerification, setIsOTPVerification] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 seconds for resend OTP

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  useEffect(() => {
    let countdown;
    if (timer > 0 && isOTPVerification) {
      countdown = setInterval(() => setTimer(timer - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer, isOTPVerification]);

  // Toggle between Login and Sign-Up forms
  const toggleForm = () => {
    // Prevent toggling to login if in OTP verification step
    if (!isOTPVerification) {
      setCurrentIsLogin(!currentIsLogin);
      resetForm(); // Reset form fields when toggling
    }
  };

  // Handle user type change between 'user' and 'agent'
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  // Reset form fields
  const resetForm = () => {
    setPnumber('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setIsOTPVerification(false);
    setOtpCode('');
    setTimer(60);
  };

  // Handle form submission for Login and Sign-Up
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!/^\+234\d{10}$/.test(pnumber)) {
      alert('Please enter a valid Nigerian phone number.');
      return;
    }

    if (!currentIsLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Define the API endpoint based on the current mode
    const url = `http://localhost:5000/api/auth/${currentIsLogin ? 'login' : 'register'}`;

    // Define the payload based on the current mode
    const payload = currentIsLogin
      ? { pnumber, password, role: userType }
      : { username, pnumber, password, role: userType };

    try {
      const response = await axios.post(url, payload);
      console.log('Response:', response.data);

      if (currentIsLogin) {
        // Handle Login success
        const userData = {
          token: response.data.token,
          phone: response.data.userpnumber,
          role: response.data.role,
          name: response.data.username,
          userId: response.data.userId,
          agentId: response.data.agentId,
        };
        console.log(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Login successful');
        onClose();
        navigate(response.data.role === 'agent' ? '/agent-dashboard' : '/user-dashboard');
      } else {
        // Handle Sign-Up success
        alert('Signup successful. Please verify your phone number.');

        // Transition to OTP verification step
        setIsOTPVerification(true);
        setTimer(60); // Reset timer for resend OTP
      }
    } catch (error) {
      console.error(`${currentIsLogin ? 'Login' : 'Signup'} failed`, error.response?.data || error.message);
      alert(`${currentIsLogin ? 'Login' : 'Signup'} failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification submission
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otpCode.trim() === '') {
      alert('Please enter the OTP code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        pnumber,
        otp: otpCode,
      });

      console.log('OTP Verification Response:', response.data);

      if (response.data.success) {
        alert('Phone number verified successfully. You can now log in.');
        setIsOTPVerification(false);
        resetForm();
        // Optionally, navigate to login automatically
        // navigate('/login');
      } else {
        alert('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification failed', error.response?.data || error.message);
      alert(`OTP Verification failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the OTP verification form
  const renderOTPForm = () => (
    <form className="form" onSubmit={handleVerifyOTP}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter OTP Code"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          required
        />
      </div>
      <div className="button-container">
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </div>
      <div className="resend-container">
        <span className={`resend-link ${timer > 0 ? 'disabled' : ''}`} onClick={timer === 0 ? resendOTP : null}>
          {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
        </span>
      </div>
    </form>
  );

  // Function to resend OTP
  const resendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/resend-otp', { pnumber });
      console.log('Resend OTP Response:', response.data);

      if (response.data.success) {
        alert('OTP has been resent to your phone number.');
        setTimer(60); // Reset timer
      } else {
        alert('Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP failed', error.response?.data || error.message);
      alert(`Resend OTP failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        onClose();
        resetForm();
      }}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="form-container">
        <button
          className="close-button"
          onClick={() => {
            onClose();
            resetForm();
          }}
          disabled={isLoading}
        >
          &times;
        </button>
        <h2 className="form-title">
          {currentIsLogin ? 'Login' : isOTPVerification ? 'Verify Phone Number' : 'Sign Up'}
        </h2>

        {!isOTPVerification && (
          <>
            <div className="user-type-container">
              <button
                className={`user-type-button ${userType === 'user' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('user')}
                disabled={isOTPVerification || isLoading}
              >
                User
              </button>
              <button
                className={`user-type-button ${userType === 'agent' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('agent')}
                disabled={isOTPVerification || isLoading}
              >
                Agent
              </button>
            </div>

            <form className="form" onSubmit={handleSubmit}>
              {!currentIsLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={pnumber}
                  onChange={(e) => setPnumber(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {!currentIsLogin && (
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}
              <div className="button-container">
                <button className="submit-button" type="submit" disabled={isLoading}>
                  {isLoading ? (currentIsLogin ? 'Logging in...' : 'Signing up...') : currentIsLogin ? 'Login' : 'Sign Up'}
                </button>
              </div>
              {currentIsLogin && (
                <div className="forgot-password-container">
                  <span className="forgot-password-link">Forgot Password?</span>
                </div>
              )}
              <div className="toggle-container">
                <span
                  className={`toggle-button ${isOTPVerification ? 'disabled' : ''}`}
                  onClick={toggleForm}
                >
                  {currentIsLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </span>
              </div>
            </form>
          </>
        )}

        {/* OTP Verification Form */}
        {isOTPVerification && (
          <>
            <p>Please enter the OTP sent to your phone number to verify your account.</p>
            {renderOTPForm()}
            {/* Disable toggling while in OTP verification */}
            <div className="toggle-container">
              <span className="toggle-button disabled">
                {currentIsLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </span>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PopupForm;
