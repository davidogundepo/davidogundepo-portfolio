'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const EASE = 'expo.out';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Run an intro only once the tab is actually visible. A backgrounded tab never
 * fires requestAnimationFrame, so a `from` tween started there would leave the
 * content stuck at its starting state (invisible). The timeout is a backstop for
 * browsers that report hidden forever (some automation panes do).
 */
export function whenVisible(fn: () => void, timeout = 1500): () => void {
  if (typeof document === 'undefined' || !document.hidden) {
    fn();
    return () => {};
  }
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    document.removeEventListener('visibilitychange', onVis);
    clearTimeout(t);
    fn();
  };
  const onVis = () => !document.hidden && run();
  document.addEventListener('visibilitychange', onVis);
  const t = setTimeout(run, timeout);
  return () => {
    done = true;
    document.removeEventListener('visibilitychange', onVis);
    clearTimeout(t);
  };
}
