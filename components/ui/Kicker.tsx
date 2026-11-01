/** Section label: square, number, words. Mono, small, quiet. */
export default function Kicker({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mono flex items-center gap-2 text-[var(--fg-2)] ${className}`}>
      <span className="sq" />
      {children}
    </p>
  );
}
