import React from 'react';

export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-gray-600">{title}</span>
    </div>
  );
}