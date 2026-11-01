import { FAMILY, SITE } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="shell grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <p className="mono flex items-center gap-2">
            <span className="sq" /> {SITE.name}
          </p>
          <p className="mt-3 text-[0.9rem] text-[var(--fg-3)]">
            Designed and built by me, in Next.js, GSAP and Lenis. Hosted on Firebase.
          </p>
        </div>
        <nav aria-label="Also by David" className="md:col-span-6">
          <p className="mono mb-3 text-[var(--fg-3)]">Also by David</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FAMILY.map((group) => (
              <li key={group[0].href} className="flex items-center gap-2">
                {group.map((f, i) => (
                  <span key={f.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="text-[var(--fg-3)]">|</span>}
                    <a href={f.href} target="_blank" rel="noopener" className="ulink text-[0.95rem] text-[var(--fg-2)] hover:text-[var(--fg)]">
                      {f.label} ↗
                    </a>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </nav>
        <p className="mono text-[var(--fg-3)] md:col-span-2 md:text-right">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
