'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { WEB_WALL } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';

/** Fifteen live sites in three columns that slide past each other on scroll. */
export default function WebWall() {
  const root = useRef<HTMLElement>(null);
  const cols = [0, 1, 2].map((c) => WEB_WALL.filter((_, i) => i % 3 === c));

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        [[-8, -34], [-30, 6], [0, -26]].forEach(([from, to], i) => {
          gsap.fromTo(`.ww-col-${i}`, { yPercent: from }, {
            yPercent: to, ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--bg-2)] py-20 md:h-[150vh] md:py-0">
      <div className="pointer-events-none relative z-10 md:absolute md:inset-0 md:flex md:items-center">
        <div className="shell">
          <div className="max-w-[30rem] md:bg-[var(--bg)] md:p-8 md:shadow-[0_0_0_1px_var(--line)]">
            <Kicker>Web, live in production</Kicker>
            <p className="display t-lg mt-5">15 sites. <span className="serif normal-case">all shipped.</span></p>
            <p className="lede mt-4">Corporate sites, platforms and dashboards for consultancies, health, property, agriculture, media and my own products. Every one of these is a real address you can visit.</p>
          </div>
        </div>
      </div>

      <div className="shell mt-10 grid grid-cols-2 gap-3 md:absolute md:inset-0 md:mt-0 md:grid-cols-3 md:gap-6 md:pl-[40%]">
        {cols.map((col, ci) => (
          <div key={ci} className={`ww-col-${ci} flex flex-col gap-3 md:gap-6 ${ci === 2 ? 'hidden md:flex' : ''}`}>
            {/* On phones the third column is hidden, so its sites fold into the first two. */}
            {[
              ...col.map((it) => [...it, false] as const),
              ...(ci === 2 ? [] : (ci === 0 ? cols[2].slice(0, 3) : cols[2].slice(3)).map((it) => [...it, true] as const)),
            ].map(([src, label, mobileOnly]) => (
              <figure key={src} className={`group ${mobileOnly ? 'md:hidden' : ''}`}>
                <div className="frame aspect-[4/3] border border-[var(--line)]">
                  <img src={src} alt={`${label} homepage`} loading="lazy" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="mono mt-2 truncate text-[0.62rem] text-[var(--fg-3)]">{label}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
