import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s — Satvik Chachra",
  },
  description: siteConfig.description,
  keywords: [
    "Satvik Chachra",
    "AI Engineer",
    "Platform Engineer",
    "AI Coding Agent",
    "Developer Tooling",
    "Full Stack",
    "SDE",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// JSON-LD structured data (Person schema)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Satvik Chachra",
  url: siteConfig.url,
  jobTitle: "AI-Native Full-Stack Platform Engineer",
  description: siteConfig.description,
  sameAs: [
    siteConfig.author.github,
    siteConfig.author.linkedin,
    `https://twitter.com/satvikchachra`,
  ],
};

// No-flash theme script: read saved pref or detect system
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var valid = ['dark','light'];
    var theme;
    if (t && valid.includes(t)) {
      theme = t;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash theme script — must run before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
