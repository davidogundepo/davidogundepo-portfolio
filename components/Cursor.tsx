'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion';

/**
 * A square cursor (no circles, per the brief). Over anything with
 * `data-cursor="Label"` it opens into a labelled rectangle. Pointer devices
 * only; touch screens never render it.
 */
export default function Cursor() {
  const box = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = box.current!;
    const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      setOn(true);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      setLabel(t?.dataset.cursor ?? '');
    };
    const leave = () => setOn(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div
      ref={box}
      aria-hidden
      className="cursor pointer-events-none fixed left-0 top-0 z-[1000] mix-blend-difference"
      style={{ opacity: on ? 1 : 0, transition: 'opacity .3s' }}
    >
      <div
        className="mono flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap bg-white text-black"
        style={{
          width: label ? 'auto' : 10,
          height: label ? 34 : 10,
          padding: label ? '0 14px' : 0,
          fontSize: '0.66rem',
          transition: 'width .35s cubic-bezier(.7,0,.2,1), height .35s cubic-bezier(.7,0,.2,1), padding .35s',
        }}
      >
        {label}
      </div>
    </div>
  );
}
