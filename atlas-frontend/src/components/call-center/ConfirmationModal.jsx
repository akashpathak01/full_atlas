import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
                {message}
            </p>
        </div>
        
        <div className="p-6 pt-0 flex gap-3">
             <button 
                onClick={onClose}
                className="flex-1 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                className="flex-1 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
                Confirm
            </button>
        </div>
      </div>
    </div>
  );
}
