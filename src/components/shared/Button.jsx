import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) {
  const variants = {
    primary: 'bg-yellow-600 text-white hover:bg-yellow-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-md font-medium transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}