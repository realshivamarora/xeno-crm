const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: Number,
  customerId: Number,
  amount: Number,
  date: String
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
