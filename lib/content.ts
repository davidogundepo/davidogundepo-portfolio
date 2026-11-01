/**
 * Every word on the site lives here. House rule from David: no em dashes in
 * anything written for him. Use commas, colons, full stops or a middle dot.
 */

export const SITE = {
  name: 'David Ogundepo',
  url: 'https://davidogundepo.web.app',
  role: 'Software Engineer & Founder',
  email: 'david.oludepo@gmail.com',
  whatsapp: '2347079693500',
  whatsappDisplay: '+234 707 969 3500',
  linkedin: 'https://www.linkedin.com/in/davidogundepo/',
  github: 'https://github.com/davidogundepo',
  cv: '/David-Ogundepo-CV.pdf',
  description:
    'David Ogundepo is a software engineer and founder who takes products from a blank screen to thousands of real users: Flutter apps, web platforms and the cloud pipelines that run them.',
} as const;

export const waHref = (msg = "Hi David, I found you through your portfolio.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mailHref = (subject = 'An opportunity for David, from your portfolio') =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

export const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#systems', label: 'Systems' },
  { href: '#record', label: 'Record' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export const HERO = {
  kicker: 'Software Engineer & Founder',
  lineA: 'David',
  lineB: 'Ogundepo',
  sub: 'I take products from a blank screen to thousands of real users: Flutter apps, web platforms, and the cloud pipelines that keep them running.',
  meta: [
    { k: 'Now', v: 'Founder, Nouvellesoft · The Yearbook App' },
    { k: 'Open to', v: 'Full-time engineering and product roles' },
    { k: 'Based', v: 'Lagos, Nigeria · remote or relocation' },
  ],
};

export const STATEMENT =
  'Structural engineer by training, software engineer by trade. For eight years I have built yearbooks, football apps, operations platforms and payment pipelines, then put them in the hands of thousands of people across Nigeria and the United Kingdom.';

export const NUMBERS = [
  { value: 1000, suffix: '+', label: 'Graduands onboarded at Adeleke University on The Yearbook App' },
  { value: 3, suffix: '', label: 'Flutter apps in production: YBA Campus, Academy and NYSC' },
  { value: 40, suffix: '', label: 'Cloud Functions running payments, email, WhatsApp and the books' },
  { value: 30, suffix: '+', label: 'Institutions in adoption talks, including two state governments and the NYSC' },
  { value: 81, suffix: '', label: 'Website rebuilds for UK businesses, shipped over two months' },
  { value: 10, prefix: 'Top ', suffix: '', label: 'Startup World Cup, Lagos regional finals, out of 500+ applicants' },
];

export const YBA = {
  kicker: '01 · Flagship product',
  title: 'The Yearbook App',
  pitch:
    "A digital replacement for the hardcover yearbook. Every graduand gets a permanent profile, their autobiography and memories, a lifelong classmate network and a page for their institution's own story, on their phone, for life.",
  origin:
    'It started at Landmark University in 2018, when I built the first version as a graduating student myself. Today it runs as three products on one platform, with a two-week path from first form submission to an official download link.',
  products: [
    { name: 'YBA Campus', for: 'Universities, polytechnics and colleges of education', img: '/img/fg-university.webp' },
    { name: 'YBA Academy', for: 'Secondary schools, SS3 and A-Level leavers', img: '/img/fg-academy.webp' },
    { name: 'YBA NYSC', for: 'Orientation camp platoons and CDS groups', img: '/img/yba-web.webp' },
  ],
  proof: [
    ['1,000+', 'students onboarded at Adeleke University, with a full digital convocation and yearbook experience'],
    ['₦5,000', 'one-time per graduand, with 20% returned to the student leadership as revenue for their work'],
    ['2 weeks', 'from data collection to the official download link, per institution'],
    ['NDPA', 'personal data handled in line with the Nigeria Data Protection Act 2023, never sold'],
  ],
  shots: ['/img/yba-ps-1.webp', '/img/yba-ps-2.webp', '/img/yba-ps-3.webp', '/img/yba-ps-4.webp', '/img/yba-ps-5.webp', '/img/yba-ps-6.webp'],
  demo: ['/img/yba-ch-2.webp', '/img/yba-ch-4.webp', '/img/yba-ch-6.webp', '/img/yba-ch-8.webp'],
  institutions: [
    'Adeleke University', 'Covenant University', 'Landmark University', 'Afe Babalola University', 'Bowen University',
    'University of Ibadan', 'Ahmadu Bello University', 'University of Benin', 'FUNAAB', 'Anchor University',
    'Lead City University', "Redeemer's University", 'Mountain Top University', 'Vision University', 'NUTM',
    'Al-Qalam University', 'Christopher University', 'Thomas Adewumi University', 'Kings University',
    'Tech-U', 'YABATECH', 'EAUED', 'North-Eastern University, Gombe', 'TASUED', 'Oyo State Government',
    'Lagos State Ministry of Education', 'NYSC Directorate', 'Charterhouse Lagos', 'Greensprings School',
    'Rainbow College', 'St. Lawrence College',
  ],
  liveUrl: 'https://yearbookapp.web.app/yba/campus',
};

/** The pipeline, as the system actually runs (source: the YBA ecosystem map). */
export const PIPELINE = {
  kicker: '02 · Systems',
  title: 'How it all connects',
  intro:
    'The Yearbook App is not one app. It is a pipeline I designed and run end to end, so that adding a school is configuration, not code. Follow a single student through it.',
  flow: [
    { id: 'form', name: 'Web form', tech: 'React · Vite · Hosting', body: 'The student opens their school’s form. Faculties and departments load from Firestore and cache in the browser. Photos upload straight to Cloud Storage, where an extension renders 512px and 1080px copies.' },
    { id: 'pay', name: 'Checkout', tech: 'Paystack · Apps Script', body: 'Payment is initialised server-side, so secret keys never touch the browser. Each reference is verified and recorded so it can never be reused.' },
    { id: 'sheet', name: 'Apps Script', tech: 'Google Sheets · validation', body: 'Validation, a honeypot, throttling and duplicate checks run before the row lands in a master sheet and an auto-created tab per school, which student leaders can watch live.' },
    { id: 'store', name: 'Firestore', tech: 'Tenant per school + cohort', body: 'A sync writes each student, leader and department into that school’s room for the year, then sends the welcome email and adds them to the right mailing list.' },
    { id: 'app', name: 'Flutter apps', tech: 'Campus · Academy · NYSC', body: 'The apps read Firestore live, cache content on the phone, and refetch when a content version is bumped. Live on the App Store and Google Play.' },
  ],
  services: [
    { id: 'fin', name: 'Finance functions', tech: 'Cloud Functions · Zoho Books', body: 'A nightly job pulls every payment and refund and posts journal entries per product, with partner shares, VAT tripwires and Sentry alerts. Bank webhooks record transfers as they land.' },
    { id: 'mail', name: 'Email functions', tech: 'Brevo · React Email', body: 'Lifecycle emails, birthdays, weekly re-engagement and holiday messages, all templated in React Email.' },
    { id: 'wa', name: 'WhatsApp functions', tech: 'Meta Cloud API', body: 'Profile-edit codes, form follow-ups every 15 minutes, birthdays and campaigns, over WhatsApp instead of SMS.' },
    { id: 'ai', name: 'Cloud Run services', tech: 'Gemini on Vertex AI', body: 'An in-app AI chat, auto-written student bios, OTP verification, a school index and notification senders.' },
    { id: 'ops', name: 'Ops console', tech: 'n8n on a GCP VM · Telegram', body: 'Daily payment digests, finance alerts and natural-language data corrections, run from a phone.' },
    { id: 'crm', name: 'CRM', tech: 'Sheets · Apps Script', body: 'Per-school price, payment rules and partner share. The books and the payout dashboards follow it automatically.' },
  ],
  wins: [
    ['56,000 → 16', 'daily database reads for the birthday job, after I replaced a full scan with tagged queries'],
    ['0', 'secret keys in the browser: payment, contacts and payout tokens all live server-side'],
    ['Nightly', 'books that close themselves: Paystack to Zoho Books, reconciled without a spreadsheet'],
    ['1 form', 'serves universities, secondary schools and NYSC groups across every state'],
  ],
};

export type Project = {
  n: string;
  title: string;
  year: string;
  tag: string;
  body: string;
  img: string;
  href?: string;
};

export const PROJECTS: Project[] = [
  { n: '01', title: 'REDtech Operations Platform', year: '2025–26', tag: 'Internal ERP · React · Firebase', img: '/img/web-ractools.webp',
    body: 'The operating system for a growing consultancy: attendance, leave, tasks, staff utilisation, finance, waybills, clients, documents and a social media hub, behind one sign-in.' },
  { n: '02', title: 'REDSTREAM', year: '2025', tag: 'Streaming platform · VAS dashboard', img: '/img/web-redstream.webp', href: 'https://redstream-platform.vercel.app',
    body: 'An African-first streaming platform with series management, profiles and admin, plus a value-added-services dashboard for telco partners.' },
  { n: '03', title: 'The GFA App', year: '2021–23', tag: 'Flutter · AI · UK', img: '/img/fg-gfa.webp', href: 'https://apps.apple.com/us/app/coventry-phoenix-fc/id1637554276',
    body: 'A club app for Coventry Phoenix FC: squad management, player stats and push notifications, with an AI step that turns WhatsApp messages into database updates.' },
  { n: '04', title: 'Website Revamp Project', year: '2025', tag: '81 sites · outreach', img: '/img/web-3pn.webp',
    body: 'I found 100 UK businesses with outdated websites, rebuilt 81 of them as modern replacements over April and May 2025, and ran the email and social outreach myself.' },
  { n: '05', title: 'Dave Websites', year: '2025–26', tag: '52 templates · marketplace', img: '/img/dave-websites.webp', href: 'https://dave-websites.web.app',
    body: 'A marketplace of 52 industry-specific website templates with buyer guides, plus custom builds for clients.' },
  { n: '06', title: 'Dave Studio', year: '2026', tag: 'AI portraits · e-commerce', img: '/img/dave-studio.webp', href: 'https://dave-studio.web.app',
    body: 'Graduation and NYSC portraits generated from photos you already have: a 529-look catalogue, live pricing and WhatsApp checkout.' },
  { n: '07', title: 'Dave Architectures', year: '2026', tag: 'Property films · motion', img: '/img/dave-architectures.webp', href: 'https://dave-architectures.web.app',
    body: 'Turns the listing photos estate agents already have into cinematic property films, cut for listings and for social.' },
  { n: '08', title: 'Cafeteria Food-Buying System', year: '2019', tag: 'Landmark University · PHP · MySQL', img: '/img/cafeteria-3d.webp',
    body: 'As a student I designed touchscreen kiosks set into the cafeteria counters to replace paper meal tickets, with an admin back office, and took the proposal to the university.' },
];

export const WEB_WALL = [
  ['/img/web-redtech.webp', 'redtechafrica.com'],
  ['/img/web-momms.webp', 'momms.co.uk'],
  ['/img/web-aualumni.webp', 'aualumni.vercel.app'],
  ['/img/web-stratum.webp', 'stratumgp.com'],
  ['/img/web-pacific.webp', 'pacific-prop.com'],
  ['/img/web-redstreamvas.webp', 'redstreamvas.vercel.app'],
  ['/img/web-lagosagrarian.webp', 'lagosagrarian.com'],
  ['/img/web-olamfs.webp', 'olamfs.vercel.app'],
  ['/img/web-3pn.webp', '3pngroup.com'],
  ['/img/web-reynold.webp', 'reynoldmc.vercel.app'],
  ['/img/web-mmd.webp', 'the-mmd.com'],
  ['/img/web-tools.webp', 'yearbookapp.web.app/tools'],
  ['/img/web-olusowunmi.webp', 'olusowunmi.com'],
  ['/img/web-ractools.webp', 'ractools.vercel.app'],
  ['/img/web-redstream.webp', 'redstream-platform.vercel.app'],
] as const;

export const RECORD = [
  { year: '2025', title: 'Startup World Cup, Top 10', place: 'Lagos regional finals · Muson Centre', img: '/img/swc-pitch.webp',
    body: 'Selected from 500+ applicants to pitch on stage, then accepted to the Grand Finale in San Francisco on 17 October 2025.' },
  { year: '2024', title: 'Business Awards UK, Winner', place: 'Equity-backed Startup of the Year', img: '',
    body: 'Nouvellesoft won the category in April 2024, alongside two Insider Media nominations: Digital Technology and Manufacturing Startup.' },
  { year: '2024', title: 'BTA Awards, Finalist', place: 'Developer of the Year · London', img: '/img/bta-screen.webp',
    body: 'Shortlisted for Developer of the Year at the Black Tech Achievement Awards, March 2024. That is my name on the screen.' },
  { year: '2024', title: 'The Signature Awards, Finalist', place: 'Three nominations · Birmingham', img: '/img/signature-table.webp',
    body: 'Startup of the Year, Innovative Business of the Year and Excellence in Technology, February 2024.' },
  { year: '2023', title: 'Exhibitor at the NEC', place: 'Birmingham Black Business Show', img: '/img/nec-booth.webp',
    body: 'Showcased The Yearbook App and the GFA App to the public at the UK’s second-largest exhibition centre.' },
  { year: '2023', title: 'Launch Programme', place: 'Coventry University Social Enterprise', img: '/img/launch-cert.webp',
    body: 'Completed Coventry University’s Launch founder programme, the same year Nouvellesoft won a £3,000 grant.' },
];

export const TIMELINE = [
  ['2015', 'Landmark University', 'BSc Civil Engineering. Built a touchscreen yearbook with fingerprint sign-in (Java, PHP, MySQL).'],
  ['2018', 'Innovation Award', 'For student tech projects and a public address on technology. Led the Creativity & Innovation team.'],
  ['2019', 'NYSC, Rivers State', 'Shipped a Flutter and Firebase yearbook for my CDS group on the App Store and Google Play.'],
  ['2020', 'Coventry, UK', 'MSc Structural Engineering, Distinction. Registered ICDAT Dans Le Monde Ltd in Nigeria.'],
  ['2021', 'Stickee Ltd · GFA App', 'Data analyst, and the club app for Coventry Phoenix FC.'],
  ['2022', 'Nouvellesoft', 'Founded the company behind The Yearbook App and the GFA App.'],
  ['2023', 'youHQ · NEC', 'Software developer contract, £3,000 grant, and an exhibition stand at the NEC.'],
  ['2024', 'Awards season', 'A win and six UK nominations. In September I moved home to build for Nigerian institutions.'],
  ['2025', 'REDtech Africa', 'Tech Innovation Lead and first tech hire. YBA apps live on both stores. Startup World Cup Top 10.'],
  ['2026', 'Scale', '1,000+ students at Adeleke, proposals to two state governments and the NYSC, Nouvellesoft Limited incorporated.'],
];

export const CAPABILITIES = [
  { n: '01', title: 'Ship mobile apps', body: 'Flutter and Dart for iOS and Android, store releases, push notifications, offline caching and multi-tenant data.', tags: ['Flutter', 'Dart', 'iOS', 'Android', 'Java', 'Kotlin'] },
  { n: '02', title: 'Build web platforms', body: 'Dashboards, admin tools, booking and checkout flows, and marketing sites that move.', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'] },
  { n: '03', title: 'Design the backend', body: 'Data models, security rules, serverless functions and services that stay cheap at scale.', tags: ['Firebase', 'Firestore', 'Cloud Functions', 'Cloud Run', 'GCP'] },
  { n: '04', title: 'Automate the business', body: 'Payments, accounting sync, email and WhatsApp journeys, and ops bots, so the business runs while you sleep.', tags: ['Apps Script', 'n8n', 'Paystack', 'Zoho Books', 'WhatsApp API'] },
  { n: '05', title: 'Put AI to work', body: 'AI features in production and AI-assisted engineering that ships faster without cutting corners.', tags: ['Gemini', 'Vertex AI', 'Claude', 'Prompt design'] },
  { n: '06', title: 'Take it to market', body: 'Proposals to universities and governments, pitch decks, stage pitching, and the compliance paperwork that lets you take payments.', tags: ['Sales', 'Pitching', 'AML/CFT', 'Data protection'] },
];

export const STACK = [
  'Flutter', 'Dart', 'React', 'Next.js', 'TypeScript', 'Firebase', 'Firestore', 'Cloud Functions', 'Cloud Run',
  'Vertex AI', 'Gemini', 'Apps Script', 'n8n', 'Paystack', 'Zoho Books', 'Brevo', 'WhatsApp Cloud API',
  'Sentry', 'Python', 'PHP', 'MySQL', 'Java', 'Kotlin', 'Tailwind', 'GSAP',
];

export const ABOUT = {
  kicker: 'About',
  title: 'Engineered, twice.',
  body: [
    'I trained as a civil and structural engineer: a BSc from Landmark University, then an MSc in Structural Engineering with Distinction from Coventry University. That training never left. I still think in loads, failure points and tolerances, whether the structure is a bridge or a payment pipeline.',
    'Software became the work when I built my first yearbook app as a student. Since then I have founded companies in the UK and Nigeria, led technology at REDtech Africa as its first tech hire, pitched on stage, and written the proposals that put my products in front of universities, state governments and the NYSC.',
    'I am looking for a team that wants an engineer who can own a product end to end, from the data model to the App Store listing to the person who pays for it.',
  ],
  education: [
    ['MSc Structural Engineering · Distinction', 'Coventry University, UK'],
    ['BSc Civil Engineering', 'Landmark University, Nigeria'],
  ],
};

export const FAMILY = [
  { label: 'Nouvellesoft', href: 'https://nouvellesoft.com.ng' },
  { label: 'The Yearbook App', href: 'https://yearbookapp.web.app' },
  { label: 'Dave Studio', href: 'https://dave-studio.web.app' },
  { label: 'Dave Architectures', href: 'https://dave-architectures.web.app' },
  { label: 'Dave Websites', href: 'https://dave-websites.web.app' },
];
