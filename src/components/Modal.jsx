import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div>{children}</div>
            </div>
        </div>
    );
}