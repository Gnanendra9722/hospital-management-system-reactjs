import React, { useState } from 'react';
import { Search, Calendar, Plus, Check, X, Clock } from 'lucide-react';
import { format } from 'date-fns';
import PageHeader from '../components/common/PageHeader';

// Mock data for appointments
const mockAppointments=[
  {
    id: 1,
    patientId: 1,
    patientName: 'Emma Wilson',
    doctorId: 1,
    doctorName: 'Dr. John Smith',
    date: '2025-06-15',
    time: '09:00',
    status: 'scheduled',
    type: 'regular',
    notes: 'Routine check-up',
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Michael Johnson',
    doctorId: 2,
    doctorName: 'Dr. Sarah Adams',
    date: '2025-06-15',
    time: '10:30',
    status: 'completed',
    type: 'followup',
    notes: 'Post-surgery check',
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Sophia Brown',
    doctorId: 4,
    doctorName: 'Dr. Emily Clark',
    date: '2025-06-15',
    time: '11:45',
    status: 'scheduled',
    type: 'regular',
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'William Davis',
    doctorId: 3,
    doctorName: 'Dr. James Wilson',
    date: '2025-06-15',
    time: '14:15',
    status: 'cancelled',
    type: 'regular',
    notes: 'Patient cancelled',
  },
  {
    id: 5,
    patientId: 5,
    patientName: 'Olivia Martinez',
    doctorId: 5,
    doctorName: 'Dr. Michael Brown',
    date: '2025-06-16',
    time: '09:30',
    status: 'scheduled',
    type: 'emergency',
    notes: 'Severe allergic reaction',
  },
  {
    id: 6,
    patientId: 6,
    patientName: 'James Taylor',
    doctorId: 6,
    doctorName: 'Dr. Lisa Johnson',
    date: '2025-06-16',
    time: '11:00',
    status: 'scheduled',
    type: 'followup',
  },
  {
    id: 7,
    patientId: 1,
    patientName: 'Emma Wilson',
    doctorId: 3,
    doctorName: 'Dr. James Wilson',
    date: '2025-06-17',
    time: '13:45',
    status: 'scheduled',
    type: 'regular',
  },
  {
    id: 8,
    patientId: 3,
    patientName: 'Sophia Brown',
    doctorId: 1,
    doctorName: 'Dr. John Smith',
    date: '2025-06-17',
    time: '15:30',
    status: 'scheduled',
    type: 'followup',
  },
];

const Appointments= () => {
  const [appointments] = useState(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-06-15');

  // Filter appointments based on search term, status and date
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    
    const matchesDate = appointment.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Get status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary-100 text-primary-700';
      case 'completed':
        return 'bg-success-100 text-success-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      case 'no-show':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Get type badge styles
  const getTypeBadge = (type) => {
    switch (type) {
      case 'regular':
        return 'bg-neutral-100 text-neutral-700';
      case 'followup':
        return 'bg-secondary-100 text-secondary-700';
      case 'emergency':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Format time to 12-hour format
  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Appointments" 
        description="Manage and schedule patient appointments"
      >
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          New Appointment
        </button>
      </PageHeader>

      {/* Filters section */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by patient or doctor..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
          
          <div className="relative">
            <select 
              className="form-input pl-10"
              value={filterStatus}
              onChange={handleStatusChange}
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
            <Clock className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
          
          <div className="relative">
            <input
              type="date"
              className="form-input pl-10"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Calendar className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
        </div>
      </div>

      {/* Appointments calendar view */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Appointments for {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-3">Morning</h4>
            {filteredAppointments
              .filter(a => {
                const hour = parseInt(a.time.split(':')[0], 10);
                return hour < 12;
              })
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(appointment => (
                <div 
                  key={appointment.id}
                  className="mb-3 p-3 bg-white border border-neutral-200 rounded-md hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{formatTime(appointment.time)}</p>
                      <p className="text-sm mt-1">{appointment.patientName}</p>
                      <p className="text-sm text-neutral-500">{appointment.doctorName}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className={`mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getTypeBadge(appointment.type)}`}>
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-xs text-neutral-500 mt-2 bg-neutral-50 p-2 rounded">
                      {appointment.notes}
                    </p>
                  )}
                  {appointment.status === 'scheduled' && (
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="p-1 rounded-full bg-success-100 text-success-700 hover:bg-success-200 focus:outline-none">
                        <Check size={16} />
                      </button>
                      <button className="p-1 rounded-full bg-error-100 text-error-700 hover:bg-error-200 focus:outline-none">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            {filteredAppointments.filter(a => {
              const hour = parseInt(a.time.split(':')[0], 10);
              return hour < 12;
            }).length === 0 && (
              <p className="text-sm text-neutral-500 italic">No morning appointments scheduled</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-neutral-500 mb-3">Afternoon</h4>
            {filteredAppointments
              .filter(a => {
                const hour = parseInt(a.time.split(':')[0], 10);
                return hour >= 12;
              })
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(appointment => (
                <div 
                  key={appointment.id}
                  className="mb-3 p-3 bg-white border border-neutral-200 rounded-md hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{formatTime(appointment.time)}</p>
                      <p className="text-sm mt-1">{appointment.patientName}</p>
                      <p className="text-sm text-neutral-500">{appointment.doctorName}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className={`mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getTypeBadge(appointment.type)}`}>
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-xs text-neutral-500 mt-2 bg-neutral-50 p-2 rounded">
                      {appointment.notes}
                    </p>
                  )}
                  {appointment.status === 'scheduled' && (
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="p-1 rounded-full bg-success-100 text-success-700 hover:bg-success-200 focus:outline-none">
                        <Check size={16} />
                      </button>
                      <button className="p-1 rounded-full bg-error-100 text-error-700 hover:bg-error-200 focus:outline-none">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            {filteredAppointments.filter(a => {
              const hour = parseInt(a.time.split(':')[0], 10);
              return hour >= 12;
            }).length === 0 && (
              <p className="text-sm text-neutral-500 italic">No afternoon appointments scheduled</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Total Appointments</p>
          <p className="text-2xl font-bold mt-1">
            {appointments.filter(a => a.date === selectedDate).length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Scheduled</p>
          <p className="text-2xl font-bold mt-1 text-primary-500">
            {appointments.filter(a => a.date === selectedDate && a.status === 'scheduled').length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Completed</p>
          <p className="text-2xl font-bold mt-1 text-success-500">
            {appointments.filter(a => a.date === selectedDate && a.status === 'completed').length}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Cancelled</p>
          <p className="text-2xl font-bold mt-1 text-error-500">
            {appointments.filter(a => a.date === selectedDate && (a.status === 'cancelled' || a.status === 'no-show')).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointments;