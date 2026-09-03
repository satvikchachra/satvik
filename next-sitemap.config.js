/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://satvik.ai',
  // robots.txt is committed as a static file at public/robots.txt for full
  // control (next-sitemap hardcodes a deprecated `Host:` line and can't
  // reference llms.txt). Keep this false so the static file isn't overwritten.
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: [
    '/icon.svg',
    '/apple-icon',
    '/opengraph-image',
    '/twitter-image',
    '/manifest.webmanifest',
  ],
};
