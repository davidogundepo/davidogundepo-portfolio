// Render the CV as a designed A4 PDF through headless Chrome.
// Run: node scripts/cv/build_pdf.mjs <out.pdf>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { CV } from './data.mjs';

const out = path.resolve(process.argv[2] ?? 'David-Ogundepo-CV.pdf');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const href = (c) =>
  c.includes('@') ? `mailto:${c}` : /^\+/.test(c) || c.includes(',') ? null : `https://${c}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page { size: A4; margin: 13mm 14mm; }
* { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0; }
body { font: 9.4pt/1.42 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #111; }
.mono { font-family: Menlo, "SF Mono", monospace; font-size: 7pt; letter-spacing: .08em; text-transform: uppercase; }
a { color: inherit; text-decoration: none; }
header { display: grid; grid-template-columns: 1fr auto; align-items: end; border-bottom: 2px solid #111; padding-bottom: 8px; }
h1 { font-size: 30pt; line-height: .9; letter-spacing: -.01em; font-weight: 800; text-transform: uppercase; }
.title { color: #e64600; font-size: 12pt; margin-top: 5px; }
.contact { text-align: right; color: #444; line-height: 1.6; }
.sq { display: inline-block; width: 6px; height: 6px; background: #e64600; margin-right: 6px; vertical-align: 1px; }
h2 { margin: 13px 0 6px; padding-bottom: 3px; border-bottom: 1px solid #ccc; color: #e64600; }
p.profile { font-size: 9.8pt; }
.skills { display: grid; grid-template-columns: 78px 1fr; row-gap: 2px; }
.skills b { font-weight: 700; }
.job { margin-top: 8px; break-inside: avoid-page; }
.job-head { display: grid; grid-template-columns: 1fr auto; align-items: baseline; }
.job-head b { font-size: 10.4pt; }
.org { color: #e64600; }
.where, .when { color: #666; }
ul { list-style: none; margin-top: 3px; }
li { position: relative; padding-left: 12px; margin-bottom: 2.5px; }
li::before { content: ""; position: absolute; left: 0; top: .52em; width: 5px; height: 5px; background: #e64600; }
.awards { display: grid; grid-template-columns: 38px 1fr; row-gap: 2.5px; }
.awards span:nth-child(odd) { color: #e64600; font-weight: 700; }
.edu { display: grid; grid-template-columns: 1fr auto; margin-top: 4px; }
.edu small { grid-column: 1 / -1; color: #555; font-size: 8.6pt; }
footer { margin-top: 12px; border-top: 2px solid #111; padding-top: 6px; display: flex; justify-content: space-between; }
</style></head><body>
<header>
  <div><h1>${esc(CV.name)}</h1><p class="title">${esc(CV.title)}</p></div>
  <div class="contact mono" style="text-transform:none">${CV.contact.map((c) => (href(c) ? `<a href="${href(c)}">${esc(c)}</a>` : esc(c))).join('<br>')}</div>
</header>

<h2 class="mono"><span class="sq"></span>Profile</h2>
<p class="profile">${esc(CV.profile)}</p>

<h2 class="mono"><span class="sq"></span>Skills</h2>
<div class="skills">${CV.skills.map(([k, v]) => `<b>${esc(k)}</b><span>${esc(v)}</span>`).join('')}</div>

<h2 class="mono"><span class="sq"></span>Experience</h2>
${CV.experience
  .map(
    (j) => `<div class="job"><div class="job-head"><b>${esc(j.role)}</b><span class="when mono">${esc(j.when)}</span></div>
<div><span class="org">${esc(j.org)}</span>${j.where ? ` <span class="where">· ${esc(j.where)}</span>` : ''}</div>
<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`,
  )
  .join('')}

<h2 class="mono"><span class="sq"></span>Where it started</h2>
<ul>${CV.earlier.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>

<h2 class="mono"><span class="sq"></span>Awards &amp; recognition</h2>
<div class="awards">${CV.awards.map(([y, t]) => `<span>${y}</span><span>${esc(t)}</span>`).join('')}</div>

<h2 class="mono"><span class="sq"></span>Education</h2>
${CV.education.map((e) => `<div class="edu"><b>${esc(e.degree)}</b><span class="where">${esc(e.school)}</span><small>${esc(e.detail)}</small></div>`).join('')}

<footer class="mono"><span>Portfolio, case studies and system diagrams</span><a href="https://davidogundepo.web.app">davidogundepo.web.app</a></footer>
</body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cv-'));
const file = path.join(tmp, 'cv.html');
fs.writeFileSync(file, html);
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
  `--user-data-dir=${path.join(tmp, 'profile')}`,
  `--print-to-pdf=${out}`, `file://${file}`,
], { stdio: 'ignore' });
console.log('wrote', out);
