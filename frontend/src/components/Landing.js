import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const options = [
    { label: 'Enter Customer Data', path: '/dashboard/customer' },
    { label: 'Enter Order Data', path: '/dashboard/order' },
    { label: 'Query Builder', path: '/dashboard/query' },
    { label: 'Segment History', path: '/dashboard/segment' },
    { label: 'Message History (Communication Log)', path: '/dashboard/messages' },
  ];

  return (
    <div className="landing-wrapper">
      <h2 className="landing-title">Welcome to Dashboard</h2>
      <div className="landing-options">
        {options.map((opt, index) => (
          <button
            key={index}
            className="landing-btn"
            onClick={() => navigate(opt.path)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Landing;
