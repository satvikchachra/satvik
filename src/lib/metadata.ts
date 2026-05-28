import type { Metadata } from "next";

export const BASE_URL = "https://satvikchachra.com";

export const siteConfig = {
  name: "Satvik Chachra",
  title: "Satvik Chachra - AI Native Full Stack Engineer",
  description:
    "AI-native full-stack engineer building AI Coding Agents, developer tooling, software products and infrastructures.",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og/default.png`,
  author: {
    name: "Satvik Chachra",
    email: "hello@example.com",
    github: "https://github.com/satvikchachra",
    twitter: "@satvikchachra",
    linkedin: "https://linkedin.com/in/satvikchachra",
  },
};

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  if (title && /^[a-z]/.test(title)) {
    throw new Error(
      `Build Error: The page title "${title}" is not capitalized. All page titles must be capitalized.`
    );
  }

  const metaTitle = title
    ? title
    : siteConfig.title;
  const metaDesc = description ?? siteConfig.description;
  const url = `${BASE_URL}${path}`;
  return {
    title: { absolute: metaTitle },
    description: metaDesc,
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url,
      siteName: siteConfig.name,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: metaTitle }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      creator: siteConfig.author.twitter,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function buildBlogMetadata({
  title,
  description,
  slug,
  date,
  tags,
  ogImage,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
  ogImage: string;
}): Metadata {
  const base = buildMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    ogImage,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: date,
      tags,
      authors: [siteConfig.name],
    },
  };
}
