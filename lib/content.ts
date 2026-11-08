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
    { name: 'YBA Campus', for: 'Universities, polytechnics and colleges of education', img: '/img/yba-campus.webp' },
    { name: 'YBA Academy', for: 'Secondary schools, SS3 and A-Level leavers', img: '/img/yba-academy.webp' },
    { name: 'YBA NYSC', for: 'Orientation camp platoons and CDS groups', img: '/img/yba-nysc.webp' },
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

export type SysNode = { id: string; name: string; tech: string; body: string };
/** A side service sits in the top or bottom row (slot 0 to 2) and wires into main node `to`. */
export type SysService = SysNode & { row: 'top' | 'bottom'; slot: 0 | 1 | 2; to: number };
export type SystemMap = {
  id: string;
  label: string;
  intro: string;
  flowLabel: string;
  flow: SysNode[];
  services: SysService[];
  wins: [string, string][];
};

export const PIPELINE_HEAD = {
  kicker: '02 · Systems',
  title: 'How it all connects',
};

/**
 * Every map here is drawn from the real thing: the YBA ecosystem map and
 * customer journey playbook, and the code of each Dave site.
 */
export const SYSTEMS: SystemMap[] = [
  {
    id: 'yba-data',
    label: 'yba / production / data flow',
    flowLabel: 'Student journey',
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
      { row: 'top', slot: 0, to: 1, id: 'fin', name: 'Finance functions', tech: 'Cloud Functions · Zoho Books', body: 'A nightly job pulls every payment and refund and posts journal entries per product, with partner shares, VAT tripwires and Sentry alerts. Bank webhooks record transfers as they land.' },
      { row: 'top', slot: 1, to: 2, id: 'crm', name: 'CRM', tech: 'Sheets · Apps Script', body: 'Per-school price, payment rules and partner share. The books and the payout dashboards follow it automatically.' },
      { row: 'top', slot: 2, to: 4, id: 'ai', name: 'Cloud Run services', tech: 'Gemini on Vertex AI', body: 'An in-app AI chat, auto-written student bios, OTP verification, a school index and notification senders.' },
      { row: 'bottom', slot: 0, to: 0, id: 'wa', name: 'WhatsApp functions', tech: 'Meta Cloud API', body: 'Profile-edit codes, form follow-ups every 15 minutes, birthdays and campaigns, over WhatsApp instead of SMS.' },
      { row: 'bottom', slot: 1, to: 2, id: 'mail', name: 'Email functions', tech: 'Brevo · React Email', body: 'Lifecycle emails, birthdays, weekly re-engagement and holiday messages, all templated in React Email.' },
      { row: 'bottom', slot: 2, to: 3, id: 'ops', name: 'Ops console', tech: 'n8n on a GCP VM · Telegram', body: 'Daily payment digests, finance alerts and natural-language data corrections, run from a phone.' },
    ],
    wins: [
      ['56,000 → 16', 'daily database reads for the birthday job, after I replaced a full scan with tagged queries'],
      ['0', 'secret keys in the browser: payment, contacts and payout tokens all live server-side'],
      ['Nightly', 'books that close themselves: Paystack to Zoho Books, reconciled without a spreadsheet'],
      ['1 form', 'serves universities, secondary schools and NYSC groups across every state'],
    ],
  },
  {
    id: 'yba-growth',
    label: 'yba / growth / school to phone',
    flowLabel: 'Customer journey',
    intro:
      'Software is half of it. This is how a school actually gets The Yearbook App: from a student scrolling past a trailer to a whole graduating class with the app on their phones. It is the playbook I wrote and run, stage by stage.',
    flow: [
      { id: 'attention', name: 'Attention', tech: 'TikTok · Instagram · campus ads', body: 'Video trailers and tutorials online, and eleven ad placements on campus: the library, cafeteria, hostel entrances, lecture-hall walkways, even laptop stickers. Every one points to WhatsApp.' },
      { id: 'contact', name: 'Inside contact', tech: 'In person · WhatsApp', body: 'Every school needs one person inside it: a union president, a class rep or a lead connector. First contact is in person: a three-minute pitch, the app demoed on my phone and a trifold brochure in hand.' },
      { id: 'drop', name: 'Augment drop', tech: '6 to 16 hours later', body: 'With permission, the follow-up lands on WhatsApp: the trailer, the roadmap, the pricing graphic, screenshots, the yearbook questions and the form link. Then one question: what do you think?' },
      { id: 'cohort', name: 'Cohort form', tech: 'Leaders share to class groups', body: 'Leaders post the form into their class and department WhatsApp groups. Five days to fill it, gentle reminders until the majority is in, and payment inside the same form.' },
      { id: 'phones', name: 'App on phones', tech: '2 weeks · download link', body: 'The form data becomes that school’s yearbook. Leaders receive the download link and a copy-paste message for their groups, and the class installs it.' },
    ],
    services: [
      { row: 'top', slot: 0, to: 1, id: 'proposals', name: 'Proposals', tech: 'One per institution', body: 'A tailored proposal for each university, school, state government and the NYSC, plus sales decks for Nigeria, the UK and international schools.' },
      { row: 'top', slot: 1, to: 2, id: 'outreach', name: 'Outreach CRM', tech: 'Sheets · n8n · Telegram', body: 'Every school is a row: contact, expected students, status, next action and its date. I update it from Telegram in plain English and an n8n worker writes the row.' },
      { row: 'top', slot: 2, to: 3, id: 'poll', name: 'Adoption poll', tech: '/poll/{school} · Apps Script', body: 'Before committing, a class can vote yes or no on its own public poll page, with proof screenshots and a share button. A clear yes is the green light to send the form.' },
      { row: 'bottom', slot: 0, to: 0, id: 'content', name: 'Content engine', tech: 'Trailers · tutorials · posters', body: 'Video ads for Campus, Academy and NYSC, YouTube tutorials, thumbnails, roll-up banners and brochures, so every touchpoint looks like the same product.' },
      { row: 'bottom', slot: 1, to: 3, id: 'pulse', name: 'Pulse analytics', tech: 'Anonymous funnel events', body: 'The form reports each step, from viewed to picked, photo, pay, paid and submitted, with no names attached, so I can see exactly where a class stalls.' },
      { row: 'bottom', slot: 2, to: 4, id: 'after', name: 'After-sales', tech: 'Gratitude · feedback · UGC', body: 'A thank-you a few days later, a feedback check, then photos and video testimonials from happy classes, shared within seven days as proof for the next school.' },
    ],
    wins: [
      ['8 stages', 'from “Hello, Mr Prospect” to the app on the customer’s phone, written down as a playbook'],
      ['11', 'on-campus ad placements, each designed for the wall it hangs on'],
      ['20%', 'of proceeds returned to student leadership, so the leaders who champion it are paid for it'],
      ['31', 'institutions and bodies with a proposal in hand'],
    ],
  },
  {
    id: 'dave-studio',
    label: 'dave studio / order flow',
    flowLabel: 'Customer journey',
    intro:
      'An AI portrait studio that sells through WhatsApp instead of a checkout page, because that is where Nigerian graduates already talk. No account, no deposit, and nothing to pay until they like what they see.',
    flow: [
      { id: 'catalogue', name: 'Catalogue', tech: '529 looks · Campus + NYSC', body: 'Graduates browse 339 campus looks and 190 NYSC looks in a fast gallery with a full-screen lightbox.' },
      { id: 'select', name: 'Selection', tech: 'Live pricing drawer', body: 'Each tap adds a look to a selection drawer that prices itself: 5 looks for ₦10,000, 10 for ₦17,000, and every count in between priced on the line between them.' },
      { id: 'order', name: 'WhatsApp order', tech: 'Pre-written message', body: 'Checkout opens WhatsApp with the order already written: every chosen look by its code, the count and the total. The customer only presses send.' },
      { id: 'make', name: 'Generation', tech: 'Their photos · AI', body: 'The customer sends the photos they already have, and every chosen look is generated around their own face.' },
      { id: 'deliver', name: 'Approve & pay', tech: 'Watermarked previews · 48h', body: 'Watermarked previews come back first. They pay only after approving, then receive the clean files, all within 48 hours.' },
    ],
    services: [
      { row: 'top', slot: 0, to: 0, id: 'media', name: 'Image pipeline', tech: 'Python · WebP', body: 'A build script renames, de-duplicates and ranks every source image for the featured grid, then writes web-weight WebP files.' },
      { row: 'top', slot: 1, to: 1, id: 'price', name: 'Pricing engine', tech: 'One TypeScript function', body: 'One function prices any count from the two anchor bundles, so the drawer, the pricing section and the WhatsApp total can never disagree.' },
      { row: 'top', slot: 2, to: 2, id: 'host', name: 'Static hosting', tech: 'Next.js export · Firebase', body: 'The whole store is static files on Firebase Hosting. No server to run, so there is nothing to go down at midnight.' },
      { row: 'bottom', slot: 1, to: 2, id: 'tag', name: 'Source tagging', tech: 'Every link says where from', body: 'Every WhatsApp and email link carries a message naming the site it came from, so an order is never confused with a cold message.' },
    ],
    wins: [
      ['₦0', 'deposit: customers pay after they approve their previews'],
      ['48 h', 'from their photos to finished portraits'],
      ['1 tap', 'from a full selection to a written WhatsApp order'],
      ['529', 'looks across the Campus and NYSC catalogues'],
    ],
  },
  {
    id: 'dave-websites',
    label: 'dave websites / template store',
    flowLabel: 'Buyer journey',
    intro:
      'A digital product store that runs itself. A buyer can find a template, try it, pay and download it at 3am without anyone being awake.',
    flow: [
      { id: 'find', name: 'Discover', tech: 'Search · Google Ads', body: 'Buyers land on a catalogue of 52 industry-specific templates, from oil and gas to football clubs, each with its own page.' },
      { id: 'try', name: 'Live preview', tech: 'Embedded in the page', body: 'Every template opens as a working site inside the page, so a buyer clicks through the real thing before paying.' },
      { id: 'buy', name: 'Checkout', tech: 'Stripe Payment Links · $39', body: 'A Stripe payment link per template at $39, or the full bundle, with each purchase reported back to Google Ads as a conversion.' },
      { id: 'get', name: 'Download', tech: 'Thank-you page · zip', body: 'Stripe returns the buyer to a thank-you page for that template, which checks access and starts the download by itself.' },
      { id: 'launch', name: 'Launch', tech: 'How-to-edit guide', body: 'A step-by-step guide covers editing in VS Code, previewing locally and deploying anywhere, with priority email support for buyers.' },
    ],
    services: [
      { row: 'top', slot: 0, to: 0, id: 'revamp', name: 'Revamp outreach', tech: '100 found · 81 rebuilt', body: 'I found 100 UK businesses with outdated websites, rebuilt 81 of them as modern replacements, and pitched each one its own new site.' },
      { row: 'top', slot: 1, to: 2, id: 'ads', name: 'Ad tracking', tech: 'Google Ads · gtag', body: 'Single and bundle purchases are tracked as separate conversions, so ad spend can be judged by sales, not clicks.' },
      { row: 'top', slot: 2, to: 4, id: 'custom', name: 'Custom builds', tech: '15+ live client sites', body: 'Buyers who need more get a custom build: corporate sites, platforms and dashboards, all live today.' },
    ],
    wins: [
      ['52', 'industry templates, each with a live preview'],
      ['$39', 'per template, or the full bundle'],
      ['0', 'people needed between a sale and a download'],
      ['81', 'websites rebuilt for the outreach campaign'],
    ],
  },
  {
    id: 'revamp',
    label: 'dave websites / revamp outreach',
    flowLabel: 'Outreach run',
    intro:
      'Cold outreach that does not feel cold. I build a business its new website before I ever say hello, so the first message is not a pitch. It is their own site, already live.',
    flow: [
      { id: 'prospect', name: 'Prospect', tech: 'Sheet · 11 markets', body: 'A research sheet of businesses whose websites have fallen behind, tabbed by market from England and Wales to the USA, Canada, Australia and across Africa, with contacts and the current site for each.' },
      { id: 'build', name: 'Build first', tech: 'The new site, before hello', body: 'I build the replacement before making contact, so the first message shows them their own new website at a live preview link.' },
      { id: 'clean', name: 'Sheet update', tech: 'Preview link · status · checks', body: 'Each row gets its preview link, the right contact and a status. Bad data is caught first: fax numbers, council switchboards and look-alike businesses.' },
      { id: 'channel', name: 'Channel', tech: 'WhatsApp · email · phone', body: 'Mobiles get WhatsApp, landlines get email, and a business with no public email gets a phone call first to ask who should receive it. Owners of several sites get one message covering all of them.' },
      { id: 'send', name: 'Send', tech: 'Preview link up front', body: 'The message leads with the preview link on its own line. Price never appears in the first message, and the sign-off carries WhatsApp and LinkedIn.' },
    ],
    services: [
      { row: 'top', slot: 0, to: 0, id: 'diligence', name: 'Due diligence', tech: 'Public inspection reports', body: 'Before each call I read the business’s latest public inspection report. The new sites show those ratings honestly instead of hiding them.' },
      { row: 'top', slot: 1, to: 2, id: 'previews', name: 'Preview hosting', tech: 'Vercel · Netlify', body: 'Every replacement lives at its own preview address, ready to hand over the day they say yes.' },
      { row: 'top', slot: 2, to: 4, id: 'order', name: 'Send order', tech: 'Most urgent first', body: 'Sends are ordered by urgency: businesses already being pitched by a competitor first, then owners of several sites, where one message covers many.' },
    ],
    wins: [
      ['100', 'businesses found in the first UK run'],
      ['81', 'sites built before the first hello'],
      ['0', 'prices in the first message'],
      ['11', 'markets in the prospect sheet'],
    ],
  },
  {
    id: 'dave-architectures',
    label: 'dave architectures / photos to film',
    flowLabel: 'Client journey',
    intro:
      'Estate agents already have the photos. This service turns them into films without a crew or a second visit, and the agent is only needed at the very first step.',
    flow: [
      { id: 'photos', name: 'Photos', tech: 'A listing link is enough', body: 'Agents send what they already have: listing photos, phone shots, floor plans. A link to the listing is enough to start.' },
      { id: 'quote', name: 'Quote', tech: 'Within a day', body: 'A fixed price against one of three packages, back within a day.' },
      { id: 'sequence', name: 'Sequence', tech: 'A walkthrough that makes sense', body: 'The rooms are ordered into a walkthrough that makes spatial sense, so the film feels like walking the property.' },
      { id: 'motion', name: 'Motion', tech: 'Camera moves · depth · grade', body: 'Each still gets a camera move, parallax and depth, then colour, music and captions.' },
      { id: 'film', name: 'Delivery', tech: 'About 5 working days', body: 'One 16:9 master up to 90 seconds, three 9:16 social cuts, captions as .srt, thumbnails, and one round of revisions.' },
    ],
    services: [
      { row: 'top', slot: 1, to: 2, id: 'stage', name: 'Virtual staging', tech: 'Empty rooms, furnished', body: 'Vacant rooms are staged digitally with furniture, rugs and lighting, then the staged version is animated, so a cold listing films like a home.' },
      { row: 'top', slot: 2, to: 4, id: 'pipe', name: 'Media pipeline', tech: 'Python · Cloud Storage', body: 'Scripts detect letterboxing, cut web-weight versions and upload them to Cloud Storage with a manifest the site reads.' },
    ],
    wins: [
      ['0', 'crews or site visits'],
      ['1 + 3', 'films per property: a 16:9 master and three 9:16 cuts'],
      ['≈ 5 days', 'from photos to delivered films'],
      ['1', 'round of revisions included'],
    ],
  },
];

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
  ['2013', 'Landmark University', 'Started a BSc in Civil Engineering, and went on to build a touchscreen yearbook with fingerprint sign-in (Java, PHP, MySQL).'],
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

/** Each inner array is one footer item; links in the same item are joined by a bar. */
export const FAMILY = [
  [
    { label: 'Nouvellesoft', href: 'https://nouvellesoft.com.ng' },
    { label: 'The Yearbook App', href: 'https://yearbookapp.web.app' },
  ],
  [{ label: 'Dave Studio', href: 'https://dave-studio.web.app' }],
  [{ label: 'Dave Architectures', href: 'https://dave-architectures.web.app' }],
  [{ label: 'Dave Websites', href: 'https://dave-websites.web.app' }],
];
