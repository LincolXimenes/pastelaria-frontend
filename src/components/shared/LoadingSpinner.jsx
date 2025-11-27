export default function LoadingSpinner({ size = 'md', message = 'Carregando...' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-yellow-600 rounded-full animate-spin mb-2`}></div>
      {message && (
        <p className="text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
}