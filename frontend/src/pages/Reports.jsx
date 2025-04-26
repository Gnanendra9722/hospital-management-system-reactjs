import React, { useState } from 'react';
import { Download, Calendar, ArrowRight, BarChart2, LineChart, PieChart } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  LineChart as RechartLineChart,
  Line
} from 'recharts';
import PageHeader from '../components/common/PageHeader';
import { format } from 'date-fns';

// Mock data for reports
const revenueData = [
  { month: 'Jan', revenue: 28500 },
  { month: 'Feb', revenue: 32400 },
  { month: 'Mar', revenue: 34200 },
  { month: 'Apr', revenue: 29800 },
  { month: 'May', revenue: 36700 },
  { month: 'Jun', revenue: 42300 },
];

const patientDistributionData = [
  { name: 'Outpatient', value: 65 },
  { name: 'Inpatient', value: 25 },
  { name: 'Emergency', value: 10 },
];

const departmentRevenueData = [
  { department: 'Cardiology', revenue: 12500 },
  { department: 'Neurology', revenue: 9800 },
  { department: 'Orthopedics', revenue: 8200 },
  { department: 'Pediatrics', revenue: 7500 },
  { department: 'Dermatology', revenue: 5200 },
  { department: 'Ophthalmology', revenue: 4800 },
  { department: 'Other', revenue: 6500 },
];

const admissionsData = [
  { month: 'Jan', admissions: 120 },
  { month: 'Feb', admissions: 145 },
  { month: 'Mar', admissions: 162 },
  { month: 'Apr', admissions: 138 },
  { month: 'May', admissions: 157 },
  { month: 'Jun', admissions: 182 },
];

const availableReports = [
  { id: 1, name: 'Monthly Revenue Report', description: 'Overview of hospital revenue by month', type: 'financial', lastGenerated: '2025-06-10' },
  { id: 2, name: 'Patient Demographics Analysis', description: 'Analysis of patient distribution by age, gender, and location', type: 'patients', lastGenerated: '2025-06-08' },
  { id: 3, name: 'Department Performance', description: 'Performance metrics for each department', type: 'operational', lastGenerated: '2025-06-05' },
  { id: 4, name: 'Inventory Usage Report', description: 'Analysis of medication and supply usage', type: 'inventory', lastGenerated: '2025-06-01' },
  { id: 5, name: 'Staff Efficiency Metrics', description: 'Productivity and efficiency metrics for medical staff', type: 'staff', lastGenerated: '2025-05-28' },
  { id: 6, name: 'Patient Satisfaction Survey', description: 'Results from patient satisfaction surveys', type: 'patients', lastGenerated: '2025-05-25' },
];

const COLORS = ['#1a73e8', '#20c997', '#fa9c15', '#f44336', '#9e9e9e', '#6c757d'];

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: format(new Date(), 'yyyy-MM-dd')
  });

  // Filter reports based on selected type
  const filteredReports = selectedReportType === 'all' 
    ? availableReports 
    : availableReports.filter(report => report.type === selectedReportType);

  const handleReportTypeChange = (e) => {
    setSelectedReportType(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setDateRange({...dateRange, start: e.target.value});
  };

  const handleEndDateChange = (e) => {
    setDateRange({...dateRange, end: e.target.value});
  };

  // Format currency for charts
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Get report type badge style
  const getReportTypeBadge = (type) => {
    switch (type) {
      case 'financial':
        return 'bg-primary-100 text-primary-700';
      case 'patients':
        return 'bg-success-100 text-success-700';
      case 'operational':
        return 'bg-secondary-100 text-secondary-700';
      case 'inventory':
        return 'bg-warning-100 text-warning-700';
      case 'staff':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Reports & Analytics" 
        description="Generate and view hospital performance reports"
      />

      {/* Filters section */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Report Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Report Type</label>
            <select 
              className="form-input"
              value={selectedReportType}
              onChange={handleReportTypeChange}
            >
              <option value="all">All Reports</option>
              <option value="financial">Financial</option>
              <option value="patients">Patients</option>
              <option value="operational">Operational</option>
              <option value="inventory">Inventory</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Start Date</label>
            <div className="relative">
              <input
                type="date"
                className="form-input pl-10"
                value={dateRange.start}
                onChange={handleStartDateChange}
              />
              <Calendar className="absolute left-3 top-2.5 text-neutral-400" size={18} />
            </div>
          </div>
          
          <div>
            <label className="form-label">End Date</label>
            <div className="relative">
              <input
                type="date"
                className="form-input pl-10"
                value={dateRange.end}
                onChange={handleEndDateChange}
              />
              <Calendar className="absolute left-3 top-2.5 text-neutral-400" size={18} />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="btn btn-primary">
            Generate Report
          </button>
        </div>
      </div>

      {/* Charts Dashboard */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Performance Dashboard</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Revenue Trend</h4>
              <div className="flex items-center text-sm text-primary-500">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#1a73e8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Department Revenue */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Department Revenue</h4>
              <div className="flex items-center text-sm text-primary-500">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentRevenueData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis 
                    type="number" 
                    className="text-xs"
                    tickFormatter={formatCurrency}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="department" 
                    className="text-xs"
                  />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#20c997" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Distribution */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Patient Distribution</h4>
              <div className="flex items-center text-sm text-primary-500">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={patientDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {patientDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Admissions Trend */}
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Patient Admissions</h4>
              <div className="flex items-center text-sm text-primary-500">
                <span>View Details</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartLineChart
                  data={admissionsData}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="admissions" 
                    stroke="#fa9c15" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </RechartLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Report Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Last Generated</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium">{report.name}</td>
                  <td className="px-4 py-4 text-sm">{report.description}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeBadge(report.type)}`}>
                      {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{formatDate(report.lastGenerated)}</td>
                  <td className="px-4 py-4 text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="btn btn-outline text-xs py-1 px-2 flex items-center">
                        <BarChart2 size={14} className="mr-1" />
                        View
                      </button>
                      <button className="btn btn-outline text-xs py-1 px-2 flex items-center">
                        <Download size={14} className="mr-1" />
                        Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-500">No reports found for the selected type.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;