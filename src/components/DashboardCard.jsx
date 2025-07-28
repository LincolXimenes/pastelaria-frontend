import React from 'react';

export default function DashboardCard({ title, description }) {
    return (
        <div className="bg-white p-4 shadow rounded-lg hover:shadow-md transition-shadow duration-200">
            <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">{description}</p>            
        </div>
    );
}