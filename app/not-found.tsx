import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="zone-1 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <span className="font-mono text-[0.8125rem] uppercase tracking-widest text-[var(--fg-2)] block mb-3">
        OFF THE CHART // PAGE NOT FOUND
      </span>
      <h1 className="font-fraunces text-[clamp(5rem,18vw,10rem)] leading-[0.92] text-[var(--fg)] m-0 select-none">
        404
      </h1>

      <p className="mt-6 text-[1.125rem] leading-[1.7] text-[var(--fg)] max-w-md">
        This page doesn&apos;t exist or has been moved.
      </p>
      <p className="mt-1 text-[0.9375rem] text-[var(--fg-2)] mb-8">
        Check the URL or head back to the surface.
      </p>

      <Link href="/" className="primary-pill gap-2">
        <Home className="w-4 h-4" aria-hidden="true" />
        <span>Go Home</span>
      </Link>
    </div>
  );
}
