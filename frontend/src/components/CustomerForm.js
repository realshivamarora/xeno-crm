import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerForm.css'; 

const CustomerForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    fetchNextCustomerId();
  }, []);

  const fetchNextCustomerId = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customer/next-id');
      setCustomerId(res.data.nextId);
    } catch (err) {
      console.error('Failed to fetch next ID', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customer/add', {
        customerId,
        ...formData
      });
      alert('Details saved!');
      setFormData({ name: '', city: '', mobile: '', email: '' });
      fetchNextCustomerId(); 
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4 text-dark">Enter Customer Details</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Customer ID</label>
          <input className="form-control" value={customerId} disabled />
        </div>
        <div className="col-md-6">
          <label className="form-label">Customer Name</label>
          <input className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Customer City</label>
          <input className="form-control" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <input className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit Details</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
