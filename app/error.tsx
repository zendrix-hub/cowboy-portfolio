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
    <div className="zone-1 flex flex-col items-center justify-center min-h-[400px] w-full p-6 text-center text-[var(--fg)]">
      <h2 className="font-fraunces text-[2rem] mb-2">Something went wrong!</h2>
      <p className="text-[var(--fg-2)] mb-6 max-w-md">
        An unexpected error occurred while loading this section.
      </p>
      <button
        onClick={() => retry()}
        className="primary-pill gap-2"
      >
        <RefreshCcw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
