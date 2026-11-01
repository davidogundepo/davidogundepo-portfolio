// Build the Word CV from data.mjs.  Run: node scripts/cv/build_docx.mjs <out.docx>
import fs from 'node:fs';
import {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, LevelFormat, Packer, Paragraph,
  TabStopType, TextRun,
} from 'docx';
import { CV } from './data.mjs';

const T = (o) => new TextRun({ font: 'Arial', ...o });

const ACCENT = 'E64600';
const INK = '111111';
const GREY = '555555';
const FONT = 'Arial';
const out = process.argv[2] ?? 'David_Ogundepo_CV_Nov_26.docx';

// Text width on A4 with 900 twip side margins.
const RIGHT = 11906 - 900 * 2;
const rightStop = [{ type: TabStopType.RIGHT, position: RIGHT }];

const heading = (text) =>
  new Paragraph({
    spacing: { before: 260, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: INK, space: 3 } },
    children: [T({ text: text.toUpperCase(), bold: true, size: 20, color: ACCENT, characterSpacing: 30 })],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: 'squares', level: 0 },
    spacing: { after: 50, line: 264 },
    children: [T({ text, size: 19 })],
  });

const link = (text) => {
  const url = text.includes('@') ? `mailto:${text}` : text.match(/^\+/) ? null : `https://${text}`;
  const run = T({ text, size: 17, color: GREY });
  return url && !text.includes(',') && text.includes('.') ? new ExternalHyperlink({ link: url, children: [T({ text, size: 17, color: GREY })] }) : run;
};

const children = [];

// Header
children.push(
  new Paragraph({
    spacing: { after: 0 },
    children: [T({ text: CV.name.toUpperCase(), bold: true, size: 44, color: INK, characterSpacing: 20 })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    children: [T({ text: CV.title, size: 24, color: ACCENT })],
  }),
);
const contactRuns = [];
CV.contact.forEach((c, i) => {
  if (i) contactRuns.push(T({ text: '  |  ', size: 17, color: 'AAAAAA' }));
  contactRuns.push(link(c));
});
children.push(new Paragraph({ spacing: { after: 60 }, children: contactRuns }));

// Profile
children.push(heading('Profile'), new Paragraph({ spacing: { after: 40, line: 276 }, children: [T({ text: CV.profile, size: 19 })] }));

// Skills
children.push(heading('Skills'));
for (const [k, v] of CV.skills) {
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      tabStops: [{ type: TabStopType.LEFT, position: 1500 }],
      indent: { left: 1500, hanging: 1500 },
      children: [T({ text: k, bold: true, size: 19 }), T({ text: `\t${v}`, size: 19 })],
    }),
  );
}

// Experience
children.push(heading('Experience'));
for (const job of CV.experience) {
  children.push(
    new Paragraph({
      spacing: { before: 140, after: 0 },
      keepNext: true,
      tabStops: rightStop,
      children: [
        T({ text: job.role, bold: true, size: 21 }),
        T({ text: `\t${job.when}`, size: 18, color: GREY }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      keepNext: true,
      children: [
        T({ text: job.org, size: 19, color: ACCENT }),
        ...(job.where ? [T({ text: `  ·  ${job.where}`, size: 18, color: GREY })] : []),
      ],
    }),
    ...job.bullets.map(bullet),
  );
}

// Earlier projects
children.push(heading('Where it started'), ...CV.earlier.map(bullet));

// Awards
children.push(heading('Awards & Recognition'));
for (const [y, t] of CV.awards) {
  children.push(
    new Paragraph({
      spacing: { after: 50 },
      tabStops: [{ type: TabStopType.LEFT, position: 700 }],
      indent: { left: 700, hanging: 700 },
      children: [T({ text: y, bold: true, size: 19, color: ACCENT }), T({ text: `\t${t}`, size: 19 })],
    }),
  );
}

// Education
children.push(heading('Education'));
for (const e of CV.education) {
  children.push(
    new Paragraph({
      spacing: { before: 80, after: 0 },
      keepNext: true,
      tabStops: rightStop,
      children: [T({ text: e.degree, bold: true, size: 20 }), T({ text: `\t${e.school}`, size: 18, color: GREY })],
    }),
    new Paragraph({ spacing: { after: 60 }, children: [T({ text: e.detail, size: 18, color: GREY })] }),
  );
}

children.push(
  new Paragraph({
    spacing: { before: 240 },
    alignment: AlignmentType.CENTER,
    children: [
      T({ text: 'Portfolio, case studies and system diagrams: ', size: 17, color: GREY }),
      new ExternalHyperlink({ link: 'https://davidogundepo.web.app', children: [T({ text: 'davidogundepo.web.app', size: 17, color: ACCENT, bold: true })] }),
    ],
  }),
);

const doc = new Document({
  creator: CV.name,
  title: `${CV.name} CV`,
  styles: { default: { document: { run: { font: FONT, color: INK } } } },
  numbering: {
    config: [
      {
        reference: 'squares',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '▪',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 300, hanging: 220 } }, run: { color: ACCENT } },
        }],
      },
    ],
  },
  sections: [
    {
      // A4, 0.6 inch margins
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 860, bottom: 860, left: 900, right: 900 } } },
      children,
    },
  ],
});

fs.writeFileSync(out, await Packer.toBuffer(doc));
console.log('wrote', out);
