'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion, whenVisible } from '@/lib/motion';
import { glideTo } from '@/lib/lenis';
import { HERO, SITE } from '@/lib/content';

/** Small photo squares that sit around the portrait and fly apart on scroll. */
const TILES = [
  { src: '/img/swc-pitch.webp', cls: 'left-[46%] top-[17%] w-[7vw]', speed: -1.4, x: -120 },
  { src: '/img/bta-screen.webp', cls: 'right-[2%] top-[13%] w-[6vw]', speed: -0.8, x: 90 },
  { src: '/img/nec-booth.webp', cls: 'right-[1%] bottom-[30%] w-[5vw]', speed: 0.9, x: 120 },
];

function LagosClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || '00:00:00'}</span>;
}

function Line({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      <span className="hero-line block whitespace-nowrap" aria-hidden>
        {text.split('').map((c, i) => (
          <span key={i} className="hero-char inline-block">
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cancel = whenVisible(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from('.hero-char', { yPercent: 115, duration: 1.4, stagger: 0.045 }, 0.15)
          .fromTo(
            '.hero-line',
            { fontVariationSettings: "'wdth' 125" },
            { fontVariationSettings: "'wdth' 62", duration: 1.8, ease: 'expo.inOut' },
            0.1,
          )
          .from('.hero-portrait', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.2)
          .from('.hero-portrait img', { scale: 1.35, duration: 2.2 }, 0.2)
          .from('.hero-fade', { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.9)
          .from('.hero-tile', { scale: 0, opacity: 0, duration: 1, stagger: 0.07 }, 1.1);
      });

      // On the way out: the name widens and lifts, the portrait sinks, the tiles scatter.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      // fromTo with immediateRender off: at progress 0 this hands back exactly the
      // width the intro ends on, so scrolling home never leaves the name stretched.
      gsap.fromTo(
        '.hero-line',
        { fontVariationSettings: "'wdth' 62", yPercent: 0 },
        { fontVariationSettings: "'wdth' 110", yPercent: -18, ease: 'none', immediateRender: false, scrollTrigger: st },
      );
      gsap.to('.hero-portrait img', { yPercent: 14, scale: 1.08, ease: 'none', scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>('.hero-tile').forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.to(el, { y: speed * 260, x: Number(el.dataset.x), rotate: speed * 6, opacity: 0, ease: 'none', scrollTrigger: st });
      });
      return cancel;
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20 pb-8">
      {/* Floating tiles, desktop only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {TILES.map((t) => (
          <div
            key={t.src}
            data-speed={t.speed}
            data-x={t.x}
            className={`hero-tile frame absolute aspect-square ${t.cls}`}
          >
            <img src={t.src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="shell relative flex flex-1 flex-col">
        <div className="hero-fade mono flex items-center justify-between border-b border-[var(--line)] pb-3 text-[var(--fg-2)]">
          <span className="flex items-center gap-2">
            <span className="sq" /> <span className="hidden sm:inline">{HERO.kicker}</span>
            <span className="sm:hidden">Engineer · Founder</span>
          </span>
          <span className="hidden sm:inline">Portfolio · 2026</span>
          <span>
            Lagos <LagosClock /> <span className="hidden sm:inline">WAT</span>
          </span>
        </div>

        <div className="relative mt-6 flex-1 md:mt-10">
          {/* Portrait: right side on desktop, beneath the name on phones. */}
          <figure className="hero-portrait frame ticks absolute right-0 top-0 hidden aspect-[4/5] w-[30vw] max-w-[520px] md:block">
            <img src="/img/hero.webp" alt="David Ogundepo at The Signature Awards 2024, Birmingham" fetchPriority="high" />
            <figcaption className="mono absolute bottom-3 left-3 bg-[var(--bg)] px-2 py-1 text-[0.62rem] text-[var(--fg-2)]">
              Signature Awards · Birmingham · 2024
            </figcaption>
          </figure>

          <h1 className="relative z-10 text-white mix-blend-difference" aria-label={SITE.name}>
            <Line text={HERO.lineA} className="display t-mega max-md:!text-[21.5vw]" />
            <Line text={HERO.lineB} className="display t-mega max-md:!text-[21.5vw]" />
          </h1>

          <figure className="frame ticks mt-6 aspect-[4/5] w-full md:hidden">
            <img src="/img/hero.webp" alt="David Ogundepo at The Signature Awards 2024, Birmingham" />
          </figure>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="hero-fade serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.1]">{SITE.role}.</p>
            <p className="hero-fade lede mt-4 max-w-[46ch]">{HERO.sub}</p>
            <div className="hero-fade mt-7 flex flex-wrap gap-3">
              <a href="#work" onClick={(e) => (e.preventDefault(), glideTo('#work'))} className="btn btn-accent" data-cursor="Scroll">
                See the work <span aria-hidden>↓</span>
              </a>
              <a href={SITE.cv} target="_blank" rel="noopener" className="btn" data-cursor="PDF">
                Download CV
              </a>
            </div>
          </div>
          <dl className="hero-fade md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
            {HERO.meta.map((m) => (
              <div key={m.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-[var(--line)] py-3 last:border-b">
                <dt className="mono text-[var(--fg-3)]">{m.k}</dt>
                <dd className="text-[0.95rem]">{m.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
