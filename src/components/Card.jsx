import React from 'react';

export default function Card ({ title, description, children }) {
    return (
        <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold text-lg">{title}</h2>
      <p>{description}</p>
    </div>
  );
}