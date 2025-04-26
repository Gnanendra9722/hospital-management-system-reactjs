app.post("/api/doctors", async (req, res) => {
  try {
    const doctors = req.body; // Get doctors array from the request body

    if (!Array.isArray(doctors) || doctors.length === 0) {
      return res.status(400).json({ message: "Please provide an array of doctors." });
    }

    // Insert multiple doctors into the database
    const savedDoctors = await Doctor.insertMany(doctors);

    res.status(201).json({ message: "Doctors added successfully!", data: savedDoctors });
  } catch (error) {
    console.error("❌ Error adding doctors:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.post("/api/patients", async (req, res) => {
  try {
    const patients = req.body; // Get patients array from the request body

    if (!Array.isArray(patients) || patients.length === 0) {
      return res.status(400).json({ message: "Please provide an array of patients." });
    }

    // Insert multiple patients into the database
    const savedPatients = await Patient.insertMany(patients);

    res.status(201).json({ message: "Patients added successfully!", data: savedPatients });
  } catch (error) {
    console.error("❌ Error adding patients:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.post("/api/medications", async (req, res) => {
  try {
    const medications = req.body;

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ message: "Please provide an array of medications." });
    }

    const savedMedications = [];
    for (const medication of medications) {
      try {
        const newMedication = new Medication(medication);
        await newMedication.save();
        savedMedications.push(newMedication);
      } catch (error) {
        console.error("Error saving medication:", error);
        // Handle any error that occurs while saving each individual medication
      }
    }

    res.status(201).json({ message: "Medications added successfully!", data: savedMedications });
  } catch (error) {
    console.error("❌ Error adding medications:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.post("/api/bills", async (req, res) => {
  try {
    const bills = req.body;

    if (!Array.isArray(bills) || bills.length === 0) {
      return res.status(400).json({ message: "Please provide an array of bills." });
    }

    const savedBills = [];
    for (const bill of bills) {
      try {
        const newBill = new Bill(bill);
        await newBill.save();
        savedBills.push(newBill);
      } catch (error) {
        console.error("Error saving bill:", error);
      }
    }

    res.status(201).json({ message: "Bills added successfully!", data: savedBills });
  } catch (error) {
    console.error("❌ Error adding bills:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
