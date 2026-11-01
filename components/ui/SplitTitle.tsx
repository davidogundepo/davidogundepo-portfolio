'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';

/** A display heading whose lines rise out of a clip when scrolled into view. */
export default function SplitTitle({
  lines,
  className = '',
  as: Tag = 'h2',
}: {
  lines: React.ReactNode[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(ref.current!.querySelectorAll('.st-line'), {
        yPercent: 110,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]">
          <span className="st-line block">{l}</span>
        </span>
      ))}
    </Tag>
  );
}
