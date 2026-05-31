/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://satvik.ai',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/icon.svg',
    '/apple-icon',
    '/opengraph-image',
    '/twitter-image',
    '/manifest.webmanifest',
  ],
};
