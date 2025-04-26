import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Info, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import axios from 'axios';
import { formatTimestamp } from '../Helpers/formatTimestamp';


// Mock data for prescriptions
const mockPrescriptions = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Emma Wilson',
    doctorId: 1,
    doctorName: 'Dr. John Smith',
    date: '2025-06-14',
    medications: [
      {
        medicationId: 1,
        medicationName: 'Amoxicillin',
        dosage: '500mg',
        duration: '7 days',
        frequency: 'Three times a day',
        quantity: 21,
      },
    ],
    instructions: 'Take with food. Complete the full course.',
    status: 'pending',
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Michael Johnson',
    doctorId: 2,
    doctorName: 'Dr. Sarah Adams',
    date: '2025-06-13',
    medications: [
      {
        medicationId: 2,
        medicationName: 'Lisinopril',
        dosage: '10mg',
        duration: '30 days',
        frequency: 'Once daily',
        quantity: 30,
      },
      {
        medicationId: 6,
        medicationName: 'Omeprazole',
        dosage: '20mg',
        duration: '14 days',
        frequency: 'Once daily before breakfast',
        quantity: 14,
      },
    ],
    instructions: 'Take Lisinopril at the same time each day. Take Omeprazole 30 minutes before breakfast.',
    status: 'dispensed',
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Sophia Brown',
    doctorId: 4,
    doctorName: 'Dr. Emily Clark',
    date: '2025-06-15',
    medications: [
      {
        medicationId: 5,
        medicationName: 'Paracetamol',
        dosage: '500mg',
        duration: '5 days',
        frequency: 'Four times a day',
        quantity: 20,
      },
    ],
    instructions: 'Take as needed for fever or pain, but not more than 4 tablets in 24 hours.',
    status: 'pending',
  },
];

const Pharmacy = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'prescriptions'>('inventory');
  const [medications, setMedications] = useState([]);
  const [prescriptions] = useState(mockPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Get unique categories for filter
  const categories = ['All', ...new Set(medications.map(med => med.category))];

  // Filter medications based on search term and category
  const filteredMedications = medications.filter(medication => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medication.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || medication.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Calculate expiry status
  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsDiff = (expiry.getFullYear() - today.getFullYear()) * 12 + (expiry.getMonth() - today.getMonth());

    if (expiry < today) {
      return { status: 'expired', class: 'text-error-500' };
    } else if (monthsDiff <= 3) {
      return { status: 'expires soon', class: 'text-warning-500' };
    } else {
      return { status: 'valid', class: 'text-success-500' };
    }
  };

  // Get stock level status
  const getStockStatus = (stock) => {
    if (stock <= 10) {
      return { status: 'low', class: 'text-error-500' };
    } else if (stock <= 50) {
      return { status: 'medium', class: 'text-warning-500' };
    } else {
      return { status: 'good', class: 'text-success-500' };
    }
  };

  // Get prescription status badge
  const getPrescriptionStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'dispensed':
        return 'bg-success-100 text-success-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  useEffect(() => {
    const getAllMedications = async () => {
      try {
        const data = await axios.get("/api/medications/")
        setMedications(data?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getAllMedications()
  }, [])

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pharmacy"
        description="Manage medications and prescriptions"
      >
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          {activeTab === 'inventory' ? 'Add Medication' : 'New Prescription'}
        </button>
      </PageHeader>

      {/* Tabs */}
      <div className="mb-6 border-b border-neutral-200">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'inventory'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'prescriptions'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            onClick={() => setActiveTab('prescriptions')}
          >
            Prescriptions
          </button>
        </nav>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative md:flex-1">
            <input
              type="text"
              placeholder={activeTab === 'inventory' ? "Search medications..." : "Search prescriptions..."}
              className="form-input pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
          {activeTab === 'inventory' && (
            <div className="flex gap-4">
              <div className="w-64">
                <select
                  className="form-input"
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'All' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-outline flex items-center gap-2">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'inventory' ? (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Manufacturer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Expiry Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500">Unit Price</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-neutral-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredMedications.map((medication) => {
                  const expiryStatus = getExpiryStatus(medication.expiryDate);
                  const stockStatus = getStockStatus(medication.stock);

                  return (
                    <tr key={medication?._id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-4 text-sm font-medium">{medication.name}</td>
                      <td className="px-4 py-4 text-sm">{medication.category}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={stockStatus.class}>{medication.stock} units</span>
                        {stockStatus.status === 'low' && (
                          <span className="ml-2">
                            <AlertTriangle size={16} className="inline text-warning-500" />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm">{medication.manufacturer}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className={expiryStatus.class}>{formatTimestamp(medication.expiryDate,"DD/MM/YYYY")}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-right">${medication.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-4 text-sm text-center">
                        <button className="text-primary-500 hover:text-primary-600">
                          <Info size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredMedications.length === 0 && (
            <div className="text-center py-10">
              <p className="text-neutral-500">No medications found matching your search criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {filteredPrescriptions?.map((prescription) => (
            <div key={prescription?._id} className="card mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{prescription.patientName}</h3>
                  <p className="text-sm text-neutral-500">
                    Prescribed by {prescription.doctorName} on {prescription.date}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPrescriptionStatusBadge(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-500 mb-2">Medications</h4>
                <ul className="divide-y divide-neutral-100 border border-neutral-200 rounded-md overflow-hidden">
                  {prescription.medications.map((med, index) => (
                    <li key={index} className="p-3 bg-neutral-50 hover:bg-neutral-100 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <p className="font-medium">{med.medicationName}</p>
                          <p className="text-sm text-neutral-500">
                            {med.dosage} - {med.frequency} for {med.duration}
                          </p>
                        </div>
                        <div className="text-sm text-right">
                          <p>Quantity: {med.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {prescription.instructions && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-500 mb-2">Instructions</h4>
                  <p className="text-sm p-3 bg-neutral-50 rounded-md">{prescription.instructions}</p>
                </div>
              )}

              <div className="border-t border-neutral-200 pt-4 flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                {prescription.status === 'pending' && (
                  <>
                    <button className="btn btn-outline text-sm mb-2 sm:mb-0">Reject</button>
                    <button className="btn btn-primary text-sm">Dispense Medication</button>
                  </>
                )}
                {prescription.status === 'dispensed' && (
                  <button className="btn btn-outline text-sm">Print Receipt</button>
                )}
              </div>
            </div>
          ))}

          {filteredPrescriptions.length === 0 && (
            <div className="card text-center py-10">
              <p className="text-neutral-500">No prescriptions found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pharmacy;