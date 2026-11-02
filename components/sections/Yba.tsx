'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { YBA } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';
import Marquee from '@/components/ui/Marquee';

export default function Yba() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        // Two columns of screens drifting at different speeds.
        gsap.fromTo('.yba-col-a', { y: 0 }, {
          y: -180, ease: 'none',
          scrollTrigger: { trigger: '.yba-body', start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.fromTo('.yba-col-b', { y: 220 }, {
          y: 20, ease: 'none',
          scrollTrigger: { trigger: '.yba-body', start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
      gsap.from('.yba-proof > div', {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: '.yba-proof', start: 'top 85%', once: true },
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const colA = [YBA.shots[0], YBA.demo[0], YBA.shots[2], YBA.demo[2], YBA.shots[4]];
  const colB = [YBA.shots[1], YBA.demo[1], YBA.shots[3], YBA.demo[3], YBA.shots[5]];

  return (
    <section id="work" ref={root} className="section relative">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Kicker>{YBA.kicker}</Kicker>
            <SplitTitle lines={['The Yearbook', <>App <span className="serif normal-case text-[var(--accent)]">(YBA)</span></>]} className="display t-xl mt-6" />
          </div>
          <div className="md:col-span-4">
            <p className="lede">{YBA.pitch}</p>
            <a href={YBA.liveUrl} target="_blank" rel="noopener" className="btn mt-6" data-cursor="Open">
              Explore the live app <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="yba-body shell mt-20 grid gap-14 md:grid-cols-12">
        {/* Story column: sticky on desktop */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="md:sticky md:top-28">
            <p className="text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.45]">{YBA.origin}</p>

            <ul className="mt-10 border-t border-[var(--line)]">
              {YBA.products.map((p, i) => (
                <li key={p.name} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-[var(--line)] py-4">
                  <span className="mono text-[var(--fg-3)]">0{i + 1}</span>
                  <div>
                    <p className="display text-[clamp(1.6rem,2.4vw,2.2rem)]">{p.name}</p>
                    <p className="text-[0.92rem] text-[var(--fg-2)]">{p.for}</p>
                  </div>
                  <div className="frame hidden aspect-[16/10] w-36 sm:block">
                    <img src={p.img} alt="" className="transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="yba-proof mt-10 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)]">
              {YBA.proof.map(([k, v]) => (
                <div key={k} className="bg-[var(--bg)] p-5">
                  <p className="display text-[clamp(1.8rem,2.6vw,2.6rem)] text-[var(--accent)]">{k}</p>
                  <p className="mt-2 text-[0.88rem] leading-snug text-[var(--fg-2)]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Screens */}
        <div className="grid grid-cols-2 gap-3 md:col-span-6 md:gap-5 lg:col-span-6 lg:col-start-7">
          {[colA, colB].map((col, ci) => (
            <div key={ci} className={`${ci ? 'yba-col-b' : 'yba-col-a'} flex flex-col gap-3 md:gap-5`}>
              {col.map((src) => (
                <div key={src} className="frame aspect-[9/16] border border-[var(--line)]">
                  <img src={src} alt="The Yearbook App screen" loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <div className="shell mb-6 flex items-end justify-between gap-6">
          <Kicker>Proposals delivered</Kicker>
          <p className="mono hidden text-[var(--fg-3)] sm:block">{YBA.institutions.length} institutions and bodies, 2025 to 2026</p>
        </div>
        <div className="flex flex-col gap-2 border-y border-[var(--line)] py-6">
          <Marquee speed={70}>
            {YBA.institutions.slice(0, 16).map((s) => (
              <span key={s} className="display whitespace-nowrap text-[clamp(1.8rem,3.4vw,3.2rem)]">
                {s} <span className="text-[var(--accent)]">/</span>
              </span>
            ))}
          </Marquee>
          <Marquee speed={80} reverse>
            {YBA.institutions.slice(16).map((s) => (
              <span key={s} className="display whitespace-nowrap text-[clamp(1.8rem,3.4vw,3.2rem)] text-[var(--fg-3)]">
                {s} <span className="text-[var(--accent)]">/</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
