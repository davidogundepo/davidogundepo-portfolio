'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/motion';
import { PIPELINE } from '@/lib/content';
import Kicker from '@/components/ui/Kicker';
import SplitTitle from '@/components/ui/SplitTitle';

type Node = { id: string; name: string; tech: string; body: string };

// Diagram geometry, in viewBox units (1200 x 620).
const W = 200;
const MAIN_Y = 255;
const MAIN_H = 110;
const SVC_H = 86;
const mainX = [20, 260, 500, 740, 980];
const svcX = [140, 500, 860];
const TOP_Y = 40;
const BOT_Y = 494;
const cx = (x: number) => x + W / 2;
const ALL: Node[] = [...PIPELINE.flow, ...PIPELINE.services];

// Branches: service id -> elbow path into its main node.
const BRANCHES: Record<string, string> = {
  fin: `M${cx(140)} ${TOP_Y + SVC_H} V190 H${cx(260)} V${MAIN_Y}`,
  crm: `M${cx(500)} ${TOP_Y + SVC_H} V${MAIN_Y}`,
  ai: `M${cx(860)} ${TOP_Y + SVC_H} V190 H${cx(980)} V${MAIN_Y}`,
  wa: `M${cx(140)} ${BOT_Y} V430 H${cx(20)} V${MAIN_Y + MAIN_H}`,
  mail: `M${cx(500)} ${BOT_Y} V${MAIN_Y + MAIN_H}`,
  ops: `M${cx(860)} ${BOT_Y} V430 H${cx(740)} V${MAIN_Y + MAIN_H}`,
};
const TOP_IDS = ['fin', 'crm', 'ai'];
const BOT_IDS = ['wa', 'mail', 'ops'];
const MAIN_PATH = `M${cx(20)} ${MAIN_Y + MAIN_H / 2} H${cx(980)}`;

function Box({
  node, x, y, h, n, active, onPick, main,
}: {
  node: Node; x: number; y: number; h: number; n: string; active: boolean; onPick: (id: string) => void; main?: boolean;
}) {
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
      className="cursor-pointer outline-none"
      data-cursor="Inspect"
    >
      <rect
        x={x} y={y} width={W} height={h}
        fill={active ? 'var(--accent)' : 'var(--bg)'}
        stroke={active ? 'var(--accent)' : 'var(--line-strong)'}
        style={{ transition: 'fill .4s, stroke .4s' }}
      />
      <text x={x + 14} y={y + 24} fontSize="11" letterSpacing="1.2" fill={active ? 'var(--accent-ink)' : 'var(--fg-3)'} style={{ fontFamily: 'var(--font-jetbrains)', transition: 'fill .4s' }}>
        {n}
      </text>
      <text
        x={x + 14} y={y + (main ? 62 : 52)}
        fontSize={main ? 24 : 19} fontWeight={800}
        fill={active ? 'var(--accent-ink)' : 'var(--fg)'}
        style={{ fontFamily: 'var(--font-archivo)', fontStretch: '70%', textTransform: 'uppercase', transition: 'fill .4s' }}
      >
        {node.name}
      </text>
      <text x={x + 14} y={y + (main ? 88 : 72)} fontSize="11" fill={active ? 'var(--accent-ink)' : 'var(--fg-2)'} style={{ fontFamily: 'var(--font-jetbrains)', transition: 'fill .4s' }}>
        {node.tech.length > 30 ? node.tech.slice(0, 29) + '…' : node.tech}
      </text>
    </g>
  );
}

export default function Pipeline() {
  const root = useRef<HTMLElement>(null);
  const all = ALL;
  const [active, setActive] = useState('form');
  const [touched, setTouched] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => setMotion(!prefersReducedMotion()), []);

  // Walk the visitor through the flow until they pick a box themselves.
  useEffect(() => {
    if (touched) return;
    const ids = ALL.map((n) => n.id);
    const t = setInterval(() => setActive((a) => ids[(ids.indexOf(a) + 1) % ids.length]), 3200);
    return () => clearInterval(t);
  }, [touched]);

  const pick = (id: string) => {
    setTouched(true);
    setActive(id);
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const paths = gsap.utils.toArray<SVGPathElement>('.pl-wire');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.6, ease: 'expo.inOut',
          scrollTrigger: { trigger: '.pl-diagram', start: 'top 75%', once: true },
        });
      });
      gsap.from('.pl-diagram g[role=button]', {
        opacity: 0, y: 16, duration: 0.9, ease: 'expo.out', stagger: 0.05,
        scrollTrigger: { trigger: '.pl-diagram', start: 'top 75%', once: true },
      });
    },
    { scope: root },
  );

  const current = all.find((n) => n.id === active)!;
  const idx = all.indexOf(current);

  return (
    <section id="systems" ref={root} className="section relative border-t border-[var(--line)] bg-[var(--bg-2)]">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Kicker>{PIPELINE.kicker}</Kicker>
            <SplitTitle lines={['How it all', 'connects']} className="display t-xl mt-6" />
          </div>
          <p className="lede md:col-span-5">{PIPELINE.intro}</p>
        </div>

        {/* Desktop diagram */}
        <div className="pl-diagram mt-16 hidden border border-[var(--line)] bg-[var(--bg)] p-4 lg:block">
          <div className="mono flex justify-between border-b border-[var(--line)] px-2 pb-3 text-[var(--fg-3)]">
            <span>yba / production / data flow</span>
            <span>hover or tap any box</span>
          </div>
          <svg viewBox="0 0 1200 620" className="h-auto w-full" role="group" aria-label="The Yearbook App system diagram">
            {/* blueprint grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="var(--line)" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="1200" height="620" fill="url(#grid)" />

            <text x="20" y="232" fontSize="11" letterSpacing="1.5" fill="var(--fg-3)" style={{ fontFamily: 'var(--font-jetbrains)' }}>
              STUDENT JOURNEY →
            </text>

            <path className="pl-wire" d={MAIN_PATH} stroke="var(--accent)" strokeWidth="2" fill="none" />
            {Object.entries(BRANCHES).map(([id, d]) => (
              <path
                key={id}
                className="pl-wire"
                d={d}
                fill="none"
                stroke={active === id ? 'var(--accent)' : 'var(--line-strong)'}
                strokeWidth={active === id ? 2 : 1}
                strokeDasharray={active === id ? undefined : '4 4'}
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
              Object.entries(BRANCHES).map(([id, d], i) => (
                <rect key={id} width="6" height="6" x="-3" y="-3" fill="var(--fg-2)">
                  <animateMotion dur={`${2.6 + i * 0.35}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
                </rect>
              ))}

            {PIPELINE.flow.map((n, i) => (
              <Box key={n.id} node={n} x={mainX[i]} y={MAIN_Y} h={MAIN_H} n={`0${i + 1}`} active={active === n.id} onPick={pick} main />
            ))}
            {TOP_IDS.map((id, i) => {
              const n = PIPELINE.services.find((s) => s.id === id)!;
              return <Box key={id} node={n} x={svcX[i]} y={TOP_Y} h={SVC_H} n="SERVICE" active={active === id} onPick={pick} />;
            })}
            {BOT_IDS.map((id, i) => {
              const n = PIPELINE.services.find((s) => s.id === id)!;
              return <Box key={id} node={n} x={svcX[i]} y={BOT_Y} h={SVC_H} n="SERVICE" active={active === id} onPick={pick} />;
            })}
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
        <ol className="mt-14 border-l border-[var(--accent)] lg:hidden">
          {PIPELINE.flow.map((n, i) => (
            <li key={n.id} className="relative pb-9 pl-7">
              <span className="absolute -left-[5px] top-1.5 block h-[9px] w-[9px] bg-[var(--accent)]" />
              <p className="mono text-[var(--fg-3)]">0{i + 1} · {n.tech}</p>
              <p className="display mt-1 text-[2rem]">{n.name}</p>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-[var(--fg-2)]">{n.body}</p>
            </li>
          ))}
        </ol>
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:hidden">
          {PIPELINE.services.map((n) => (
            <div key={n.id} className="bg-[var(--bg)] p-5">
              <p className="mono text-[var(--fg-3)]">{n.tech}</p>
              <p className="display mt-1 text-[1.6rem]">{n.name}</p>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-[var(--fg-2)]">{n.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE.wins.map(([k, v]) => (
            <div key={k} className="bg-[var(--bg-2)] p-6">
              <p className="display text-[clamp(2rem,3vw,2.8rem)]">{k}</p>
              <p className="mt-3 text-[0.94rem] leading-snug text-[var(--fg-2)]">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
