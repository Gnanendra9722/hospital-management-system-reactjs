// src/components/Modal.tsx
import React from 'react';

const Modal = ({ isOpen, onClose, children,className='' }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}>
      <div className={`bg-white p-6 rounded-xl shadow-lg relative w-full m-6 ${className}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
