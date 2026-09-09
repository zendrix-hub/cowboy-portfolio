'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Critical Error</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            A critical application error occurred.
          </p>
          <button
            onClick={() => retry()}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
