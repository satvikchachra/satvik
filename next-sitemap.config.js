/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://satvikchachra.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}
