const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');


dotenv.config();

const Doctor = require('./models/Doctors');
const Patient = require('./models/Patients');
const Bill = require('./models/Billing');
const Medication = require('./models/Medication');

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running");
});


app.post('/api/doctor', async (req, res) => {
  try {
    const { name, specialization, experience, phone, email, availability, avatar } = req.body;

    const newDoctor = new Doctor({
      name,
      specialization,
      experience,
      phone,
      email,
      availability,
      avatar
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ message: 'Error creating doctor', error: err });
  }
});

app.post('/api/patient', async (req, res) => {
  try {
    const { name, age, gender, bloodType, phone, email, address, registrationDate, emergencyContact } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      bloodType,
      phone,
      email,
      address,
      registrationDate,
      emergencyContact
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: 'Error creating patient', error: err });
  }
});

app.post('/api/bill', async (req, res) => {
  try {
    const { patientId, patientName, date, dueDate, services, totalAmount, paidAmount, status } = req.body;

    const newBill = new Bill({
      patientId,
      patientName,
      date,
      dueDate,
      services,
      totalAmount,
      paidAmount,
      status
    });

    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ message: 'Error creating bill', error: err });
  }
});


app.post('/api/medication', async (req, res) => {
  try {
    const { name, category, stock, manufacturer, expiryDate, unitPrice } = req.body;

    const newMedication = new Medication({
      name,
      category,
      stock,
      manufacturer,
      expiryDate,
      unitPrice
    });

    await newMedication.save();
    res.status(201).json(newMedication);
  } catch (err) {
    res.status(500).json({ message: 'Error creating medication', error: err });
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();  // Assuming Doctor is your model name
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();  // Assuming Patient is your model name
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching patients', error: err });
  }
});

app.get('/api/medications', async (req, res) => {
  try {
    const medications = await Medication.find();  // Assuming Medication is your model name
    res.status(200).json(medications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medications', error: err });
  }
});

app.get('/api/bills', async (req, res) => {
  try {
    const bills = await Bill.find();  // Assuming Bill is your model name
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bills', error: err });
  }
});




app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
