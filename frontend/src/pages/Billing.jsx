import React, { useEffect, useState } from 'react';
import { Search, CreditCard, Download, Clock, Filter, Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import axios from 'axios';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatTimestamp } from '../Helpers/formatTimestamp';


const Billing = () => {
  const [bills,setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading,setLoading] = useState(false)

  // Filter bills based on search term and status
  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        bill._id.toString().includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const viewBillDetails = (bill) => {
    setSelectedBill(bill);
  };

  const closeBillDetails = () => {
    setSelectedBill(null);
  };

  // Get status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-700';
      case 'partial':
        return 'bg-warning-100 text-warning-700';
      case 'pending':
        return 'bg-primary-100 text-primary-700';
      case 'overdue':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  useEffect(()=>{
    const getAllbills = async() =>{
      setLoading(true)
      try{
        const data = await axios.get("/api/bills")
        setBills(data?.data)
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log(err)
      }
    }
    getAllbills()
  },[])

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Billing & Payments" 
        description="Manage patient bills and payment processing"
      >
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={16} />
          Create Invoice
        </button>
      </PageHeader>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative md:flex-1">
            <input
              type="text"
              placeholder="Search by patient name or invoice #..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
          </div>
          <div className="flex gap-4">
            <div className="w-48">
              <select 
                className="form-input"
                value={statusFilter}
                onChange={handleStatusChange}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="partial">Partially Paid</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <button className="btn btn-outline flex items-center gap-2">
              <Filter size={16} />
              Date Range
            </button>
          </div>
        </div>
      </div>

      {/* Bills list */}
      {
        loading ?
        <div><LoadingSpinner/></div> :
        <div className="card mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Invoice #</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Patient</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Issue Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Due Date</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500">Amount</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-neutral-500">Paid</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-neutral-500">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredBills.map((bill) => (
                <tr 
                  key={bill._id}
                  className="hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => viewBillDetails(bill)}
                >
                  <td className="px-4 py-4 text-sm font-medium">INV-{bill?._id?.toString().padStart(5, '0')}</td>
                  <td className="px-4 py-4 text-sm">{bill.patientName}</td>
                  <td className="px-4 py-4 text-sm">{formatTimestamp(bill?.date,"DD/MM/YYYY")}</td>
                  <td className="px-4 py-4 text-sm">{formatTimestamp(bill?.dueDate,"DD/MM/YYYY")}</td>
                  <td className="px-4 py-4 text-sm text-right">{formatCurrency(bill.totalAmount)}</td>
                  <td className="px-4 py-4 text-sm text-right">{formatCurrency(bill.paidAmount)}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(bill.status)}`}>
                      {bill.status === 'partial' ? 'Partially Paid' : bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <div className="flex justify-center space-x-2">
                      {(bill.status === 'pending' || bill.status === 'partial' || bill.status === 'overdue') && (
                        <button 
                          className="p-1 rounded-full text-primary-500 hover:bg-primary-50 focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle payment action
                          }}
                        >
                          <CreditCard size={18} />
                        </button>
                      )}
                      <button 
                        className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle download action
                        }}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBills.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-500">No invoices found matching your search criteria.</p>
          </div>
        )}
      </div>
      }
      

      {/* Billing Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full mr-3">
              <CreditCard size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(
                bills.reduce((total, bill) => total + bill.paidAmount, 0)
              )}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-3 bg-success-100 rounded-full mr-3">
              <Check size={20} className="text-success-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Paid Invoices</p>
              <p className="text-2xl font-bold mt-1">{bills.filter(b => b.status === 'paid').length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-3 bg-warning-100 rounded-full mr-3">
              <Clock size={20} className="text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Pending Amount</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(
                bills
                  .filter(b => b.status === 'pending' || b.status === 'partial')
                  .reduce((total, bill) => total + (bill.totalAmount - bill.paidAmount), 0)
              )}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-3 bg-error-100 rounded-full mr-3">
              <AlertTriangle size={20} className="text-error-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Overdue Amount</p>
              <p className="text-2xl font-bold mt-1">{formatCurrency(
                bills
                  .filter(b => b.status === 'overdue')
                  .reduce((total, bill) => total + (bill.totalAmount - bill.paidAmount), 0)
              )}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bill Detail Modal */}
      {selectedBill && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity" onClick={closeBillDetails}></div>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto z-10 animate-slide-up">
              <div className="flex justify-between items-center border-b border-neutral-200 px-6 py-4">
                <h3 className="text-lg font-semibold">Invoice #{selectedBill?._id.toString().padStart(5, '0')}</h3>
                <button 
                  onClick={closeBillDetails}
                  className="text-neutral-500 hover:text-neutral-700 focus:outline-none"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-2">Bill To</h4>
                    <p className="font-medium">{selectedBill.patientName}</p>
                    <p className="text-sm text-neutral-500">Patient ID: {selectedBill.patientId}</p>
                  </div>
                  <div className="md:text-right">
                    <div className="mb-2">
                      <span className="text-sm text-neutral-500">Issue Date:</span>
                      <span className="ml-2">{selectedBill.date}</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-neutral-500">Due Date:</span>
                      <span className="ml-2">{selectedBill.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-500">Status:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedBill.status)}`}>
                        {selectedBill.status === 'partial' ? 'Partially Paid' : selectedBill.status.charAt(0).toUpperCase() + selectedBill.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-500 mb-2">Services</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral-50">
                          <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500 border border-neutral-200">Description</th>
                          <th className="px-4 py-2 text-center text-sm font-medium text-neutral-500 border border-neutral-200">Quantity</th>
                          <th className="px-4 py-2 text-right text-sm font-medium text-neutral-500 border border-neutral-200">Unit Price</th>
                          <th className="px-4 py-2 text-right text-sm font-medium text-neutral-500 border border-neutral-200">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedBill.services.map((service) => (
                          <tr key={service?._id}>
                            <td className="px-4 py-3 text-sm border border-neutral-200">{service.description}</td>
                            <td className="px-4 py-3 text-sm text-center border border-neutral-200">{service.quantity}</td>
                            <td className="px-4 py-3 text-sm text-right border border-neutral-200">{formatCurrency(service.unitPrice)}</td>
                            <td className="px-4 py-3 text-sm text-right border border-neutral-200">{formatCurrency(service.amount)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-neutral-50">
                          <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right border border-neutral-200">Total</td>
                          <td className="px-4 py-3 text-sm font-medium text-right border border-neutral-200">{formatCurrency(selectedBill.totalAmount)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right border border-neutral-200">Paid Amount</td>
                          <td className="px-4 py-3 text-sm font-medium text-right border border-neutral-200 text-success-600">{formatCurrency(selectedBill.paidAmount)}</td>
                        </tr>
                        {selectedBill.paidAmount < selectedBill.totalAmount && (
                          <tr>
                            <td colSpan={3} className="px-4 py-3 text-sm font-medium text-right border border-neutral-200">Balance Due</td>
                            <td className="px-4 py-3 text-sm font-bold text-right border border-neutral-200 text-error-600">{formatCurrency(selectedBill.totalAmount - selectedBill.paidAmount)}</td>
                          </tr>
                        )}
                      </tfoot>
                    </table>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                  <button className="btn btn-outline text-sm mb-2 sm:mb-0 flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download PDF
                  </button>
                  {(selectedBill.status === 'pending' || selectedBill.status === 'partial' || selectedBill.status === 'overdue') && (
                    <button className="btn btn-primary text-sm flex items-center justify-center gap-2">
                      <CreditCard size={16} />
                      {selectedBill.status === 'partial' ? 'Record Additional Payment' : 'Record Payment'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Icons for Billing Summary
const Check = (size, className ) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const AlertTriangle = (size, className ) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default Billing;