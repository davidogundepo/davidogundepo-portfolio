'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { RECORD, TIMELINE } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

/**
 * Recognition as a pinned horizontal strip on desktop (scroll down, the strip
 * moves sideways). Phones get a native swipe row instead of a pin.
 */
export default function Record() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const el = track.current!;
        const dist = () => el.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.rc-pin',
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>('.rc-img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, {
            xPercent: 8, ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          });
        });
      });
      gsap.from('.tl-row', {
        opacity: 0, x: -30, duration: 0.9, ease: 'expo.out', stagger: 0.05,
        scrollTrigger: { trigger: '.tl-list', start: 'top 85%', once: true },
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="record" ref={root} className="relative border-t border-[var(--line)]">
      <div className="rc-pin flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 lg:py-0">
        <div className="shell mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Kicker>04 · The record</Kicker>
            <SplitTitle lines={['On stage, on', 'the shortlist']} className="display t-lg mt-6" />
          </div>
          <p className="mono hidden text-[var(--fg-3)] lg:block">Keep scrolling →</p>
        </div>

        <div
          ref={track}
          data-lenis-prevent-horizontal
          className="no-scrollbar flex gap-5 overflow-x-auto px-[clamp(16px,4vw,56px)] lg:overflow-visible"
          style={{ scrollSnapType: 'x mandatory', scrollPaddingInline: 'clamp(16px,4vw,56px)' }}
        >
          {RECORD.map((r) => (
            <article key={r.title} className="group w-[82vw] flex-none border border-[var(--line)] bg-[var(--bg-2)] sm:w-[56vw] lg:w-[34vw]" style={{ scrollSnapAlign: 'start' }}>
              {r.img ? (
                <div className="frame aspect-[4/3] lg:aspect-[16/10]">
                  <img src={r.img} alt={r.title} loading="lazy" className="rc-img !w-[116%] max-w-none -translate-x-[8%] transition-[filter] duration-700 [filter:grayscale(.85)] group-hover:[filter:grayscale(0)]" />
                </div>
              ) : (
                <div className="flex aspect-[4/3] flex-col justify-between bg-[var(--accent)] p-6 text-[var(--accent-ink)] lg:aspect-[16/10]">
                  <span className="mono">Business Awards UK · April 2024</span>
                  <span className="display text-[clamp(4rem,7vw,7rem)]">Winner</span>
                </div>
              )}
              <div className="p-6">
                <p className="mono flex justify-between text-[var(--fg-3)]">
                  <span>{r.place}</span>
                  <span className="text-[var(--accent)]">{r.year}</span>
                </p>
                <h3 className="display mt-3 text-[clamp(1.8rem,2.4vw,2.4rem)]">{r.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-snug text-[var(--fg-2)]">{r.body}</p>
              </div>
            </article>
          ))}
          <div className="w-px flex-none" />
        </div>
      </div>

      <div className="shell section !pt-10 lg:!pt-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Kicker>Thirteen years, one line</Kicker>
            <p className="display t-md mt-5">From a student touchscreen kiosk to proposals on a state government desk.</p>
          </div>
          <ol className="tl-list md:col-span-8">
            {TIMELINE.map(([y, t, b]) => (
              <li key={y} className="tl-row group grid grid-cols-[4.5rem_1fr] gap-5 border-t border-[var(--line)] py-5 last:border-b md:grid-cols-[6rem_14rem_1fr]">
                <span className="display text-[1.9rem] text-[var(--fg-3)] transition-colors group-hover:text-[var(--accent)]">{y}</span>
                <span className="text-[1.05rem] font-semibold">{t}</span>
                <span className="col-start-2 text-[0.96rem] leading-snug text-[var(--fg-2)] md:col-start-3">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
