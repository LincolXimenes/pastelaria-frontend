import React from 'react';

const styles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function Alert({ type = 'info', message }) {
    return (
        <div className={`border px-4 py-2 rounded mb-2 ${styles[type]}`}>
            {message}            
        </div>
    );
}