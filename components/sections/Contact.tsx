'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { SITE, mailHref, waHref } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';

const LINKS = [
  { k: 'Email', v: SITE.email, href: mailHref() },
  { k: 'WhatsApp', v: SITE.whatsappDisplay, href: waHref() },
  { k: 'LinkedIn', v: 'in/davidogundepo', href: SITE.linkedin },
  { k: 'GitHub', v: 'davidogundepo', href: SITE.github },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo('.ct-word', { fontVariationSettings: "'wdth' 125", yPercent: 40 }, {
        fontVariationSettings: "'wdth' 62", yPercent: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 25%', scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="relative overflow-hidden border-t border-[var(--line)] pt-24 pb-16">
      <div className="shell">
        <Kicker>07 · Contact</Kicker>
        <a href={mailHref()} className="group mt-8 block" data-cursor="Email me">
          <span className="ct-word display t-mega block whitespace-nowrap transition-colors duration-500 group-hover:text-[var(--accent)]">
            Let&rsquo;s build
          </span>
        </a>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <p className="lede md:col-span-5">
            Hiring for an engineering or product role, or have something that needs building end to end? I read every message myself.
          </p>
          <ul className="md:col-span-6 md:col-start-7">
            {LINKS.map((l) => (
              <li key={l.k}>
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener"
                  className="group grid grid-cols-[7rem_1fr_auto] items-baseline gap-4 border-t border-[var(--line)] py-4 transition-colors hover:text-[var(--accent)]"
                >
                  <span className="mono text-[var(--fg-3)]">{l.k}</span>
                  <span className="truncate text-[clamp(1.05rem,1.6vw,1.4rem)]">{l.v}</span>
                  <span className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </a>
              </li>
            ))}
            <li className="border-t border-[var(--line)] pt-6">
              <a href={SITE.cv} target="_blank" rel="noopener" className="btn btn-accent" data-cursor="PDF">
                Download my CV <span aria-hidden>↓</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
