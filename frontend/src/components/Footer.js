import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#1c193e',
        color: 'white',
        textAlign: 'center',
        padding: '1rem 0',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ fontSize: '1rem' }}>
        Made with <span style={{ color: 'red' }}>♥</span> by Shivam Arora for Xeno
      </div>
      <div style={{ marginTop: '0.3rem', color: '#ffc107', fontWeight: 'bold' }}>
        Learn About Me:{' '}
        <a
          href="https://aroratech.tech"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#ffc107', textDecoration: 'underline' }}
        >
          aroratech.tech
        </a>
      </div>
    </footer>
  );
};

export default Footer;
