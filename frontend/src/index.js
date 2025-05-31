import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="245085209470-tqgublu7gij3tai6or1essacu60pbrlg.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
