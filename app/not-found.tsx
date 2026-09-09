import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Decorative 404 */}
      <div className="relative mb-6">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-zinc-200 dark:text-zinc-800 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-400 tracking-wider uppercase">
            Page Not Found
          </span>
        </div>
      </div>

      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2 max-w-md">
        This page doesn&apos;t exist or has been moved.
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-8">
        Check the URL or head back to the homepage.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-zinc-950 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <Home className="w-4 h-4" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
