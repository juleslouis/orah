export function OrahEmblem({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      className={className}
      aria-hidden
    >
      {/* Eight-pointed light — the ORAH signature */}
      <path d="M24 3v42M3 24h42" />
      <path d="M9.5 9.5l29 29M38.5 9.5l-29 29" strokeWidth="0.7" />
      <path d="M24 14l4.2 5.8L34 24l-5.8 4.2L24 34l-4.2-5.8L14 24l5.8-4.2z" />
      <circle cx="24" cy="24" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
