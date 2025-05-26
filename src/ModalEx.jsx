import React from 'react';

export default function ModalEx({ isOpen, onClose, children }) {
   console.log('Modal rendered, isOpen:', isOpen);


  return (
    //backdrop
    <div
    onClick={onClose}
    className={`fixed inset-0 flex items-center justify-center
      ${isOpen ? "bg-black/20 visible" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white p-6 rounded-3xl shadow max-w-md w-full relative
          `}
          >
        {/* ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'} */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
