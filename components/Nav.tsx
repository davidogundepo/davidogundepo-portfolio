'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV, SITE } from '@/lib/content';
import { glideTo, getLenis } from '@/lib/lenis';

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as 'dark' | 'light') ?? 'light');
  }, []);
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('do-theme', next);
    } catch {}
    setTheme(next);
  };
  return (
    <button
      onClick={flip}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      data-cursor={theme === 'dark' ? 'Light' : 'Dark'}
      className="group flex h-9 items-center gap-2 border border-[var(--line-strong)] px-2 transition-colors hover:border-[var(--fg)]"
    >
      {/* Two squares: the filled one marks the active theme. */}
      <span className={`block h-3 w-3 border border-[var(--fg)] ${theme === 'dark' ? 'bg-[var(--fg)]' : ''}`} />
      <span className={`block h-3 w-3 border border-[var(--fg)] ${theme === 'light' ? 'bg-[var(--fg)]' : ''}`} />
    </button>
  );
}

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Freeze the page behind the open menu; Lenis owns the scroll, so stop it too.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Let the sheet start closing before the page moves under it.
    setTimeout(() => glideTo(href), open ? 250 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[500] transition-[background-color,border-color] duration-500 ${
          solid || open
            ? 'border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <a
            href="#top"
            onClick={(e) => go(e, '#top')}
            className="mono flex items-center gap-2.5 !text-[0.78rem] !tracking-[0.14em]"
            data-cursor="Top"
          >
            <span className="sq" />
            {SITE.name}
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Sections">
            {NAV.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="mono ulink text-[var(--fg-2)] transition-colors hover:text-[var(--fg)]"
              >
                <span className="text-[var(--fg-3)]">0{i + 1}</span> {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href={SITE.cv} target="_blank" rel="noopener" className="btn btn-accent hidden !py-2.5 sm:inline-flex" data-cursor="PDF">
              CV
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu"
              className="mono flex h-9 items-center border border-[var(--line-strong)] px-3 lg:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        <div ref={bar} className="h-px origin-left bg-[var(--accent)]" style={{ transform: 'scaleX(0)' }} />
      </header>

      <div
        id="menu"
        data-lenis-prevent
        className={`fixed inset-0 z-[450] flex flex-col justify-between bg-[var(--bg)] pt-24 pb-10 transition-[clip-path] duration-700 lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.7,0,.2,1)' }}
      >
        <nav className="shell flex flex-col" aria-label="Menu">
          {NAV.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="display flex items-baseline justify-between border-b border-[var(--line)] py-3 text-[clamp(3rem,15vw,6rem)]"
            >
              {l.label}
              <span className="mono text-[var(--fg-3)]">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <div className="shell flex flex-wrap gap-3">
          <a href={SITE.cv} target="_blank" rel="noopener" className="btn btn-accent">Download CV</a>
          <a href={`mailto:${SITE.email}`} className="btn">{SITE.email}</a>
        </div>
      </div>
    </>
  );
}
