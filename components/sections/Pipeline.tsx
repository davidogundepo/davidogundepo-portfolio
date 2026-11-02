'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { PIPELINE_HEAD, SYSTEMS, type SysNode, type SysService, type SystemMap } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

// Diagram geometry, in viewBox units (1200 x 620).
const W = 200;
const MAIN_Y = 255;
const MAIN_H = 110;
const SVC_H = 86;
const TOP_Y = 40;
const BOT_Y = 494;
const mainX = [20, 260, 500, 740, 980];
const svcX = [140, 500, 860];
const cx = (x: number) => x + W / 2;
const MAIN_PATH = `M${cx(mainX[0])} ${MAIN_Y + MAIN_H / 2} H${cx(mainX[4])}`;

/** Elbow wire from a side service into the main node it feeds. */
function wire(s: SysService) {
  const from = cx(svcX[s.slot]);
  const to = cx(mainX[s.to]);
  if (s.row === 'top') {
    const y0 = TOP_Y + SVC_H;
    return from === to ? `M${from} ${y0} V${MAIN_Y}` : `M${from} ${y0} V190 H${to} V${MAIN_Y}`;
  }
  const yEnd = MAIN_Y + MAIN_H;
  return from === to ? `M${from} ${BOT_Y} V${yEnd}` : `M${from} ${BOT_Y} V430 H${to} V${yEnd}`;
}

function Box({
  node, x, y, h, n, active, onPick, main,
}: {
  node: SysNode; x: number; y: number; h: number; n: string; active: boolean; onPick: (id: string) => void; main?: boolean;
}) {
  const tech = node.tech.length > 30 ? node.tech.slice(0, 29) + '…' : node.tech;
  const ink = active ? 'var(--accent-ink)' : undefined;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`${node.name}: ${node.tech}`}
      onClick={() => onPick(node.id)}
      onMouseEnter={() => onPick(node.id)}
      onFocus={() => onPick(node.id)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPick(node.id)}
      className="pl-box cursor-pointer outline-none"
      data-cursor="Inspect"
    >
      <rect
        x={x} y={y} width={W} height={h}
        fill={active ? 'var(--accent)' : 'var(--bg)'}
        stroke={active ? 'var(--accent)' : 'var(--line-strong)'}
        style={{ transition: 'fill .4s, stroke .4s' }}
      />
      <text x={x + 14} y={y + 24} fontSize="11" letterSpacing="1.2" fill={ink ?? 'var(--fg-3)'} style={{ fontFamily: 'var(--font-jetbrains)', transition: 'fill .4s' }}>
        {n}
      </text>
      <text
        x={x + 14} y={y + (main ? 62 : 52)}
        fontSize={main ? 24 : 19} fontWeight={800}
        fill={ink ?? 'var(--fg)'}
        style={{ fontFamily: 'var(--font-archivo)', fontStretch: '70%', textTransform: 'uppercase', transition: 'fill .4s' }}
      >
        {node.name}
      </text>
      <text x={x + 14} y={y + (main ? 88 : 72)} fontSize="11" fill={ink ?? 'var(--fg-2)'} style={{ fontFamily: 'var(--font-jetbrains)', transition: 'fill .4s' }}>
        {tech}
      </text>
    </g>
  );
}

/** Square dropdown for picking which system map is on the board. */
function Switcher({ sys, onChange }: { sys: SystemMap; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative z-20">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        data-cursor="Switch"
        className="mono flex items-center gap-3 border border-[var(--line-strong)] bg-[var(--bg)] px-3 py-2 text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
      >
        <span className="sq" />
        {sys.label}
        <span aria-hidden className={`inline-block transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <ul
        role="listbox"
        aria-label="Choose a system"
        className={`absolute left-0 top-full mt-1 w-max min-w-full border border-[var(--line-strong)] bg-[var(--bg)] shadow-[0_20px_40px_rgba(0,0,0,.18)] transition-[clip-path] duration-300 ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        {SYSTEMS.map((s, i) => (
          <li key={s.id}>
            <button
              role="option"
              aria-selected={s.id === sys.id}
              onClick={() => {
                onChange(s.id);
                setOpen(false);
              }}
              className={`mono flex w-full items-center gap-3 border-b border-[var(--line)] px-3 py-3 text-left transition-colors last:border-0 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] ${
                s.id === sys.id ? 'text-[var(--accent)]' : 'text-[var(--fg-2)]'
              }`}
            >
              <span className="w-5 text-[var(--fg-3)]">0{i + 1}</span>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pipeline() {
  const root = useRef<HTMLElement>(null);
  const [sysId, setSysId] = useState(SYSTEMS[0].id);
  const sys = SYSTEMS.find((s) => s.id === sysId)!;
  const all: SysNode[] = [...sys.flow, ...sys.services];
  const [active, setActive] = useState(sys.flow[0].id);
  const [touched, setTouched] = useState(false);
  const [switched, setSwitched] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => setMotion(!prefersReducedMotion()), []);

  // Walk the visitor through the current map until they pick a box themselves.
  useEffect(() => {
    if (touched) return;
    const ids = [...sys.flow, ...sys.services].map((n) => n.id);
    const t = setInterval(() => setActive((a) => ids[(ids.indexOf(a) + 1) % ids.length]), 3200);
    return () => clearInterval(t);
  }, [touched, sys]);

  const pick = (id: string) => {
    setTouched(true);
    setActive(id);
  };

  const switchTo = (id: string) => {
    const next = SYSTEMS.find((s) => s.id === id)!;
    setSysId(id);
    setActive(next.flow[0].id);
    setTouched(false);
    setSwitched(true);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<SVGPathElement>('.pl-wire').forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.6, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.pl-diagram', start: 'top 75%', once: true },
        });
      });
      gsap.from('.pl-diagram .pl-box', {
        opacity: 0, y: 16, duration: 0.9, ease: 'expo.out', stagger: 0.05,
        scrollTrigger: { trigger: '.pl-diagram', start: 'top 75%', once: true },
      });
    },
    { scope: root },
  );

  // Each switch redraws the board: boxes drop into place, mobile cards rise.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !switched) return;
      gsap.fromTo('.pl-diagram .pl-box', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.035 });
      gsap.fromTo('.pl-mobile li, .pl-mobile .pl-svc', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.04 });
    },
    { scope: root, dependencies: [sysId] },
  );

  const current = all.find((n) => n.id === active) ?? all[0];
  const idx = all.indexOf(current);
  const wired = (id: string) => active === id;

  return (
    <section id="systems" ref={root} className="section relative border-t border-[var(--line)] bg-[var(--bg-2)]">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Kicker>{PIPELINE_HEAD.kicker}</Kicker>
            <SplitTitle lines={['How it all', 'connects']} className="display t-xl mt-6" />
          </div>
          <p className="lede md:col-span-5">{sys.intro}</p>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <Switcher sys={sys} onChange={switchTo} />
          <p className="mono text-[var(--fg-3)]">{SYSTEMS.length} systems · hover or tap any box</p>
        </div>

        {/* Desktop diagram */}
        <div className="pl-diagram mt-4 hidden border border-[var(--line)] bg-[var(--bg)] p-4 lg:block">
          <svg viewBox="0 0 1200 620" className="h-auto w-full" role="group" aria-label={`${sys.label} diagram`}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="1200" height="620" fill="url(#grid)" />

            <text x="20" y="232" fontSize="11" letterSpacing="1.5" fill="var(--fg-3)" style={{ fontFamily: 'var(--font-jetbrains)', textTransform: 'uppercase' }}>
              {sys.flowLabel} →
            </text>

            <path className="pl-wire" d={MAIN_PATH} stroke="var(--accent)" strokeWidth="2" fill="none" />
            {sys.services.map((s) => (
              <path
                key={`${sys.id}-${s.id}`}
                className="pl-wire"
                d={wire(s)}
                fill="none"
                stroke={wired(s.id) ? 'var(--accent)' : 'var(--line-strong)'}
                strokeWidth={wired(s.id) ? 2 : 1}
                strokeDasharray={wired(s.id) ? undefined : '4 4'}
                style={{ transition: 'stroke .4s' }}
              />
            ))}

            {/* Packets: little squares riding the wires. Pure SVG, no JS. */}
            {motion &&
              [0, 1.4, 2.8].map((delay) => (
                <rect key={delay} width="9" height="9" x="-4.5" y="-4.5" fill="var(--accent)">
                  <animateMotion dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" path={MAIN_PATH} />
                </rect>
              ))}
            {motion &&
              sys.services.map((s, i) => (
                <rect key={`${sys.id}-${s.id}`} width="6" height="6" x="-3" y="-3" fill="var(--fg-2)">
                  <animateMotion dur={`${2.6 + i * 0.35}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={wire(s)} />
                </rect>
              ))}

            {sys.flow.map((n, i) => (
              <Box key={`${sys.id}-${n.id}`} node={n} x={mainX[i]} y={MAIN_Y} h={MAIN_H} n={`0${i + 1}`} active={active === n.id} onPick={pick} main />
            ))}
            {sys.services.map((s) => (
              <Box key={`${sys.id}-${s.id}`} node={s} x={svcX[s.slot]} y={s.row === 'top' ? TOP_Y : BOT_Y} h={SVC_H} n="SERVICE" active={active === s.id} onPick={pick} />
            ))}
          </svg>

          <div className="grid grid-cols-12 gap-6 border-t border-[var(--line)] px-2 pt-5" aria-live="polite">
            <p className="mono col-span-2 text-[var(--accent)]">
              {String(idx + 1).padStart(2, '0')} / {String(all.length).padStart(2, '0')}
            </p>
            <div className="col-span-4">
              <p className="display text-[2rem]">{current.name}</p>
              <p className="mono mt-1 text-[var(--fg-3)]">{current.tech}</p>
            </div>
            <p className="col-span-6 text-[1.02rem] leading-relaxed text-[var(--fg-2)]">{current.body}</p>
          </div>
        </div>

        {/* Phones and tablets: the same system as a vertical run sheet. */}
        <div className="pl-mobile lg:hidden">
          <ol className="mt-10 border-l border-[var(--accent)]">
            {sys.flow.map((n, i) => (
              <li key={`${sys.id}-${n.id}`} className="relative pb-9 pl-7">
                <span className="absolute -left-[5px] top-1.5 block h-[9px] w-[9px] bg-[var(--accent)]" />
                <p className="mono text-[var(--fg-3)]">0{i + 1} · {n.tech}</p>
                <p className="display mt-1 text-[2rem]">{n.name}</p>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-[var(--fg-2)]">{n.body}</p>
              </li>
            ))}
          </ol>
          <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {sys.services.map((n) => (
              <div key={`${sys.id}-${n.id}`} className="pl-svc bg-[var(--bg)] p-5">
                <p className="mono text-[var(--fg-3)]">{n.tech}</p>
                <p className="display mt-1 text-[1.6rem]">{n.name}</p>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-[var(--fg-2)]">{n.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {sys.wins.map(([k, v]) => (
            <div key={`${sys.id}-${k}`} className="bg-[var(--bg-2)] p-6">
              <p className="display text-[clamp(2rem,3vw,2.8rem)]">{k}</p>
              <p className="mt-3 text-[0.94rem] leading-snug text-[var(--fg-2)]">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
