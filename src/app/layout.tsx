import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/lib/metadata';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    'Satvik Chachra',
    'AI Engineer',
    'Full Stack Engineer',
    'AI Coding Agent',
    'Developer Tooling',
    'Full Stack',
    'SDE',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// JSON-LD structured data (Person schema)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Satvik Chachra',
  url: siteConfig.url,
  image: `${siteConfig.url}/images/satvikchachra.jpg`,
  jobTitle: 'AI-Native Full-Stack Engineer',
  description: siteConfig.description,
  sameAs: [siteConfig.author.github, siteConfig.author.linkedin, siteConfig.author.twitterUrl],
};

// Removed custom theme script

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <Navbar />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
