const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['consultation', 'lab', 'medication'],
    required: true
  }
}, { _id: true }); // This ensures each service item gets its own _id

const billSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  services: {
    type: [serviceSchema],
    required: true,
    validate: v => Array.isArray(v) && v.length > 0
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);
