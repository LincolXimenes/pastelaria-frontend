import react from 'react';

export default function Card ({ title, children }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md">
            {title && <h2 className="text-xl font-semibold mb-s">{title}</h2>}
            <div>{children}</div>            
        </div>
    );
}