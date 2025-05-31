const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: Number,
  name: String,
  city: String,
  mobile: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
