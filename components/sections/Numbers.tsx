'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { NUMBERS } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';

/** The receipts. Each figure counts up once, the first time it is seen. */
export default function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cells = gsap.utils.toArray<HTMLElement>('.num-cell');
      cells.forEach((cell) => {
        const out = cell.querySelector<HTMLElement>('.num-val')!;
        const target = Number(out.dataset.value);
        const line = cell.querySelector<HTMLElement>('.num-line')!;
        if (prefersReducedMotion()) return;
        const obj = { v: 0 };
        gsap.from(line, {
          scaleY: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: cell, start: 'top 85%', once: true },
        });
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: cell, start: 'top 85%', once: true },
          onUpdate: () => {
            out.textContent = Math.round(obj.v).toLocaleString('en-GB');
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section bg-[var(--bg-2)]">
      <div className="shell">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <Kicker>The receipts</Kicker>
          <p className="mono max-w-[46ch] text-[var(--fg-3)]">Counted from live systems, sent proposals and the award lists themselves.</p>
        </div>
        <div className="grid border-l border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map((n) => (
            <div key={n.label} className="num-cell relative border-b border-r border-[var(--line)] p-6 pb-8 md:p-9 md:pb-11">
              <span className="num-line absolute left-0 top-0 h-full w-[3px] origin-top bg-[var(--accent)]" />
              <p className="display t-lg flex items-baseline">
                {n.prefix && <span className="mr-[0.2em]">{n.prefix}</span>}
                <span className="num-val" data-value={n.value}>
                  {n.value.toLocaleString('en-GB')}
                </span>
                <span className="text-[var(--accent)]">{n.suffix}</span>
              </p>
              <p className="mt-4 max-w-[30ch] text-[0.98rem] leading-snug text-[var(--fg-2)]">{n.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
