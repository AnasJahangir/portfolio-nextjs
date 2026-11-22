import { Inter, Space_Grotesk } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://anasjahangir.vercel.app'),
  title: 'Anas Jahangir | Full-Stack Developer',
  description:
    'Anas Jahangir is a full-stack developer from Karachi, Pakistan, specializing in React.js, Next.js, TypeScript and Node.js — building complete products end to end.',
  keywords: ['Anas Jahangir', 'Full-Stack Developer', 'React', 'Next.js', 'TypeScript', 'Karachi'],
  authors: [{ name: 'Anas Jahangir', url: 'https://anasjahangir.vercel.app' }],
  openGraph: {
    title: 'Anas Jahangir | Full-Stack Developer',
    description:
      'Full-stack developer from Karachi — React, Next.js, TypeScript, Node.js. Building complete products end to end.',
    url: 'https://anasjahangir.vercel.app',
    siteName: 'Anas Jahangir',
    images: [{ url: '/images/me.jpg', width: 150, height: 150, alt: 'Anas Jahangir' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Anas Jahangir | Full-Stack Developer',
    description:
      'Full-stack developer from Karachi — React, Next.js, TypeScript, Node.js.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
