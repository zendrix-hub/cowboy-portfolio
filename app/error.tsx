'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center text-zinc-900 dark:text-zinc-100">
      <h2 className="text-2xl font-semibold mb-2">Something went wrong!</h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
        An unexpected error occurred while loading this section.
      </p>
      <button
        onClick={() => retry()}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
