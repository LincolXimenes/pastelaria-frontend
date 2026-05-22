export default function LoadingSpinner({ size = 'md', message = 'Carregando…', fullPage = false }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3 p-8">
      <div className={`spinner ${sizes[size]} border-2`} />
      {message && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-64">
      {content}
    </div>
  );
}
