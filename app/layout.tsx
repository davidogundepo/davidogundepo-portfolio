import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/content';

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const title = `${SITE.name} · ${SITE.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: 'profile',
    locale: 'en_GB',
    images: [{ url: '/og-hero.jpg', width: 1200, height: 630, alt: `${SITE.name}, ${SITE.role}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: SITE.description,
    images: ['/og-hero.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#efede7',
};

/*
 * Set the theme before first paint so a light-mode visitor never sees a dark
 * flash. Light is the default; the toggle stores the choice.
 */
const themeScript = `try{var t=localStorage.getItem('do-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
