'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { ABOUT } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

export default function About() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo('.ab-img img', { yPercent: -8, scale: 1.12 }, {
        yPercent: 8, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: '.ab-img', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.ab-img', {
        clipPath: 'inset(0% 0% 100% 0%)', duration: 1.5, ease: 'expo.inOut',
        scrollTrigger: { trigger: '.ab-img', start: 'top 80%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="section border-t border-[var(--line)]">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <figure className="ab-img frame ticks aspect-[4/5]">
              <img src="/img/portrait-studio.webp" alt="Portrait of David Ogundepo" loading="lazy" />
            </figure>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <figure className="frame aspect-square">
                <img src="/img/portrait-laptop.webp" alt="David at work" loading="lazy" />
              </figure>
              <figure className="frame aspect-square">
                <img src="/img/swc-finalists.webp" alt="Startup World Cup Lagos finalists" loading="lazy" />
              </figure>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <Kicker>06 · {ABOUT.kicker}</Kicker>
          <SplitTitle lines={['Engineered,', <span key="t" className="serif normal-case text-[var(--accent)]">twice.</span>]} className="display t-xl mt-6" />
          <div className="mt-10 space-y-6">
            {ABOUT.body.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.45]' : 'lede'}>
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <p className="mono mb-3 text-[var(--fg-3)]">Education</p>
            {ABOUT.education.map(([d, s]) => (
              <div key={d} className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[var(--line)] py-4 last:border-b">
                <span className="text-[1.05rem] font-semibold">{d}</span>
                <span className="mono text-[var(--fg-2)]">{s}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3">
            {['/img/nec-hall.webp', '/img/mentor.webp', '/img/signature-night.webp'].map((src) => (
              <figure key={src} className="frame aspect-[3/4]">
                <img src={src} alt="" loading="lazy" className="[filter:grayscale(1)] transition-[filter] duration-700 hover:[filter:grayscale(0)]" />
              </figure>
            ))}
          </div>
          <p className="mono mt-3 text-[var(--fg-3)]">NEC Birmingham, 2023 · Working sessions with my UK business mentor · Signature Awards night, 2024</p>
        </div>
      </div>
    </section>
  );
}
