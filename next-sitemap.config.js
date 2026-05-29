/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://satvikchachra.github.io', // Replace with your actual domain
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}
