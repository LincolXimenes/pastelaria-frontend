import React from 'react';

const variantStyles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-yellow-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function Alert({ type = 'info', message }) {
    return (
        <div 
            className={`border-l-4 p-4 rounded-md mb-4 ${variantStyles[type] || variantStyles.info}`}
            role="alert"
        >
            <p className="text-sm">{message}</p>
        </div>
    );
}