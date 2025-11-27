import React, { useEffect } from 'react';

const styles = {
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
};

export default function Alert({ type = 'info', message, onClose, autoClose = true, duration = 5000 }) {
    useEffect(() => {
        if (autoClose && onClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [autoClose, onClose, duration]);

    const alertTypes = {
        success: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-300',
            icon: '✓'
        },
        error: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-300',
            icon: '✕'
        },
        warning: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-300',
            icon: '⚠'
        },
        info: {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            border: 'border-blue-300',
            icon: 'ℹ'
        }
    };

    const alertConfig = alertTypes[type] || alertTypes.info;

    return (
        <div className={`${alertConfig.bg} ${alertConfig.text} ${alertConfig.border} border rounded-md p-4 relative`}>
            <div className="flex items-center">
                <span className="mr-2 font-bold">{alertConfig.icon}</span>
                <span className="flex-1">{message}</span>
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`${alertConfig.text} hover:opacity-75 ml-2 font-bold`}
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}