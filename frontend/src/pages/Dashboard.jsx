import React from 'react';
import { 
  Users, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  BedDouble
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { format } from 'date-fns';

// Sample data for charts
const appointmentsByDepartment = [
  { name: 'Cardiology', value: 35 },
  { name: 'Orthopedics', value: 25 },
  { name: 'Neurology', value: 18 },
  { name: 'Pediatrics', value: 22 },
  { name: 'Dermatology', value: 12 },
];

const patientAdmissions = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 25 },
  { name: 'Apr', count: 18 },
  { name: 'May', count: 22 },
  { name: 'Jun', count: 30 },
];

const revenueData = [
  { name: 'Jan', consultations: 4000, procedures: 2400, medications: 1800 },
  { name: 'Feb', consultations: 3000, procedures: 1900, medications: 2000 },
  { name: 'Mar', consultations: 5000, procedures: 3200, medications: 2500 },
  { name: 'Apr', consultations: 3800, procedures: 2900, medications: 2100 },
  { name: 'May', consultations: 4200, procedures: 3100, medications: 2300 },
  { name: 'Jun', consultations: 5500, procedures: 3700, medications: 2700 },
];

const COLORS = ['#1a73e8', '#20c997', '#fa9c15', '#f44336', '#9e9e9e'];

const Dashboard= () => {
  const today = new Date();
  
  // Stats cards data
  const statsCards = [
    { 
      title: 'Total Patients', 
      value: '2,541', 
      change: '+12.5%', 
      icon: <Users className="text-primary-500" />, 
      bgColor: 'bg-primary-50' 
    },
    { 
      title: 'Appointments Today', 
      value: '42', 
      change: '+5.0%', 
      icon: <Calendar className="text-secondary-500" />, 
      bgColor: 'bg-secondary-50' 
    },
    { 
      title: 'Pending Bills', 
      value: '$12,850', 
      change: '-2.3%', 
      icon: <CreditCard className="text-accent-500" />, 
      bgColor: 'bg-accent-50',
      changeNegative: true
    },
    { 
      title: 'Monthly Revenue', 
      value: '$128,540', 
      change: '+8.1%', 
      icon: <TrendingUp className="text-success-500" />, 
      bgColor: 'bg-success-50' 
    },
  ];

  // Recent appointments data
  const recentAppointments = [
    { 
      id: 1, 
      patient: 'Emma Wilson', 
      doctor: 'Dr. John Smith', 
      time: '09:00 AM', 
      type: 'Regular Check-up',
      status: 'scheduled' 
    },
    { 
      id: 2, 
      patient: 'Michael Johnson', 
      doctor: 'Dr. Sarah Adams', 
      time: '10:30 AM', 
      type: 'Follow-up',
      status: 'completed' 
    },
    { 
      id: 3, 
      patient: 'Robert Brown', 
      doctor: 'Dr. James Wilson', 
      time: '11:45 AM', 
      type: 'Consultation',
      status: 'scheduled' 
    },
    { 
      id: 4, 
      patient: 'Linda Davis', 
      doctor: 'Dr. Emily Clark', 
      time: '01:15 PM', 
      type: 'Emergency',
      status: 'scheduled' 
    },
  ];

  // Alerts data
  const alerts = [
    {
      id: 1,
      type: 'inventory',
      message: 'Low stock alert for Paracetamol (10 units remaining)',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'billing',
      message: '5 overdue invoices need attention',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      message: 'System maintenance scheduled for tonight at 2:00 AM',
      time: 'Today, 9:30 AM',
      priority: 'low'
    }
  ];

  // Get status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary-100 text-primary-700';
      case 'completed':
        return 'bg-success-100 text-success-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Get priority badge styles
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Overview of hospital performance for {format(today, 'MMMM d, yyyy')}
          </p>
        </div>
        <div>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-neutral-500 text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                <p className={`text-sm mt-1 ${card.changeNegative ? 'text-error-500' : 'text-success-500'}`}>
                  {card.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="consultations" fill="#1a73e8" name="Consultations" />
                <Bar dataKey="procedures" fill="#20c997" name="Procedures" />
                <Bar dataKey="medications" fill="#fa9c15" name="Medications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Appointments by Department</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentsByDepartment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {appointmentsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Admissions Chart */}
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Patient Admissions</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={patientAdmissions}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1a73e8"
                  activeDot={{ r: 8 }}
                  name="Patients"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hospital Status */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Hospital Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-full mr-3">
                  <BedDouble size={18} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Available Beds</p>
                  <p className="text-xs text-neutral-500">General Ward</p>
                </div>
              </div>
              <div className="text-xl font-bold text-primary-500">24/35</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
              <div className="flex items-center">
                <div className="p-2 bg-secondary-100 rounded-full mr-3">
                  <BedDouble size={18} className="text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Available Beds</p>
                  <p className="text-xs text-neutral-500">ICU</p>
                </div>
              </div>
              <div className="text-xl font-bold text-secondary-500">5/12</div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md border border-neutral-200">
              <div className="flex items-center">
                <div className="p-2 bg-accent-100 rounded-full mr-3">
                  <Clock size={18} className="text-accent-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Average Wait Time</p>
                  <p className="text-xs text-neutral-500">Emergency</p>
                </div>
              </div>
              <div className="text-xl font-bold text-accent-500">14 min</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <a href="/appointments" className="text-sm text-primary-500 hover:text-primary-600">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-neutral-500 pb-3">Patient</th>
                  <th className="text-left text-sm font-medium text-neutral-500 pb-3">Doctor</th>
                  <th className="text-left text-sm font-medium text-neutral-500 pb-3">Time</th>
                  <th className="text-left text-sm font-medium text-neutral-500 pb-3">Type</th>
                  <th className="text-left text-sm font-medium text-neutral-500 pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t border-neutral-100">
                    <td className="py-3 text-sm">{appointment.patient}</td>
                    <td className="py-3 text-sm">{appointment.doctor}</td>
                    <td className="py-3 text-sm">{appointment.time}</td>
                    <td className="py-3 text-sm">{appointment.type}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Important Alerts</h3>
            <button className="text-sm text-primary-500 hover:text-primary-600">
              Mark All as Read
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-neutral-50 rounded-md border-l-4 border-neutral-200">
                <div className="flex items-start">
                  <AlertTriangle size={18} className="text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-neutral-500">{alert.time}</span>
                      <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityBadge(alert.priority)}`}>
                        {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;