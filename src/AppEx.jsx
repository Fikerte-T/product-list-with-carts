import React, { useState } from 'react'
import ModalEx from './ModalEx'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-10">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <ModalEx isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Modal Title</h2>
        <p>This is the modal content.</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </ModalEx>
    </div>
  )
}

export default App
