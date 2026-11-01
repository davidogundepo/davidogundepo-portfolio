'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { PROJECTS } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

/**
 * Numbered index of projects. On a pointer device a preview rectangle trails
 * the cursor and swaps image per row; on touch each row shows its own image.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const move = useRef<((e: React.PointerEvent) => void) | null>(null);
  const last = useRef<{ x: number; y: number } | null>(null);

  // Scrolling moves rows out from under a still pointer without firing any
  // pointer event, which would leave the preview stuck on screen. Re-check
  // what is under the pointer on every scroll instead.
  useEffect(() => {
    const onScroll = () => {
      if (!last.current) return;
      const el = document.elementFromPoint(last.current.x, last.current.y);
      const row = el?.closest<HTMLElement>('[data-row]');
      setHover(row ? Number(row.dataset.row) : null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(
    () => {
      const el = preview.current!;
      const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      move.current = (e) => {
        last.current = { x: e.clientX, y: e.clientY };
        x(e.clientX + 28);
        y(e.clientY - 120);
      };
      if (prefersReducedMotion()) return;
      gsap.from('.wk-row', {
        y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: '.wk-list', start: 'top 85%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section relative" onPointerMove={(e) => move.current?.(e)}>
      <div className="shell">
        <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Kicker>03 · Selected work</Kicker>
            <SplitTitle lines={['Other things', 'I have shipped']} className="display t-xl mt-6" />
          </div>
          <p className="lede md:col-span-4">Platforms for employers and clients, products of my own, and the student project where it started.</p>
        </div>

        <ul className="wk-list border-t border-[var(--line)]" onPointerLeave={() => setHover(null)}>
          {PROJECTS.map((p, i) => {
            const Wrap = p.href ? 'a' : 'div';
            return (
              <li key={p.n} className="wk-row border-b border-[var(--line)]">
                <Wrap
                  {...(p.href ? { href: p.href, target: '_blank', rel: 'noopener' } : {})}
                  data-row={i}
                  onPointerEnter={() => setHover(i)}
                  data-cursor={p.href ? 'Visit' : p.tag.split(' · ')[0]}
                  className="group grid grid-cols-[2.4rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[4rem_1.3fr_1fr_6rem] md:py-8"
                >
                  <span className="mono text-[var(--fg-3)]">{p.n}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-3">
                    <span className="display block text-[clamp(1.8rem,4vw,3.6rem)] transition-colors duration-500 group-hover:text-[var(--accent)]">
                      {p.title}
                    </span>
                    <span className="mono mt-2 hidden text-[var(--fg-3)] md:block">{p.tag}</span>
                  </span>
                  <span className="hidden text-[0.95rem] leading-snug text-[var(--fg-2)] md:block">{p.body}</span>
                  <span className="mono text-right text-[var(--fg-3)]">
                    {p.year}
                    <span className="ml-2 inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                      {p.href ? '↗' : '·'}
                    </span>
                  </span>
                  {/* Phones: body and image inline */}
                  <span className="col-span-3 md:hidden">
                    <span className="mono block text-[var(--fg-3)]">{p.tag}</span>
                    <span className="mt-3 block text-[0.95rem] leading-snug text-[var(--fg-2)]">{p.body}</span>
                    <span className="frame mt-4 block aspect-[16/10]">
                      <img src={p.img} alt="" loading="lazy" />
                    </span>
                  </span>
                </Wrap>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cursor-following preview, desktop only */}
      <div
        ref={preview}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[240px] w-[360px] overflow-hidden border border-[var(--line-strong)] bg-[var(--bg-3)] md:block"
        style={{
          clipPath: hover === null ? 'inset(50% 50% 50% 50%)' : 'inset(0% 0% 0% 0%)',
          transition: 'clip-path .55s cubic-bezier(.7,0,.2,1)',
        }}
      >
        {PROJECTS.map((p, i) => (
          <img
            key={p.n}
            src={p.img}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: hover === i ? 1 : 0, transform: hover === i ? 'scale(1)' : 'scale(1.12)', transition: 'opacity .4s, transform .8s' }}
          />
        ))}
        <span className="mono absolute bottom-0 left-0 bg-[var(--accent)] px-2 py-1 text-[0.6rem] text-[var(--accent-ink)]">
          {hover !== null ? PROJECTS[hover].tag : ''}
        </span>
      </div>
    </section>
  );
}
