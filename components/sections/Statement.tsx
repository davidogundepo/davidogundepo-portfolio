'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { STATEMENT, STACK } from '@/lib/content';
import Marquee from '@/components/ui/Marquee';

/** The one-paragraph pitch. Each word lights up as it scrolls past the middle. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.st-word',
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.st-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
    },
    { scope: root },
  );

  const words = STATEMENT.split(' ');
  return (
    <section ref={root} className="section relative border-t border-[var(--line)]">
      <div className="shell grid gap-10 md:grid-cols-12">
        <p className="mono text-[var(--fg-3)] md:col-span-3">
          <span className="sq mr-2" />
          In one paragraph
        </p>
        <p className="st-text text-[clamp(1.7rem,3.4vw,3.3rem)] leading-[1.12] tracking-[-0.015em] md:col-span-9">
          {words.map((w, i) => (
            <span key={i} className="st-word">
              {w}{' '}
            </span>
          ))}
        </p>
      </div>
      <div className="mt-20 border-y border-[var(--line)] py-5">
        <Marquee speed={55}>
          {STACK.map((s) => (
            <span key={s} className="mono flex items-center gap-3 whitespace-nowrap !text-[0.8rem] text-[var(--fg-2)]">
              <span className="sq !h-[6px] !w-[6px]" />
              {s}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
