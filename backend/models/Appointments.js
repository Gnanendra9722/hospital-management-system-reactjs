const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: Number,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: Number,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  type: {
    type: String,
    enum: ['regular', 'emergency', 'follow-up'],
    default: 'regular',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
