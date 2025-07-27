import React from 'react';

export default function Input({ label, type = 'text', name, value, onChange, className = '' }) {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="mb-1 text-sm text-gray-600">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={`px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${className}`}
            />
        </div>
    );
}