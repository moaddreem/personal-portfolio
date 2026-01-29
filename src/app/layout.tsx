import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfile } from '@/lib/content';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Computer Science Student',
    template: '%s | Portfolio',
  },
  description: 'Personal portfolio and blog of a Computer Science student showcasing projects, achievements, and thoughts on technology.',
  keywords: ['portfolio', 'computer science', 'developer', 'projects', 'blog'],
  authors: [{ name: 'Portfolio Owner' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = getProfile();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer links={profile.links} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
