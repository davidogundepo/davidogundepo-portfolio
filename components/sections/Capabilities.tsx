'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { CAPABILITIES } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.cap-card', {
        y: 50, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07,
        scrollTrigger: { trigger: '.cap-grid', start: 'top 82%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section border-t border-[var(--line)] bg-[var(--bg-2)]">
      <div className="shell">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Kicker>05 · For your team</Kicker>
            <SplitTitle lines={['What I can', <>do <span className="serif normal-case">for you</span></>]} className="display t-xl mt-6" />
          </div>
          <p className="lede md:col-span-4">One engineer who can carry a product the whole way: from the data model to the store listing to the customer who pays for it.</p>
        </div>

        <div className="cap-grid grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <article key={c.n} className="cap-card group relative flex min-h-[19rem] flex-col justify-between overflow-hidden bg-[var(--bg)] p-7 md:p-9">
              {/* hover fill rises from the bottom edge */}
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-700 [transition-timing-function:cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
              <div className="relative flex items-start justify-between">
                <span className="mono text-[var(--fg-3)] transition-colors duration-500 group-hover:text-[var(--accent-ink)]">{c.n}</span>
                <span className="block h-4 w-4 border border-[var(--line-strong)] transition-colors duration-500 group-hover:border-[var(--accent-ink)] group-hover:bg-[var(--accent-ink)]" />
              </div>
              <div className="relative transition-colors duration-500 group-hover:text-[var(--accent-ink)]">
                <h3 className="display text-[clamp(2rem,3vw,2.8rem)]">{c.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-snug opacity-75">{c.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="mono border border-current px-2 py-1 !text-[0.62rem] opacity-70">{t}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
