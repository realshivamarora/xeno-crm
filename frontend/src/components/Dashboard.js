import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';
import QueryBuilder from './QueryBuilder';
import SegmentHistory from './SegmentHistory';
import CommunicationLog from './CommunicationLog';
import Navbar from './Navbar';
import Footer from './Footer';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        Customer Relationship Management System
      </header>

      <Navbar />

      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/query" element={<QueryBuilder />} />
          <Route path="/segment" element={<SegmentHistory />} />
          <Route path="/messages" element={<CommunicationLog />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
