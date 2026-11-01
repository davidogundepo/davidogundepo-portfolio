// David Ogundepo, CV, November 2026. Single source for both the Word file and
// the PDF on the website. House rule: no em dashes. Date ranges use an en dash.

export const CV = {
  name: 'David Ogundepo',
  title: 'Software Engineer & Founder',
  contact: [
    'Lagos, Nigeria',
    '+234 707 969 3500',
    'david.oludepo@gmail.com',
    'davidogundepo.web.app',
    'linkedin.com/in/davidogundepo',
    'github.com/davidogundepo',
  ],
  profile:
    'Software engineer and founder with 8+ years of building and shipping mobile apps, web platforms and cloud automation for real users. I built and run The Yearbook App, a three-product Flutter and Firebase platform with 1,000+ students onboarded at Adeleke University and adoption proposals before 30+ institutions, two state governments and the NYSC. Tech Innovation Lead at REDtech Africa. MSc Structural Engineering (Distinction), Coventry University. Winner at Business Awards UK 2024, BTA Developer of the Year finalist, and a Startup World Cup Top 10 regional finalist. Looking for an engineering or product role where I can own a product end to end.',
  skills: [
    ['Mobile', 'Flutter, Dart, iOS and Android releases, push notifications (FCM, APNs), offline caching'],
    ['Web', 'React, Next.js, TypeScript, Vite, Tailwind CSS, GSAP, PHP, MySQL, HTML/CSS'],
    ['Cloud', 'Firebase (Firestore, Auth, Storage, Hosting), Cloud Functions, Cloud Run, Google Cloud, Sentry'],
    ['Automation', 'Google Apps Script, n8n, Paystack, Zoho Books, Brevo, WhatsApp Cloud API, Telegram bots'],
    ['AI', 'Gemini on Vertex AI, Claude, ChatGPT, AI-assisted development (Lovable, v0, Bolt)'],
    ['Languages', 'JavaScript, TypeScript, Dart, Python, Java, Kotlin, PHP, SQL'],
    ['Product', 'Institutional sales and proposals, pitching, ClickUp, compliance policy (AML/CFT, anti-bribery, data protection), graphic and video design'],
  ],
  experience: [
    {
      role: 'Founder & Lead Engineer',
      org: 'Nouvellesoft · The Yearbook App',
      where: 'Coventry, UK and Lagos, Nigeria',
      when: '2022 – Present',
      bullets: [
        'Built and run The Yearbook App (YBA): three Flutter apps (Campus, Academy, NYSC) on iOS and Android, backed by Firebase and Google Cloud. The Campus app alone is 76,000+ lines of Dart.',
        'Onboarded 1,000+ graduating students at Adeleke University with a full digital convocation and yearbook experience.',
        'Designed the end-to-end pipeline: React web forms, server-initialised Paystack checkout, Google Sheets and Apps Script validation, multi-tenant Firestore, Flutter apps. Adding a new school is configuration, not code.',
        'Wrote 40 Cloud Functions across finance (nightly Paystack to Zoho Books journals, partner payouts, bank webhooks), email (Brevo and React Email lifecycle journeys) and WhatsApp (Meta Cloud API verification codes, follow-ups, campaigns), plus Cloud Run services including an in-app AI chat on Gemini.',
        'Cut a daily notification job from about 56,000 Firestore reads to about 16 by replacing a full scan with tagged queries, and set cost controls across the Google Cloud projects.',
        'Wrote and delivered adoption proposals to 30+ universities and schools (including Covenant, Landmark, Afe Babalola, Bowen, Ibadan and ABU Zaria), the Oyo State Government, the Lagos State Ministry of Education and the NYSC Director-General.',
        'Built the admin dashboard and sales CRM (React, TypeScript, TanStack Query), business tools for proposals, invoices and payouts, and the compliance policies needed for a payments API integration.',
        'In the UK, built the GFA App for Coventry Phoenix FC (squad management, player stats, and an AI step that turns WhatsApp messages into database updates), published on the App Store.',
      ],
    },
    {
      role: 'Tech Innovation Lead & First Tech Employee',
      org: 'REDtech Africa',
      where: 'Lagos, Nigeria',
      when: 'Jan 2025 – Present',
      bullets: [
        'Joined as founding tech partner in a three-person leadership team as the company grew to 12 staff.',
        'Built the internal operations platform: attendance, leave, tasks, staff utilisation, finance dashboard, waybills, client directory, document repository and a social media hub.',
        'Built REDSTREAM, an African-focused streaming platform (series management, profiles, admin) and its value-added-services dashboard for telco partners.',
        'Rebuilt the company website several times as the business evolved, introduced ClickUp, and redesigned the organogram, logo and email standards.',
      ],
    },
    {
      role: 'Founder',
      org: 'Dave Websites · Dave Studio · Dave Architectures',
      where: 'Lagos, Nigeria',
      when: '2025 – Present',
      bullets: [
        'Dave Websites (formerly Dave Digitals): a marketplace of 52 industry-specific website templates plus custom builds; 15+ client and product sites live across consultancy, health, property, agriculture and media.',
        'Website Revamp Project (April–May 2025): identified 100 UK businesses with outdated websites, built 81 modern replacements and ran the outreach.',
        'Dave Studio: AI graduation and NYSC portraits with a 529-look catalogue and WhatsApp checkout. Dave Architectures: cinematic property films from listing photographs. Both in Next.js with GSAP.',
      ],
    },
    {
      role: 'Earlier roles',
      org: 'United Kingdom',
      where: '',
      when: '2021 – 2023',
      bullets: [
        'Software Developer (contract), youHQ, 2023.',
        'Descriptive Data Analyst, Stickee Ltd, 2021.',
        'Freelance web and mobile development on Upwork, PeoplePerHour, Arc.dev and Contra.',
      ],
    },
  ],
  earlier: [
    'NYSC CDS Yearbook App, Rivers State (2019–20): Flutter and Firebase, published on the App Store and Google Play.',
    'Civil and Structural Engineering yearbook app, Coventry University (2020–22): published on Google Play.',
    'Touchscreen yearbook, Landmark University (2015–19): Java, Android, PHP and MySQL with fingerprint sign-in; and a cafeteria food-buying kiosk system proposed to the university in 2019.',
  ],
  awards: [
    ['2025', 'Startup World Cup, Lagos regional finals: Top 10 of 500+ applicants; accepted to the Grand Finale, San Francisco, 17 October 2025'],
    ['2024', 'Business Awards UK: Winner, Equity-backed Startup of the Year (Nouvellesoft)'],
    ['2024', 'BTA (Black Tech Achievement) Awards, London: Finalist, Developer of the Year'],
    ['2024', 'The Signature Awards, Birmingham: three nominations (Startup of the Year, Innovative Business, Excellence in Technology)'],
    ['2024', 'Insider Media: two nominations (Digital Technology, Manufacturing Startup)'],
    ['2023', 'Exhibitor, NEC Birmingham; £3,000 grant; Coventry University Launch founder programme'],
    ['2018', 'Innovation Award, Landmark University'],
  ],
  education: [
    {
      degree: 'MSc Structural Engineering, Distinction',
      school: 'Coventry University, UK',
      detail: 'Thesis: predicting thermal cracking in concrete pavement. FEA and connection design, structural health assessment, ANSYS.',
    },
    {
      degree: 'BSc Civil Engineering',
      school: 'Landmark University, Nigeria',
      detail: 'Structural analysis and design, geotechnical engineering, AutoCAD, Tekla Tedds, Eurocode.',
    },
  ],
};
