import React, { useEffect, useState } from 'react';

const OrderForm = () => {
  const [orderId, setOrderId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/orders/last-order-id')
      .then(res => res.json())
      .then(data => setOrderId(data.lastOrderId + 1));
  }, []);

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/customer/${customerId}`);
      if (!res.ok) throw new Error('Customer not found');
      const data = await res.json();
      setCustomerDetails(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setCustomerDetails(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, customerId, amount, date }),
    });
    alert('Order saved successfully!');
    // Reset
    setCustomerId('');
    setCustomerDetails(null);
    setAmount('');
    setDate('');
    setOrderId(prev => prev + 1);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Enter Order Data</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Order ID</label>
          <input type="text" className="form-control" value={orderId} disabled />
        </div>
        <div className="mb-3 d-flex align-items-end">
          <div className="me-3">
            <label>Customer ID</label>
            <input type="number" className="form-control" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary mb-1" onClick={fetchCustomer} disabled={!customerId}>
            Fetch Customer Details
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {customerDetails && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customerDetails.name}</td>
                <td>{customerDetails.city}</td>
                <td>{customerDetails.mobile}</td>
                <td>{customerDetails.email}</td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="mb-3">
          <label>Order Amount</label>
          <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit Details</button>
      </form>
    </div>
  );
};

export default OrderForm;
