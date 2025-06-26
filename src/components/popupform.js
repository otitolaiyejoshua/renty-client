import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Intro.css';

Modal.setAppElement('#root');

const PopupForm = ({ isOpen, onClose, initialIsLogin }) => {
  const [currentIsLogin, setCurrentIsLogin] = useState(initialIsLogin);
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  useEffect(() => {
    let countdown;
    if (timer > 0 && isEmailVerification) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer, isEmailVerification]);

  const toggleForm = () => {
    if (!isEmailVerification) {
      setCurrentIsLogin(!currentIsLogin);
      resetForm();
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setIsEmailVerification(false);
    setVerificationCode('');
    setTimer(60);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentIsLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const url = `https://uniconnect.africa/api/auth/${currentIsLogin ? 'login' : 'register'}`;
    const payload = currentIsLogin
      ? { email, password, role: userType }
      : { username, email, password, role: userType };

    try {
      const response = await axios.post(url, payload);
      console.log('Response:', response.data);

      if (currentIsLogin) {
        const userData = {
          token: response.data.token,
          email: response.data.email,
          role: response.data.userRole,
          userId: response.data.userId,
          agentId: response.data.agentId,
          userName: response.data.name,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Login successful');
        onClose();
        navigate(response.data.userRole === 'agent' ? '/agent-dashboard' : '/user-dashboard');
      } else {
        alert('Signup successful. Please verify your email.');
        setIsEmailVerification(true);
        setTimer(60);
      }
    } catch (error) {
      console.error(`${currentIsLogin ? 'Login' : 'Signup'} failed`, error.response?.data || error.message);
      alert(`${currentIsLogin ? 'Login' : 'Signup'} failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    if (verificationCode.trim() === '') {
      alert('Please enter the verification code');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://uniconnect.africa/api/auth/verify-email', {
        email,
        verificationCode,
      });

      console.log('Email Verification Response:', response.data);

      if (response.data.success) {
        alert('Email verified successfully. You can now log in.');
        setIsEmailVerification(false);
        resetForm();
      } else {
        alert('Email verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Email Verification failed', error.response?.data || error.message);
      alert(`Email Verification failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://uniconnect.africa/api/auth/resend-verification', { email });
      console.log('Resend Verification Code Response:', response.data);

      if (response.data.success) {
        alert('Verification code has been resent to your email.');
        setTimer(60);
      } else {
        alert('Failed to resend verification code. Please try again.');
      }
    } catch (error) {
      console.error('Resend Verification Code failed', error.response?.data || error.message);
      alert(`Resend Verification Code failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailVerificationForm = () => (
    <form className="form" onSubmit={handleVerifyEmail}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter Verification Code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </div>
      <div className="button-container">
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>
      <div className="resend-container">
        <span className={`resend-link ${timer > 0 ? 'disabled' : ''}`} onClick={timer === 0 ? resendVerificationCode : null}>
          {timer > 0 ? `Resend Code in ${timer}s` : 'Resend Code'}
        </span>
      </div>
    </form>
  );

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
          {currentIsLogin ? 'Login' : isEmailVerification ? 'Verify Email' : 'Sign Up'}
        </h2>

        {!isEmailVerification && (
          <>
            <div className="user-type-container">
              <button
                className={`user-type-button ${userType === 'user' ? 'active' : ''}`}
                onClick={() => setUserType('user')}
                disabled={isLoading}
              >
                User
              </button>
              <button
                className={`user-type-button ${userType === 'agent' ? 'active' : ''}`}
                onClick={() => setUserType('agent')}
                disabled={isLoading}
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
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="toggle-container">
                <span
                  className="toggle-button"
                  onClick={toggleForm}
                >
                  {currentIsLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                </span>
              </div>
            </form>
          </>
        )}

        {isEmailVerification && (
          <>
            <p>Please enter the verification code sent to your email.</p>
            {renderEmailVerificationForm()}
          </>
        )}
      </div>
    </Modal>
  );
};

export default PopupForm;
