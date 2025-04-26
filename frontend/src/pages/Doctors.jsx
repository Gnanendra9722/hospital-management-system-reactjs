import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, Star, Mail, Phone } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import axios from 'axios';
import Modal from '../components/common/Modal';
import DoctorForm from '../components/Modals/DoctorForm';

const Doctors= () => {
  const [doctors,setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Get unique specializations for filter
  const specializations = ['All', ...new Set(doctors.map(doctor => doctor.specialization))];

  // Filter doctors based on search term and specialization
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === 'All' || doctor.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    setSelectedSpecialization(e.target.value);
  };

  // Format availability days to be more readable
  const formatAvailability = (doctor) => {
    const days = doctor.availability.map(a => {
      const day = a.day.charAt(0).toUpperCase() + a.day.slice(1);
      return `${day} (${a.startTime}-${a.endTime})`;
    });
    return days.join(', ');
  };

  useEffect(()=>{
    const getAllDoctors = async() =>{
     try{
      const data = await axios.get("/api/doctors")
      setDoctors(data?.data)
     }catch(err){
      console.log(err)
     }
    }
    getAllDoctors()
  },[])

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Doctors" 
        description="View and manage medical staff"
      >
        <button className="btn btn-primary flex items-center gap-2"
        onClick={openModal}>
          <Plus size={16} />
          Add Doctor
        </button>
      </PageHeader>

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative md:flex-1">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
        </div>
        <div className="flex gap-4">
          <div className="w-64">
            <select 
              className="form-input"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
            >
              {specializations.map((specialization) => (
                <option key={specialization} value={specialization}>
                  {specialization === 'All' ? 'All Specializations' : specialization}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-outline flex items-center gap-2">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </div>

      {/* Doctors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor?._id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img 
                src={doctor.avatar} 
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
              />
              <div>
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {doctor.specialization}
                  </span>
                  <span className="ml-2 flex items-center text-xs text-neutral-500">
                    <Star size={12} className="text-yellow-400 mr-1" fill="#facc15" />
                    {doctor.experience} years exp
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-start">
                <Mail size={16} className="text-neutral-400 mr-2 mt-0.5" />
                <p className="text-sm text-neutral-600">{doctor.email}</p>
              </div>
              <div className="flex items-start mt-2">
                <Phone size={16} className="text-neutral-400 mr-2 mt-0.5" />
                <p className="text-sm text-neutral-600">{doctor.phone}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
              <h4 className="text-sm font-medium text-neutral-500 mb-2">Availability</h4>
              <p className="text-sm">{formatAvailability(doctor)}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between">
              <button className="btn btn-outline text-sm px-3 py-1">View Profile</button>
              <button className="btn btn-primary text-sm px-3 py-1">Schedule</button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-neutral-500">No doctors found matching your search criteria.</p>
        </div>
      )}
       <Modal isOpen={isModalOpen} onClose={closeModal} className='w-[600px]'>
          <div className='w-full h-full'>
            <h1 className='text-[24px] font-bold text-center'>Add Doctors</h1>
            
          </div>
       </Modal>
    </div>
  );
};

export default Doctors;