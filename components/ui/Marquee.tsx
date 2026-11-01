/** Infinite CSS marquee. The track is rendered twice so the loop never shows a seam. */
export default function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`marquee ${className}`}
      data-reverse={reverse || undefined}
      style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
    >
      <div className="marquee-track">{children}</div>
      <div className="marquee-track" aria-hidden>
        {children}
      </div>
    </div>
  );
}
