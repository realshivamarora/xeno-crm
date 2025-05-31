import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('User Info:', decoded);

    try {
      await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: decoded.name,
          email: decoded.email
        })
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to send to backend', err);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="login-container">
      <div className="content-wrapper d-flex flex-column justify-content-center align-items-center text-white text-center">
        <h1 className="display-3 fw-bold mb-2">Welcome to CRM</h1>
        <p className="subtext mb-5">Built by Shivam Arora (aroratech.tech)</p>
        <h4 className="mb-3">Login With Google</h4>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
};


export default Login;
