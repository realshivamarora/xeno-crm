const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Customer = require('../models/Customer');

router.get('/last-order-id', async (req, res) => {
  const lastOrder = await Order.findOne().sort({ orderId: -1 });
  res.json({ lastOrderId: lastOrder?.orderId || 0 });
});

router.get('/customer/:id', async (req, res) => {
  const customer = await Customer.findOne({ customerId: req.params.id });
  if (customer) res.json(customer);
  else res.status(404).json({ error: 'Customer not found' });
});

router.post('/', async (req, res) => {
  const { orderId, customerId, amount, date } = req.body;
  await Order.create({ orderId, customerId, amount, date });
  res.json({ message: 'Order saved' });
});

module.exports = router;
