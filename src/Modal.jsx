import React from 'react'

const Modal = ({open, onClose, children}) => {
 
  return (
    //backdrop
    <div
        onClick={onClose}
        className={`fixed inset-0 flex items-center justify-center
        ${open ? "bg-black/20 visible" : "invisible"}
        `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white  p-6 rounded-lg shadow max-w-md w-full relative
            `}
        >
        {children}
      </div>
    </div>
  )
}

export default Modal