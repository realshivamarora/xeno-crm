// models/Segment.js
const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  query: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model('Segment', segmentSchema);
