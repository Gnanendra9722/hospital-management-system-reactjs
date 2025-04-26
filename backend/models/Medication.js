const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Medication', medicationSchema);
