// src/components/Modal.jsx
import React from 'react';

const Modal = ({ data, children, className = '', isOpen, onClose, ...props }) => {
  if (!isOpen) return null;

  return (
<div
  className="fixed inset-0 z-50 flex items-center justify-center" 
  {...props}
>
  <div className={`bg-white p-6 rounded-xl shadow-lg relative m-6 ${className}`}>
    <button
      onClick={onClose}
      className="absolute top-2 right-3 text-2xl font-bold text-gray-700 hover:text-gray-900"
    >
      &times;
    </button>
    
    <div className="mt-4">
      {data}
      {children}
    </div>
  </div>
</div>


  );
};

export default Modal;
