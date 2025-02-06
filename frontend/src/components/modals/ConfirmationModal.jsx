import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-sm z-20"></div> {/* Background overlay with lower z-index */}
          <div className="relative rounded p-10 bg-white z-30"> {/* Modal content with higher z-index */}
            <p>{message}</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={onConfirm} 
                className="bg-green-500 hover:bg-green-700 transition duration-200 text-white rounded-lg px-3 py-2 mr-2"
              >
                Confirm
              </button>
              <button 
                onClick={onCancel} 
                className="bg-red-500 hover:bg-red-700 transition duration-200 text-white rounded-lg px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    );

};

export default ConfirmationModal;
