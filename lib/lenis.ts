'use client';

import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './motion';

let lenis: Lenis | null = null;

export function startLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export const getLenis = () => lenis;

/** Glide to an in-page anchor instead of the browser's instant jump. */
export function glideTo(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', hash);
}
