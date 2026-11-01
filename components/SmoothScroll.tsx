'use client';

import { useEffect } from 'react';
import { startLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/lib/motion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    return startLenis();
  }, []);
  return <>{children}</>;
}
