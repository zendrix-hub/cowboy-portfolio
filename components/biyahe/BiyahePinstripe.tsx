export default function BiyahePinstripe({ className = "" }: { className?: string }) {
  return (
    <div
      className={`triple-pinstripe ${className}`}
      role="separator"
      aria-hidden="true"
    />
  );
}
